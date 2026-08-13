# Un mono aullador

Informe de la gira académica a la **Isla Barro Colorado** del 18 de julio de 2026, presentado al Departamento de Español de IC International School.

Cuatro kilómetros de sendero buscando mamíferos. Vimos uno, a distancia y borroso. El sitio cuenta esa jornada tal como pasó, incluida la parte en que el bosque no colabora.

**Integrantes:** Brooks, Emmanuel · Flores, Gael · Ng, Sofía · Torres, Isaías · Villarreal, Rubén
**Docentes responsables:** Prof. Diego Hill · Prof. Edwin Loaiza
**Profesora consejera:** Omaira Concepción

## Secciones

| Ruta | Contenido |
| --- | --- |
| `/` | Introducción, objetivos y la frase que resume el trabajo |
| `/la-jornada` | La jornada hora por hora, de 6:30 a 14:00, con los cuatro lugares y quiénes fuimos |
| `/mamiferos` | El registro del recorrido, la lista de avistados y no avistados, el mono aullador y por qué vimos tan poco |
| `/aprendizajes` | Observaciones académicas, culturales y organizativas; evaluación y conclusiones |
| `/anexos` | Las nueve figuras del informe, el video de la jornada y la galería |
| `/referencias` | Fuente en APA 7 y créditos |

Bilingüe español / inglés, con el idioma guardado en `localStorage`.

## Stack

- Vite + React 19
- Tailwind CSS v4 (configuración en CSS, `src/styles/index.css`)
- React Router DOM
- Framer Motion para el hero, los reveals y el visor
- Lenis para el scroll suave (desactivado con `prefers-reduced-motion`)

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # compila a dist/
npm run preview  # sirve la compilación
```

## Notas de diseño

**El hero.** Las palabras BARRO COLORADO están recortadas por una máscara SVG sobre un rectángulo del color del fondo, y por detrás corre una cinta con los clips de la jornada: el video se ve *a través* de las letras. Al bajar, el negativo se retira, la cinta queda a pantalla completa y cae la sombra del sotobosque hasta dejar el título. `textLength` fija el ancho de cada línea, así que el bloque encaja igual en un teléfono que en un monitor ancho.

**La paleta** recorre la luz de ese día: salimos con el cielo todavía índigo, embarcamos con la neblina sobre el lago, caminamos bajo un dosel donde casi no entra el sol. El sitio es claro por defecto —la neblina— y cae en bandas oscuras cada vez que el relato entra al bosque. El acento es ámbar: la luz de las ocho sobre el agua de Gatún.

**Tipografía:** Archivo (titulares y el wordmark), Petrona (lectura), Martian Mono (horas y datos).

**Motion.** Toda animación tiene alternativa para `prefers-reduced-motion`. Ninguna sección depende de una animación para ser visible: los reveals arrancan visibles y sólo se ocultan si el elemento está bajo el pliegue y el navegador puede observarlo, con red de seguridad por tiempo. Las cifras nunca se quedan en cero, porque son datos del informe.

## Material

Las fotografías y los videos son del grupo, tomados durante la gira. Los videos se recortaron y comprimieron para web; los originales no están en el repositorio. La información sobre la estación proviene de las charlas de los guías del Instituto Smithsonian de Investigaciones Tropicales y de la rotulación del lugar.
