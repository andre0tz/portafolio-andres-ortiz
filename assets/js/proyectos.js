/* =====================================================================
   DATOS DEL PORTAFOLIO
   Este es el único archivo que necesitas editar para cambiar textos,
   agregar imágenes o completar información de cada proyecto.

   Reglas:
   - Si un campo de texto está vacío ("") o en null, no se muestra.
   - Si una imagen tiene src vacío, se muestra un espacio marcado con
     el nombre de archivo sugerido. Copia tu imagen a esa ruta y escribe
     la ruta en src.
   - Abre el sitio con  index.html?pendientes  para ver todo lo que falta.
   ===================================================================== */

window.PERFIL = {
  nombre: "Andres Ortiz",
  rol: "Diseñador gráfico y creativo digital",
  correo: "ortizjuanandres787@gmail.com",
  telefono: "+527711837883",
  telefonoVisible: "771 183 7883",
  // Ruta de tu foto para la portada, por ejemplo "assets/perfil/andres.webp"
  foto: "",
  // Ubicación que quieras mostrar, por ejemplo "Pachuca, Hidalgo"
  ubicacion: "",
  // Enlace a tu CV en PDF, por ejemplo "assets/perfil/cv-andres-ortiz.pdf"
  cv: "",
  redes: {
    instagram: "",
    behance: "",
    linkedin: ""
  },
  // Programas que usas. Se muestran en "Sobre mí" solo si agregas alguno.
  herramientas: []
};

/* Tipos de relación. Sirven para que nadie confunda un ejercicio
   personal con un cliente. */
window.RELACIONES = {
  cliente: "Proyecto para cliente",
  profesional: "Trabajo profesional",
  colaboracion: "Colaboración",
  conceptual: "Proyecto conceptual",
  personal: "Ejercicio personal",
  pendiente: ""
};

window.FILTROS = [
  { id: "todos", nombre: "Todos" },
  { id: "identidad", nombre: "Identidad visual" },
  { id: "publicidad", nombre: "Publicidad" },
  { id: "redes", nombre: "Redes y video" },
  { id: "personal", nombre: "Personal" }
];

/* Cada proyecto:
   tono: color de la portada tipográfica (cobalto, tinta, cielo, papel, sol)
   portada: imagen de la tarjeta. Si está vacía se usa la portada tipográfica.
   secciones: bloques de piezas que aparecen dentro del caso.
   formato de pieza: "cuadrado", "vertical", "horizontal", "ancho", "historia"
   tipo de pieza: "imagen" (por defecto) o "video" */
