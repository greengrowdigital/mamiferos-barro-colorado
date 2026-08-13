import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import Photo from './Photo.jsx'
import LoopVideo from './LoopVideo.jsx'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Cabecera de las páginas interiores: una banda oscura con la toma de fondo y
 * el titular entrando desde una máscara. Marca `data-nav-theme="dark"` para que
 * la barra superior se pinte clara mientras dure.
 */
export default function PageIntro({ kicker, heading, lede, image, video, alt, objectPosition = '50% 50%' }) {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  return (
    <header data-nav-theme="dark" className="relative isolate overflow-hidden bg-under-950 pt-[var(--header-h)]">
      <div className="absolute inset-0 -z-10">
        {video ? (
          <LoopVideo src={video} className="h-full w-full" />
        ) : (
          <Photo
            src={image}
            alt={alt ? t(alt) : ''}
            priority
            className="h-full w-full object-cover"
            objectPosition={objectPosition}
            sizes="100vw"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, var(--color-under-950) 5%, color-mix(in oklab, var(--color-under-950) 86%, transparent) 46%, color-mix(in oklab, var(--color-under-950) 58%, transparent) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="shell grain relative flex min-h-[clamp(20rem,50svh,29rem)] flex-col justify-end pt-16 pb-[clamp(2.5rem,6vh,4.5rem)]">
        <motion.p
          className="field-label m-0 text-amber-400"
          initial={reduce ? false : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          {t(kicker)}
        </motion.p>

        <h1
          className="mt-3 mb-0 max-w-[17ch] text-haze-50"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2.1rem, 1.1rem + 4.4vw, 4.2rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.034em',
          }}
        >
          <span className="block overflow-hidden pb-[0.07em]">
            <motion.span
              className="block leading-[1.02]"
              initial={reduce ? false : { y: '106%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.95, ease: EASE, delay: 0.16 }}
            >
              {t(heading)}
            </motion.span>
          </span>
        </h1>

        {lede && (
          <motion.p
            className="lede measure on-dark mt-6 mb-0"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.42 }}
          >
            {t(lede)}
          </motion.p>
        )}
      </div>
    </header>
  )
}
