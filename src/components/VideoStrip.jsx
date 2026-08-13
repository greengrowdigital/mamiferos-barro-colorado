import { useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import LoopVideo from './LoopVideo.jsx'

/**
 * La cinta que corre por detrás del titular: los clips de la jornada en fila,
 * desplazándose de derecha a izquierda. El track lleva la lista duplicada, así
 * que al recorrer exactamente la mitad el ciclo empalma sin salto visible.
 */
export default function VideoStrip({ clips, seconds = 64, className = '' }) {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const track = [...clips, ...clips]

  return (
    <div className={`absolute inset-0 overflow-hidden bg-under-950 ${className}`}>
      <div
        className="strip-track flex h-full w-max"
        style={reduce ? undefined : { animation: `strip-run ${seconds}s linear infinite` }}
      >
        {track.map((clip, i) => (
          <div key={`${clip.src}-${i}`} className="relative h-full shrink-0" style={{ aspectRatio: '3 / 4' }}>
            <LoopVideo src={clip.src} className="h-full w-full" label={i < clips.length ? t(clip.alt) : undefined} />
            {/* Una costura tenue entre clips: se lee como tira de contactos. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-px"
              style={{ background: 'color-mix(in oklab, var(--color-under-950) 60%, transparent)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
