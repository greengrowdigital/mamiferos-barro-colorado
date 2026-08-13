import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { nav } from '../content/site.js'

/**
 * Índice de secciones al pie de cada página: filas a todo el ancho en lugar de
 * una rejilla de tarjetas iguales. Al señalar una fila aparece su fotografía.
 */
export default function ChapterNav({ tone = 'light' }) {
  const { lang, t } = useLanguage()
  const location = useLocation()
  const reduce = useReducedMotion()
  const [active, setActive] = useState(null)

  const dark = tone === 'dark'
  const items = nav.filter((item) => item.to !== location.pathname)

  return (
    <nav
      data-nav-theme={dark ? 'dark' : 'light'}
      className={dark ? 'bg-under-950' : 'bg-mist-50'}
      aria-label={lang === 'es' ? 'Otras secciones' : 'Other sections'}
    >
      <div className="shell py-[clamp(3.5rem,8vh,6rem)]">
        <p className={`field-label m-0 mb-7 ${dark ? 'text-haze-400' : 'text-ink-500'}`}>
          {lang === 'es' ? 'Seguir leyendo' : 'Keep reading'}
        </p>

        <ul className="m-0 list-none p-0">
          {items.map((item, i) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onMouseEnter={() => setActive(item.to)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(item.to)}
                onBlur={() => setActive(null)}
                className={`group flex items-baseline justify-between gap-6 border-t py-6 no-underline transition-colors duration-300 last:border-b ${
                  dark ? 'border-under-800 hover:border-amber-500/60' : 'border-mist-300 hover:border-amber-600/60'
                }`}
              >
                <span className="flex items-baseline gap-4 sm:gap-6">
                  <span
                    className={`field-label tabular shrink-0 pt-1 text-[0.58rem] transition-colors duration-300 ${
                      dark ? 'text-haze-600 group-hover:text-amber-400' : 'text-ink-500 group-hover:text-amber-700'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span
                      className={`block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 ${
                        dark ? 'text-haze-50' : 'text-ink-900'
                      }`}
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: 'clamp(1.3rem, 0.95rem + 1.5vw, 2.2rem)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1.12,
                      }}
                    >
                      {t(item.label)}
                    </span>
                    <span className={`mt-1 block text-[0.85rem] ${dark ? 'text-haze-400' : 'text-ink-500'}`}>
                      {t(item.blurb)}
                    </span>
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-4">
                  {!reduce && (
                    <motion.span
                      className="hidden h-20 w-28 overflow-hidden rounded-[2px] md:block"
                      initial={false}
                      animate={{
                        opacity: active === item.to ? 1 : 0,
                        clipPath: active === item.to ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      aria-hidden="true"
                    >
                      <img
                        src={item.preview}
                        alt=""
                        width="540"
                        height="720"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </motion.span>
                  )}
                  <span
                    className={`transition-all duration-300 group-hover:translate-x-1 ${
                      dark ? 'text-haze-600 group-hover:text-amber-400' : 'text-ink-500 group-hover:text-amber-700'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
