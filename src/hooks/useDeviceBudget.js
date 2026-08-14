import { useEffect, useState } from 'react'

/**
 * Estima si el equipo puede permitirse el video de fondo. Decodificar cinco
 * clips a la vez es lo más caro de esta página; en un teléfono de gama baja o
 * con datos limitados no compensa. Cuando el presupuesto es corto, la cinta del
 * hero muestra los fotogramas fijos: se ve lo mismo, sin decodificar nada.
 *
 * No degrada nada en un equipo capaz: la comprobación sólo mira hacia abajo.
 */
export default function useDeviceBudget() {
  const [rich, setRich] = useState(true)

  useEffect(() => {
    const nav = navigator

    const saveData = nav.connection?.saveData === true
    const slowLink = /(^|-)2g$/.test(nav.connection?.effectiveType ?? '')
    const fewCores = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4
    const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4

    setRich(!(saveData || slowLink || fewCores || lowMemory))
  }, [])

  return rich
}
