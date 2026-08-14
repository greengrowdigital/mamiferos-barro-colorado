import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { members, site } from '../content/site.js'
import { heroStrip } from '../content/home.js'
import VideoStrip from './VideoStrip.jsx'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Wordmark en negativo: un rectángulo del color del fondo con las dos palabras
 * recortadas por máscara, de modo que la cinta de video se ve *a través* de las
 * letras. Los dos cuerpos están calculados para que ambas líneas terminen con
 * el mismo ancho (BARRO tiene 5 letras y COLORADO 8), y así el bloque queda
 * macizo y deja pasar la mayor cantidad de imagen posible.
 */
function WordmarkKnockout({ fill }) {
  const shared = {
    textAnchor: 'middle',
    fill: '#000',
    stroke: '#000',
    style: {
      fontFamily: "'Archivo', system-ui, sans-serif",
      fontWeight: 800,
      fontStretch: '125%',
      letterSpacing: '-0.012em',
      strokeWidth: 'clamp(1px, 0.45vw, 7px)',
      paintOrder: 'stroke',
      strokeLinejoin: 'round',
    },
  }

  return (
    <svg className="absolute inset-0 h-full w-full" role="img" aria-label="Barro Colorado">
      <defs>
        <mask id="wordmark-ko">
          <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
          {/* `textLength` fija el ancho de cada línea al 88% del lienzo: así el
              bloque encaja en cualquier pantalla —el cuerpo por sí solo se
              desbordaba en móvil— y las dos palabras quedan alineadas a la misma
              medida. El font-size gobierna ya sólo la altura de los glifos, y se
              limita también por vh para que las líneas no se monten en pantallas
              anchas y bajas. */}
          <text
            {...shared}
            x="50%"
            y="40%"
            dominantBaseline="middle"
            textLength="88%"
            lengthAdjust="spacingAndGlyphs"
            style={{ ...shared.style, fontSize: 'clamp(2.6rem, min(21vw, 27svh), 15rem)' }}
          >
            BARRO
          </text>
          <text
            {...shared}
            x="50%"
            y="66%"
            dominantBaseline="middle"
            textLength="88%"
            lengthAdjust="spacingAndGlyphs"
            style={{ ...shared.style, fontSize: 'clamp(1.7rem, min(13.2vw, 17svh), 9.4rem)' }}
          >
            COLORADO
          </text>
        </mask>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill={fill} mask="url(#wordmark-ko)" />
    </svg>
  )
}

export default function Hero() {
  const { lang, t } = useLanguage()
  const reduce = useReducedMotion()
  const heroRef = useRef(null)
  const [vh, setVh] = useState(800)

  useEffect(() => {
    const measure = () => setVh(window.innerHeight)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  /* El hero mide 280vh y queda fijo durante 1.8vh de scroll. Leemos scrollY
     directamente porque el hero siempre arranca en el tope de la página. */
  const { scrollY } = useScroll()
  const p = useTransform(scrollY, [0, Math.max(1, vh * 1.8)], [0, 1], { clamp: true })

  // Secuencia: el negativo claro se retira → la cinta queda a pantalla completa
  // → cae la sombra del sotobosque y aparece el título real.
  const dayOpacity = useTransform(p, [0, 0.12, 0.44], [1, 1, 0])
  const cueOpacity = useTransform(p, [0, 0.09], [1, 0])
  const veilOpacity = useTransform(p, [0.36, 0.62], [0, 0.9])
  const revealOpacity = useTransform(p, [0.48, 0.66], [0, 1])
  const revealY = useTransform(p, [0.48, 0.7], reduce ? [0, 0] : [70, 0])
  const stripScale = useTransform(p, [0, 0.62], reduce ? [1, 1] : [1.14, 1])

  return (
    <section ref={heroRef} className="relative h-[280vh]">
      {/* Marcas de tema para la barra superior: clara sobre el negativo, oscura al caer la sombra */}
      <div data-nav-theme="light" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[22%]" />
      <div data-nav-theme="dark" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[22%] h-[78%]" />

      <div className="sticky top-0 z-10 flex h-svh min-h-[34rem] items-center justify-center overflow-hidden bg-under-950">
        <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: stripScale }}>
          <VideoStrip clips={heroStrip} seconds={64} />
        </motion.div>

        {/* La sombra del sotobosque, que sube sobre la cinta */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ opacity: veilOpacity, backgroundColor: 'var(--color-under-950)' }}
        />

        {/* El negativo */}
        <motion.div className="absolute inset-0" style={{ opacity: dayOpacity }}>
          <WordmarkKnockout fill="var(--color-mist-50)" />

          <div className="pointer-events-none absolute inset-x-0 top-[13%] flex justify-center px-6">
            <p className="field-label m-0 text-center text-ink-700">
              {site.school} · {t(site.date)}
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-[15%] flex justify-center px-6">
            <p className="m-0 max-w-sm text-center text-[0.95rem] leading-relaxed text-ink-700">
              {t(site.tagline)}
            </p>
          </div>
        </motion.div>

        {/* Aviso de scroll */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ opacity: cueOpacity }}
        >
          <span className="field-label text-[0.58rem] text-ink-500">{lang === 'es' ? 'Baja' : 'Scroll'}</span>
          <span
            className="text-amber-700"
            style={reduce ? undefined : { animation: 'cue-bob 1.8s ease-in-out infinite' }}
          >
            ↓
          </span>
        </motion.div>

        {/* Lo que queda cuando el negativo se retira */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-[var(--shell-x)] text-center"
          style={{ opacity: revealOpacity, y: revealY }}
        >
          <p className="field-label m-0 text-amber-400">{t(site.place)}</p>
          <h1
            className="mt-4 mb-0 max-w-[16ch] text-haze-50"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.3rem, 1.3rem + 4.4vw, 4.6rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
            }}
          >
            {t(site.title)}
          </h1>
          <p className="mt-5 mb-0 max-w-[44ch] text-[1.05rem] leading-relaxed text-haze-200">
            {t(site.tagline)}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/mamiferos"
              className="inline-flex min-h-[2.9rem] items-center gap-2 rounded-full bg-amber-500 px-6 text-under-950 no-underline transition-[background-color,transform] duration-200 hover:bg-amber-400 active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, touchAction: 'manipulation' }}
            >
              {lang === 'es' ? 'Ver el avistamiento' : 'See the sighting'}
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              to="/la-jornada"
              className="inline-flex min-h-[2.9rem] items-center rounded-full border border-under-700 px-6 text-haze-200 no-underline transition-colors duration-200 hover:border-haze-400 hover:text-haze-50"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, touchAction: 'manipulation' }}
            >
              {lang === 'es' ? 'Recorrer la jornada' : 'Walk the day'}
            </Link>
          </div>

          <ul className="mt-10 flex max-w-3xl list-none flex-wrap justify-center gap-x-6 gap-y-1 p-0">
            {members.map((name) => (
              <li
                key={name}
                className="text-[0.88rem] whitespace-nowrap text-haze-400"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
              >
                {name}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
