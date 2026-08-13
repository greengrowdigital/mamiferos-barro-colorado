import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { nav, site } from '../content/site.js'
import useNavTheme from '../hooks/useNavTheme.js'

/* La silueta que apenas se distinguía en el dosel. */
function MonkeyMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6 shrink-0" aria-hidden="true" fill="none">
      <path d="M3 7c2.4 1.4 4.3 1.4 6.2.5M29 7c-2.4 1.4-4.3 1.4-6.2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      <path d="M2 14c3.8-1 6.7.4 9.4 2.4M30 14c-3.8-1-6.7.4-9.4 2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
      <ellipse cx="16" cy="15" rx="4.8" ry="5.6" fill="currentColor" />
      <path d="M16 20c-1.5 3-1 6 .5 8" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  )
}

export default function SiteHeader() {
  const { lang, toggle, t } = useLanguage()
  const location = useLocation()
  const reduce = useReducedMotion()
  const theme = useNavTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  const dark = theme === 'dark'
  const ink = dark ? 'var(--color-haze-50)' : 'var(--color-ink-900)'
  const inkMuted = dark ? 'var(--color-haze-400)' : 'var(--color-ink-500)'
  const line = dark ? 'color-mix(in oklab, var(--color-haze-400) 30%, transparent)' : 'var(--color-mist-300)'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    if (!menuOpen) return undefined

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        triggerRef.current?.focus()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll('a[href], button:not([disabled])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    panelRef.current?.querySelector('a[href]')?.focus()

    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const solid = scrolled || menuOpen

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-amber-500 focus:px-5 focus:py-2.5 focus:text-under-950 focus:no-underline"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
      >
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>

      <header
        data-theme={dark ? 'dark' : 'light'}
        className="fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color,color] duration-500"
        style={{
          color: ink,
          backgroundColor: solid ? (dark ? 'var(--color-under-950)' : 'var(--color-mist-50)') : 'transparent',
          borderBottom: `1px solid ${solid ? line : 'transparent'}`,
        }}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link
            to="/"
            className="group flex items-center gap-3 no-underline"
            style={{ color: ink }}
            aria-label={lang === 'es' ? 'Inicio — Gira a Barro Colorado' : 'Home — Barro Colorado field trip'}
          >
            <span className="transition-transform duration-500 group-hover:-translate-y-0.5">
              <MonkeyMark />
            </span>
            <span className="leading-tight">
              <span
                className="block text-[0.9rem] tracking-tight sm:text-[1rem]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}
              >
                {t(site.title)}
              </span>
              <span className="field-label hidden text-[0.58rem] sm:block" style={{ color: inkMuted }}>
                {site.school}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label={lang === 'es' ? 'Principal' : 'Main'}>
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className="relative rounded-full px-3 py-2 text-[0.86rem] no-underline transition-opacity duration-200 hover:opacity-100"
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-display)',
                  fontWeight: isActive ? 700 : 500,
                  color: ink,
                  opacity: isActive ? 1 : 0.62,
                })}
              >
                {({ isActive }) => (
                  <>
                    {t(item.label)}
                    {isActive && (
                      <motion.span
                        layoutId={reduce ? undefined : 'nav-active'}
                        className="absolute inset-x-3 -bottom-px h-[2px]"
                        style={{ background: dark ? 'var(--color-amber-400)' : 'var(--color-amber-700)' }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="flex h-11 min-w-11 items-center justify-center rounded-full border px-3 text-[0.72rem] transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.06em',
                color: ink,
                borderColor: line,
                touchAction: 'manipulation',
              }}
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
            >
              <span className="sm:hidden">{lang === 'es' ? 'EN' : 'ES'}</span>
              <span className="hidden sm:inline">
                <span style={{ opacity: lang === 'es' ? 1 : 0.45 }}>ES</span>
                <span className="mx-1" style={{ opacity: 0.4 }} aria-hidden="true">
                  /
                </span>
                <span style={{ opacity: lang === 'en' ? 1 : 0.45 }}>EN</span>
              </span>
            </button>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 lg:hidden"
              style={{ color: ink, borderColor: line, touchAction: 'manipulation' }}
              aria-expanded={menuOpen}
              aria-controls="menu-movil"
              aria-label={
                menuOpen ? (lang === 'es' ? 'Cerrar menú' : 'Close menu') : lang === 'es' ? 'Abrir menú' : 'Open menu'
              }
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M3.5 8h17" strokeLinecap="round" />
                    <path d="M3.5 16h17" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <motion.div
          className="h-[2px] origin-left"
          style={{ scaleX: progress, background: dark ? 'var(--color-amber-400)' : 'var(--color-amber-600)' }}
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="menu-movil"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={lang === 'es' ? 'Menú de navegación' : 'Navigation menu'}
            data-theme={dark ? 'dark' : 'light'}
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain pt-[var(--header-h)] lg:hidden"
            style={{ backgroundColor: dark ? 'var(--color-under-950)' : 'var(--color-mist-50)' }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shell flex min-h-full flex-col justify-between pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
              <nav aria-label={lang === 'es' ? 'Principal' : 'Main'}>
                <ul className="m-0 list-none space-y-0 p-0">
                  {nav.map((item, i) => (
                    <motion.li
                      key={item.to}
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <NavLink
                        to={item.to}
                        end={item.to === '/'}
                        className="flex items-baseline justify-between gap-4 border-b py-4 no-underline"
                        style={({ isActive }) => ({
                          borderColor: line,
                          color: isActive ? (dark ? 'var(--color-amber-400)' : 'var(--color-amber-700)') : ink,
                        })}
                      >
                        <span
                          className="text-[1.4rem] leading-tight"
                          style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.025em' }}
                        >
                          {t(item.label)}
                        </span>
                        <span className="field-label shrink-0 text-[0.56rem]" style={{ color: inkMuted }}>
                          {t(item.blurb)}
                        </span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <p className="field-label mt-10 mb-0 text-[0.58rem]" style={{ color: inkMuted }}>
                {site.school} · {t(site.date)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
