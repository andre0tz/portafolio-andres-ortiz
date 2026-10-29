/* ==========================================================
   VIDEOS
   Cada video del proyecto "Videos" vive aquí. Para agregar uno
   nuevo, copia un bloque { ... } completo, pégalo al principio
   de la lista (aparece como la primera tarjeta) y cambia sus datos.

   Campos:
   slug          Nombre corto sin espacios. Sirve para el enlace
                 directo: index.html#caso/videos/slug
   publicado     true se muestra; false queda oculto (se ve con ?borrador)
   titulo        Nombre del video
   etiqueta      Tipo de pieza: "Pieza para evento", "Reel", "Anuncio"...
   cliente       Para quién se hizo (opcional)
   formato       "horizontal" (16:9) o "vertical" (9:16, Reels e historias)
   src           Ruta del MP4 (H.264, menos de 8 MB si es posible)
   poster        Imagen que se ve antes de reproducir
   duracion      Texto, por ejemplo "0:45"
   resumen       Una o dos frases sobre qué es el video
   contexto      Para qué se hizo y dónde se usó
   participacion Qué hiciste tú
   decisiones    Lista de { titulo, texto } con las decisiones de diseño
   cuadros       Lista de fotogramas { src, titulo } que se amplían en el visor
   ========================================================== */
window.VIDEOS = [
  {
    slug: "intro-congreso",
    publicado: true,
    titulo: "Intro para congreso cristiano",
    etiqueta: "Pieza para evento",
    cliente: "Congreso cristiano",
    formato: "horizontal",
    src: "assets/proyectos/intro-congreso/intro-congreso.mp4",
    poster: "assets/proyectos/intro-congreso/poster.webp",
    duracion: "3:02",
    resumen: "Pieza audiovisual con animación tipográfica que se proyectó como introducción de un congreso cristiano.",
    contexto: "El video se creó para un evento de la iglesia y se usó para abrir el congreso. Su mensaje central es quién es Jesús, contado frase por frase.",
    participacion: "Desarrollé la animación tipográfica: elegí qué palabras destacar, compuse cada frase sobre las escenas y sincronicé la aparición de los textos con el audio.",
    decisiones: [
      { titulo: "Jerarquía en cada frase", texto: "Las palabras clave, como amor, hijo o débiles, aparecen más grandes que los conectores. La frase se entiende de un vistazo y el énfasis acompaña al de la voz." },
      { titulo: "Serifa clásica", texto: "Una tipografía con serifa y alto contraste remite a los textos bíblicos y da a la pieza un tono solemne sin perder legibilidad en pantalla." },
      { titulo: "Paleta sepia", texto: "Tonos cálidos y texturas de pergamino unifican las escenas y dejan que el texto destaque sin competir con la imagen." },
      { titulo: "Texto en el espacio libre", texto: "Cada frase ocupa la zona vacía del encuadre, junto al rostro y nunca encima, para que imagen y mensaje se lean juntos." }
    ],
    cuadros: [
      { src: "assets/proyectos/intro-congreso/cuadro-1.webp", titulo: "Ninguna medida puede definir los límites de su amor" },
      { src: "assets/proyectos/intro-congreso/cuadro-2.webp", titulo: "Él es la doctrina fundamental de la verdadera teología" },
      { src: "assets/proyectos/intro-congreso/cuadro-3.webp", titulo: "Él defiende a los débiles" },
      { src: "assets/proyectos/intro-congreso/cuadro-4.webp", titulo: "Desearía poder describirlo, pero Él es indescriptible" }
    ]
  }
];
