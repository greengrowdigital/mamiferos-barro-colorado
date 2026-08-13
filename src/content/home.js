export const heroStrip = [
  { src: '/media/loop-muelle.mp4', alt: { es: 'Pasillo del muelle hacia el bote', en: 'Dock walkway toward the boat' } },
  { src: '/media/loop-sendero.mp4', alt: { es: 'Sendero dentro del bosque', en: 'Trail inside the forest' } },
  { src: '/media/loop-tren.mp4', alt: { es: 'Tren de carga junto al Canal', en: 'Freight train beside the Canal' } },
  { src: '/media/loop-charla.mp4', alt: { es: 'Charla del guía en la estación', en: 'Guide’s talk at the station' } },
  { src: '/media/loop-serpiente.mp4', alt: { es: 'El guardabosque con la equis', en: 'The ranger with the fer-de-lance' } },
]

export const intro = {
  kicker: { es: 'Introducción', en: 'Introduction' },
  heading: {
    es: 'Un bosque tropical no se aprende con un esquema de estratos',
    en: 'A tropical forest cannot be learned from a diagram of layers',
  },
  body: [
    {
      es: 'El 18 de julio de 2026 viajamos a la Isla Barro Colorado, en el lago Gatún, dentro de la cuenca del Canal de Panamá. La salida se organizó como trabajo de campo del curso de Biología. Queríamos observar de cerca la biodiversidad de un bosque tropical húmedo y, sobre todo, su fauna de mamíferos, un tema que hasta entonces habíamos estudiado solo con libros y presentaciones.',
      en: 'On 18 July 2026 we travelled to Barro Colorado Island, in Gatun Lake, inside the Panama Canal watershed. The trip was organised as fieldwork for our Biology course. We wanted to see the biodiversity of a humid tropical forest up close — above all its mammals, a subject we had only studied through books and slides.',
    },
    {
      es: 'La gira se justifica por lo que el salón de clases no alcanza a dar. Un bosque tropical se explica en el aula con esquemas de estratos y listas de especies, pero la altura real de los árboles, el calor, el ruido de los insectos y la dificultad para distinguir un animal en el dosel se aprenden estando ahí.',
      en: 'The trip is justified by what a classroom cannot give. A tropical forest is taught with layer diagrams and species lists, but the real height of the trees, the heat, the noise of the insects and the difficulty of picking out an animal in the canopy are learned by being there.',
    },
    {
      es: 'Barro Colorado es además una estación científica administrada por el Instituto Smithsonian de Investigaciones Tropicales, con laboratorios, dormitorios y personal permanente en la isla. Eso nos permitió observar el ecosistema y también la manera en que se investiga.',
      en: 'Barro Colorado is also a research station run by the Smithsonian Tropical Research Institute, with laboratories, dormitories and permanent staff on the island. That let us observe both the ecosystem and the way it is studied.',
    },
  ],
  photo: {
    src: '/img/dosel-estratos.webp',
    alt: {
      es: 'Copas de los árboles vistas desde el sendero, con el cielo abriéndose entre las ramas altas.',
      en: 'Treetops seen from the trail, with the sky opening between the high branches.',
    },
    caption: {
      es: 'La estratificación que en clase era un esquema, vista a escala real desde el sendero.',
      en: 'The forest stratification that was a diagram in class, seen at real scale from the trail.',
    },
  },
}

export const objectives = {
  kicker: { es: 'Objetivos', en: 'Objectives' },
  general: {
    label: { es: 'Objetivo general', en: 'General objective' },
    text: {
      es: 'Analizar la biodiversidad de la Isla Barro Colorado, con énfasis en su fauna de mamíferos, mediante la observación directa en campo y la información brindada por los guías de la estación.',
      en: 'Analyse the biodiversity of Barro Colorado Island, with emphasis on its mammal fauna, through direct field observation and the information provided by the station guides.',
    },
  },
  specific: {
    label: { es: 'Objetivos específicos', en: 'Specific objectives' },
    /** `met` refleja la evaluación honesta del informe: tres cumplidos, uno a medias. */
    items: [
      {
        text: {
          es: 'Reconocer cómo se formó la isla y por qué terminó convertida en reserva biológica.',
          en: 'Understand how the island was formed and why it became a biological reserve.',
        },
        met: 'full',
      },
      {
        text: {
          es: 'Identificar especies de flora y fauna durante los cuatro kilómetros de sendero, junto con las adaptaciones que presentan al bosque tropical húmedo.',
          en: 'Identify plant and animal species along the four kilometres of trail, together with their adaptations to the humid tropical forest.',
        },
        met: 'partial',
      },
      {
        text: {
          es: 'Describir cómo funciona la estación como centro de investigación y qué proyectos se desarrollan en ella.',
          en: 'Describe how the station works as a research centre and what projects are carried out there.',
        },
        met: 'full',
      },
      {
        text: {
          es: 'Relacionar lo observado en la isla con los contenidos de biología del año lectivo.',
          en: 'Connect what we observed on the island with the year’s biology content.',
        },
        met: 'full',
      },
    ],
  },
  legend: {
    full: { es: 'Cumplido', en: 'Met' },
    partial: { es: 'Cumplido a medias', en: 'Partly met' },
  },
}

export const thesis = {
  quote: {
    es: 'Uno llega esperando ver bastante fauna y termina con una fotografía borrosa y una idea más realista de lo que es el trabajo de campo.',
    en: 'You arrive expecting to see plenty of wildlife and leave with a blurry photograph and a far more realistic idea of what fieldwork is.',
  },
  attribution: { es: 'De las conclusiones del informe', en: 'From the report’s conclusions' },
}