window.PROYECTOS = [
  {
    slug: "generacion-diferente",
    titulo: "Generación Diferente",
    corto: "GD",
    categorias: ["identidad"],
    disciplina: "Identidad visual completa",
    relacion: "pendiente",
    tono: "cobalto",
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
    slug: "moncar",
    titulo: "Moncar",
    corto: "MC",
    categorias: ["publicidad", "redes"],
    disciplina: "Publicidad, contenido y video",
    relacion: "profesional",
    tono: "tinta",
    portada: "",
    resumen: "Publicidad, videos de producto y campañas para una refaccionaria automotriz. También programé una app para sus reportes mensuales.",
    contexto: "Moncar es una refaccionaria automotriz. Ahí me encargo de las publicaciones y de la pauta en redes sociales.",
    objetivo: "",
    participacion: "Diseño las piezas publicitarias, grabo y edito videos cortos de producto, preparo campañas y publico el contenido. También desarrollé una aplicación para ordenar las métricas y armar el reporte de cada mes.",
    concepto: "",
    decisiones: [],
    entregables: ["Piezas publicitarias", "Videos de producto", "Campañas en redes", "Contenido para redes", "App de métricas y reportes mensuales"],
    // Agrega aquí solo cifras que puedas comprobar, con su periodo y fuente.
    // Ejemplo: { dato: "", descripcion: "", fuente: "Meta Business Suite, agosto 2026" }
    resultados: [],
    secciones: [
      { titulo: "Piezas publicitarias", piezas: [
        { src: "", archivo: "publicidad-1.webp", alt: "Pieza publicitaria de Moncar", formato: "cuadrado" },
        { src: "", archivo: "publicidad-2.webp", alt: "Pieza publicitaria de Moncar", formato: "cuadrado" },
        { src: "", archivo: "publicidad-3.webp", alt: "Pieza publicitaria de Moncar", formato: "cuadrado" } ] },
      { titulo: "Videos de producto", piezas: [
        { tipo: "video", src: "", poster: "", archivo: "video-producto-1.mp4", alt: "Video de producto", formato: "historia" },
        { tipo: "video", src: "", poster: "", archivo: "video-producto-2.mp4", alt: "Video de producto", formato: "historia" },
        { tipo: "video", src: "", poster: "", archivo: "video-producto-3.mp4", alt: "Video de producto", formato: "historia" } ] },
      { titulo: "Campañas", piezas: [
        { src: "", archivo: "campana-1.webp", alt: "Campaña de Moncar", formato: "horizontal" },
        { src: "", archivo: "campana-2.webp", alt: "Campaña de Moncar", formato: "horizontal" } ] },
      { titulo: "App de métricas y reportes", nota: "Herramienta interna para organizar métricas y reportes mensuales.", piezas: [
        { src: "", archivo: "app-reportes.webp", alt: "Captura de la aplicación de reportes", formato: "ancho" } ] }
    ],
    proceso: []
  },
  {
    slug: "ink-house",
    titulo: "Ink House",
    corto: "IH",
    categorias: ["publicidad", "redes"],
    disciplina: "Campañas y redes sociales",
    relacion: "pendiente",
    tono: "cielo",
    portada: "",
    resumen: "Campañas publicitarias y contenido para redes, organizados por conjunto.",
    contexto: "",
    objetivo: "",
    participacion: "Diseño de campañas publicitarias y de publicaciones para redes sociales.",
    concepto: "",
    decisiones: [],
    entregables: ["Campañas publicitarias", "Publicaciones para redes"],
    resultados: [],
    secciones: [
      { titulo: "Campaña 1", nota: "Escribe aquí el nombre de la campaña.", piezas: [
        { src: "", archivo: "campana-1-a.webp", alt: "Pieza de campaña", formato: "vertical" },
        { src: "", archivo: "campana-1-b.webp", alt: "Pieza de campaña", formato: "vertical" },
        { src: "", archivo: "campana-1-c.webp", alt: "Pieza de campaña", formato: "vertical" } ] },
      { titulo: "Campaña 2", piezas: [
        { src: "", archivo: "campana-2-a.webp", alt: "Pieza de campaña", formato: "vertical" },
        { src: "", archivo: "campana-2-b.webp", alt: "Pieza de campaña", formato: "vertical" },
        { src: "", archivo: "campana-2-c.webp", alt: "Pieza de campaña", formato: "vertical" } ] },
      { titulo: "Redes sociales", nota: "Vista de feed: así se ven las publicaciones juntas.", piezas: [
        { src: "", archivo: "feed-1.webp", alt: "Publicación", formato: "cuadrado" },
        { src: "", archivo: "feed-2.webp", alt: "Publicación", formato: "cuadrado" },
        { src: "", archivo: "feed-3.webp", alt: "Publicación", formato: "cuadrado" },
        { src: "", archivo: "feed-4.webp", alt: "Publicación", formato: "cuadrado" },
        { src: "", archivo: "feed-5.webp", alt: "Publicación", formato: "cuadrado" },
        { src: "", archivo: "feed-6.webp", alt: "Publicación", formato: "cuadrado" } ] }
    ],
    proceso: []
  },
  {
    slug: "casiopea",
    titulo: "Casiopea",
    corto: "CS",
    categorias: ["identidad"],
    disciplina: "Diseño para cliente",
    relacion: "cliente",
    tono: "papel",
    portada: "",
    resumen: "Trabajo de diseño para un cliente.",
    contexto: "",
    objetivo: "",
    // Describe solo lo que entregaste de verdad.
    participacion: "",
    concepto: "",
    decisiones: [],
    entregables: [],
    resultados: [],
    secciones: [
      { titulo: "Piezas entregadas", piezas: [
        { src: "", archivo: "pieza-1.webp", alt: "Pieza para Casiopea", formato: "horizontal" },
        { src: "", archivo: "pieza-2.webp", alt: "Pieza para Casiopea", formato: "horizontal" } ] }
    ],
    proceso: []
  },
  {
    slug: "the-old-barber",
    titulo: "The Old Barber",
    corto: "OB",
    categorias: ["identidad"],
    disciplina: "Desarrollo de marca",
    relacion: "conceptual",
    tono: "sol",
    portada: "",
    resumen: "Ejercicio de marca para una barbería imaginaria. No fue un encargo real.",
    contexto: "Es un proyecto conceptual. Lo hice para practicar la construcción de una marca de principio a fin; la barbería no existe.",
    objetivo: "",
    participacion: "Todo el desarrollo de la marca.",
    concepto: "",
    decisiones: [],
    entregables: ["Logotipo", "Paleta y tipografía", "Aplicaciones"],
    resultados: [],
    secciones: [
      { titulo: "Logotipo", piezas: [ { src: "", archivo: "logotipo.webp", alt: "Logotipo de The Old Barber", formato: "ancho" } ] },
      { titulo: "Paleta y tipografía", piezas: [ { src: "", archivo: "paleta-tipografia.webp", alt: "Paleta y tipografía", formato: "horizontal" } ] },
      { titulo: "Aplicaciones", piezas: [
        { src: "", archivo: "aplicacion-1.webp", alt: "Aplicación de marca", formato: "vertical" },
        { src: "", archivo: "aplicacion-2.webp", alt: "Aplicación de marca", formato: "vertical" } ] }
    ],
    proceso: []
  },
  {
    slug: "sumergela",
    titulo: "Sumérgela",
    corto: "SM",
    categorias: ["publicidad"],
    disciplina: "Diseño promocional",
    relacion: "colaboracion",
    tono: "cielo",
    portada: "",
    resumen: "Material promocional para una persona que vende productos de la marca.",
    contexto: "Hice estas piezas para apoyar a una persona que vende productos Sumérgela. No fue un encargo de la marca.",
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
    titulo: "Serie gráfica cristiana",
    corto: "SG",
    categorias: ["personal"],
    disciplina: "Carteles personales",
    relacion: "personal",
    tono: "tinta",
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
  }
];
