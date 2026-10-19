/* =====================================================================
   DATOS DEL PORTAFOLIO
   Este es el único archivo que necesitas editar para cambiar textos,
   agregar imágenes o completar información de cada proyecto.

   Reglas:
   - Si un campo de texto está vacío ("") o en null, no se muestra.
   - Si una imagen tiene src vacío, se muestra un espacio marcado con
     el nombre de archivo sugerido. Copia tu imagen a esa ruta y escribe
     la ruta en src.
   - publicado: false oculta el proyecto al público. Para verlo, abre
     el sitio con  ?borrador  al final de la dirección.
   - Abre el sitio con  ?pendientes  para ver todo lo que falta.
   ===================================================================== */

window.PERFIL = {
  nombre: "Andres Ortiz",
  rol: "Diseñador gráfico y creador de contenido para redes sociales",
  correo: "ortizjuanandres787@gmail.com",
  telefono: "+527711837883",
  telefonoVisible: "771 183 7883",
  // Ruta de tu foto para la portada, por ejemplo "assets/perfil/andres.webp"
  foto: "",
  ubicacion: "Pachuca, Hidalgo",
  // Enlace a tu CV en PDF, por ejemplo "assets/perfil/cv-andres-ortiz.pdf"
  cv: "",
  redes: {
    instagram: "",
    behance: "",
    linkedin: ""
  },
  herramientas: [
    { nombre: "Illustrator" },
    { nombre: "Photoshop" },
    { nombre: "Affinity" },
    { nombre: "Lightroom" },
    { nombre: "Canva" },
    { nombre: "Premiere Pro", nivel: "Conocimientos básicos" },
    { nombre: "CapCut" }
  ],
  habilidades: [
    {
      grupo: "Diseño y contenido",
      lista: [
        "Diseño de publicaciones e historias",
        "Parrillas de contenido",
        "Redacción de copies",
        "Identidad visual",
        "Materiales de marketing digital"
      ]
    },
    {
      grupo: "Foto y video",
      lista: [
        "Fotografía",
        "Cobertura fotográfica",
        "Grabación de video con cámara fija y móvil",
        "Edición de video para Reels",
        "Operación de cámaras para transmisiones en vivo"
      ]
    },
    {
      grupo: "Redes y campañas",
      lista: [
        "Campañas en Facebook Ads",
        "Programación de publicaciones",
        "Atención de mensajes y comentarios",
        "Registro y seguimiento de cotizaciones"
      ]
    }
  ]
};

window.FORMACION = [
  {
    titulo: "Licenciatura en Comunicación",
    lugar: "Universidad Autónoma del Estado de Hidalgo (UAEH)",
    periodo: "Julio 2020 a diciembre 2024",
    estado: "En proceso de titulación"
  }
];

/* Experiencia, de la más reciente a la más antigua.
   tipo: texto corto que aparece como etiqueta (Empleo, Prácticas...). */
window.EXPERIENCIA = [
  {
    puesto: "Community Manager",
    empresa: "Grupo Refaccionario Moncar",
    periodo: "Marzo 2026 a la fecha",
    tipo: "Empleo actual",
    proyecto: "moncar",
    tareas: [
      "Creo publicaciones e historias para cinco refaccionarias.",
      "Grabo material de stock y edito videos para Facebook Reels.",
      "Atiendo mensajes, comentarios y cotizaciones por WhatsApp.",
      "Registro y centralizo las cotizaciones que llegan por WhatsApp y Facebook.",
      "Desarrollo campañas publicitarias en Facebook Ads.",
      "Desarrollé una aplicación web para centralizar y consultar estadísticas y métricas en distintos apartados."
    ]
  },
  {
    puesto: "Diseñador gráfico y community manager",
    empresa: "Ink House Diseño y Publicidad",
    periodo: "Enero 2025 a febrero 2026",
    tipo: "Empleo",
    proyecto: "ink-house",
    tareas: [
      "Planeé parrillas de contenido para las cuentas de la agencia y de sus clientes.",
      "Edité videos para redes sociales y programé las publicaciones.",
      "Redacté copies para publicaciones.",
      "Diseñé materiales de marketing: tarjetas, flyers, logotipos e invitaciones digitales.",
      "Desarrollé manuales de identidad corporativa para clientes."
    ]
  },
  {
    puesto: "Community manager",
    empresa: "Fundación Hidalguense AC",
    periodo: "Enero a junio 2024",
    tipo: "Prácticas profesionales",
    tareas: [
      "Creé y publiqué contenido para redes sociales.",
      "Produje y edité cápsulas informativas y entrevistas con especialistas.",
      "Administré las redes y atendí mensajes y comentarios."
    ]
  },
  {
    puesto: "Diseñador gráfico y community manager",
    empresa: "Editorial Elementum",
    periodo: "Julio 2023 a enero 2024",
    tipo: "Servicio social",
    tareas: [
      "Desarrollé y publiqué contenido digital para redes sociales.",
      "Produje y edité videos para promocionar eventos y productos.",
      "Creé y ejecuté campañas publicitarias para el lanzamiento de libros nuevos y la promoción del catálogo.",
      "Planeé y organicé eventos con autores.",
      "Di seguimiento a métricas de redes sociales: alcance, seguidores y engagement."
    ]
  }
];

/* Tipos de relación. Sirven para que nadie confunda un ejercicio
   personal con un cliente. */
window.RELACIONES = {
  profesional: "Trabajo profesional",
  agencia: "Cliente de Ink House",
  cliente: "Proyecto para cliente",
  colaboracion: "Colaboración",
  evento: "Pieza para evento",
  conceptual: "Proyecto conceptual",
  personal: "Ejercicio personal",
  pendiente: ""
};

window.FILTROS = [
  { id: "todos", nombre: "Todos" },
  { id: "redes", nombre: "Redes sociales" },
  { id: "publicidad", nombre: "Publicidad y campañas" },
  { id: "video", nombre: "Video" },
  { id: "identidad", nombre: "Identidad visual" },
  { id: "personal", nombre: "Personal" }
];

/* Cada proyecto:
   publicado: false lo oculta al público (se ve con ?borrador).
   tono: color de la portada tipográfica (cobalto, tinta, cielo, papel, sol)
   portada: imagen de la tarjeta. Si está vacía se usa la portada tipográfica.
   agencia: slug del proyecto de la agencia donde se hizo (ej. "ink-house").
   relacionados: slugs de proyectos que se enlazan dentro del caso.
   secciones: bloques de piezas que aparecen dentro del caso.
   vistazo: hasta 3 imágenes que se asoman en la tarjeta al pasar el cursor.
   cuenta: { nombre, iniciales, color } para los marcos de Instagram.
   formato de pieza: "cuadrado", "vertical", "horizontal", "ancho", "historia"
   tipo de pieza: "imagen" (por defecto) o "video"
   paleta: "ink", "blef" o "barber" (colores del caso en claro y oscuro, en estilos.css).
   portadaEstilo: "columnas" cambia el collage de la portada del caso por dos columnas
   de publicaciones en movimiento. tituloFirma: parte final del título en manuscrita.
   cinta: textos que corren en una franja bajo la portada del caso.
   collage: hasta 4 publicaciones que acompañan a la portada en el caso.
   portadaEstilo: "pantalla" muestra video: { src, poster, etiqueta, duracion }
   enmarcado en la portada del caso. Una sección puede usar columnas: 2.
   acento: color del proyecto si no tiene paleta. estiloTitulos: "contorno", "marcador" o "firma".
   aclaracion: nota breve bajo el resumen del caso.
   contexto, objetivo y participacion (Mi aportación) aparecen en la portada del caso.
   solucion y decisiones: [{ titulo, texto }] forman la sección "Decisiones de diseño".
   Historias: sticker: { texto, x, y, w } agrega un sticker de preguntas sobre la
   historia; x e y son el centro en % de la historia, w su ancho en % y escala (opcional) lo reduce.
   Cada pieza: titulo (lo que se ve en el visor), alt y desc opcional; si no hay desc,
   el visor usa la nota de su sección o la desc de su carrusel.
   tipo de sección (ver assets/js/presentaciones.js):
     "feed", "escenario" (admite capitulos: [...]), "abanico", "historias",
     "vitrina" (una publicación al frente y el índice al lado; cada pieza admite etiqueta),
     "carruseles" (usa carruseles: [...]) o nada para una galería normal.
   encabezado de sección: { ante, linea1, linea2 } y unidad ("publicaciones"). */
