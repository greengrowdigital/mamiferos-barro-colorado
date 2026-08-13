import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Parallax vertical suave. El elemento se desplaza en sentido contrario al
 * scroll dentro de su propio recorrido, así que nunca deja un hueco visible.
 */
export function Parallax({ children, className, distance = 60, as: Tag = 'div' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const smooth = useSpring(y, { stiffness: 110, damping: 30, restDelta: 0.5 })

  const Motion = motion[Tag] ?? motion.div

  return (
    <Tag ref={ref} className={className}>
      {reduce ? children : <Motion style={{ y: smooth, willChange: 'transform' }}>{children}</Motion>}
    </Tag>
  )
}

/**
 * Un párrafo que se enciende palabra por palabra a medida que se sube por él.
 * Las palabras arrancan atenuadas, nunca invisibles: el texto se puede leer
 * completo aunque el scroll no llegue a recorrerlo.
 */
export function WordsReveal({ text, className, dim = 0.22, style, as: Tag = 'p' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = String(text).split(' ')
  const Motion = motion[Tag] ?? motion.p

  if (reduce) {
    return (
      <Tag ref={ref} className={className} style={style}>
        {text}
      </Tag>
    )
  }

  return (
    <Motion ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1.6) / words.length]}
          dim={dim}
          space={i < words.length - 1}
        >
          {word}
        </Word>
      ))}
    </Motion>
  )
}

/* El espacio va DENTRO del mismo nodo de texto: si se deja como hermano
   entre elementos en línea, el navegador lo colapsa y las palabras se pegan. */
function Word({ children, progress, range, dim, space }) {
  const opacity = useTransform(progress, range, [dim, 1])
  return <motion.span style={{ opacity }}>{space ? `${children} ` : children}</motion.span>
}

/** Una línea que se dibuja de izquierda a derecha al entrar en pantalla. */
export function DrawLine({ className = '', tone = 'light' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className={`block h-px w-full origin-left ${className}`}
      style={{ background: tone === 'dark' ? 'var(--color-under-700)' : 'var(--color-mist-300)' }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.9 }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  )
}

/**
 * Escala una toma mientras se sube por ella: entra ligeramente ampliada y se
 * asienta. Sólo transform, así que no repinta.
 */
export function ScrollZoom({ children, className, from = 1.12 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const scale = useTransform(scrollYProgress, [0, 1], [from, 1])
  const smooth = useSpring(scale, { stiffness: 120, damping: 32, restDelta: 0.001 })

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`.trim()}>
      {reduce ? children : <motion.div style={{ scale: smooth, willChange: 'transform' }}>{children}</motion.div>}
    </div>
  )
}

/**
 * Cifra que cuenta al entrar en pantalla. La cifra es un dato del informe, así
 * que nunca puede quedarse en cero: si no hay observador, si el movimiento está
 * reducido o si en dos segundos no ha entrado en vista, se escribe el valor real.
 */
export function CountUp({ value, duration = 1500, className, prefix = '', suffix = '', locale = 'es-PA' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [shown, setShown] = useState(() => (reduce ? value : 0))

  useEffect(() => {
    if (reduce) {
      setShown(value)
      return undefined
    }

    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(value)
      return undefined
    }

    let frame = 0
    let start = null
    const run = () => {
      const tick = (now) => {
        if (start === null) start = now
        const p = Math.min((now - start) / duration, 1)
        setShown(Math.round(value * (1 - Math.pow(1 - p, 4)))) // ease-out-quart
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          run()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)

    const failsafe = window.setTimeout(() => {
      observer.disconnect()
      setShown(value)
    }, 2000)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.clearTimeout(failsafe)
    }
  }, [value, duration, reduce])

  return (
    <span ref={ref} className={`tabular ${className ?? ''}`.trim()}>
      {prefix}
      {new Intl.NumberFormat(locale).format(shown)}
      {suffix}
    </span>
  )
}
