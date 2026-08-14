import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Loop de fondo: mudo, en bucle y sin controles. Sólo se reproduce mientras
 * está a la vista, así el navegador no decodifica video fuera de pantalla.
 * Con `prefers-reduced-motion` no se descarga nada: queda el póster fijo.
 */
/* Cada loop tiene su primer fotograma como póster: mientras el video baja —o
   si el autoplay queda bloqueado— se ve la toma, nunca un rectángulo negro. */
const AUTO_POSTER = {
  '/media/loop-muelle.mp4': '/img/poster-loop-muelle.webp',
  '/media/loop-sendero.mp4': '/img/poster-loop-sendero.webp',
  '/media/loop-tren.mp4': '/img/poster-loop-tren.webp',
  '/media/loop-serpiente.mp4': '/img/poster-loop-serpiente.webp',
  '/media/loop-charla.mp4': '/img/poster-loop-charla.webp',
}

export function loopPoster(src) {
  return AUTO_POSTER[src]
}

export default function LoopVideo({ src, poster, className = '', videoClassName = '', label }) {
  const still = poster ?? AUTO_POSTER[src]
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return undefined
    }
    // Margen corto a propósito: en la cinta del hero hay clips a los lados que
    // nunca llegan a verse, y con un margen generoso el navegador acababa
    // decodificando varios de más.
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '64px',
      threshold: 0.01,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduce) return
    if (visible) {
      video.play().catch(() => {
        /* si el navegador bloquea el autoplay, el póster se queda */
      })
    } else {
      video.pause()
    }
  }, [visible, reduce])

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      {still && (
        <img
          src={still}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready && !reduce ? 'opacity-0' : 'opacity-100'
          }`}
        />
      )}
      {!reduce && visible && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          aria-hidden={label ? undefined : 'true'}
          disablePictureInPicture
          onCanPlay={() => setReady(true)}
          className={`h-full w-full object-cover ${videoClassName}`}
        />
      )}
    </div>
  )
}
