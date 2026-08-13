const STOPS = {
  'mist-under': ['var(--color-mist-50)', 'oklch(0.55 0.03 120)', 'var(--color-under-950)'],
  'under-mist': ['var(--color-under-950)', 'oklch(0.55 0.03 120)', 'var(--color-mist-50)'],
  'mist-dawn': ['var(--color-mist-50)', 'oklch(0.5 0.06 300)', 'var(--color-dawn-950)'],
  'dawn-mist': ['var(--color-dawn-950)', 'oklch(0.5 0.06 300)', 'var(--color-mist-50)'],
  'under-dawn': ['var(--color-under-950)', 'oklch(0.24 0.05 210)', 'var(--color-dawn-950)'],
}

/**
 * La costura entre dos bandas de color. En lugar de un corte seco, el fondo
 * atraviesa un tono intermedio: al hacer scroll se lee como si la luz del día
 * fuera cambiando. Puramente decorativa.
 */
export default function Band({ from = 'mist', to = 'under', height = '18vh' }) {
  const key = `${from}-${to}`
  const stops = STOPS[key] ?? STOPS['mist-under']

  return (
    <div
      aria-hidden="true"
      className="relative w-full"
      style={{
        height,
        minHeight: '7rem',
        background: `linear-gradient(to bottom, ${stops[0]} 0%, ${stops[1]} 58%, ${stops[2]} 100%)`,
      }}
    />
  )
}
