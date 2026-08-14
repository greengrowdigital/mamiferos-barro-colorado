import { lazy, Suspense, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'
import useSmoothScroll, { scrollToTop } from './hooks/useSmoothScroll.js'

/* La portada viaja en el paquete inicial porque es la primera que se abre. El
   resto se pide al entrar en cada ruta: en un equipo lento, descargar y
   compilar el JavaScript de las seis páginas de golpe retrasa el primer
   pintado sin que nadie lo aproveche. */
const Jornada = lazy(() => import('./pages/Jornada.jsx'))
const Mamiferos = lazy(() => import('./pages/Mamiferos.jsx'))
const Aprendizajes = lazy(() => import('./pages/Aprendizajes.jsx'))
const Anexos = lazy(() => import('./pages/Anexos.jsx'))
const Referencias = lazy(() => import('./pages/Referencias.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

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

/* Hueco del alto de la ventana mientras llega el trozo de la ruta: evita que el
   pie salte hasta arriba durante el instante de carga. */
function RouteFallback() {
  return <div className="min-h-svh" aria-hidden="true" />
}

export default function App() {
  useSmoothScroll()

  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/la-jornada" element={<Jornada />} />
          <Route path="/mamiferos" element={<Mamiferos />} />
          <Route path="/aprendizajes" element={<Aprendizajes />} />
          <Route path="/anexos" element={<Anexos />} />
          <Route path="/referencias" element={<Referencias />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <SiteFooter />
    </>
  )
}
