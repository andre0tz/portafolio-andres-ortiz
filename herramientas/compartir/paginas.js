/* ==========================================================
   Genera una página para compartir por proyecto en p/<slug>/.
   Cada página lleva su título, descripción e imagen (Open Graph
   y Twitter) y redirige al caso dentro del portafolio. Así, al
   pegar el enlace en WhatsApp o LinkedIn se ve el proyecto y no
   la portada general (los enlaces con # no se pueden previsualizar).
   Uso: node herramientas/compartir/paginas.js
   ========================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const { RAIZ, SITIO, proyectos, descripcion } = require('./datos');

// Escapa texto para atributos HTML
function esc(t) {
  return String(t).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

proyectos.forEach(function (p) {
  const url = SITIO + 'p/' + p.slug + '/';
  // Ruta relativa: funciona igual en GitHub Pages que en una copia local
  const destino = '../../#caso/' + p.slug;
  const titulo = p.titulo + ' · Andres Ortiz';
  const desc = descripcion(p);
  const imagen = SITIO + 'assets/compartir/' + p.slug + '.jpg';
  const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="noindex, follow">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Andres Ortiz · Portafolio">
<meta property="og:locale" content="es_MX">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${imagen}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(p.titulo)}, proyecto de Andres Ortiz">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${imagen}">
<link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml">
<meta http-equiv="refresh" content="0; url=${destino}">
</head>
<body>
<p><a href="${destino}">Ver ${esc(p.titulo)} en el portafolio de Andres Ortiz</a></p>
</body>
</html>
`;
  const dir = path.join(RAIZ, 'p', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('Lista:', 'p/' + p.slug + '/');
});
