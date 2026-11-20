/* ==========================================================
   Genera las imágenes para compartir (1200 x 630, JPG) en
   assets/compartir/: una general y una por proyecto.
   Requiere Playwright. Uso: node herramientas/compartir/imagenes.js
   ========================================================== */
'use strict';
const path = require('path');
const { chromium } = require('playwright');
const { RAIZ, proyectos } = require('./datos');

const SALIDA = path.join(RAIZ, 'assets/compartir');
const PLANTILLA = 'file://' + path.join(__dirname, 'tarjeta.html');

(async function () {
  require('fs').mkdirSync(SALIDA, { recursive: true });
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });

  // Pinta la tarjeta con un título, una disciplina y una o tres imágenes
  async function tarjeta(titulo, disciplina, imagenes, archivo, ancha) {
    await pagina.goto(PLANTILLA);
    await pagina.evaluate(function (d) {
      var t = document.getElementById('titulo');
      t.textContent = d.titulo;
      t.classList.toggle('largo', d.titulo.length > 18);
      document.getElementById('disciplina').textContent = d.disciplina;
      var caja = document.getElementById('imagenes');
      caja.className = 'tarjeta__imagenes ' + (d.imagenes.length > 1 ? 'tres' : 'una') + (d.ancha ? ' ancha' : '');
      caja.innerHTML = d.imagenes.map(function (src) { return '<img src="' + src + '" alt="">'; }).join('');
    }, { titulo: titulo, disciplina: disciplina, imagenes: imagenes, ancha: ancha });
    await pagina.evaluate(function () { return Promise.all([document.fonts.ready].concat([].map.call(document.images, function (i) { return i.decode().catch(function () {}); }))); });
    await pagina.screenshot({ path: path.join(SALIDA, archivo), type: 'jpeg', quality: 86 });
    console.log('Lista:', archivo);
  }

  const ruta = function (src) { return 'file://' + path.join(RAIZ, src); };

  // Imagen general del portafolio: tres proyectos destacados
  const destacados = proyectos.slice(0, 3).map(function (p) { return ruta(p.portada); });
  await tarjeta('Ideas claras, bien diseñadas', 'Diseño gráfico y contenido para redes', destacados, 'portafolio.jpg');

  // Una imagen por proyecto con su portada
  for (const p of proyectos) {
    const ancha = /pliego|poster|portada\.webp$/.test(p.portada);
    await tarjeta(p.titulo, p.disciplina || '', [ruta(p.portada)], p.slug + '.jpg', ancha);
  }
  await navegador.close();
})();
