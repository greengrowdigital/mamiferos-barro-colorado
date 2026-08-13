import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Decide si la barra superior debe pintarse clara u oscura, según la banda que
 * queda justo debajo de ella. Las secciones se marcan con `data-nav-theme`.
 * Se mide contra la línea del header en cada scroll, en lugar de usar
 * IntersectionObserver, porque lo que importa es un único punto de la pantalla.
 */
export default function useNavTheme() {
  const [theme, setTheme] = useState('light')
  const { pathname } = useLocation()

  useEffect(() => {
    let frame = 0

    const read = () => {
      frame = 0
      const marks = document.querySelectorAll('[data-nav-theme]')
      if (!marks.length) {
        setTheme('light')
        return
      }
      const line = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) * 16 || 68
      let current = 'light'
      for (const mark of marks) {
        const rect = mark.getBoundingClientRect()
        if (rect.top <= line && rect.bottom > line) current = mark.dataset.navTheme
      }
      setTheme(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  return theme
}
