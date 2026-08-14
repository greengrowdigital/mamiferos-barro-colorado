import { useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import LoopVideo, { loopPoster } from './LoopVideo.jsx'
import useDeviceBudget from '../hooks/useDeviceBudget.js'

/**
 * La cinta que corre por detrás del titular: los clips de la jornada en fila,
 * desplazándose de derecha a izquierda. El track lleva la lista duplicada, así
 * que al recorrer exactamente la mitad el ciclo empalma sin salto visible.
 *
 * En un equipo justo —o con ahorro de datos— la cinta se arma con los
 * fotogramas fijos de los mismos clips. La composición es idéntica y el
 * movimiento sigue ahí; lo que desaparece es el coste de decodificar cinco
 * videos a la vez, que era lo que trababa la página en teléfonos lentos.
 */
export default function VideoStrip({ clips, seconds = 64, className = '' }) {
  const { t } = useLanguage()
  const reduce = useReducedMotion()
  const rich = useDeviceBudget()
  const track = [...clips, ...clips]

  return (
    <div className={`absolute inset-0 overflow-hidden bg-under-950 ${className}`}>
      <div
        className="strip-track flex h-full w-max"
        style={reduce ? undefined : { animation: `strip-run ${seconds}s linear infinite` }}
      >
        {track.map((clip, i) => {
          const first = i < clips.length
          return (
            <div key={`${clip.src}-${i}`} className="relative h-full shrink-0" style={{ aspectRatio: '3 / 4' }}>
              {rich ? (
                <LoopVideo src={clip.src} className="h-full w-full" label={first ? t(clip.alt) : undefined} />
              ) : (
                <img
                  src={loopPoster(clip.src)}
                  alt={first ? t(clip.alt) : ''}
                  aria-hidden={first ? undefined : 'true'}
                  width="420"
                  height="560"
                  loading={i < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              )}
              {/* Una costura tenue entre clips: se lee como tira de contactos. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-px"
                style={{ background: 'color-mix(in oklab, var(--color-under-950) 60%, transparent)' }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