window.PROYECTOS = [
  {
    slug: "moncar",
    publicado: true,
    titulo: "Grupo Refaccionario Moncar",
    categorias: ["redes", "publicidad", "video"],
    disciplina: "Community management y contenido",
    relacion: "profesional",
    tono: "tinta",
    portada: "",
    resumen: "Community management para cinco refaccionarias: contenido diario, video para Reels, campañas en Facebook Ads, atención de cotizaciones y una aplicación web propia para consultar métricas.",
    contexto: "Grupo Refaccionario Moncar vende refacciones automotrices a través de cinco refaccionarias, cada una con sus propias redes. Trabajo ahí como Community Manager desde marzo de 2026.",
    objetivo: "",
    participacion: "Creo publicaciones e historias para las cinco cuentas, grabo material de stock y edito videos para Facebook Reels. También armo las campañas en Facebook Ads, atiendo mensajes, comentarios y cotizaciones por WhatsApp, y registro en un solo lugar las cotizaciones que llegan por WhatsApp y Facebook. Para revisar los resultados desarrollé una aplicación web que reúne las estadísticas por apartados.",
    concepto: "",
    decisiones: [],
    entregables: ["Publicaciones", "Historias", "Videos para Facebook Reels", "Material de stock", "Campañas en Facebook Ads", "Registro de cotizaciones", "Aplicación web de estadísticas"],
    // Agrega aquí solo cifras que puedas comprobar, con su periodo y fuente.
    // Ejemplo: { dato: "", descripcion: "", fuente: "Meta Business Suite, abril 2026" }
    resultados: [],
    secciones: [
      { titulo: "Publicaciones", piezas: [
        { src: "", archivo: "publicacion-1.webp", alt: "Publicación para redes de Grupo Refaccionario Moncar", formato: "vertical" },
        { src: "", archivo: "publicacion-2.webp", alt: "Publicación para redes de Grupo Refaccionario Moncar", formato: "vertical" },
        { src: "", archivo: "publicacion-3.webp", alt: "Publicación para redes de Grupo Refaccionario Moncar", formato: "vertical" } ] },
      { titulo: "Historias", piezas: [
        { src: "", archivo: "historia-1.webp", alt: "Historia para redes de Grupo Refaccionario Moncar", formato: "historia" },
        { src: "", archivo: "historia-2.webp", alt: "Historia para redes de Grupo Refaccionario Moncar", formato: "historia" },
        { src: "", archivo: "historia-3.webp", alt: "Historia para redes de Grupo Refaccionario Moncar", formato: "historia" } ] },
      { titulo: "Facebook Reels", piezas: [
        { tipo: "video", src: "", poster: "", archivo: "reel-1.mp4", alt: "Video para Facebook Reels", formato: "historia" },
        { tipo: "video", src: "", poster: "", archivo: "reel-2.mp4", alt: "Video para Facebook Reels", formato: "historia" },
        { tipo: "video", src: "", poster: "", archivo: "reel-3.mp4", alt: "Video para Facebook Reels", formato: "historia" } ] },
      { titulo: "Material de stock", nota: "Fotos y video que grabo yo mismo para tener imágenes propias de los productos.", piezas: [
        { src: "", archivo: "stock-1.webp", alt: "Fotografía de stock de refacciones", formato: "horizontal" },
        { src: "", archivo: "stock-2.webp", alt: "Fotografía de stock de refacciones", formato: "horizontal" },
        { src: "", archivo: "stock-3.webp", alt: "Fotografía de stock de refacciones", formato: "horizontal" } ] },
      { titulo: "Campañas en Facebook Ads", piezas: [
        { src: "", archivo: "campana-1.webp", alt: "Anuncio de campaña en Facebook Ads", formato: "vertical" },
        { src: "", archivo: "campana-2.webp", alt: "Anuncio de campaña en Facebook Ads", formato: "vertical" } ] },
      { titulo: "Aplicación web de estadísticas", nota: "Una herramienta que desarrollé para centralizar las estadísticas y métricas de las cuentas y consultarlas por apartados.", piezas: [
        { src: "", archivo: "app-estadisticas.webp", alt: "Captura de la aplicación web de estadísticas", formato: "ancho" } ] }
    ],
    proceso: []
  },
  {
    slug: "ink-house",
    publicado: true,
    titulo: "Ink House",
    categorias: ["redes", "publicidad"],
    disciplina: "Gestión de redes y contenido digital",
    relacion: "profesional",
    tono: "tinta",
    // Paleta del caso (definida en estilos.css): colores de la marca en modo claro y oscuro.
    paleta: "ink",
    // Estilo de los títulos de sección: "contorno" o "marcador".
    estiloTitulos: "marcador",
    portada: "assets/proyectos/ink-house/promocion-8.webp",
    // Publicaciones que acompañan a la portada en el collage del caso (hasta 4).
    collage: ["assets/proyectos/ink-house/apps-1.webp", "assets/proyectos/ink-house/carrusel-pacman-1.webp", "assets/proyectos/ink-house/invitaciones-2.webp", "assets/proyectos/ink-house/promocion-5.webp"],
    // Piezas que se asoman en la tarjeta al pasar el cursor.
    vistazo: ["assets/proyectos/ink-house/invitaciones-2.webp", "assets/proyectos/ink-house/promocion-5.webp", "assets/proyectos/ink-house/carrusel-pacman-1.webp"],
    // Nombre y foto de perfil que aparecen en los marcos de Instagram.
    cuenta: { nombre: "Ink House", iniciales: "IH", color: "#ff6a13", foto: "assets/proyectos/ink-house/perfil.webp" },
    resumen: "Redes sociales de una agencia de diseño y publicidad: promociones de temporada, contenido de marca y el lanzamiento de dos servicios nuevos.",
    aclaracion: "Aquí muestro una selección de algunos proyectos que realicé, no la totalidad de mi trabajo en la agencia.",
    contexto: "Ink House Diseño y Publicidad es una agencia de Pachuca. Trabajé ahí de enero de 2025 a febrero de 2026 como diseñador gráfico y community manager, a cargo de sus redes y de las de varios clientes.",
    objetivo: "Que las redes de la agencia vendieran sus servicios sin dejar de mostrarla como un estudio creativo, con contenido constante y fiel a su identidad.",
    participacion: "Planeé, diseñé y programé el contenido. Decidía qué tocaba publicar en cada momento (una promoción, una fecha conmemorativa o un servicio nuevo) y cómo resolverlo dentro de la línea gráfica de la marca.",
    concepto: "",
    decisiones: [],
    entregables: [],
    resultados: [],
    // Clientes de la agencia que tienen su propio caso en el portafolio.
    relacionados: ["blefaroplastia-pachuca", "bailoterapia", "nutriologa-amparo-valdez"],
    secciones: [
      { titulo: "Promociones", tipo: "feed",
        encabezado: { ante: "Promociones de temporada", linea1: "Precios que", linea2: "saltan a la vista" },
        nota: "Para El Buen Fin y la temporada navideña, Ink House necesitaba que sus ofertas se entendieran en el segundo que alguien tarda en pasar una publicación. Elegí una comunicación directa a propósito: el precio en tipografía grande y en el color de acento es lo primero que se lee, el producto queda en segundo nivel y las condiciones al final. Los copos de nieve y el sello del Buen Fin ubican la temporada sin competir con la oferta.",
        ayuda: "Toca cualquier publicación para verla en grande",
        piezas: [
          { src: "assets/proyectos/ink-house/promocion-8.webp", archivo: "promocion-8.webp", titulo: "Playeras para parejas personalizadas", alt: "Playeras para parejas personalizadas", formato: "vertical" },
          { src: "assets/proyectos/ink-house/promocion-1.webp", archivo: "promocion-1.webp", titulo: "Tarjetas de presentación: 100 por $100", alt: "Tarjetas de presentación: 100 por $100", formato: "vertical" },
          { src: "assets/proyectos/ink-house/promocion-2.webp", archivo: "promocion-2.webp", titulo: "Planillas de stickers navideños a $49", alt: "Planillas de stickers navideños a $49", formato: "vertical" },
          { src: "assets/proyectos/ink-house/promocion-3.webp", archivo: "promocion-3.webp", titulo: "Tarjetas de presentación: 200 por $200", alt: "Tarjetas de presentación: 200 por $200", formato: "vertical" },
          { src: "assets/proyectos/ink-house/promocion-4.webp", archivo: "promocion-4.webp", titulo: "Tazas personalizadas: 30 por $1,290", alt: "Tazas personalizadas: 30 por $1,290", formato: "vertical" },
          { src: "assets/proyectos/ink-house/promocion-5.webp", archivo: "promocion-5.webp", titulo: "Planillas de stickers, versión Buen Fin", alt: "Planillas de stickers, versión Buen Fin", formato: "vertical" },
          { src: "assets/proyectos/ink-house/promocion-6.webp", archivo: "promocion-6.webp", titulo: "Tazas personalizadas, versión Buen Fin", alt: "Tazas personalizadas, versión Buen Fin", formato: "vertical" },
          { src: "assets/proyectos/ink-house/promocion-7.webp", archivo: "promocion-7.webp", titulo: "Tarjetas de presentación, versión Buen Fin", alt: "Tarjetas de presentación, versión Buen Fin", formato: "vertical" } ] },
      { titulo: "Carruseles para redes", tipo: "carruseles",
        encabezado: { ante: "Carruseles de diseño gráfico", linea1: "Ideas que", linea2: "se deslizan" },
        nota: "La agencia ya tenía una línea gráfica para este contenido: ilustración en blanco y negro, naranja y amarillo, y frases con palabras resaltadas. El reto era respetarla y aun así variar los temas. Propuse partir de fechas conmemorativas y referencias cercanas para conectarlas con el diseño gráfico, y así mostrar que la disciplina aparece en más lugares de la vida diaria de los que parece.",
        ayuda: "Desliza cada carrusel como en Instagram",
        carruseles: [
        { titulo: "Comunicólogos", desc: "Felicitación por el día del comunicólogo que pasa del humor al reconocimiento: sin comunicólogos no hay marcas ni medios.", piezas: [
            { src: "assets/proyectos/ink-house/carrusel-comunicologos-1.webp", archivo: "carrusel-comunicologos-1.webp", titulo: "Sin comunicólogos no hay nada", alt: "Sin comunicólogos no hay nada", formato: "vertical" },
            { src: "assets/proyectos/ink-house/carrusel-comunicologos-2.webp", archivo: "carrusel-comunicologos-2.webp", titulo: "Ser comunicólogo es…", alt: "Ser comunicólogo es…", formato: "vertical" },
            { src: "assets/proyectos/ink-house/carrusel-comunicologos-3.webp", archivo: "carrusel-comunicologos-3.webp", titulo: "Feliz día a los que hacen todo posible", alt: "Feliz día a los que hacen todo posible", formato: "vertical" } ] },
        { titulo: "Pac-Man diseñador", desc: "Pac-Man como diseñador que sube de nivel con situaciones que cualquier diseñador reconoce: cambios sin fin, Comic Sans y briefs hechos de emojis.", piezas: [
            { src: "assets/proyectos/ink-house/carrusel-pacman-1.webp", archivo: "carrusel-pacman-1.webp", titulo: "¿Y si Pac-Man fuera diseñador gráfico?", alt: "¿Y si Pac-Man fuera diseñador gráfico?", formato: "vertical" },
            { src: "assets/proyectos/ink-house/carrusel-pacman-2.webp", archivo: "carrusel-pacman-2.webp", titulo: "Nivel 1: cien cambios", alt: "Nivel 1: cien cambios", formato: "vertical" },
            { src: "assets/proyectos/ink-house/carrusel-pacman-3.webp", archivo: "carrusel-pacman-3.webp", titulo: "Nivel 2: Comic Sans", alt: "Nivel 2: Comic Sans", formato: "vertical" },
            { src: "assets/proyectos/ink-house/carrusel-pacman-4.webp", archivo: "carrusel-pacman-4.webp", titulo: "Nivel 3: el brief es un emoji", alt: "Nivel 3: el brief es un emoji", formato: "vertical" },
            { src: "assets/proyectos/ink-house/carrusel-pacman-5.webp", archivo: "carrusel-pacman-5.webp", titulo: "El primer héroe gráfico de la infancia", alt: "El primer héroe gráfico de la infancia", formato: "vertical" } ] },
        { titulo: "Dalí", desc: "Homenaje a Salvador Dalí que usa su obra para hablar de libertad creativa y del valor de diseñar distinto.", piezas: [
            { src: "assets/proyectos/ink-house/carrusel-dali-1.webp", archivo: "carrusel-dali-1.webp", titulo: "¿Quién dijo que el diseño tenía que ser lógico?", alt: "¿Quién dijo que el diseño tenía que ser lógico?", formato: "vertical" },
            { src: "assets/proyectos/ink-house/carrusel-dali-2.webp", archivo: "carrusel-dali-2.webp", titulo: "El arte no tiene límites", alt: "El arte no tiene límites", formato: "vertical" },
            { src: "assets/proyectos/ink-house/carrusel-dali-3.webp", archivo: "carrusel-dali-3.webp", titulo: "Ser diferentes es ser auténticos", alt: "Ser diferentes es ser auténticos", formato: "vertical" } ] },
        { titulo: "Diseñar también es expresarse", desc: "El diseño como forma de expresión: una invitación a usarlo para decir lo que uno piensa.", piezas: [
            { src: "assets/proyectos/ink-house/carrusel-expresarse-1.webp", archivo: "carrusel-expresarse-1.webp", titulo: "Diseñar también es expresarse", alt: "Diseñar también es expresarse", formato: "vertical" },
            { src: "assets/proyectos/ink-house/carrusel-expresarse-2.webp", archivo: "carrusel-expresarse-2.webp", titulo: "No calles lo que piensas, dibújalo", alt: "No calles lo que piensas, dibújalo", formato: "vertical" },
            { src: "assets/proyectos/ink-house/carrusel-expresarse-3.webp", archivo: "carrusel-expresarse-3.webp", titulo: "Aquí estoy y esto es lo que pienso", alt: "Aquí estoy y esto es lo que pienso", formato: "vertical" } ] }
      ] },
      { titulo: "Apps digitales", tipo: "escenario",
        encabezado: { ante: "Campaña de apps para negocios", linea1: "Del antojo", linea2: "al pedido" },
        nota: "Ink House iba a sumar un servicio nuevo: crear aplicaciones para negocios. Un servicio tecnológico cuesta trabajo explicarlo en abstracto, así que la campaña lo aterrizó en un caso de uso concreto, una app para restaurantes. La primera pieza presenta la idea; las otras dos explican qué gana el restaurante y qué gana su cliente, con la interfaz de la app al centro para que el servicio se entienda sin tecnicismos.",
        ayuda: "Desliza o usa las flechas; toca la pieza del centro para verla en grande",
        piezas: [
          { src: "assets/proyectos/ink-house/apps-1.webp", archivo: "apps-1.webp", titulo: "Haz que tus clientes pidan con solo un clic", alt: "Haz que tus clientes pidan con solo un clic", formato: "vertical" },
          { src: "assets/proyectos/ink-house/apps-2.webp", archivo: "apps-2.webp", titulo: "Beneficios para tu restaurante", alt: "Beneficios para tu restaurante", formato: "vertical" },
          { src: "assets/proyectos/ink-house/apps-3.webp", archivo: "apps-3.webp", titulo: "Beneficios para tus clientes", alt: "Beneficios para tus clientes", formato: "vertical" } ] },
      { titulo: "Invitaciones digitales", tipo: "abanico",
        encabezado: { ante: "Lanzamiento de invitaciones digitales", linea1: "Un paquete", linea2: "para cada fiesta" },
        nota: "Las invitaciones digitales eran otro servicio nuevo de la agencia y había que presentarlas como una opción moderna y práctica frente a la invitación impresa. Cada pieza muestra el diseño dentro de un celular, que es donde la recibe el invitado. Los paquetes se distinguen por color y precio, y unos íconos resumen lo que incluye cada uno, como cuenta regresiva, música o confirmación por WhatsApp, sin saturar la publicación.",
        ayuda: "Pasa el cursor o desliza para ver los cuatro paquetes",
        piezas: [
          { src: "assets/proyectos/ink-house/invitaciones-1.webp", archivo: "invitaciones-1.webp", titulo: "Paquete Elite", alt: "Paquete Elite", formato: "vertical" },
          { src: "assets/proyectos/ink-house/invitaciones-2.webp", archivo: "invitaciones-2.webp", titulo: "Paquete Premium", alt: "Paquete Premium", formato: "vertical" },
          { src: "assets/proyectos/ink-house/invitaciones-3.webp", archivo: "invitaciones-3.webp", titulo: "Paquete Standar", alt: "Paquete Standar", formato: "vertical" },
          { src: "assets/proyectos/ink-house/invitaciones-4.webp", archivo: "invitaciones-4.webp", titulo: "Invitaciones digitales interactivas desde $380", alt: "Invitaciones digitales interactivas desde $380", formato: "vertical" } ] }
    ],
    proceso: []
  },
  {
    slug: "blefaroplastia-pachuca",
    publicado: true,
    titulo: "Blefaroplastia Pachuca",
    categorias: ["redes", "publicidad"],
    disciplina: "Contenido para redes en salud",
    relacion: "agencia",
    agencia: "ink-house",
    tono: "cobalto",
    paleta: "blef",
    estiloTitulos: "contorno",
    portada: "assets/proyectos/blefaroplastia-pachuca/publicacion-3.webp",
    // Parte de la imagen que se ve en la tarjeta (posición CSS).
    portadaPos: "center 6%",
    collage: ["assets/proyectos/blefaroplastia-pachuca/publicacion-1.webp", "assets/proyectos/blefaroplastia-pachuca/publicacion-2.webp", "assets/proyectos/blefaroplastia-pachuca/publicacion-8.webp", "assets/proyectos/blefaroplastia-pachuca/publicacion-7.webp"],
    vistazo: ["assets/proyectos/blefaroplastia-pachuca/publicacion-8.webp", "assets/proyectos/blefaroplastia-pachuca/historia-8.webp", "assets/proyectos/blefaroplastia-pachuca/publicacion-7.webp"],
    cuenta: { nombre: "Blefaroplastia Pachuca", iniciales: "BP", color: "#1257c9", foto: "assets/proyectos/blefaroplastia-pachuca/perfil.webp" },
    resumen: "Contenido para empezar a dar a conocer en redes un servicio de blefaroplastia: publicaciones e historias que explican el procedimiento y resuelven las primeras dudas.",
    contexto: "El Dr. Miguel A. García quería empezar a promover su servicio de blefaroplastia en redes sociales y la comunicación partía prácticamente de cero. Lo atendí como cliente de Ink House.",
    objetivo: "Construir una base de contenido para que alguien que escucha por primera vez la palabra «blefaroplastia» entienda de qué se trata y sepa qué considerar antes de pedir una valoración médica.",
    participacion: "Diseñé las publicaciones y las historias, y organicé el contenido según su propósito: presentar el servicio, explicar lo básico del procedimiento, responder dudas frecuentes y difundir promociones.",
    solucion: "Todo el contenido mantiene un tono informativo y responsable. Explica, aclara dudas y cierra con una invitación a la valoración con el especialista, sin prometer resultados ni presentar los beneficios como garantía.",
    decisiones: [
      { titulo: "El azul como base", texto: "Es un color que se asocia con la salud, la confianza y lo profesional, y le dio a la cuenta una identidad reconocible desde la primera publicación." },
      { titulo: "Jerarquía para leer rápido", texto: "Composiciones limpias y pocos niveles tipográficos para que la pregunta, el beneficio y el contacto se lean en ese orden." },
      { titulo: "Fotografía natural", texto: "Imágenes editoriales con expresiones relajadas y recursos gráficos suaves para transmitir cuidado y cercanía, lejos de un tono quirúrgico." },
      { titulo: "Dos formatos, dos funciones", texto: "Las publicaciones informan y dan a conocer las promociones; las historias conversan con la audiencia y la invitan a escribir al consultorio." }
    ],
    entregables: [],
    resultados: [],
    secciones: [
      { titulo: "Publicaciones", tipo: "feed",
        encabezado: { ante: "Publicaciones para el feed", linea1: "Lo que vive", linea2: "en el feed" },
        nota: "Las publicaciones presentan el procedimiento paso a paso: qué es, por qué se hace, quién puede ser candidato y qué cambios atiende. Las promociones del Buen Fin conservan la misma estructura gráfica para que se reconozcan como parte de la cuenta y no como un anuncio aislado.",
        ayuda: "Toca cualquier publicación para verla en grande",
        piezas: [
          { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-1.webp", archivo: "publicacion-1.webp", titulo: "¿Por qué hacerse una blefaroplastia?", alt: "¿Por qué hacerse una blefaroplastia?", formato: "vertical" },
          { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-2.webp", archivo: "publicacion-2.webp", titulo: "Qué puede atender el procedimiento", alt: "Qué puede atender el procedimiento", formato: "vertical" },
          { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-3.webp", archivo: "publicacion-3.webp", titulo: "Elimina el aspecto del cansancio", alt: "Elimina el aspecto del cansancio", formato: "vertical" },
          { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-4.webp", archivo: "publicacion-4.webp", titulo: "¿Cómo saber si eres candidata(o)?", alt: "¿Cómo saber si eres candidata(o)?", formato: "vertical" },
          { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-5.webp", archivo: "publicacion-5.webp", titulo: "Descuentos Buen Fin", alt: "Descuentos Buen Fin", formato: "vertical" },
          { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-6.webp", archivo: "publicacion-6.webp", titulo: "25% de descuento en El Buen Fin", alt: "25% de descuento en El Buen Fin", formato: "vertical" },
          { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-7.webp", archivo: "publicacion-7.webp", titulo: "Párpados caídos y bolsas en párpados inferiores", alt: "Párpados caídos y bolsas en párpados inferiores", formato: "vertical" },
          { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-8.webp", archivo: "publicacion-8.webp", titulo: "Luce mejor, siéntete bien", alt: "Luce mejor, siéntete bien", formato: "vertical" },
          { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-9.webp", archivo: "publicacion-9.webp", titulo: "La blefaroplastia y el campo visual", alt: "La blefaroplastia y el campo visual", formato: "vertical" } ] },
      { titulo: "Historias", tipo: "historias",
        encabezado: { ante: "Historias de Instagram y Facebook", linea1: "24 horas", linea2: "en pantalla" },
        nota: "Las historias funcionan como una conversación: abren con una pregunta, desmienten un mito, explican el procedimiento con palabras sencillas y terminan con una invitación a agendar una valoración.",
        ayuda: "Cambia entre Instagram y Facebook o toca los lados de la pantalla para avanzar",
        piezas: [
          { src: "assets/proyectos/blefaroplastia-pachuca/historia-1.webp", archivo: "historia-1.webp", titulo: "¿Qué te gustaría mejorar de tu mirada?", alt: "¿Qué te gustaría mejorar de tu mirada?", formato: "historia", sticker: { texto: "¿Cuál es tu duda?", x: 50, y: 81, w: 50, escala: 0.9 } },
          { src: "assets/proyectos/blefaroplastia-pachuca/historia-2.webp", archivo: "historia-2.webp", titulo: "¿Qué es la blefaroplastia?", alt: "¿Qué es la blefaroplastia?", formato: "historia", sticker: { texto: "¿Qué más quieres saber?", x: 50, y: 93.6, w: 54, escala: 0.86 } },
          { src: "assets/proyectos/blefaroplastia-pachuca/historia-3.webp", archivo: "historia-3.webp", titulo: "¿Tus párpados han cambiado?", alt: "¿Tus párpados han cambiado?", formato: "historia", sticker: { texto: "¿Qué cambio has notado en tus párpados?", x: 73, y: 57, w: 48 } },
          { src: "assets/proyectos/blefaroplastia-pachuca/historia-4.webp", archivo: "historia-4.webp", titulo: "¿Mito o realidad?", alt: "¿Mito o realidad?", formato: "historia", sticker: { texto: "¿Qué otro mito has escuchado?", x: 66, y: 72, w: 56 } },
          { src: "assets/proyectos/blefaroplastia-pachuca/historia-5.webp", archivo: "historia-5.webp", titulo: "¿Cambiará mi expresión?", alt: "¿Cambiará mi expresión?", formato: "historia", sticker: { texto: "¿Qué te preocupa de tu expresión?", x: 28, y: 19.5, w: 50 } },
          { src: "assets/proyectos/blefaroplastia-pachuca/historia-6.webp", archivo: "historia-6.webp", titulo: "El primer paso es conocer tu caso", alt: "El primer paso es conocer tu caso", formato: "historia", sticker: { texto: "¿Qué te gustaría preguntar?", x: 54, y: 37, w: 36, escala: 0.92 } },
          { src: "assets/proyectos/blefaroplastia-pachuca/historia-7.webp", archivo: "historia-7.webp", titulo: "¿Qué quieres saber sobre la blefaroplastia?", alt: "¿Qué quieres saber sobre la blefaroplastia?", formato: "historia", sticker: { texto: "Escribe aquí tu pregunta", x: 50, y: 89, w: 60 } },
          { src: "assets/proyectos/blefaroplastia-pachuca/historia-8.webp", archivo: "historia-8.webp", titulo: "Tu mirada merece atención", alt: "Tu mirada merece atención", formato: "historia", sticker: { texto: "¿Tienes dudas antes de agendar?", x: 79, y: 64.5, w: 38 } } ] }
    ],
    proceso: []
  },
  {
    slug: "intro-congreso",
    publicado: true,
    titulo: "Intro para congreso cristiano",
    categorias: ["video"],
    disciplina: "Animación tipográfica y video",
    relacion: "evento",
    tono: "tinta",
    paleta: "intro",
    estiloTitulos: "contorno",
    // Portada del caso: el video dentro de un marco (ver "pantalla" en presentaciones.js).
    portadaEstilo: "pantalla",
    video: { src: "assets/proyectos/intro-congreso/intro-congreso.mp4", poster: "assets/proyectos/intro-congreso/poster.webp", etiqueta: "Introducción del congreso", duracion: "3:02" },
    portada: "assets/proyectos/intro-congreso/poster.webp",
    vistazo: ["assets/proyectos/intro-congreso/cuadro-1.webp", "assets/proyectos/intro-congreso/cuadro-3.webp", "assets/proyectos/intro-congreso/cuadro-4.webp"],
    resumen: "Pieza audiovisual con animación tipográfica que se proyectó como introducción de un congreso cristiano.",
    contexto: "El video se creó para un evento de la iglesia y se usó para abrir un congreso cristiano. Su mensaje central es quién es Jesús, contado frase por frase.",
    objetivo: "Presentar el mensaje del congreso de forma clara y emotiva desde los primeros minutos, para que el público lo escuchara y lo leyera al mismo tiempo en la pantalla del evento.",
    participacion: "Desarrollé la animación tipográfica: elegí qué palabras destacar, compuse cada frase sobre las escenas y sincronicé la aparición de los textos con el audio.",
    solucion: "La tipografía guía la lectura. Cada frase entra al ritmo del audio y las palabras que cargan el mensaje crecen en tamaño, así el público capta la idea aunque no alcance a leer cada palabra.",
    decisiones: [
      { titulo: "Jerarquía en cada frase", texto: "Las palabras clave, como amor, hijo o débiles, aparecen más grandes que los conectores. La frase se entiende de un vistazo y el énfasis acompaña al de la voz." },
      { titulo: "Serifa clásica", texto: "Una tipografía con serifa y alto contraste remite a los textos bíblicos y le da a la pieza un tono solemne sin perder legibilidad en pantalla." },
      { titulo: "Paleta sepia", texto: "Tonos cálidos y texturas de pergamino unifican las escenas y dejan que el texto destaque sin competir con la imagen." },
      { titulo: "Texto en el espacio libre", texto: "Cada frase ocupa la zona vacía del encuadre, junto al rostro y nunca encima, para que imagen y mensaje se lean juntos." }
    ],
    encabezadoDecisiones: { ante: "Decisiones de diseño", linea1: "Por qué", linea2: "se mueve así" },
    entregables: [],
    resultados: [],
    secciones: [
      { titulo: "Cuadros clave", columnas: 2,
        encabezado: { ante: "Cuadros clave", linea1: "Cada palabra", linea2: "en su lugar" },
        nota: "Cuatro momentos del video donde se ve cómo la jerarquía tipográfica y la composición acompañan la narración.",
        ayuda: "Toca un cuadro para verlo en grande",
        piezas: [
        { src: "assets/proyectos/intro-congreso/cuadro-1.webp", archivo: "cuadro-1.webp", titulo: "Ninguna medida puede definir los límites de su amor", alt: "Cuadro del video: ninguna medida puede definir los límites de su amor", formato: "panoramico" },
        { src: "assets/proyectos/intro-congreso/cuadro-2.webp", archivo: "cuadro-2.webp", titulo: "Él es la doctrina fundamental de la verdadera teología", alt: "Cuadro del video: Él es la doctrina fundamental de la verdadera teología", formato: "panoramico" },
        { src: "assets/proyectos/intro-congreso/cuadro-3.webp", archivo: "cuadro-3.webp", titulo: "Él defiende a los débiles", alt: "Cuadro del video: Él defiende a los débiles", formato: "panoramico" },
        { src: "assets/proyectos/intro-congreso/cuadro-4.webp", archivo: "cuadro-4.webp", titulo: "Desearía poder describirlo, pero Él es indescriptible", alt: "Cuadro del video: desearía poder describirlo, pero Él es indescriptible", formato: "panoramico" } ] }
    ],
    proceso: []
  },
  {
    slug: "generacion-diferente",
    publicado: true,
    titulo: "Generación Diferente",
    categorias: ["identidad", "redes"],
    disciplina: "Identidad visual completa",
    relacion: "cliente",
    tono: "sol",
    // Negro y naranja de la marca (definida en estilos.css).
    paleta: "gdi",
    portada: "assets/proyectos/generacion-diferente/portada.webp",
    // Portada del caso: abre el brandbook interactivo.
    portadaEstilo: "brandbook",
    portadaPos: "center 30%",
    brandbook: { href: "brandbook/generacion-diferente/", texto: "Abrir el brandbook interactivo" },
    vistazo: ["assets/proyectos/generacion-diferente/post-2.webp", "assets/proyectos/generacion-diferente/cuaderno-1.webp", "assets/proyectos/generacion-diferente/post-3.webp"],
    cuenta: { nombre: "Generación Diferente", iniciales: "GD", foto: "assets/proyectos/generacion-diferente/perfil-2.webp", color: "#0b0b0c" },
    cinta: ["Concepto", "Logotipo", "Retícula", "Color", "Tipografía", "Guía de uso", "Redes sociales", "Aplicaciones"],
    resumen: "Identidad visual completa para un grupo de jóvenes cristianos: símbolo, logotipo, color, tipografía, guía de uso y aplicaciones en redes y objetos.",
    contexto: "Generación Diferente es un grupo juvenil cristiano que vive en Facebook e Instagram. Necesitaba una identidad propia que se reconociera igual en una foto de perfil que en una playera.",
    objetivo: "Crear un símbolo con significado para el grupo y un sistema visual que funcione en redes, impresos y objetos sin perder coherencia.",
    participacion: "Diseñé toda la identidad: concepto, logotipo y sus versiones, retícula, paleta, tipografía, guía de uso, portada y foto de perfil, publicaciones y aplicaciones.",
    concepto: "Una llama encendida: el fuego del Espíritu Santo que se reparte entre muchas personas y que no se apaga cuando se comparte.",
    encabezadoDecisiones: { ante: "Decisiones de diseño", linea1: "Por qué", linea2: "arde así" },
    decisiones: [
      { titulo: "Trazo grueso", texto: "La llama se lee a distancia y en tamaños pequeños: en una foto de perfil, bordada en una gorra o esmaltada en un pin." },
      { titulo: "Contraste máximo", texto: "Blanco sobre negro como base. El fuego se ve más cuando todo alrededor está oscuro." },
      { titulo: "Dos voces en el nombre", texto: "Zing Rust, condensada y gastada, para GENERACIÓN. Edo SZ, de pincel, para DIFERENTE. Lo firme y lo espontáneo en el mismo nombre." },
      { titulo: "Naranja como acento", texto: "Se reserva para lo que tiene que encenderse: la palabra DIFERENTE, una fecha, un llamado." }
    ],
    entregables: ["Concepto y narrativa de marca", "Logotipo principal, horizontal, tipográfico e isotipo", "Variaciones de color", "Retícula y área de seguridad", "Paleta y tipografía", "Guía de usos incorrectos", "Portada y foto de perfil", "Publicaciones", "Aplicaciones en objetos"],
    resultados: [],
    secciones: [
      { titulo: "Redes sociales",
        encabezado: { ante: "Facebook", linea1: "Portada y", linea2: "foto de perfil" },
        nota: "La portada pone el nombre al centro y lejos de los bordes, para que se lea completo aunque el celular recorte los lados. La foto de perfil usa el logotipo principal sobre una foto oscurecida del público.",
        ayuda: "Toca una imagen para verla en grande",
        piezas: [
          { src: "assets/proyectos/generacion-diferente/portada-facebook.webp", archivo: "portada-facebook.webp", titulo: "Portada de Facebook", alt: "Portada de Facebook de Generación Diferente", formato: "ancho" },
          { src: "assets/proyectos/generacion-diferente/perfil-2.webp", archivo: "perfil-2.webp", titulo: "Foto de perfil", alt: "Foto de perfil de Generación Diferente", formato: "cuadrado" } ] },
      { titulo: "Publicaciones", tipo: "feed",
        encabezado: { ante: "Publicaciones para Instagram", linea1: "Tres piezas,", linea2: "un sistema" },
        nota: "Una reunión, un culto y un momento compartido. Cambian el formato y la foto, pero el negro, el naranja, la letra gastada y la llama al pie se mantienen.",
        ayuda: "Toca cualquier publicación para verla en grande",
        piezas: [
          { src: "assets/proyectos/generacion-diferente/post-1.webp", archivo: "post-1.webp", titulo: "Reunión de jóvenes", alt: "Publicación: Reunión de jóvenes", formato: "vertical" },
          { src: "assets/proyectos/generacion-diferente/post-2.webp", archivo: "post-2.webp", titulo: "Culto de jóvenes", alt: "Publicación: Culto de jóvenes", formato: "vertical" },
          { src: "assets/proyectos/generacion-diferente/post-3.webp", archivo: "post-3.webp", titulo: "La llama como marco", alt: "Publicación con la llama como marco", formato: "vertical" } ] },
      { titulo: "Aplicaciones",
        encabezado: { ante: "Aplicaciones", linea1: "La llama fuera", linea2: "de la pantalla" },
        nota: "Cada objeto usa la versión del logotipo que mejor aguanta su material y su tamaño: la llama sola en la gorra y el pin, la versión horizontal en la pulsera y el logotipo completo en cuadernos, vasos y playeras.",
        ayuda: "Toca una pieza para verla en grande",
        piezas: [
          { src: "assets/proyectos/generacion-diferente/cuaderno-1.webp", archivo: "cuaderno-1.webp", titulo: "Cuaderno", alt: "Cuaderno con la identidad de Generación Diferente", formato: "vertical" },
          { src: "assets/proyectos/generacion-diferente/playeras.webp", archivo: "playeras.webp", titulo: "Playeras", alt: "Playeras con la identidad de Generación Diferente", formato: "horizontal" },
          { src: "assets/proyectos/generacion-diferente/gorra.webp", archivo: "gorra.webp", titulo: "Gorra bordada", alt: "Gorra bordada con el isotipo", formato: "horizontal" },
          { src: "assets/proyectos/generacion-diferente/pin.webp", archivo: "pin.webp", titulo: "Pin metálico", alt: "Pin metálico con el isotipo", formato: "vertical" },
          { src: "assets/proyectos/generacion-diferente/vaso.webp", archivo: "vaso.webp", titulo: "Vaso", alt: "Vaso con el logotipo principal", formato: "vertical" },
          { src: "assets/proyectos/generacion-diferente/pulsera.webp", archivo: "pulsera.webp", titulo: "Pulsera de silicón", alt: "Pulsera con la versión horizontal", formato: "horizontal" },
          { src: "assets/proyectos/generacion-diferente/llavero.webp", archivo: "llavero.webp", titulo: "Llavero", alt: "Llavero con el logotipo principal", formato: "vertical" },
          { src: "assets/proyectos/generacion-diferente/sticker.webp", archivo: "sticker.webp", titulo: "Sticker", alt: "Sticker con el logotipo principal", formato: "vertical" } ] }
    ],
    proceso: []
  },
  {
    slug: "the-old-barber",
    publicado: true,
    titulo: "The Old Barber",
    // Parte del título que se escribe con letra manuscrita en la portada del caso.
    tituloFirma: "Barber",
    categorias: ["identidad", "redes"],
    disciplina: "Marca y contenido",
    relacion: "conceptual",
    tono: "papel",
    // Negro, amarillo y crema, tomados de las publicaciones (definida en estilos.css).
    paleta: "barber",
    estiloTitulos: "firma",
    portada: "assets/proyectos/the-old-barber/publicacion-6.webp",
    portadaPos: "center 18%",
    // Portada del caso: dos columnas de publicaciones en movimiento.
    portadaEstilo: "columnas",
    collage: ["assets/proyectos/the-old-barber/publicacion-2.webp", "assets/proyectos/the-old-barber/publicacion-1.webp", "assets/proyectos/the-old-barber/publicacion-5.webp", "assets/proyectos/the-old-barber/publicacion-3.webp"],
    vistazo: ["assets/proyectos/the-old-barber/publicacion-2.webp", "assets/proyectos/the-old-barber/publicacion-3.webp", "assets/proyectos/the-old-barber/publicacion-1.webp"],
    cuenta: { nombre: "theoldbarber", iniciales: "OB", color: "#14110c" },
    // Textos de la cinta que corre bajo la portada del caso.
    cinta: ["Corte de cabello", "Tratamiento de barba", "Limpieza facial", "Lunes a sábado", "Agenda tu cita"],
    resumen: "Ejercicio de marca y parrilla de contenido para una barbería imaginaria que empieza en redes. No fue un encargo real.",
    contexto: "Es un proyecto conceptual: la barbería no existe. Planteé el caso de un negocio que necesita arrancar su presencia en redes desde cero.",
    objetivo: "Atraer nuevas visitas con mensajes claros y llamativos, apoyados en promociones.",
    participacion: "Desarrollé la marca y una parrilla de contenido con promociones, consejos de cuidado y productos.",
    concepto: "",
    decisiones: [],
    entregables: [],
    resultados: [],
    secciones: [
      { titulo: "Publicaciones", tipo: "vitrina",
        encabezado: { ante: "Publicaciones para el feed", linea1: "Cinco motivos", linea2: "para sentarse" },
        unidad: "publicaciones",
        nota: "Cada publicación cumple una tarea distinta: presentar un servicio, organizar una dinámica, dar un consejo, lanzar una promoción o recordar que hay que agendar. Todas usan fondo oscuro, amarillo y la mezcla de letra condensada con letra manuscrita, así que se reconocen como de la misma barbería aunque cambie el mensaje.",
        ayuda: "Elige una publicación de la lista o espera a que cambie sola",
        piezas: [
          { src: "assets/proyectos/the-old-barber/publicacion-1.webp", archivo: "publicacion-1.webp", etiqueta: "Agenda", titulo: "Inicia la semana con estilo", alt: "Inicia la semana con estilo", formato: "vertical",
            desc: "Pensada para publicarse en lunes. Cierra con los datos de contacto en una sola franja y el botón para agendar." },
          { src: "assets/proyectos/the-old-barber/publicacion-2.webp", archivo: "publicacion-2.webp", etiqueta: "Servicio", titulo: "Es hora de darle tratamiento a tu barba", alt: "Es hora de darle tratamiento a tu barba", formato: "vertical",
            desc: "Presenta el servicio de barba y reúne en la misma pieza el horario, el teléfono, la dirección y el botón para agendar." },
          { src: "assets/proyectos/the-old-barber/publicacion-3.webp", archivo: "publicacion-3.webp", etiqueta: "Dinámica", titulo: "Gana un corte de cabello", alt: "Gana un corte de cabello", formato: "vertical",
            desc: "Invita a participar por un corte gratis. Las bases van en la descripción, así la imagen se queda con un solo mensaje." },
          { src: "assets/proyectos/the-old-barber/publicacion-5.webp", archivo: "publicacion-5.webp", etiqueta: "Consejo", titulo: "Cómo mantener tu corte de cabello limpio", alt: "Cómo mantener tu corte de cabello limpio", formato: "vertical",
            desc: "Contenido de cuidado personal. El perfil del cliente ocupa casi toda la pieza y el texto se acomoda en el espacio libre." },
          { src: "assets/proyectos/the-old-barber/publicacion-6.webp", archivo: "publicacion-6.webp", etiqueta: "Promoción", titulo: "Limpieza facial gratis en tu corte de cabello", alt: "Limpieza facial gratis en tu corte de cabello", formato: "vertical",
            desc: "La palabra «Gratis» va en manuscrita y amarillo para que sea lo primero que se lea. Abajo queda la vigencia: del 15 al 23 de enero." } ] },
      { titulo: "Logotipo", piezas: [ { src: "", archivo: "logotipo.webp", alt: "Logotipo de The Old Barber", formato: "ancho" } ] },
      { titulo: "Paleta y tipografía", piezas: [ { src: "", archivo: "paleta-tipografia.webp", alt: "Paleta y tipografía de The Old Barber", formato: "horizontal" } ] },
      { titulo: "Aplicaciones", piezas: [
        { src: "", archivo: "aplicacion-1.webp", alt: "Aplicación de marca", formato: "vertical" },
        { src: "", archivo: "aplicacion-2.webp", alt: "Aplicación de marca", formato: "vertical" } ] }
    ],
    proceso: []
  },
  {
    slug: "bailoterapia",
    publicado: true,
    titulo: "Bailoterapia",
    categorias: ["publicidad", "redes"],
    disciplina: "Campaña para redes",
    relacion: "agencia",
    agencia: "ink-house",
    tono: "tinta",
    portada: "",
    resumen: "Campaña en redes para atraer participantes a clases de bailoterapia, centrada en los beneficios físicos y emocionales del baile.",
    contexto: "Un servicio de clases de bailoterapia que atendí como cliente de Ink House.",
    objetivo: "Atraer nuevos participantes a las clases.",
    participacion: "Diseñé las piezas de la campaña.",
    concepto: "",
    decisiones: [],
    entregables: ["Publicaciones de campaña"],
    resultados: [],
    secciones: [
      { titulo: "Campaña", nota: "Cada pieza destaca un beneficio distinto del baile, como moverse sin dolor, la constancia semanal o el cuidado del corazón, para invitar a probar una clase.", piezas: [
        { src: "", archivo: "campana-1.webp", alt: "Pieza de la campaña de bailoterapia", formato: "vertical" },
        { src: "", archivo: "campana-2.webp", alt: "Pieza de la campaña de bailoterapia", formato: "vertical" },
        { src: "", archivo: "campana-3.webp", alt: "Pieza de la campaña de bailoterapia", formato: "vertical" } ] }
    ],
    proceso: []
  },
  {
    slug: "nutriologa-amparo-valdez",
    publicado: true,
    titulo: "Nutrióloga Amparo Valdez",
    categorias: ["redes"],
    disciplina: "Contenido educativo",
    relacion: "agencia",
    agencia: "ink-house",
    tono: "cobalto",
    portada: "",
    resumen: "Contenido educativo sobre diabetes, glucosa alterada y obesidad para la consulta de una nutrióloga.",
    contexto: "La consulta de la nutrióloga Amparo Valdez, cliente que atendí en Ink House.",
    objetivo: "Ayudar a reconocer las señales de una glucosa alterada, explicar qué pasa si la diabetes y la obesidad no se controlan, e invitar a tratarlas en consulta con un plan realista, sin dietas extremas.",
    participacion: "Diseñé las publicaciones y las historias para redes sociales.",
    concepto: "",
    decisiones: [],
    entregables: ["Publicaciones", "Historias"],
    resultados: [],
    secciones: [
      { titulo: "Publicaciones", nota: "Temas de salud delicados explicados con preguntas directas y datos sencillos, para que la audiencia reconozca señales de alerta sin sentirse juzgada.", piezas: [
        { src: "", archivo: "publicacion-1.webp", alt: "Publicación educativa sobre diabetes", formato: "vertical" },
        { src: "", archivo: "publicacion-2.webp", alt: "Publicación educativa sobre glucosa alterada", formato: "vertical" },
        { src: "", archivo: "publicacion-3.webp", alt: "Publicación educativa sobre obesidad", formato: "vertical" } ] },
      { titulo: "Historias", piezas: [
        { src: "", archivo: "historia-1.webp", alt: "Historia para redes de la nutrióloga", formato: "historia" },
        { src: "", archivo: "historia-2.webp", alt: "Historia para redes de la nutrióloga", formato: "historia" },
        { src: "", archivo: "historia-3.webp", alt: "Historia para redes de la nutrióloga", formato: "historia" } ] }
    ],
    proceso: []
  },
  {
    slug: "ismerely",
    publicado: true,
    titulo: "Ismerely",
    categorias: ["publicidad"],
    disciplina: "Diseño promocional",
    relacion: "colaboracion",
    tono: "cielo",
    portada: "",
    resumen: "Piezas promocionales para apoyar a una persona que vende productos Ismerely.",
    contexto: "Hice estas piezas para apoyar a una persona que vende productos Ismerely. No fue un encargo de la marca.",
    objetivo: "",
    participacion: "Diseñé las piezas promocionales.",
    concepto: "",
    decisiones: [],
    entregables: ["Piezas promocionales de producto"],
    resultados: [],
    secciones: [
      { titulo: "Piezas promocionales", piezas: [
        { src: "", archivo: "promo-1.webp", alt: "Pieza promocional", formato: "cuadrado" },
        { src: "", archivo: "promo-2.webp", alt: "Pieza promocional", formato: "cuadrado" },
        { src: "", archivo: "promo-3.webp", alt: "Pieza promocional", formato: "cuadrado" } ] }
    ],
    proceso: []
  },
  {
    slug: "serie-grafica-cristiana",
    publicado: true,
    titulo: "Serie gráfica cristiana",
    categorias: ["personal"],
    disciplina: "Carteles personales",
    relacion: "personal",
    tono: "sol",
    portada: "",
    resumen: "Carteles personales en los que exploro tipografía y composición a partir de mensajes cristianos. Incluye Con mi Espíritu.",
    contexto: "Es una colección de ejercicios propios. Elegí aquí solo los carteles con mejor acabado.",
    objetivo: "",
    participacion: "Concepto, composición y diseño de cada cartel.",
    concepto: "",
    decisiones: [],
    entregables: ["Carteles"],
    resultados: [],
    secciones: [
      { titulo: "Con mi Espíritu", nota: "Cartel personal.", piezas: [
        { src: "", archivo: "con-mi-espiritu.webp", alt: "Cartel Con mi Espíritu", formato: "vertical" } ] },
      { titulo: "Más carteles de la serie", piezas: [
        { src: "", archivo: "cartel-1.webp", alt: "Cartel de la serie", formato: "vertical" },
        { src: "", archivo: "cartel-2.webp", alt: "Cartel de la serie", formato: "vertical" },
        { src: "", archivo: "cartel-3.webp", alt: "Cartel de la serie", formato: "vertical" } ] }
    ],
    proceso: []
  },
  {
    // Sustituye a Casiopea. Escribe el nombre en "titulo" cuando lo
    // definas y cambia publicado a true para mostrarlo.
    slug: "concepto-belleza",
    publicado: false,
    titulo: "",
    tituloProvisional: "Proyecto conceptual de belleza",
    categorias: ["redes", "publicidad"],
    disciplina: "Contenido para una marca de belleza",
    relacion: "conceptual",
    tono: "papel",
    portada: "",
    resumen: "Proyecto conceptual de contenido para una marca de belleza.",
    contexto: "Es un proyecto conceptual; la marca no existe.",
    objetivo: "",
    participacion: "",
    concepto: "",
    decisiones: [],
    entregables: [],
    resultados: [],
    secciones: [
      { titulo: "Publicaciones", piezas: [
        { src: "", archivo: "publicacion-1.webp", alt: "Publicación de la marca de belleza", formato: "vertical" },
        { src: "", archivo: "publicacion-2.webp", alt: "Publicación de la marca de belleza", formato: "vertical" },
        { src: "", archivo: "publicacion-3.webp", alt: "Publicación de la marca de belleza", formato: "vertical" } ] }
    ],
    proceso: []
  }
];
