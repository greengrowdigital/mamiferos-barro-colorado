import { useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'
import Jornada from './pages/Jornada.jsx'
import Mamiferos from './pages/Mamiferos.jsx'
import Aprendizajes from './pages/Aprendizajes.jsx'
import Anexos from './pages/Anexos.jsx'
import Referencias from './pages/Referencias.jsx'
import NotFound from './pages/NotFound.jsx'
import useSmoothScroll, { scrollToTop } from './hooks/useSmoothScroll.js'

/** Cada ruta empieza arriba; los anclajes internos conservan su destino. */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) return
    scrollToTop()
    // Segunda pasada tras el primer fotograma: la página nueva puede seguir
    // midiendo su altura cuando llega la primera.
    const id = requestAnimationFrame(scrollToTop)
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  return null
}

export default function App() {
  useSmoothScroll()

  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/la-jornada" element={<Jornada />} />
        <Route path="/mamiferos" element={<Mamiferos />} />
        <Route path="/aprendizajes" element={<Aprendizajes />} />
        <Route path="/anexos" element={<Anexos />} />
        <Route path="/referencias" element={<Referencias />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
    </>
  )
}
