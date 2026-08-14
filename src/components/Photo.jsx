/** Proporción de cada foto, para reservar el hueco antes de que cargue. */
const LANDSCAPE = new Set(['panel-isla'])
const CUSTOM = {
  'fig-01-mono-dosel': [926, 1600],
  'poster-avistamiento': [1000, 1778],
  'poster-serpiente': [620, 832],
  'poster-muelle': [620, 822],
}
const NARROW = new Set([
  'dosel-estratos', 'arbol-raices', 'arbol-tabular', 'sendero-bosque', 'hojas-luz', 'termitero',
  'tronco-hueco', 'equipo-investigacion', 'insecto-mano', 'hojarasca', 'bosque-alto', 'lianas', 'sendero-cielo',
])

export function photoSize(src) {
  const base = src.replace(/^\/img\//, '').replace(/-sm\.webp$/, '').replace(/\.webp$/, '')
  if (CUSTOM[base]) return CUSTOM[base]
  if (LANDSCAPE.has(base)) return [1600, 1200]
  if (NARROW.has(base)) return [960, 1280]
  return [1200, 1600]
}

/* De cada foto existen dos ficheros: el grande (lado mayor 1600) y uno de 720.
   Declararlos como srcset deja que el navegador baje el pequeño en un teléfono
   —menos bytes y, sobre todo, mucha menos decodificación— sin que nadie pierda
   nitidez en una pantalla grande. Los pósters de video ya son pequeños. */
function buildSrcSet(src) {
  if (src.includes('-sm.webp') || src.includes('poster-')) return undefined
  const small = src.replace(/\.webp$/, '-sm.webp')
  const [w] = photoSize(src)
  const smallW = Math.round((720 / Math.max(w, photoSize(src)[1])) * w)
  return `${small} ${smallW}w, ${src} ${w}w`
}

export default function Photo({ src, alt, className = '', priority = false, sizes, objectPosition }) {
  const [w, h] = photoSize(src)

  return (
    <img
      src={src}
      srcSet={buildSrcSet(src)}
      alt={alt}
      width={w}
      height={h}
      sizes={sizes ?? '100vw'}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
      style={objectPosition ? { objectPosition } : undefined}
    />
  )
}

/** Foto con pie de figura. `tone` ajusta el color del pie según la banda. */
export function Figure({ src, alt, caption, className = '', imgClassName = '', priority = false, sizes, tone = 'light' }) {
  return (
    <figure className={`m-0 ${className}`.trim()}>
      <div className={`overflow-hidden rounded-[3px] ${tone === 'dark' ? 'bg-under-900' : 'bg-mist-200'}`}>
        <Photo src={src} alt={alt} priority={priority} sizes={sizes} className={imgClassName} />
      </div>
      {caption && (
        <figcaption
          className={`mt-3 max-w-[52ch] text-[0.85rem] leading-relaxed ${
            tone === 'dark' ? 'text-haze-400' : 'text-ink-500'
          }`}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
