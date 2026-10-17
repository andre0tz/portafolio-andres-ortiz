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
   formato de pieza: "cuadrado", "vertical", "horizontal", "ancho", "historia"
   tipo de pieza: "imagen" (por defecto) o "video" */
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
    resumen: "Publicaciones, historias, Reels y campañas en Facebook Ads para cinco refaccionarias, más una aplicación web para consultar sus métricas.",
    contexto: "Grupo Refaccionario Moncar vende refacciones automotrices. Trabajo ahí desde marzo de 2026 como Community Manager y llevo las redes de cinco refaccionarias.",
    objetivo: "",
    participacion: "Creo publicaciones e historias, grabo material de stock y edito videos para Facebook Reels. Atiendo mensajes, comentarios y cotizaciones por WhatsApp, y registro en un solo lugar las cotizaciones que llegan por WhatsApp y Facebook. También desarrollo las campañas en Facebook Ads.",
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
      { titulo: "Material de stock", nota: "Fotos y video que grabo para usar en las publicaciones.", piezas: [
        { src: "", archivo: "stock-1.webp", alt: "Fotografía de stock de refacciones", formato: "horizontal" },
        { src: "", archivo: "stock-2.webp", alt: "Fotografía de stock de refacciones", formato: "horizontal" },
        { src: "", archivo: "stock-3.webp", alt: "Fotografía de stock de refacciones", formato: "horizontal" } ] },
      { titulo: "Campañas en Facebook Ads", piezas: [
        { src: "", archivo: "campana-1.webp", alt: "Anuncio de campaña en Facebook Ads", formato: "vertical" },
        { src: "", archivo: "campana-2.webp", alt: "Anuncio de campaña en Facebook Ads", formato: "vertical" } ] },
      { titulo: "Aplicación web de estadísticas", nota: "Centraliza las estadísticas y métricas y permite consultarlas en distintos apartados.", piezas: [
        { src: "", archivo: "app-estadisticas.webp", alt: "Captura de la aplicación web de estadísticas", formato: "ancho" } ] }
    ],
    proceso: []
  },
  {
    slug: "ink-house",
    publicado: true,
    titulo: "Ink House",
    categorias: ["redes", "publicidad"],
    disciplina: "Campañas y redes de la agencia",
    relacion: "profesional",
    tono: "cielo",
    portada: "assets/proyectos/ink-house/apps-1.webp",
    resumen: "Campañas, promociones, invitaciones digitales y carruseles para las redes de una agencia de diseño y publicidad.",
    contexto: "Ink House Diseño y Publicidad es una agencia en Pachuca. Trabajé ahí de enero de 2025 a febrero de 2026 como diseñador gráfico y community manager.",
    objetivo: "",
    participacion: "Planeé parrillas de contenido, diseñé publicaciones y materiales de marketing, edité videos, redacté copies y programé las publicaciones, tanto para la agencia como para sus clientes.",
    concepto: "",
    decisiones: [],
    entregables: ["Campaña de apps digitales", "Invitaciones digitales", "Promociones", "Carruseles para redes"],
    resultados: [],
    // Clientes de la agencia que tienen su propio caso en el portafolio.
    relacionados: ["blefaroplastia-pachuca", "bailoterapia", "nutriologa-amparo-valdez"],
    secciones: [
      { titulo: "Campaña de apps digitales", nota: "Campaña para dar a conocer el servicio de apps digitales para restaurantes.", piezas: [
        { src: "assets/proyectos/ink-house/apps-1.webp", archivo: "apps-1.webp", alt: "Pieza 1 de la campaña de apps digitales para restaurantes", formato: "vertical" },
        { src: "assets/proyectos/ink-house/apps-2.webp", archivo: "apps-2.webp", alt: "Pieza 2 de la campaña de apps digitales para restaurantes", formato: "vertical" },
        { src: "assets/proyectos/ink-house/apps-3.webp", archivo: "apps-3.webp", alt: "Pieza 3 de la campaña de apps digitales para restaurantes", formato: "vertical" } ] },
      { titulo: "Invitaciones digitales", nota: "Paquetes de invitaciones digitales interactivas.", piezas: [
        { src: "assets/proyectos/ink-house/invitaciones-1.webp", archivo: "invitaciones-1.webp", alt: "Paquete de invitaciones digitales, pieza 1", formato: "vertical" },
        { src: "assets/proyectos/ink-house/invitaciones-2.webp", archivo: "invitaciones-2.webp", alt: "Paquete de invitaciones digitales, pieza 2", formato: "vertical" },
        { src: "assets/proyectos/ink-house/invitaciones-3.webp", archivo: "invitaciones-3.webp", alt: "Paquete de invitaciones digitales, pieza 3", formato: "vertical" },
        { src: "assets/proyectos/ink-house/invitaciones-4.webp", archivo: "invitaciones-4.webp", alt: "Paquete de invitaciones digitales, pieza 4", formato: "vertical" } ] },
      { titulo: "Promociones", nota: "Impresión y productos personalizados, varias de ellas para el Buen Fin.", piezas: [
        { src: "assets/proyectos/ink-house/promocion-1.webp", archivo: "promocion-1.webp", alt: "Promoción de Ink House, pieza 1", formato: "vertical" },
        { src: "assets/proyectos/ink-house/promocion-2.webp", archivo: "promocion-2.webp", alt: "Promoción de Ink House, pieza 2", formato: "vertical" },
        { src: "assets/proyectos/ink-house/promocion-3.webp", archivo: "promocion-3.webp", alt: "Promoción de Ink House, pieza 3", formato: "vertical" },
        { src: "assets/proyectos/ink-house/promocion-4.webp", archivo: "promocion-4.webp", alt: "Promoción de Ink House, pieza 4", formato: "vertical" },
        { src: "assets/proyectos/ink-house/promocion-5.webp", archivo: "promocion-5.webp", alt: "Promoción de Ink House, pieza 5", formato: "vertical" },
        { src: "assets/proyectos/ink-house/promocion-6.webp", archivo: "promocion-6.webp", alt: "Promoción de Ink House, pieza 6", formato: "vertical" },
        { src: "assets/proyectos/ink-house/promocion-7.webp", archivo: "promocion-7.webp", alt: "Promoción de Ink House, pieza 7", formato: "vertical" },
        { src: "assets/proyectos/ink-house/promocion-8.webp", archivo: "promocion-8.webp", alt: "Promoción de Ink House, pieza 8", formato: "vertical" } ] },
      { titulo: "Carrusel sobre Dalí", piezas: [
        { src: "assets/proyectos/ink-house/carrusel-dali-1.webp", archivo: "carrusel-dali-1.webp", alt: "Carrusel sobre Dalí, lámina 1", formato: "vertical" },
        { src: "assets/proyectos/ink-house/carrusel-dali-2.webp", archivo: "carrusel-dali-2.webp", alt: "Carrusel sobre Dalí, lámina 2", formato: "vertical" },
        { src: "assets/proyectos/ink-house/carrusel-dali-3.webp", archivo: "carrusel-dali-3.webp", alt: "Carrusel sobre Dalí, lámina 3", formato: "vertical" } ] },
      { titulo: "Carrusel: diseñar también es expresarse", piezas: [
        { src: "assets/proyectos/ink-house/carrusel-expresarse-1.webp", archivo: "carrusel-expresarse-1.webp", alt: "Carrusel diseñar también es expresarse, lámina 1", formato: "vertical" },
        { src: "assets/proyectos/ink-house/carrusel-expresarse-2.webp", archivo: "carrusel-expresarse-2.webp", alt: "Carrusel diseñar también es expresarse, lámina 2", formato: "vertical" },
        { src: "assets/proyectos/ink-house/carrusel-expresarse-3.webp", archivo: "carrusel-expresarse-3.webp", alt: "Carrusel diseñar también es expresarse, lámina 3", formato: "vertical" } ] },
      { titulo: "Maqueta del feed", piezas: [
        { src: "", archivo: "feed.webp", alt: "Maqueta del feed de Ink House", formato: "vertical" } ] }
    ],
    proceso: []
  },
  {
    slug: "blefaroplastia-pachuca",
    publicado: true,
    titulo: "Blefaroplastia Pachuca",
    categorias: ["redes", "publicidad"],
    disciplina: "Contenido para redes",
    relacion: "agencia",
    agencia: "ink-house",
    tono: "cobalto",
    portada: "assets/proyectos/blefaroplastia-pachuca/feed.webp",
    resumen: "Publicaciones e historias educativas y promociones para una clínica de cirugía de párpados.",
    contexto: "Cliente que atendí en Ink House. La clínica realiza blefaroplastia superior e inferior.",
    objetivo: "Explicar el procedimiento a la audiencia y dar a conocer sus promociones.",
    participacion: "Diseño de publicaciones e historias para redes sociales.",
    concepto: "",
    decisiones: [],
    entregables: ["Publicaciones educativas", "Promociones", "Historias", "Maqueta del feed"],
    resultados: [],
    secciones: [
      { titulo: "Vista del feed", piezas: [
        { src: "assets/proyectos/blefaroplastia-pachuca/feed.webp", archivo: "feed.webp", alt: "Maqueta del feed de Blefaroplastia Pachuca con nueve publicaciones", formato: "vertical" } ] },
      { titulo: "Publicaciones", piezas: [
        { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-1.webp", archivo: "publicacion-1.webp", alt: "Publicación 1 de Blefaroplastia Pachuca", formato: "vertical" },
        { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-2.webp", archivo: "publicacion-2.webp", alt: "Publicación 2 de Blefaroplastia Pachuca", formato: "vertical" },
        { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-3.webp", archivo: "publicacion-3.webp", alt: "Publicación 3 de Blefaroplastia Pachuca", formato: "vertical" },
        { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-4.webp", archivo: "publicacion-4.webp", alt: "Publicación 4 de Blefaroplastia Pachuca", formato: "vertical" },
        { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-5.webp", archivo: "publicacion-5.webp", alt: "Publicación 5 de Blefaroplastia Pachuca", formato: "vertical" },
        { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-6.webp", archivo: "publicacion-6.webp", alt: "Publicación 6 de Blefaroplastia Pachuca", formato: "vertical" },
        { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-7.webp", archivo: "publicacion-7.webp", alt: "Publicación 7 de Blefaroplastia Pachuca", formato: "vertical" },
        { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-8.webp", archivo: "publicacion-8.webp", alt: "Publicación 8 de Blefaroplastia Pachuca", formato: "vertical" },
        { src: "assets/proyectos/blefaroplastia-pachuca/publicacion-9.webp", archivo: "publicacion-9.webp", alt: "Publicación 9 de Blefaroplastia Pachuca", formato: "vertical" } ] },
      { titulo: "Historias", piezas: [
        { src: "assets/proyectos/blefaroplastia-pachuca/historia-1.webp", archivo: "historia-1.webp", alt: "Historia 1 de Blefaroplastia Pachuca", formato: "historia" },
        { src: "assets/proyectos/blefaroplastia-pachuca/historia-2.webp", archivo: "historia-2.webp", alt: "Historia 2 de Blefaroplastia Pachuca", formato: "historia" },
        { src: "assets/proyectos/blefaroplastia-pachuca/historia-3.webp", archivo: "historia-3.webp", alt: "Historia 3 de Blefaroplastia Pachuca", formato: "historia" },
        { src: "assets/proyectos/blefaroplastia-pachuca/historia-4.webp", archivo: "historia-4.webp", alt: "Historia 4 de Blefaroplastia Pachuca", formato: "historia" },
        { src: "assets/proyectos/blefaroplastia-pachuca/historia-5.webp", archivo: "historia-5.webp", alt: "Historia 5 de Blefaroplastia Pachuca", formato: "historia" },
        { src: "assets/proyectos/blefaroplastia-pachuca/historia-6.webp", archivo: "historia-6.webp", alt: "Historia 6 de Blefaroplastia Pachuca", formato: "historia" },
        { src: "assets/proyectos/blefaroplastia-pachuca/historia-7.webp", archivo: "historia-7.webp", alt: "Historia 7 de Blefaroplastia Pachuca", formato: "historia" },
        { src: "assets/proyectos/blefaroplastia-pachuca/historia-8.webp", archivo: "historia-8.webp", alt: "Historia 8 de Blefaroplastia Pachuca", formato: "historia" } ] }
    ],
    proceso: []
  },
  {
    slug: "generacion-diferente",
    publicado: true,
    titulo: "Generación Diferente",
    categorias: ["identidad"],
    disciplina: "Identidad visual completa",
    relacion: "pendiente",
    tono: "sol",
    portada: "",
    resumen: "Logotipo, variaciones, paleta de color, tipografía y aplicaciones de marca.",
    contexto: "",
    objetivo: "",
    participacion: "Diseño del logotipo y del sistema de identidad visual completo.",
    concepto: "",
    decisiones: [],
    entregables: ["Logotipo", "Variaciones del logotipo", "Paleta de color", "Tipografía", "Aplicaciones"],
    resultados: [],
    secciones: [
      { titulo: "Logotipo", piezas: [ { src: "", archivo: "logotipo.webp", alt: "Logotipo principal de Generación Diferente", formato: "ancho" } ] },
      { titulo: "Variaciones", piezas: [
        { src: "", archivo: "variacion-1.webp", alt: "Variación del logotipo", formato: "cuadrado" },
        { src: "", archivo: "variacion-2.webp", alt: "Variación del logotipo", formato: "cuadrado" },
        { src: "", archivo: "variacion-3.webp", alt: "Variación del logotipo", formato: "cuadrado" } ] },
      { titulo: "Color y tipografía", piezas: [
        { src: "", archivo: "paleta.webp", alt: "Paleta de color", formato: "horizontal" },
        { src: "", archivo: "tipografia.webp", alt: "Tipografía de la marca", formato: "horizontal" } ] },
      { titulo: "Aplicaciones", piezas: [
        { src: "", archivo: "aplicacion-1.webp", alt: "Aplicación de marca", formato: "vertical" },
        { src: "", archivo: "aplicacion-2.webp", alt: "Aplicación de marca", formato: "vertical" },
        { src: "", archivo: "aplicacion-3.webp", alt: "Aplicación de marca", formato: "vertical" } ] }
    ],
    proceso: []
  },
  {
    slug: "the-old-barber",
    publicado: true,
    titulo: "The Old Barber",
    categorias: ["identidad", "redes"],
    disciplina: "Marca y contenido",
    relacion: "conceptual",
    tono: "papel",
    portada: "",
    resumen: "Ejercicio de marca y contenido para redes de una barbería imaginaria. No fue un encargo real.",
    contexto: "Es un proyecto conceptual. Lo hice para practicar la construcción de una marca y su contenido para redes; la barbería no existe.",
    objetivo: "",
    participacion: "Todo el desarrollo de la marca y de las publicaciones.",
    concepto: "",
    decisiones: [],
    entregables: [],
    resultados: [],
    secciones: [
      { titulo: "Logotipo", piezas: [ { src: "", archivo: "logotipo.webp", alt: "Logotipo de The Old Barber", formato: "ancho" } ] },
      { titulo: "Paleta y tipografía", piezas: [ { src: "", archivo: "paleta-tipografia.webp", alt: "Paleta y tipografía de The Old Barber", formato: "horizontal" } ] },
      { titulo: "Publicaciones", piezas: [
        { src: "", archivo: "publicacion-1.webp", alt: "Publicación de The Old Barber", formato: "vertical" },
        { src: "", archivo: "publicacion-2.webp", alt: "Publicación de The Old Barber", formato: "vertical" },
        { src: "", archivo: "publicacion-3.webp", alt: "Publicación de The Old Barber", formato: "vertical" } ] },
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
    resumen: "Campaña para dar a conocer clases de bailoterapia y sus beneficios físicos y emocionales.",
    contexto: "Cliente que atendí en Ink House.",
    objetivo: "Atraer nuevos participantes a las clases.",
    participacion: "Diseño de las piezas de la campaña.",
    concepto: "",
    decisiones: [],
    entregables: ["Publicaciones de campaña"],
    resultados: [],
    secciones: [
      { titulo: "Campaña", piezas: [
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
    resumen: "Publicaciones e historias educativas sobre diabetes, glucosa alterada y obesidad para la consulta de una nutrióloga.",
    contexto: "Cliente que atendí en Ink House.",
    objetivo: "Ayudar a reconocer las señales de una glucosa alterada, explicar qué pasa si la diabetes y la obesidad no se controlan, e invitar a tratarlas en consulta con un plan realista, sin dietas extremas.",
    participacion: "Diseño de publicaciones e historias para redes sociales.",
    concepto: "",
    decisiones: [],
    entregables: ["Publicaciones", "Historias"],
    resultados: [],
    secciones: [
      { titulo: "Publicaciones", piezas: [
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
    resumen: "Material promocional para una persona que vende productos de la marca.",
    contexto: "Hice estas piezas para apoyar a una persona que vende productos Ismerely. No fue un encargo de la marca.",
    objetivo: "",
    participacion: "Diseño de las piezas promocionales.",
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
    resumen: "Carteles personales donde pruebo tipografía y composición. Incluye Con mi Espíritu.",
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
