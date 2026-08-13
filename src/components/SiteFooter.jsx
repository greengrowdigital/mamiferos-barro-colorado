import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { footerNote, members, nav, site } from '../content/site.js'

export default function SiteFooter() {
  const { lang, t } = useLanguage()

  return (
    <footer data-nav-theme="dark" className="surface-under border-t border-under-800">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <p
            className="m-0 text-haze-50"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.3rem, 1rem + 1.2vw, 2rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.14,
            }}
          >
            {t(site.title)}
          </p>
          <p className="field-label mt-2 mb-0 text-haze-400">
            {site.school} · {t(site.place)}
          </p>
          <p className="measure mt-6 mb-0 text-[0.92rem] leading-relaxed text-haze-400">{t(footerNote)}</p>

          <ul className="mt-7 flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
            {members.map((name) => (
              <li key={name} className="text-[0.86rem] whitespace-nowrap text-haze-600">
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="field-label m-0 mb-4 text-haze-400">{lang === 'es' ? 'Secciones' : 'Sections'}</p>
          <ul className="m-0 grid list-none gap-2 p-0">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="link-underline text-[0.95rem] text-haze-200 no-underline transition-colors duration-200 hover:text-amber-400"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex flex-wrap items-center justify-between gap-3 border-t border-under-800 py-6">
        <p className="field-label m-0 text-[0.58rem] text-haze-600">
          © <span className="tabular">2026</span> {site.school}
        </p>
        <p className="field-label m-0 text-[0.58rem] text-haze-600">{t(site.date)}</p>
      </div>
    </footer>
  )
}
