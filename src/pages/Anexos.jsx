import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { anexosIntro, figures, footage, gallery } from '../content/anexos.js'
import PageIntro from '../components/PageIntro.jsx'
import Band from '../components/Band.jsx'
import ChapterNav from '../components/ChapterNav.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Photo from '../components/Photo.jsx'
import { Reveal, RevealMask, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import { Parallax } from '../components/motion/ScrollBits.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

export default function Anexos() {
  const { lang, t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)
  usePageTitle(lang === 'es' ? 'Anexos — Barro Colorado' : 'Appendix — Barro Colorado')

  /* Un solo visor para las nueve figuras y las imágenes sueltas. */
  const viewer = useMemo(
    () => [
      ...figures.map((f) => ({
        src: `/img/${f.slug}.webp`,
        alt: f.alt,
        label: { es: `Figura ${f.n}`, en: `Figure ${f.n}` },
        caption: f.title,
      })),
      ...gallery.items.map((g) => ({ src: `/img/${g.slug}.webp`, alt: g.alt, caption: g.alt })),
    ],
    [],
  )

  return (
    <>
      <PageIntro
        kicker={anexosIntro.kicker}
        heading={anexosIntro.heading}
        lede={anexosIntro.lede}
        image="/img/hojas-luz.webp"
        objectPosition="50% 45%"
        alt={{
          es: 'Hojas grandes del sotobosque iluminadas a contraluz.',
          en: 'Large understory leaves backlit by the sun.',
        }}
      />

      <main id="contenido">
        {/* Las nueve figuras del informe */}
        <section data-nav-theme="light" className="surface-mist" aria-label={lang === 'es' ? 'Figuras del informe' : 'Report figures'}>
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <ol className="m-0 list-none p-0">
              {figures.map((figure, i) => {
                const flipped = i % 2 === 1
                return (
                  <li key={figure.slug} className="pb-[clamp(3rem,8vh,5.5rem)] last:pb-0">
                    <div
                      className={`grid items-start gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 ${
                        flipped ? 'lg:[&>*:first-child]:order-2' : ''
                      }`}
                    >
                      <RevealMask from={flipped ? 'right' : 'left'}>
                        <button
                          type="button"
                          onClick={() => setOpenIndex(i)}
                          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[3px] bg-mist-200"
                          style={{ touchAction: 'manipulation' }}
                          aria-label={
                            lang === 'es'
                              ? `Ampliar figura ${figure.n}: ${t(figure.title)}`
                              : `Enlarge figure ${figure.n}: ${t(figure.title)}`
                          }
                        >
                          <Photo
                            src={`/img/${figure.slug}.webp`}
                            alt={t(figure.alt)}
                            sizes="(max-width: 1024px) 92vw, 48vw"
                            className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
                          />
                          <span
                            className="pointer-events-none absolute right-3 bottom-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-amber-500 text-under-950 opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                            aria-hidden="true"
                          >
                            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="8.6" cy="8.6" r="5.4" />
                              <path d="M12.6 12.6L17 17M8.6 6.4v4.4M6.4 8.6h4.4" strokeLinecap="round" />
                            </svg>
                          </span>
                        </button>
                      </RevealMask>

                      <Reveal delay={0.08} className="lg:pt-2">
                        <p className="field-label m-0 text-amber-700">
                          {lang === 'es' ? `Figura ${figure.n}` : `Figure ${figure.n}`}
                        </p>
                        <h2
                          className="mt-3 mb-0 max-w-[26ch] text-ink-900"
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 700,
                            fontSize: 'clamp(1.25rem, 1rem + 1.2vw, 1.9rem)',
                            letterSpacing: '-0.028em',
                            lineHeight: 1.18,
                          }}
                        >
                          {t(figure.title)}
                        </h2>
                        {figure.note && (
                          <p className="measure mt-4 mb-0 text-[0.96rem] leading-relaxed text-ink-500">
                            <span className="text-ink-700">{lang === 'es' ? 'Nota. ' : 'Note. '}</span>
                            {t(figure.note)}
                          </p>
                        )}
                      </Reveal>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </section>

        <Band from="mist" to="under" height="16vh" />

        {/* El video */}
        <section data-nav-theme="dark" className="surface-under" aria-labelledby="video">
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <Reveal>
              <h2
                id="video"
                className="m-0 text-haze-50"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 1.2rem + 2.4vw, 3rem)',
                  letterSpacing: '-0.034em',
                }}
              >
                {t(footage.heading)}
              </h2>
              <p className="measure mt-4 mb-0 text-haze-400">{t(footage.body)}</p>
            </Reveal>

            <Stagger as="ul" className="mt-10 m-0 grid list-none gap-8 p-0 md:grid-cols-3" step={0.08}>
              {footage.clips.map((clip) => (
                <StaggerItem as="li" key={clip.src}>
                  <div className="overflow-hidden rounded-[4px] bg-under-900">
                    <video
                      src={clip.src}
                      poster={clip.poster}
                      controls
                      playsInline
                      preload="none"
                      className="max-h-[62svh] w-full"
                      aria-label={t(clip.title)}
                    >
                      {lang === 'es' ? 'Tu navegador no puede reproducir este video.' : 'Your browser cannot play this video.'}
                    </video>
                  </div>
                  <h3
                    className="mt-3 mb-0 text-haze-50"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.022em' }}
                  >
                    {t(clip.title)}
                  </h3>
                  <p className="mt-1 mb-0 text-[0.88rem] leading-relaxed text-haze-400">{t(clip.note)}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <Band from="under" to="mist" height="16vh" />

        {/* Galería suelta */}
        <section data-nav-theme="light" className="surface-mist-deep" aria-labelledby="galeria">
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <Reveal>
              <h2
                id="galeria"
                className="m-0 max-w-[18ch] text-ink-900"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.8rem, 1.2rem + 2.4vw, 3rem)',
                  letterSpacing: '-0.034em',
                }}
              >
                {t(gallery.heading)}
              </h2>
              <p className="measure mt-4 mb-0 text-ink-700">{t(gallery.body)}</p>
            </Reveal>

            <Stagger
              as="ul"
              className="mt-10 m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4"
              step={0.04}
            >
              {gallery.items.map((item, i) => (
                <StaggerItem as="li" key={item.slug}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(figures.length + i)}
                    className="group block w-full cursor-zoom-in overflow-hidden rounded-[3px] bg-mist-200"
                    style={{ touchAction: 'manipulation' }}
                    aria-label={lang === 'es' ? `Ampliar: ${t(item.alt)}` : `Enlarge: ${t(item.alt)}`}
                  >
                    <Photo
                      src={`/img/${item.slug}-sm.webp`}
                      alt={t(item.alt)}
                      sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
                      className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </button>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        <ChapterNav />
      </main>

      <Lightbox items={viewer} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
    </>
  )
}
