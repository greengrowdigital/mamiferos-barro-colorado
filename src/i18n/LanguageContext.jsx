import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'bci-mam-lang'
const LanguageContext = createContext(null)

function readInitialLanguage() {
  if (typeof window === 'undefined') return 'es'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'es' || stored === 'en') return stored
  const preferred = window.navigator.languages?.[0] ?? window.navigator.language ?? 'es'
  return preferred.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readInitialLanguage)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const toggle = useCallback(() => setLang((current) => (current === 'es' ? 'en' : 'es')), [])

  /** Resuelve un nodo `{ es, en }`; devuelve los valores planos tal cual. */
  const t = useCallback(
    (node) => {
      if (node == null) return ''
      if (typeof node === 'string' || typeof node === 'number') return node
      return node[lang] ?? node.es ?? ''
    },
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, toggle, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  return context
}
