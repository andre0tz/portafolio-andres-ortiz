/* ==========================================================
   Tablero de voces tipográficas (The Old Barber)
   Abre un panel a la vez. Cada pestaña es un botón que marca
   su panel como abierto y cierra los demás.
   ========================================================== */
(function () {
  'use strict';
  var tablero = document.querySelector('[data-voces]');
  if (!tablero) return;
  var voces = Array.prototype.slice.call(tablero.querySelectorAll('[data-voz]'));

  // Abre el panel indicado y actualiza los estados accesibles
  function abrir(elegida) {
    voces.forEach(function (v) {
      var abierta = v === elegida;
      v.setAttribute('aria-expanded', String(abierta));
      v.querySelector('.voz__pestana').setAttribute('aria-expanded', String(abierta));
    });
  }

  voces.forEach(function (v, i) {
    var boton = v.querySelector('.voz__pestana');
    boton.addEventListener('click', function () { abrir(v); });
    // Flechas izquierda y derecha recorren los paneles desde el teclado
    boton.addEventListener('keydown', function (e) {
      var d = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      var siguiente = voces[(i + d + voces.length) % voces.length];
      abrir(siguiente);
      siguiente.querySelector('.voz__pestana').focus();
    });
  });
})();
