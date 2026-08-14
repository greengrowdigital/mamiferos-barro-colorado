import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { checklist, mamiferosIntro, others, sighting, tally, why } from '../content/mamiferos.js'
import PageIntro from '../components/PageIntro.jsx'
import Band from '../components/Band.jsx'
import ChapterNav from '../components/ChapterNav.jsx'
import Photo, { Figure } from '../components/Photo.jsx'
import { Reveal, RevealMask, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import { CountUp, DrawLine, Parallax } from '../components/motion/ScrollBits.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

/** Fila del inventario: el estado se dice con texto e icono, no sólo con color. */
function ChecklistRow({ item, status }) {
  const { t } = useLanguage()
  const seen = item.seen

  return (
    <StaggerItem
      as="li"
      className="relative grid items-center gap-x-4 gap-y-1 border-b py-4 sm:grid-cols-[1fr_auto] sm:gap-6"
      style={{
        borderColor: seen ? 'color-mix(in oklab, var(--color-amber-500) 42%, transparent)' : 'var(--color-under-800)',
      }}
    >
      {seen && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[-1rem] inset-y-0 -z-10 rounded-sm"
          style={{ background: 'color-mix(in oklab, var(--color-amber-500) 12%, transparent)' }}
        />
      )}

      <span className="min-w-0">
        <span
          className="block"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: seen ? 700 : 500,
            fontSize: 'clamp(1.02rem, 0.95rem + 0.5vw, 1.3rem)',
            letterSpacing: '-0.02em',
            color: seen ? 'var(--color-haze-50)' : 'var(--color-haze-600)',
          }}
        >
          {t(item.name)}
        </span>
        <span
          className="mt-0.5 block text-[0.82rem] italic"
          style={{ color: seen ? 'var(--color-amber-400)' : 'color-mix(in oklab, var(--color-haze-600) 72%, transparent)' }}
        >
          {item.latin}
        </span>
        {item.note && <span className="mt-1 block text-[0.86rem] text-haze-400">{t(item.note)}</span>}
      </span>

      <span
        className="field-label inline-flex shrink-0 items-center gap-1.5 justify-self-start rounded-full px-3 py-1.5 text-[0.55rem] sm:justify-self-end"
        style={{
          color: seen ? 'var(--color-under-950)' : 'var(--color-haze-400)',
          background: seen ? 'var(--color-amber-500)' : 'transparent',
          border: seen ? '1px solid transparent' : '1px dashed color-mix(in oklab, var(--color-haze-600) 55%, transparent)',
        }}
      >
        <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          {seen ? (
            <path d="M2.5 7.5l3 3 6-6.5" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" strokeLinecap="round" />
          )}
        </svg>
        {seen ? t(status.seen) : t(status.unseen)}
      </span>
    </StaggerItem>
  )
}

