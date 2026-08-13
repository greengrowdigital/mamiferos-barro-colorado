export const mamiferosIntro = {
  kicker: { es: 'El tema', en: 'The subject' },
  heading: { es: 'Fuimos por los mamíferos', en: 'We went for the mammals' },
  lede: {
    es: 'Ese era el énfasis del objetivo general y la razón por la que este informe existe. En cuatro kilómetros de sendero avistamos una sola especie.',
    en: 'That was the emphasis of our general objective and the reason this report exists. In four kilometres of trail we spotted a single species.',
  },
}

/** El dato central del trabajo, sin maquillar. */
export const tally = {
  label: { es: 'Registro del recorrido', en: 'Record of the walk' },
  rows: [
    { group: { es: 'Mamíferos', en: 'Mammals' }, value: 1, detail: { es: 'Mono aullador', en: 'Howler monkey' }, highlight: true },
    { group: { es: 'Reptiles', en: 'Reptiles' }, value: 2, detail: { es: 'Serpiente equis · lagartija Anolis', en: 'Fer-de-lance · Anolis lizard' } },
    { group: { es: 'Insectos', en: 'Insects' }, value: 1, detail: { es: 'Cigarra', en: 'Cicada' } },
  ],
  distance: { value: 4, unit: 'km', label: { es: 'de sendero recorrido', en: 'of trail walked' } },
}

/**
 * Fauna de mamíferos característica de Barro Colorado, contrastada con lo que
 * realmente registramos. La lista describe especies que la isla alberga —no un
 * censo del recorrido—, y por eso el estado se marca en cada fila.
 */
export const checklist = {
  heading: { es: 'Lo que la isla tiene y lo que vimos', en: 'What the island has and what we saw' },
  body: {
    es: 'Barro Colorado alberga una fauna de mamíferos bien documentada. Marcamos aquí cuáles alcanzamos a registrar durante nuestros cuatro kilómetros de sendero. La lista corresponde a especies características de la isla, no a un censo del recorrido.',
    en: 'Barro Colorado is home to a well-documented mammal fauna. Here we mark which ones we managed to record during our four kilometres of trail. The list covers species characteristic of the island, not a census of our walk.',
  },
  status: {
    seen: { es: 'Avistado', en: 'Seen' },
    unseen: { es: 'No avistado', en: 'Not seen' },
  },
  items: [
    {
      name: { es: 'Mono aullador', en: 'Howler monkey' },
      latin: 'Alouatta palliata',
      seen: true,
      note: { es: 'En el dosel, a distancia. El único.', en: 'In the canopy, at a distance. The only one.' },
    },
    { name: { es: 'Mono cariblanco', en: 'White-faced capuchin' }, latin: 'Cebus imitator', seen: false },
    { name: { es: 'Tamarino de Geoffroy', en: 'Geoffroy’s tamarin' }, latin: 'Saguinus geoffroyi', seen: false },
    { name: { es: 'Coatí', en: 'Coati' }, latin: 'Nasua narica', seen: false },
    { name: { es: 'Ñeque o agutí', en: 'Agouti' }, latin: 'Dasyprocta punctata', seen: false },
    { name: { es: 'Perezoso de tres dedos', en: 'Three-toed sloth' }, latin: 'Bradypus variegatus', seen: false },
    { name: { es: 'Saíno o pecarí de collar', en: 'Collared peccary' }, latin: 'Pecari tajacu', seen: false },
    { name: { es: 'Ocelote', en: 'Ocelot' }, latin: 'Leopardus pardalis', seen: false },
    { name: { es: 'Murciélagos', en: 'Bats' }, latin: 'Chiroptera', seen: false },
  ],
  footnote: {
    es: 'Especies características de la Isla Barro Colorado según el Instituto Smithsonian de Investigaciones Tropicales. Que no aparezcan en nuestro registro no significa que no estuvieran: significa que no las vimos.',
    en: 'Species characteristic of Barro Colorado Island according to the Smithsonian Tropical Research Institute. Their absence from our record does not mean they were not there — it means we did not see them.',
  },
}

