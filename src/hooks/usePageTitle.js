import { useEffect } from 'react'

/** Mantiene el título del documento sincronizado con la ruta y el idioma. */
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
