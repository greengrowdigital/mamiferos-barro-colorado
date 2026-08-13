import { useLanguage } from '../i18n/LanguageContext.jsx'
import {
  academico,
  aprendizajesIntro,
  conclusiones,
  cultural,
  evaluacion,
  organizativo,
} from '../content/aprendizajes.js'
import PageIntro from '../components/PageIntro.jsx'
import Band from '../components/Band.jsx'
import ChapterNav from '../components/ChapterNav.jsx'
import { Figure } from '../components/Photo.jsx'
import { Reveal, RevealMask, Stagger, StaggerItem } from '../components/motion/Reveal.jsx'
import { DrawLine, Parallax } from '../components/motion/ScrollBits.jsx'
import usePageTitle from '../hooks/usePageTitle.js'

function SectionHead({ id, children, tone = 'light' }) {
  return (
    <Reveal>
      <h2
        id={id}
        className={`m-0 max-w-[16ch] ${tone === 'dark' ? 'text-haze-50' : 'text-ink-900'}`}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(1.75rem, 1.2rem + 2.3vw, 2.9rem)',
          letterSpacing: '-0.034em',
        }}
      >
        {children}
      </h2>
    </Reveal>
  )
}

export default function Aprendizajes() {
  const { lang, t } = useLanguage()
  usePageTitle(lang === 'es' ? 'Lo aprendido — Barro Colorado' : 'What we learned — Barro Colorado')

  return (
    <>
      <PageIntro
        kicker={aprendizajesIntro.kicker}
        heading={aprendizajesIntro.heading}
        lede={aprendizajesIntro.lede}
        image="/img/fig-09-arbol-marcas.webp"
        objectPosition="50% 35%"
        alt={{
          es: 'Estudiantes frente a un árbol de gran porte con bandas de medición pintadas en el tronco.',
          en: 'Students in front of a large tree with measurement bands painted on the trunk.',
        }}
      />

      <main id="contenido">
        {/* Aspectos académicos */}
        <section data-nav-theme="light" className="surface-mist" aria-labelledby="academico">
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <SectionHead id="academico">{t(academico.heading)}</SectionHead>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div>
                {academico.body.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className={`measure mb-0 text-ink-700 ${i === 0 ? 'mt-0' : 'mt-5'}`}>{t(paragraph)}</p>
                  </Reveal>
                ))}

                <Reveal delay={0.1}>
                  <p className="field-label mt-10 mb-3 text-ink-500">{t(academico.facilities.label)}</p>
                </Reveal>
                <DrawLine />
                <Stagger as="ul" className="m-0 flex list-none flex-wrap gap-2 pt-4" step={0.05}>
                  {academico.facilities.items.map((item) => (
                    <StaggerItem
                      as="li"
                      key={item.es}
                      className="rounded-full border border-mist-300 px-4 py-2 text-[0.88rem] text-ink-700 transition-colors duration-300 hover:border-amber-600 hover:text-ink-900"
                    >
                      {t(item)}
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <Parallax distance={30}>
                <div className="grid gap-6">
                  {academico.photos.map((photo, i) => (
                    <RevealMask key={photo.src} delay={i * 0.08}>
                      <Figure
                        src={photo.src}
                        alt={t(photo.alt)}
                        caption={t(photo.caption)}
                        sizes="(max-width: 1024px) 92vw, 42vw"
                        imgClassName="aspect-[4/3] w-full object-cover"
                      />
                    </RevealMask>
                  ))}
                </div>
              </Parallax>
            </div>
          </div>
        </section>

        <Band from="mist" to="under" height="16vh" />

        {/* Aspectos culturales */}
        <section data-nav-theme="dark" className="surface-under" aria-labelledby="cultural">
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <SectionHead id="cultural" tone="dark">
              {t(cultural.heading)}
            </SectionHead>
            <div className="mt-8 max-w-[46rem]">
              {cultural.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={`measure on-dark mb-0 ${i === 0 ? 'mt-0' : 'mt-5'}`}>{t(paragraph)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Band from="under" to="mist" height="16vh" />

        {/* Aspectos organizativos */}
        <section data-nav-theme="light" className="surface-mist-deep" aria-labelledby="organizativo">
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <SectionHead id="organizativo">{t(organizativo.heading)}</SectionHead>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
              <div>
                {organizativo.body.map((paragraph, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className={`measure mb-0 text-ink-700 ${i === 0 ? 'mt-0' : 'mt-5'}`}>{t(paragraph)}</p>
                  </Reveal>
                ))}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {organizativo.photos.map((photo, i) => (
                  <RevealMask key={photo.src} delay={i * 0.1}>
                    <Figure
                      src={photo.src}
                      alt={t(photo.alt)}
                      caption={t(photo.caption)}
                      sizes="(max-width: 640px) 92vw, 24vw"
                      imgClassName="aspect-[3/4] w-full object-cover"
                    />
                  </RevealMask>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Evaluación */}
        <section data-nav-theme="light" className="surface-mist" aria-labelledby="evaluacion">
          <div className="shell py-[clamp(3rem,9vh,6rem)]">
            <SectionHead id="evaluacion">{t(evaluacion.heading)}</SectionHead>

            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <p className="field-label m-0 mb-3 text-ink-500">{t(evaluacion.logros.label)}</p>
                <DrawLine />
                <p className="measure mt-5 mb-0 text-ink-700">{t(evaluacion.logros.body)}</p>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="field-label m-0 mb-3 text-amber-700">{t(evaluacion.dificultades.label)}</p>
                <span
                  className="block h-px w-full"
                  style={{ background: 'color-mix(in oklab, var(--color-amber-600) 45%, transparent)' }}
                  aria-hidden="true"
                />
                <p className="measure mt-5 mb-0 text-ink-700">{t(evaluacion.dificultades.body)}</p>
              </Reveal>
            </div>

            <div className="mt-16">
              <Reveal>
                <p className="field-label m-0 mb-3 text-ink-500">{t(evaluacion.recomendaciones.label)}</p>
              </Reveal>
              <DrawLine />
              <Stagger as="ol" className="m-0 list-none p-0" step={0.06}>
                {evaluacion.recomendaciones.items.map((item, i) => (
                  <StaggerItem
                    as="li"
                    key={i}
                    className="flex items-baseline gap-5 border-b border-mist-300 py-5 last:border-b-0"
                  >
                    <span className="field-label tabular shrink-0 text-amber-700">{String(i + 1).padStart(2, '0')}</span>
                    <span className="measure text-[1.02rem] leading-relaxed text-ink-900">{t(item)}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        <Band from="mist" to="dawn" height="18vh" />

        {/* Conclusiones */}
        <section data-nav-theme="dark" className="surface-dawn grain relative overflow-hidden" aria-labelledby="conclusiones">
          <div className="shell py-[clamp(4rem,12vh,8rem)]">
            <SectionHead id="conclusiones" tone="dark">
              {t(conclusiones.heading)}
            </SectionHead>
            <div className="mt-8 max-w-[48rem]">
              {conclusiones.body.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className={`measure on-dark mb-0 text-[1.05rem] ${i === 0 ? 'mt-0' : 'mt-6'}`}>{t(paragraph)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Band from="dawn" to="mist" height="16vh" />

        <ChapterNav />
      </main>
    </>
  )
}