export default function Mamiferos() {
  const { lang, t } = useLanguage()
  const reduce = useReducedMotion()
  const stageRef = useRef(null)
  usePageTitle(lang === 'es' ? 'Los mamíferos — Barro Colorado' : 'The mammals — Barro Colorado')

  /* El avistamiento se abre al subir por él: el marco crece y el resto cede. */
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start end', 'center center'], layoutEffect: false })
  const frameScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.86, 1])
  const frameOpacity = useTransform(scrollYProgress, [0, 0.45], [0.4, 1])

  const seenCount = checklist.items.filter((i) => i.seen).length

  return (
    <>
      <PageIntro
        kicker={mamiferosIntro.kicker}
        heading={mamiferosIntro.heading}
        lede={mamiferosIntro.lede}
        image="/img/dosel-luz.webp"
        objectPosition="50% 40%"
        alt={{
          es: 'Copas del bosque a contraluz, donde ocurren casi todos los avistamientos.',
          en: 'Backlit forest crowns, where almost every sighting happens.',
        }}
      />

      <main id="contenido">
        {/* El conteo del recorrido */}
        <section data-nav-theme="dark" className="surface-under" aria-labelledby="registro">
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <Reveal>
              <p className="field-label m-0 text-amber-400" id="registro">
                {t(tally.label)}
              </p>
            </Reveal>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <Stagger as="ul" className="m-0 list-none p-0" step={0.08}>
                {tally.rows.map((row) => (
                  <StaggerItem
                    as="li"
                    key={row.group.es}
                    className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-under-800 py-5 last:border-b-0"
                  >
                    <span
                      className="tabular shrink-0"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: 'clamp(2.2rem, 1.6rem + 2.2vw, 3.6rem)',
                        lineHeight: 1,
                        letterSpacing: '-0.035em',
                        color: row.highlight ? 'var(--color-amber-400)' : 'var(--color-haze-600)',
                      }}
                    >
                      <CountUp value={row.value} locale={lang === 'es' ? 'es-PA' : 'en-US'} />
                    </span>
                    <span>
                      <span
                        className="block text-[1.02rem]"
                        style={{ color: row.highlight ? 'var(--color-haze-50)' : 'var(--color-haze-400)' }}
                      >
                        {t(row.group)}
                      </span>
                      <span className="block text-[0.86rem] text-haze-600">{t(row.detail)}</span>
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>

              <Reveal delay={0.1}>
                <div className="flex h-full flex-col justify-center border-l-0 lg:border-l lg:border-under-800 lg:pl-14">
                  <p
                    className="tabular m-0 text-haze-50"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(3.4rem, 2.2rem + 5vw, 7rem)',
                      lineHeight: 0.9,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    <CountUp value={tally.distance.value} locale={lang === 'es' ? 'es-PA' : 'en-US'} />
                    <span className="ml-1 text-[0.3em] text-amber-400" translate="no">
                      {tally.distance.unit}
                    </span>
                  </p>
                  <p className="mt-3 mb-0 text-[1.02rem] text-haze-400">{t(tally.distance.label)}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Inventario: lo que la isla tiene y lo que vimos */}
        <section data-nav-theme="dark" className="defer-offscreen surface-under" aria-labelledby="inventario">
          <div className="shell pb-[clamp(3rem,9vh,6rem)]">
            <DrawLine tone="dark" />
            <div className="grid gap-10 pt-[clamp(2.5rem,7vh,4.5rem)] lg:grid-cols-[1fr_1.25fr] lg:gap-16">
              <div>
                <Reveal>
                  <h2
                    id="inventario"
                    className="m-0 max-w-[15ch] text-haze-50"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: 'clamp(1.75rem, 1.2rem + 2.3vw, 2.9rem)',
                      letterSpacing: '-0.034em',
                    }}
                  >
                    {t(checklist.heading)}
                  </h2>
                </Reveal>
                <Reveal delay={0.05}>
                  <p className="measure on-dark mt-6 mb-0">{t(checklist.body)}</p>
                </Reveal>

                <Reveal delay={0.12}>
                  <p
                    className="mt-8 mb-0 inline-flex items-baseline gap-2 rounded-full px-4 py-2"
                    style={{ background: 'color-mix(in oklab, var(--color-amber-500) 14%, transparent)' }}
                  >
                    <span
                      className="tabular text-amber-400"
                      style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', lineHeight: 1 }}
                    >
                      {seenCount}
                    </span>
                    <span className="text-[0.9rem] text-haze-200">
                      {lang === 'es'
                        ? `de ${checklist.items.length} en la lista`
                        : `of ${checklist.items.length} on the list`}
                    </span>
                  </p>
                </Reveal>
              </div>

              <div>
                <Stagger as="ul" className="m-0 list-none p-0" step={0.05}>
                  {checklist.items.map((item) => (
                    <ChecklistRow key={item.latin} item={item} status={checklist.status} />
                  ))}
                </Stagger>
                <Reveal delay={0.1}>
                  <p className="measure mt-5 mb-0 text-[0.85rem] leading-relaxed text-haze-600">{t(checklist.footnote)}</p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* El avistamiento */}
        <section ref={stageRef} data-nav-theme="dark" className="defer-offscreen surface-under grain relative overflow-hidden" aria-labelledby="avistamiento">
          <div className="shell py-[clamp(3.5rem,10vh,7rem)]">
            <Reveal>
              <p className="field-label m-0 text-amber-400">{t(sighting.kicker)}</p>
              <h2
                id="avistamiento"
                className="mt-3 mb-0 text-haze-50"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 1.3rem + 3vw, 3.6rem)',
                  letterSpacing: '-0.036em',
                }}
              >
                {t(sighting.heading)}
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14">
              <motion.div
                className="mx-auto w-full max-w-[26rem] overflow-hidden rounded-[6px] bg-under-900"
                style={{ scale: frameScale, opacity: frameOpacity }}
              >
                <video
                  src={sighting.video.src}
                  poster={sighting.video.poster}
                  controls
                  playsInline
                  preload="none"
                  className="max-h-[70svh] w-full"
                  aria-label={lang === 'es' ? 'Video del mono aullador en el dosel' : 'Video of the howler monkey in the canopy'}
                >
                  {lang === 'es' ? 'Tu navegador no puede reproducir este video.' : 'Your browser cannot play this video.'}
                </video>
              </motion.div>

              <div>
                {sighting.body.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className={`measure on-dark mb-0 ${i === 0 ? 'mt-0' : 'mt-5'}`}>{t(paragraph)}</p>
                  </Reveal>
                ))}

                <Parallax distance={22} className="mt-10">
                  <RevealMask>
                    <Figure
                      src={sighting.photo.src}
                      alt={t(sighting.photo.alt)}
                      caption={t(sighting.photo.caption)}
                      tone="dark"
                      sizes="(max-width: 1024px) 92vw, 44vw"
                      imgClassName="aspect-[4/5] w-full object-cover"
                    />
                  </RevealMask>
                </Parallax>
              </div>
            </div>
          </div>
        </section>

        <Band from="under" to="mist" height="16vh" />

        {/* Lo demás que sí apareció */}
        <section data-nav-theme="light" className="defer-offscreen surface-mist" aria-labelledby="otros">
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <Reveal>
              <h2
                id="otros"
                className="m-0 max-w-[16ch] text-ink-900"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 1.2rem + 2.4vw, 3rem)',
                  letterSpacing: '-0.034em',
                }}
              >
                {t(others.heading)}
              </h2>
              <p className="measure mt-4 mb-0 text-ink-700">{t(others.body)}</p>
            </Reveal>

            <Stagger
              as="ul"
              className="mt-12 m-0 grid list-none gap-x-6 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4"
              step={0.07}
            >
              {others.items.map((item) => (
                <StaggerItem as="li" key={item.name.es}>
                  <div className="overflow-hidden rounded-[3px] bg-mist-200">
                    <Photo
                      src={item.src}
                      alt={t(item.name)}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 23vw"
                      className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
                    />
                  </div>
                  <p className="field-label mt-3 mb-0 text-ink-500">
                    {item.figure ? (lang === 'es' ? `Figura ${item.figure}` : `Figure ${item.figure}`) : t(item.where)}
                  </p>
                  <h3
                    className="mt-1 mb-0 text-ink-900"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.022em' }}
                  >
                    {t(item.name)}
                  </h3>
                  <p className="mt-1.5 mb-0 text-[0.9rem] leading-relaxed text-ink-500">{t(item.note)}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <Band from="mist" to="dawn" height="18vh" />

        {/* Por qué vimos tan poco */}
        <section data-nav-theme="dark" className="defer-offscreen surface-dawn grain relative overflow-hidden" aria-labelledby="por-que">
          <div className="shell py-[clamp(3.5rem,10vh,7rem)]">
            <Reveal>
              <h2
                id="por-que"
                className="m-0 max-w-[14ch] text-haze-50"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.9rem, 1.25rem + 2.6vw, 3.2rem)',
                  letterSpacing: '-0.034em',
                }}
              >
                {t(why.heading)}
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="measure on-dark mt-6 mb-0">{t(why.body)}</p>
            </Reveal>

            <Stagger as="ul" className="mt-12 m-0 grid list-none gap-8 p-0 md:grid-cols-3" step={0.08}>
              {why.factors.map((factor, i) => (
                <StaggerItem as="li" key={factor.title.es} className="border-t border-dawn-800 pt-5">
                  <span className="field-label tabular text-amber-400">{String(i + 1).padStart(2, '0')}</span>
                  <h3
                    className="mt-2 mb-0 text-haze-50"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.024em' }}
                  >
                    {t(factor.title)}
                  </h3>
                  <p className="mt-2 mb-0 text-[0.95rem] leading-relaxed text-haze-400">{t(factor.note)}</p>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.12}>
              <p
                className="measure mt-14 mb-0 max-w-[30ch] text-haze-50"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'clamp(1.2rem, 1rem + 1.1vw, 1.85rem)',
                  lineHeight: 1.32,
                  letterSpacing: '-0.022em',
                }}
              >
                {t(why.lesson)}
              </p>
            </Reveal>
          </div>
        </section>

        <Band from="dawn" to="mist" height="16vh" />

        <ChapterNav />
      </main>
    </>
  )
}
