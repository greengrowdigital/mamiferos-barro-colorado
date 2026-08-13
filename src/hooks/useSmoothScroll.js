import { useEffect } from 'react'
import Lenis from 'lenis'

/* Lenis lleva su propia posición de scroll. Si sólo se llama a
   `window.scrollTo`, la instancia sigue creyendo que está donde estaba y
   devuelve la página al punto anterior. Guardamos la instancia activa para
   poder saltar al tope de verdad al cambiar de ruta. */
let active = null

export function scrollToTop() {
  if (active) {
    active.scrollTo(0, { immediate: true, force: true })
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
}

/**
 * Suaviza el scroll de la página. Sigue siendo scroll nativo, así que
 * `position: sticky`, los anclajes y la barra del navegador no cambian de
 * comportamiento. Con `prefers-reduced-motion` no se activa en absoluto.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return undefined

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 })
    active = lenis

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      if (active === lenis) active = null
    }
  }, [])
}
