/* ==========================================================
   Datos comunes para las vistas al compartir.
   Lee los proyectos de assets/js/proyectos.js y decide qué
   proyectos tienen página propia para compartir: los publicados
   que ya tienen portada.
   ========================================================== */
'use strict';
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');
const SITIO = 'https://andre0tz.github.io/portafolio-andres-ortiz/';

// proyectos.js asigna sus datos a window; aquí se simula ese objeto
global.window = global.window || {};
require(path.join(RAIZ, 'assets/js/proyectos.js'));

const proyectos = window.PROYECTOS.filter(function (p) { return p.publicado && p.portada; });

// Descripción breve: el resumen del proyecto, recortado a unos 190 caracteres
function descripcion(p) {
  const t = (p.resumen || '').trim();
  if (t.length <= 190) return t;
  return t.slice(0, t.lastIndexOf(' ', 187)) + '…';
}

module.exports = { RAIZ, SITIO, proyectos, descripcion };
