import { useLanguage } from '../i18n/LanguageContext.jsx'
import { intro, objectives, thesis } from '../content/home.js'
import { site, staff } from '../content/site.js'
import Hero from '../components/Hero.jsx'
import Band from '../components/Band.jsx'
import ChapterNav from '../components/ChapterNav.jsx'
import { Figure } from '../components/Photo.jsx'
import { Reveal, RevealMask, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import { DrawLine, Parallax, ScrollZoom, WordsReveal } from '../components/motion/ScrollBits.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

function ObjectiveRow({ item, legend, i }) {
  const { t } = useLanguage()
  const partial = item.met === 'partial'

  return (
    <StaggerItem
      as="li"
      className="grid gap-3 border-t border-mist-300 py-6 sm:grid-cols-[2.5rem_1fr_auto] sm:items-baseline sm:gap-6"
    >
      <span className="field-label tabular text-ink-500">{String(i + 1).padStart(2, '0')}</span>
      <span className="measure text-[1.02rem] leading-relaxed text-ink-900">{t(item.text)}</span>
      <span
        className="field-label inline-flex shrink-0 items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-[0.56rem]"
        style={{
          color: partial ? 'var(--color-amber-700)' : 'var(--color-ink-700)',
          background: partial
            ? 'color-mix(in oklab, var(--color-amber-500) 18%, transparent)'
            : 'color-mix(in oklab, var(--color-under-800) 9%, transparent)',
        }}
      >
        <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          {partial ? <path d="M3 7h8" strokeLinecap="round" /> : <path d="M2.5 7.5l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
        {partial ? t(legend.partial) : t(legend.full)}
      </span>
    </StaggerItem>
  )
}

export default function Home() {
  const { lang, t } = useLanguage()
  usePageTitle(
    lang === 'es'
      ? 'Un mono aullador — Gira a Barro Colorado'
      : 'One howler monkey — Barro Colorado field trip',
  )

  return (
    <>
      <Hero />

      <main id="contenido">
        <Band from="under" to="mist" height="16vh" />

        {/* Introducción */}
        <section data-nav-theme="light" className="surface-mist" aria-labelledby="introduccion">
          <div className="shell py-[clamp(3rem,9vh,6.5rem)]">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
              <div>
                <Reveal>
                  <p className="field-label m-0 text-amber-700">{t(intro.kicker)}</p>
                  <h2
                    id="introduccion"
                    className="mt-4 mb-0 max-w-[16ch] text-ink-900"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(1.9rem, 1.2rem + 2.7vw, 3.3rem)',
                      letterSpacing: '-0.034em',
                    }}
                  >
                    {t(intro.heading)}
                  </h2>
                </Reveal>

                <div className="mt-8">
                  {intro.body.map((paragraph, i) => (
                    <Reveal key={i} delay={i * 0.05}>
                      <p className={`measure mb-0 text-ink-700 ${i === 0 ? 'mt-0' : 'mt-5'}`}>{t(paragraph)}</p>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Parallax distance={34} className="lg:pt-10">
                <RevealMask>
                  <Figure
                    src={intro.photo.src}
                    alt={t(intro.photo.alt)}
                    caption={t(intro.photo.caption)}
                    sizes="(max-width: 1024px) 92vw, 42vw"
                    imgClassName="aspect-[3/4] w-full object-cover"
                  />
                </RevealMask>
              </Parallax>
            </div>
          </div>
        </section>

        {/* Objetivos */}
        <section data-nav-theme="light" className="defer-offscreen surface-mist-deep" aria-labelledby="objetivos">
          <div className="shell py-[clamp(3rem,9vh,6.5rem)]">
            <Reveal>
              <p className="field-label m-0 text-amber-700">{t(objectives.kicker)}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-6 grid gap-6 lg:grid-cols-[auto_1fr] lg:gap-12">
                <p className="field-label m-0 shrink-0 pt-2 text-ink-500 lg:w-40">{t(objectives.general.label)}</p>
                <p
                  className="measure m-0 text-ink-900"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(1.2rem, 0.98rem + 1vw, 1.75rem)',
                    lineHeight: 1.32,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {t(objectives.general.text)}
                </p>
              </div>
            </Reveal>

            <div className="mt-12">
              <Reveal>
                <p className="field-label m-0 mb-2 text-ink-500">{t(objectives.specific.label)}</p>
              </Reveal>
              <DrawLine />
              <Stagger as="ol" className="m-0 mt-0 list-none p-0" step={0.07}>
                {objectives.specific.items.map((item, i) => (
                  <ObjectiveRow key={i} item={item} legend={objectives.legend} i={i} />
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        <Band from="mist" to="under" height="18vh" />

        {/* La frase que resume el trabajo, sobre el sotobosque */}
        <section data-nav-theme="dark" className="defer-offscreen surface-under grain relative overflow-hidden" aria-label={lang === 'es' ? 'Cita del informe' : 'Quote from the report'}>
          <div className="shell relative py-[clamp(4.5rem,14vh,9rem)]">
            <ScrollZoom className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]" from={1.2}>
              <img
                src="/img/bosque-alto.webp"
                alt=""
                width="960"
                height="1280"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </ScrollZoom>

            <blockquote className="relative m-0">
              <WordsReveal
                as="p"
                text={t(thesis.quote)}
                dim={0.42}
                className="m-0 max-w-[20ch] text-haze-50"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.75rem, 1.1rem + 3.1vw, 3.6rem)',
                  lineHeight: 1.13,
                  letterSpacing: '-0.032em',
                }}
              />
              <footer className="field-label mt-8 text-amber-400">{t(thesis.attribution)}</footer>
            </blockquote>
          </div>
        </section>

        <Band from="under" to="mist" height="16vh" />

        {/* Quiénes firman el informe */}
        <section data-nav-theme="light" className="defer-offscreen surface-mist" aria-labelledby="quienes">
          <div className="shell py-[clamp(3rem,8vh,5.5rem)]">
            <Reveal>
              <h2
                id="quienes"
                className="m-0 text-ink-900"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.5rem, 1.1rem + 1.7vw, 2.3rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                {lang === 'es' ? 'Quiénes firman este informe' : 'Who signs this report'}
              </h2>
            </Reveal>

            <Stagger as="dl" className="mt-8 m-0 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" step={0.06}>
              <StaggerItem className="border-t border-mist-300 pt-4">
                <dt className="field-label m-0 text-ink-500">{lang === 'es' ? 'Curso' : 'Course'}</dt>
                <dd className="mt-2 mb-0 ml-0 text-[0.98rem] leading-relaxed text-ink-900">
                  {t(site.grade)} · {t(site.subject)}
                  <br />
                  {site.school}
                </dd>
              </StaggerItem>
              {staff.map((group) => (
                <StaggerItem key={group.role.es} className="border-t border-mist-300 pt-4">
                  <dt className="field-label m-0 text-ink-500">{t(group.role)}</dt>
                  <dd className="mt-2 mb-0 ml-0 text-[0.98rem] leading-relaxed text-ink-900">
                    {group.names.map((name) => (
                      <span key={name} className="block">
                        {name}
                      </span>
                    ))}
                  </dd>
                </StaggerItem>
              ))}
              <StaggerItem className="border-t border-mist-300 pt-4">
                <dt className="field-label m-0 text-ink-500">{lang === 'es' ? 'Fecha de la gira' : 'Date of the trip' }</dt>
                <dd className="mt-2 mb-0 ml-0 text-[0.98rem] leading-relaxed text-ink-900">{t(site.date)}</dd>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        <ChapterNav />
      </main>
    </>
  )
}
