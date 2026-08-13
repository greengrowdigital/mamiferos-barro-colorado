import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { jornadaIntro, party, places, schedule } from '../content/jornada.js'
import PageIntro from '../components/PageIntro.jsx'
import Band from '../components/Band.jsx'
import ChapterNav from '../components/ChapterNav.jsx'
import LoopVideo from '../components/LoopVideo.jsx'
import Photo, { Figure } from '../components/Photo.jsx'
import { Reveal, RevealMask, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import { CountUp, DrawLine, Parallax } from '../components/motion/ScrollBits.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

/** Una parada de la jornada: hora, texto y, si la hay, su toma correspondiente.
 *  No toda parada tiene material grabado; esas se quedan en una sola columna
 *  antes que rellenarse con una imagen que no corresponde a ese momento. */
function Stop({ stop, index }) {
  const { lang, t } = useLanguage()
  const media = stop.media
  const flipped = index % 2 === 1

  return (
    <li className="relative pb-[clamp(3rem,8vh,5.5rem)] last:pb-0 md:pl-20">
      <span
        className="absolute top-[0.7rem] left-0 hidden h-[0.9rem] w-[0.9rem] rounded-full border-2 border-amber-600 bg-under-950 md:block"
        aria-hidden="true"
      />

      <div
        className={`grid items-start gap-6 lg:gap-14 ${
          media ? `lg:grid-cols-[1fr_1fr] ${flipped ? 'lg:[&>*:first-child]:order-2' : ''}` : ''
        }`}
      >
        {media && (
          <RevealMask from={flipped ? 'right' : 'left'}>
            <div className="overflow-hidden rounded-[3px] bg-under-900">
              {media.type === 'video' ? (
                media.sound ? (
                  <video
                    src={media.src}
                    poster={media.poster}
                    controls
                    playsInline
                    preload="none"
                    className="mx-auto max-h-[62svh] w-full"
                  >
                    {lang === 'es' ? 'Tu navegador no puede reproducir este video.' : 'Your browser cannot play this video.'}
                  </video>
                ) : (
                  <LoopVideo src={media.src} className="aspect-[4/3] w-full" />
                )
              ) : (
                <Photo
                  src={media.src}
                  alt=""
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              )}
            </div>
          </RevealMask>
        )}

        <Reveal delay={0.08} className={media ? 'lg:pt-3' : 'max-w-[46rem]'}>
          <p className="field-label m-0 text-amber-400">
            {stop.time ? (
              <span className="tabular text-[1.35rem] tracking-normal" style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {stop.time}
              </span>
            ) : (
              <span>{lang === 'es' ? 'Durante la mañana' : 'During the morning'}</span>
            )}
          </p>
          <h2
            className="mt-3 mb-0 max-w-[18ch] text-haze-50"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.4rem, 1.1rem + 1.5vw, 2.2rem)',
              letterSpacing: '-0.03em',
            }}
          >
            {t(stop.title)}
          </h2>
          <p className="measure on-dark mt-4 mb-0">{t(stop.body)}</p>
        </Reveal>
      </div>
    </li>
  )
}

export default function Jornada() {
  const { lang, t } = useLanguage()
  const reduce = useReducedMotion()
  const trackRef = useRef(null)
  usePageTitle(lang === 'es' ? 'La jornada — Barro Colorado' : 'The day — Barro Colorado')

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start 72%', 'end 60%'] })
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })

  return (
    <>
      <PageIntro
        kicker={jornadaIntro.kicker}
        heading={jornadaIntro.heading}
        lede={jornadaIntro.lede}
        video="/media/loop-muelle.mp4"
      />

      <main id="contenido">
        {/* La jornada, hora por hora, sobre el sotobosque */}
        <section data-nav-theme="dark" className="surface-under" aria-label={lang === 'es' ? 'Cronología' : 'Timeline'}>
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <ol ref={trackRef} className="relative m-0 list-none p-0">
              <span className="absolute top-3 bottom-3 left-[0.42rem] hidden w-px bg-under-800 md:block" aria-hidden="true" />
              {!reduce && (
                <motion.span
                  className="absolute top-3 bottom-3 left-[0.42rem] hidden w-px origin-top bg-amber-500 md:block"
                  style={{ scaleY: drawn }}
                  aria-hidden="true"
                />
              )}
              {schedule.map((stop, i) => (
                <Stop key={`${stop.title.es}-${i}`} stop={stop} index={i} />
              ))}
            </ol>
          </div>
        </section>

        <Band from="under" to="mist" height="16vh" />

        {/* Los cuatro lugares */}
        <section data-nav-theme="light" className="surface-mist" aria-labelledby="lugares">
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <div>
                <Reveal>
                  <h2
                    id="lugares"
                    className="m-0 max-w-[14ch] text-ink-900"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(1.8rem, 1.2rem + 2.4vw, 3rem)',
                      letterSpacing: '-0.034em',
                    }}
                  >
                    {t(places.heading)}
                  </h2>
                </Reveal>
                <Reveal delay={0.05}>
                  <p className="measure mt-6 mb-0 text-ink-700">{t(places.body)}</p>
                </Reveal>
              </div>

              <div className="lg:pt-3">
                <DrawLine />
                <Stagger as="ul" className="m-0 list-none p-0" step={0.07}>
                  {places.items.map((item, i) => (
                    <StaggerItem
                      as="li"
                      key={item.es}
                      className="flex items-baseline gap-5 border-b border-mist-300 py-5"
                    >
                      <span className="field-label tabular shrink-0 text-ink-500">{String(i + 1).padStart(2, '0')}</span>
                      <span
                        className="text-ink-900"
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 600,
                          fontSize: 'clamp(1.05rem, 0.95rem + 0.6vw, 1.4rem)',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {t(item)}
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </section>

        {/* Quiénes fuimos */}
        <section data-nav-theme="light" className="surface-mist-deep" aria-labelledby="quienes-fuimos">
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <Reveal>
                  <h2
                    id="quienes-fuimos"
                    className="m-0 text-ink-900"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(1.8rem, 1.2rem + 2.4vw, 3rem)',
                      letterSpacing: '-0.034em',
                    }}
                  >
                    {t(party.heading)}
                  </h2>
                </Reveal>

                <Stagger as="ul" className="mt-8 m-0 list-none p-0" step={0.07}>
                  {party.rows.map((row) => (
                    <StaggerItem
                      as="li"
                      key={row.label.es}
                      className="flex items-baseline gap-3 border-b border-mist-300 py-4 last:border-b-0"
                    >
                      <span className="shrink-0 text-[0.98rem] text-ink-700">{t(row.label)}</span>
                      <span className="min-w-6 grow translate-y-[-0.22em] border-b border-dotted border-mist-300" aria-hidden="true" />
                      <span
                        className="shrink-0 text-ink-900"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em' }}
                      >
                        <CountUp value={row.value} locale={lang === 'es' ? 'es-PA' : 'en-US'} />
                      </span>
                    </StaggerItem>
                  ))}
                </Stagger>

                <Reveal delay={0.1}>
                  <p className="measure mt-8 mb-0 border-l-0 pl-0 text-[0.96rem] leading-relaxed text-ink-500">
                    {t(party.note)}
                  </p>
                </Reveal>
              </div>

              <Parallax distance={30}>
                <RevealMask>
                  <Figure
                    src={party.photo.src}
                    alt={t(party.photo.alt)}
                    caption={t(party.photo.caption)}
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    imgClassName="aspect-[4/5] w-full object-cover"
                  />
                </RevealMask>
              </Parallax>
            </div>
          </div>
        </section>

        <ChapterNav />
      </main>
    </>
  )
}