export const sighting = {
  kicker: { es: 'Figura 1', en: 'Figure 1' },
  heading: { es: 'El avistamiento', en: 'The sighting' },
  body: [
    {
      es: 'Sobre la fauna, el mejor avistamiento fue el del mono aullador en el dosel. Está en la parte superior izquierda de la imagen: la figura oscura sobre la rama.',
      en: 'Of all the wildlife, the best sighting was the howler monkey in the canopy. It is in the upper left of the image: the dark shape on the branch.',
    },
    {
      es: 'La distancia y la altura a la que se encontraba el animal explican la baja resolución de la fotografía. Verlo dentro del bosque también nos ayudó a notar que gran parte de la fauna está sobre nosotros, en el dosel, y no a nivel del sendero.',
      en: 'The distance and the height at which the animal sat explain the low resolution of the photograph. Seeing it inside the forest also made us notice how much of the wildlife is above us, in the canopy, and not at trail level.',
    },
  ],
  video: {
    src: '/media/avistamiento-mono.mp4',
    poster: '/img/poster-avistamiento.webp',
  },
  photo: {
    src: '/img/fig-01-mono-dosel.webp',
    alt: {
      es: 'Dosel del bosque con una figura oscura sobre una rama en la parte superior izquierda: el mono aullador.',
      en: 'Forest canopy with a dark shape on a branch in the upper left: the howler monkey.',
    },
    caption: {
      es: 'Figura 1. Mono aullador observado en el dosel del bosque durante el recorrido por el sendero.',
      en: 'Figure 1. Howler monkey observed in the forest canopy during the walk along the trail.',
    },
  },
}

export const others = {
  heading: { es: 'Lo demás que sí apareció', en: 'What did turn up' },
  body: {
    es: 'Los demás registros correspondieron a otros grupos. No son mamíferos, pero forman parte de lo que el bosque decidió mostrarnos ese día.',
    en: 'The remaining records belonged to other groups. They are not mammals, but they are part of what the forest chose to show us that day.',
  },
  items: [
    {
      figure: 2,
      name: { es: 'Lagartija del género Anolis', en: 'Anolis lizard' },
      where: { es: 'Áreas comunes de la estación', en: 'Common areas of the station' },
      note: {
        es: 'El ejemplar, de color verde, se encuentra sobre la superficie de la tubería, en el centro de la imagen.',
        en: 'The specimen, bright green, sits on the surface of the pipe, at the centre of the image.',
      },
      src: '/img/fig-02-anolis-tuberia.webp',
    },
    {
      figure: 6,
      name: { es: 'Cigarra', en: 'Cicada' },
      where: { es: 'Borde de una escalinata del sendero', en: 'Edge of a stairway on the trail' },
      note: {
        es: 'Posada sobre el borde de una escalinata, a la vista de todo el grupo.',
        en: 'Perched on the edge of a stairway, in plain view of the whole group.',
      },
      src: '/img/fig-06-cigarra-escalinata.webp',
    },
    {
      figure: null,
      name: { es: 'Serpiente equis', en: 'Fer-de-lance' },
      where: { es: 'Antes de entrar al sendero', en: 'Before entering the trail' },
      note: {
        es: 'Localizada esa mañana por un guardabosque. La observamos a distancia y bajo su supervisión.',
        en: 'Found that morning by a ranger. We watched it from a distance and under his supervision.',
      },
      src: '/img/poster-serpiente.webp',
    },
    {
      figure: 4,
      name: { es: 'Colección de referencia', en: 'Reference collection' },
      where: { es: 'Centro de visitantes', en: 'Visitor centre' },
      note: {
        es: 'Cráneos de cocodrilo y de otros vertebrados. Sirvió para examinar de cerca estructuras óseas imposibles de apreciar en campo.',
        en: 'Crocodile and other vertebrate skulls. Useful for examining bone structures impossible to see in the field.',
      },
      src: '/img/fig-04-craneos-coleccion.webp',
    },
  ],
}

export const why = {
  heading: { es: 'Por qué vimos tan poco', en: 'Why we saw so little' },
  body: {
    es: 'Esto depende de factores que no estaban en nuestras manos: la hora del recorrido, el ruido de un grupo de trece personas y el movimiento dentro del bosque. La altura a la que estaba el animal también arruinó la fotografía.',
    en: 'This depends on factors outside our control: the time of the walk, the noise of a group of thirteen, and movement inside the forest. The height of the animal also ruined the photograph.',
  },
  factors: [
    {
      title: { es: 'La hora', en: 'The hour' },
      note: {
        es: 'Entramos al sendero ya avanzada la mañana, cuando los mamíferos están menos activos.',
        en: 'We entered the trail late in the morning, when mammals are less active.',
      },
    },
    {
      title: { es: 'El ruido', en: 'The noise' },
      note: {
        es: 'Trece personas caminando hacen más ruido del que un animal tolera cerca.',
        en: 'Thirteen people walking make more noise than an animal will tolerate nearby.',
      },
    },
    {
      title: { es: 'La altura', en: 'The height' },
      note: {
        es: 'Casi todos los avistamientos ocurren a distancia y en el dosel, fuera del alcance de un teléfono.',
        en: 'Almost every sighting happens at a distance and in the canopy, out of a phone’s reach.',
      },
    },
  ],
  lesson: {
    es: 'El avistamiento de mamíferos quedó corto y esa también fue una lección. Los animales aparecen cuando quieren, y los investigadores de la estación trabajan con esa incertidumbre todos los días.',
    en: 'The mammal sightings fell short, and that was a lesson too. Animals appear when they want to, and the station’s researchers work with that uncertainty every single day.',
  },
}
