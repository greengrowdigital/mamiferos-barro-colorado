import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function NotFound() {
  const { lang } = useLanguage()
  usePageTitle(lang === 'es' ? 'Página no encontrada — Barro Colorado' : 'Page not found — Barro Colorado')

  return (
    <main
      id="contenido"
      data-nav-theme="dark"
      className="surface-under flex min-h-[80svh] flex-col justify-center pt-[var(--header-h)] pb-20"
    >
      <div className="shell">
        <p className="field-label m-0 text-amber-400">404</p>
        <h1
          className="mt-4 mb-0 max-w-[16ch] text-haze-50"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 1.3rem + 3vw, 3.4rem)',
            letterSpacing: '-0.036em',
          }}
        >
          {lang === 'es' ? 'Tampoco encontramos esta' : 'We did not find this one either'}
        </h1>
        <p className="measure on-dark mt-5 mb-0">
          {lang === 'es'
            ? 'La página que buscas no existe en este informe. Vuelve al inicio para seguir el recorrido.'
            : 'The page you are looking for is not part of this report. Head back to the start to continue.'}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-[2.9rem] w-fit items-center gap-2 rounded-full bg-amber-500 px-6 text-under-950 no-underline transition-[background-color,transform] duration-200 hover:bg-amber-400 active:scale-[0.98]"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, touchAction: 'manipulation' }}
        >
          {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
        </Link>
      </div>
    </main>
  )
}
