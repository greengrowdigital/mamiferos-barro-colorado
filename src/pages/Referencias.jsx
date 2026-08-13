import { useLanguage } from '../i18n/LanguageContext.jsx'
import { credits, referencias, referenciasIntro } from '../content/referencias.js'
import { members, site, staff } from '../content/site.js'
import Band from '../components/Band.jsx'
import ChapterNav from '../components/ChapterNav.jsx'
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import { DrawLine } from '../components/motion/ScrollBits.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function Referencias() {
  const { lang, t } = useLanguage()
  usePageTitle(lang === 'es' ? 'Referencias — Barro Colorado' : 'References — Barro Colorado')

  return (
    <main id="contenido" data-nav-theme="light" className="surface-mist pt-[var(--header-h)]">
      <section className="shell pt-[clamp(3rem,8vh,5rem)] pb-[clamp(2.5rem,6vh,4rem)]">
        <Reveal>
          <p className="field-label m-0 text-amber-700">{t(referenciasIntro.kicker)}</p>
          <h1
            className="mt-4 mb-0 max-w-[15ch] text-ink-900"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.1rem, 1.3rem + 3.3vw, 3.7rem)',
              letterSpacing: '-0.036em',
            }}
          >
            {t(referenciasIntro.heading)}
          </h1>
          <p className="lede measure mt-6 mb-0 text-ink-700">{t(referenciasIntro.lede)}</p>
        </Reveal>
      </section>

      <section className="shell pb-[clamp(3rem,8vh,5rem)]" aria-label="APA 7">
        <DrawLine />
        <Stagger as="ol" className="m-0 list-none p-0" step={0.05}>
          {referencias.map((entry, i) => (
            <StaggerItem
              as="li"
              key={entry.url}
              className="grid gap-2 border-b border-mist-300 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-6"
            >
              <span className="field-label tabular text-ink-500">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="measure m-0 text-[1rem] leading-relaxed text-ink-700">
                  <span className="text-ink-900">{entry.author}</span> {entry.year}{' '}
                  <em className="text-ink-900 not-italic">{t(entry.title)}</em>{' '}
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline break-words text-amber-700 no-underline transition-colors duration-200 hover:text-amber-600"
                  >
                    {entry.url}
                  </a>
                </p>
                <p className="field-label mt-2 mb-0 text-[0.56rem] text-ink-500">
                  {lang === 'es' ? 'Usada en' : 'Used in'} — {t(entry.used)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Band from="mist" to="under" height="16vh" />

      {/* Créditos, sobre el sotobosque */}
      <section data-nav-theme="dark" className="surface-under" aria-labelledby="creditos">
        <div className="shell py-[clamp(3rem,9vh,6rem)]">
          <Reveal>
            <h2
              id="creditos"
              className="m-0 text-haze-50"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.7rem, 1.2rem + 2vw, 2.6rem)',
                letterSpacing: '-0.034em',
              }}
            >
              {t(credits.heading)}
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="field-label mt-10 mb-4 text-amber-400">
              {lang === 'es' ? 'Integrantes del grupo' : 'Group members'}
            </p>
          </Reveal>
          <Stagger as="ul" className="m-0 grid list-none gap-x-8 gap-y-0 p-0 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
            {members.map((name, i) => (
              <StaggerItem as="li" key={name} className="flex items-baseline gap-4 border-t border-under-800 py-4">
                <span className="field-label tabular text-amber-400">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className="text-haze-50"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.05rem', letterSpacing: '-0.018em' }}
                >
                  {name}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger as="dl" className="mt-14 m-0 grid gap-8 md:grid-cols-2 lg:grid-cols-3" step={0.06}>
            {staff.map((group) => (
              <StaggerItem key={group.role.es} className="border-t border-under-800 pt-4">
                <dt className="field-label m-0 text-haze-400">{t(group.role)}</dt>
                <dd className="mt-2 mb-0 ml-0 text-[0.98rem] leading-relaxed text-haze-200">
                  {group.names.map((name) => (
                    <span key={name} className="block">
                      {name}
                    </span>
                  ))}
                </dd>
              </StaggerItem>
            ))}
            <StaggerItem className="border-t border-under-800 pt-4">
              <dt className="field-label m-0 text-haze-400">{lang === 'es' ? 'Curso' : 'Course'}</dt>
              <dd className="mt-2 mb-0 ml-0 text-[0.98rem] leading-relaxed text-haze-200">
                {t(site.grade)} · {t(site.subject)}
                <br />
                {site.school}
              </dd>
            </StaggerItem>
            {credits.items.map((item) => (
              <StaggerItem key={item.label.es} className="border-t border-under-800 pt-4">
                <dt className="field-label m-0 text-haze-400">{t(item.label)}</dt>
                <dd className="measure mt-2 mb-0 ml-0 text-[0.96rem] leading-relaxed text-haze-200">{t(item.value)}</dd>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <p className="measure mt-12 mb-0 text-[0.88rem] leading-relaxed text-haze-600">{t(credits.note)}</p>
          </Reveal>
        </div>
      </section>

      <Band from="under" to="mist" height="16vh" />

      <ChapterNav />
    </main>
  )
}
