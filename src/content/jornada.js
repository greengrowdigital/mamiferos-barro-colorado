export const jornadaIntro = {
  kicker: { es: 'Descripción de la gira', en: 'The trip' },
  heading: { es: 'Ocho horas', en: 'Eight hours' },
  lede: {
    es: 'Salimos del colegio a las 6:30 de la mañana y a las 8:00 estábamos embarcando en Gamboa. El regreso empezó cerca de las 2:00 de la tarde, de modo que la jornada completa tomó unas ocho horas.',
    en: 'We left school at 6:30 in the morning and by 8:00 we were boarding at Gamboa. The return began around 2:00 in the afternoon, so the whole day took about eight hours.',
  },
}

/** La jornada hora por hora. Los tiempos vienen del informe; los que no
 *  estaban fechados van sin hora en vez de inventarse. */
export const schedule = [
  {
    time: '6:30',
    title: { es: 'Salida del colegio', en: 'Departure from school' },
    body: {
      es: 'Trece estudiantes de duodécimo grado y dos docentes, el profesor Diego Hill y el profesor Edwin Loaiza.',
      en: 'Thirteen twelfth-grade students and two teachers, Prof. Diego Hill and Prof. Edwin Loaiza.',
    },
    media: null,
  },
  {
    time: '7:30',
    title: { es: 'Llegando a Gamboa', en: 'Arriving at Gamboa' },
    body: {
      es: 'La espera junto a la vía mientras pasa un tren de carga del ferrocarril del Canal, a un paso del muelle donde íbamos a embarcar.',
      en: 'Waiting by the tracks while a Canal Railway freight train goes past, a step away from the dock where we would board.',
    },
    media: { type: 'video', src: '/media/loop-tren.mp4' },
  },
  {
    time: '8:00',
    title: { es: 'Embarque en Gamboa', en: 'Boarding at Gamboa' },
    body: {
      es: 'La isla solo se alcanza por agua. Bajamos por el pasillo del muelle hasta la lancha, nos repartieron los salvavidas y cruzamos el lago Gatún hasta la estación.',
      en: 'The island can only be reached by water. We walked down the dock passageway to the boat, were handed life jackets and crossed Gatun Lake to the station.',
    },
    media: { type: 'video', src: '/media/embarque-lancha.mp4', poster: '/img/poster-embarque.webp', sound: true },
  },
  {
    time: null,
    title: { es: 'La equis, apenas llegamos', en: 'The fer-de-lance, right on arrival' },
    body: {
      es: 'Un guardabosque nos mostró una serpiente venenosa que había localizado esa mañana, conocida en Panamá como equis. La observamos a distancia y bajo su supervisión.',
      en: 'A ranger showed us a venomous snake he had found that morning, known in Panama as the equis. We watched it from a distance and under his supervision.',
    },
    media: { type: 'video', src: '/media/serpiente-equis.mp4', poster: '/img/poster-serpiente.webp', sound: true },
  },
  {
    time: null,
    title: { es: 'Charlas en el centro de visitantes', en: 'Talks at the visitor centre' },
    body: {
      es: 'El personal nos explicó la historia de la isla y el origen del edificio, y siguió una charla sobre la biodiversidad del lugar. Antes de entrar al bosque nos repartieron repelente y nos dieron las recomendaciones de seguridad.',
      en: 'The staff explained the island’s history and the origin of the building, followed by a talk on local biodiversity. Before entering the forest they handed out repellent and gave us the safety guidance.',
    },
    media: { type: 'image', src: '/img/panel-isla.webp' },
  },
  {
    time: null,
    title: { es: 'Cuatro kilómetros de sendero', en: 'Four kilometres of trail' },
    body: {
      es: 'Nos dividimos en dos subgrupos, cada uno con su guía, y ambos recorrimos los cuatro kilómetros. El sendero mezcla tramos acondicionados con bajadas rocosas donde hay que apoyarse en una cuerda guía.',
      en: 'We split into two subgroups, each with its own guide, and both walked the four kilometres. The trail mixes built-up stretches with rocky descents where you have to hold on to a guide rope.',
    },
    media: { type: 'video', src: '/media/loop-sendero.mp4' },
  },
  {
    time: '14:00',
    title: { es: 'Regreso a Gamboa', en: 'Back to Gamboa' },
    body: {
      es: 'Al volver del sendero nos ampliaron la información sobre las investigaciones que se desarrollan en la isla. Almorzamos y cruzamos otra vez el lago, de la isla de regreso al muelle de Gamboa.',
      en: 'Back from the trail they expanded on the research carried out on the island. We had lunch and crossed the lake again, from the island back to the Gamboa dock.',
    },
    media: null,
  },
]

export const places = {
  heading: { es: 'Cuatro lugares dentro de la isla', en: 'Four places on the island' },
  body: {
    es: 'El centro de visitantes fue el primero, y ahí recibimos las charlas. De ese mismo punto arrancaba el sendero de cuatro kilómetros. También subimos al antiguo centro de visitantes, una estructura en forma de torre sobre una colina, y pasamos por la cafetería y el auditorio.',
    en: 'The visitor centre came first, and that is where we had the talks. The four-kilometre trail started from that same point. We also climbed to the old visitor centre, a tower-shaped structure on a hill, and passed through the cafeteria and the auditorium.',
  },
  items: [
    { es: 'Centro de visitantes', en: 'Visitor centre' },
    { es: 'Sendero de 4 km', en: '4 km trail' },
    { es: 'Antiguo centro de visitantes', en: 'Old visitor centre' },
    { es: 'Cafetería y auditorio', en: 'Cafeteria and auditorium' },
  ],
}

export const party = {
  heading: { es: 'Quiénes fuimos', en: 'Who went' },
  rows: [
    { label: { es: 'Estudiantes', en: 'Students' }, value: 13 },
    { label: { es: 'Docentes del colegio', en: 'Teachers from school' }, value: 2 },
    { label: { es: 'Guías de la estación', en: 'Station guides' }, value: 3 },
    { label: { es: 'Subgrupos en el sendero', en: 'Subgroups on the trail' }, value: 2 },
  ],
  note: {
    es: 'Dividirnos en dos subgrupos resultó acertado: trece personas caminando en bloque habrían reducido cualquier posibilidad de avistamiento y habría sido difícil escuchar al guía.',
    en: 'Splitting into two subgroups was the right call: thirteen people walking as one block would have killed any chance of a sighting and made the guide hard to hear.',
  },
  photo: {
    src: '/img/fig-08-pausa-grupo.webp',
    alt: {
      es: 'Estudiantes y docentes sentados durante una pausa del recorrido, acompañados por el guía de la estación.',
      en: 'Students and teachers seated during a break on the trail, with the station guide.',
    },
    caption: {
      es: 'Figura 8. Pausa en el recorrido, con el guía de la estación.',
      en: 'Figure 8. A break on the trail, with the station guide.',
    },
  },
}
