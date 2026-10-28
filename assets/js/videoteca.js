/* ==========================================================
   VIDEOTECA
   Pinta la sección "Videos" a partir de window.VIDEOS (videos.js):
   un reproductor principal con la ficha del video elegido y, debajo,
   la lista de todos los videos para cambiar entre ellos.
   Enlace directo a un video: index.html#video/slug
   ========================================================== */
(function () {
  'use strict';

  var raiz = document.getElementById('videoteca');
  if (!raiz) return;

  var borrador = /[?&]borrador\b/.test(location.search);
  var VIDEOS = (window.VIDEOS || []).filter(function (v) { return v.publicado !== false || borrador; });
  var seccion = document.getElementById('videos');

  // Sin videos, la sección y su enlace del menú no se muestran
  if (!VIDEOS.length) {
    seccion.hidden = true;
    Array.prototype.forEach.call(document.querySelectorAll('a[href="#videos"]'), function (a) { a.hidden = true; });
    return;
  }

  // Escapa texto antes de insertarlo como HTML
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function dos(n) { return String(n).padStart(2, '0'); }

  /* ---------- Estructura fija: reproductor, ficha y lista ---------- */
  raiz.innerHTML =
    '<div class="vt__principal">' +
      '<figure class="vt__pantalla" id="vtPantalla">' +
        '<div class="vt__marco"><video id="vtVideo" controls playsinline preload="none"></video></div>' +
        '<figcaption class="vt__pie"><span id="vtEtiqueta"></span><span id="vtDuracion"></span></figcaption>' +
      '</figure>' +
      '<article class="vt__ficha" id="vtFicha" aria-live="polite"></article>' +
    '</div>' +
    '<div class="vt__cuadros" id="vtCuadros" data-grupo></div>' +
    (VIDEOS.length > 1
      ? '<div class="vt__lista-cab"><p class="vt__lista-tit">Todos los videos</p><span class="vt__cuenta">' + VIDEOS.length + ' videos</span></div>' +
        '<ul class="vt__lista" id="vtLista">' + VIDEOS.map(function (v, k) {
          return '<li><button type="button" class="vt__item vt__item--' + esc(v.formato || 'horizontal') + '" data-v="' + k + '" aria-pressed="false">' +
            '<span class="vt__mini"><img src="' + esc(v.poster) + '" alt="" loading="lazy" decoding="async"><span class="vt__play" aria-hidden="true"></span>' +
            (v.duracion ? '<span class="vt__dur">' + esc(v.duracion) + '</span>' : '') + '</span>' +
            '<span class="vt__item-txt"><span class="vt__item-etq">' + esc(v.etiqueta || '') + '</span><strong>' + esc(v.titulo) + '</strong></span>' +
          '</button></li>';
        }).join('') + '</ul>'
      : '');

  var video = document.getElementById('vtVideo');
  var pantalla = document.getElementById('vtPantalla');
  var ficha = document.getElementById('vtFicha');
  var cuadros = document.getElementById('vtCuadros');
  var lista = document.getElementById('vtLista');
  var actual = -1;

  /* ---------- Muestra un video en el reproductor ---------- */
  function mostrar(k, desplazar) {
    var v = VIDEOS[k];
    if (!v || k === actual) return;
    actual = k;

    // Reproductor: formato, fuente y póster
    pantalla.classList.toggle('vt__pantalla--vertical', v.formato === 'vertical');
    video.pause();
    video.poster = v.poster || '';
    video.src = v.src;
    video.setAttribute('aria-label', v.titulo);
    document.getElementById('vtEtiqueta').textContent = v.cliente || v.etiqueta || '';
    document.getElementById('vtDuracion').textContent = v.duracion || '';

    // Ficha del video
    var decisiones = (v.decisiones || []).map(function (d, i) {
      return '<li><span class="vt__num">' + dos(i + 1) + '</span><div><strong>' + esc(d.titulo) + '</strong><p>' + esc(d.texto) + '</p></div></li>';
    }).join('');
    ficha.innerHTML =
      '<p class="vt__etq"><span class="chip chip--fuerte">' + esc(v.etiqueta || 'Video') + '</span></p>' +
      '<h3 class="vt__titulo">' + esc(v.titulo) + '</h3>' +
      (v.resumen ? '<p class="vt__resumen">' + esc(v.resumen) + '</p>' : '') +
      '<dl class="vt__datos">' +
        (v.contexto ? '<div><dt>Contexto</dt><dd>' + esc(v.contexto) + '</dd></div>' : '') +
        (v.participacion ? '<div><dt>Mi aportación</dt><dd>' + esc(v.participacion) + '</dd></div>' : '') +
      '</dl>' +
      (decisiones ? '<p class="vt__sub">Decisiones de diseño</p><ol class="vt__decisiones">' + decisiones + '</ol>' : '');

    // Fotogramas: se amplían con el visor del portafolio (data-src)
    var cs = v.cuadros || [];
    cuadros.hidden = !cs.length;
    cuadros.innerHTML = cs.length
      ? '<p class="vt__sub">Cuadros clave</p><div class="vt__cuadros-fila">' + cs.map(function (c, i) {
          return '<button type="button" class="pieza__btn vt__cuadro" data-src="' + esc(c.src) + '" data-alt="' + esc('Cuadro del video: ' + c.titulo) +
            '" data-titulo="' + esc(c.titulo) + '" data-desc="' + esc(v.resumen || '') + '" data-seccion="' + esc(v.titulo) + '" data-k="' + i + '" aria-label="Ampliar: ' + esc(c.titulo) + '">' +
            '<img src="' + esc(c.src) + '" alt="" loading="lazy" decoding="async"></button>';
        }).join('') + '</div>'
      : '';

    // Lista: marca el video activo
    if (lista) Array.prototype.forEach.call(lista.querySelectorAll('.vt__item'), function (b) {
      b.setAttribute('aria-pressed', String(Number(b.dataset.v) === k));
    });

    if (desplazar) pantalla.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }

  // Clic en la lista
  if (lista) lista.addEventListener('click', function (e) {
    var b = e.target.closest('.vt__item'); if (!b) return;
    mostrar(Number(b.dataset.v), true);
    history.replaceState(null, '', '#video/' + VIDEOS[Number(b.dataset.v)].slug);
  });

  // Clic en un cuadro clave: abre el visor con todos los cuadros del video
  cuadros.addEventListener('click', function (e) {
    var b = e.target.closest('[data-src]'); if (!b || !window.abrirVisorLista) return;
    e.preventDefault(); e.stopPropagation();
    var botones = Array.prototype.slice.call(cuadros.querySelectorAll('[data-src]'));
    window.abrirVisorLista(botones.map(function (x) { return Object.assign({}, x.dataset); }), botones.indexOf(b), b);
  });

  /* ---------- Enlaces directos ---------- */
  // #video/slug abre ese video. Los enlaces antiguos #caso/slug de un
  // video que antes era proyecto también llegan aquí.
  function desdeHash() {
    var m = location.hash.match(/^#(?:video|caso)\/([\w-]+)/);
    if (!m) return;
    var k = VIDEOS.findIndex(function (v) { return v.slug === m[1]; });
    if (k < 0) return;
    if (/^#caso\//.test(location.hash)) history.replaceState(null, '', '#video/' + m[1]);
    mostrar(k);
    setTimeout(function () { seccion.scrollIntoView({ block: 'start' }); }, 60);
  }
  window.addEventListener('hashchange', desdeHash);

  mostrar(0);
  desdeHash();
})();
