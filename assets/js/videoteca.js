/* ==========================================================
   VIDEOTECA
   Dentro del proyecto "Videos", cada video es un subproyecto.
   Este archivo arma esa vista a partir de window.VIDEOS (videos.js):
   1. Una cuadrícula con todos los subproyectos (miniatura, tipo, título).
   2. El detalle del subproyecto elegido: reproductor, ficha y cuadros clave.
   Enlace directo a un video: index.html#caso/videos/slug
   presentaciones.js llama a Videoteca.html() para pintar la sección
   y a Videoteca.iniciar() cuando el caso se abre.
   ========================================================== */
(function () {
  'use strict';

  var borrador = /[?&]borrador\b/.test(location.search);

  // Lista de videos visibles (los borradores solo con ?borrador)
  function lista() {
    return (window.VIDEOS || []).filter(function (v) { return v.publicado !== false || borrador; });
  }

  // Escapa texto antes de insertarlo como HTML
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function dos(n) { return String(n).padStart(2, '0'); }

  /* ---------- Estructura: subproyectos arriba, detalle abajo ---------- */
  function html() {
    var V = lista();
    if (!V.length) return '<p class="vt__vacio">Próximamente.</p>';
    return '<div class="videoteca" data-videoteca>' +
      '<ul class="vt__lista">' + V.map(function (v, k) {
        return '<li><button type="button" class="vt__item vt__item--' + esc(v.formato || 'horizontal') + '" data-v="' + k + '" aria-pressed="false" aria-controls="vtDetalle">' +
          '<span class="vt__mini"><img src="' + esc(v.poster) + '" alt="" loading="lazy" decoding="async"><span class="vt__play" aria-hidden="true"></span>' +
          (v.duracion ? '<span class="vt__dur">' + esc(v.duracion) + '</span>' : '') + '</span>' +
          '<span class="vt__item-txt"><span class="vt__item-etq">Subproyecto ' + dos(k + 1) + ' · ' + esc(v.etiqueta || 'Video') + '</span><strong>' + esc(v.titulo) + '</strong>' +
          (v.resumen ? '<span class="vt__item-res">' + esc(v.resumen) + '</span>' : '') + '</span>' +
        '</button></li>';
      }).join('') + '</ul>' +
      '<div class="vt__detalle" id="vtDetalle">' +
        '<div class="vt__principal">' +
          '<figure class="vt__pantalla">' +
            '<div class="vt__marco"><video class="vt__video" controls playsinline preload="none"></video></div>' +
            '<figcaption class="vt__pie"><span class="vt__pie-izq"></span><span class="vt__pie-der"></span></figcaption>' +
          '</figure>' +
          '<article class="vt__ficha" aria-live="polite"></article>' +
        '</div>' +
        '<div class="vt__cuadros" data-grupo></div>' +
      '</div>' +
    '</div>';
  }

  /* ---------- Interacción ---------- */
  function iniciar(el) {
    var V = lista();
    if (!V.length) return;
    var video = el.querySelector('.vt__video');
    var detalle = el.querySelector('.vt__detalle');
    var pantalla = el.querySelector('.vt__pantalla');
    var ficha = el.querySelector('.vt__ficha');
    var cuadros = el.querySelector('.vt__cuadros');
    var botones = Array.prototype.slice.call(el.querySelectorAll('.vt__item'));
    var actual = -1;

    // Muestra un subproyecto en el detalle
    function mostrar(k, desplazar) {
      var v = V[k];
      if (!v) return;
      if (k !== actual) {
        actual = k;
        pantalla.classList.toggle('vt__pantalla--vertical', v.formato === 'vertical');
        video.pause();
        video.poster = v.poster || '';
        video.src = v.src;
        video.setAttribute('aria-label', v.titulo);
        el.querySelector('.vt__pie-izq').textContent = v.cliente || v.etiqueta || '';
        el.querySelector('.vt__pie-der').textContent = v.duracion || '';

        var decisiones = (v.decisiones || []).map(function (d, i) {
          return '<li><span class="vt__num">' + dos(i + 1) + '</span><div><strong>' + esc(d.titulo) + '</strong><p>' + esc(d.texto) + '</p></div></li>';
        }).join('');
        ficha.innerHTML =
          '<p class="vt__etq"><span class="vt__sub">Subproyecto ' + dos(k + 1) + '</span><span class="chip chip--fuerte">' + esc(v.etiqueta || 'Video') + '</span></p>' +
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

        botones.forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.v) === k)); });
        history.replaceState(null, '', '#caso/videos/' + v.slug);
      }
      if (desplazar) detalle.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    }

    botones.forEach(function (b) {
      b.addEventListener('click', function () { mostrar(Number(b.dataset.v), true); });
    });

    // Subproyecto inicial: el del enlace (#caso/videos/slug) o el primero
    var pedido = window.__subproyecto; window.__subproyecto = null;
    var k = pedido ? V.findIndex(function (v) { return v.slug === pedido; }) : -1;
    mostrar(k > -1 ? k : 0, false);
    if (k > -1) setTimeout(function () { detalle.scrollIntoView({ block: 'start' }); }, 80);
  }

  // ¿El slug corresponde a un video? (lo usa main.js para enlaces antiguos)
  function existe(slug) { return lista().some(function (v) { return v.slug === slug; }); }

  window.Videoteca = { html: html, iniciar: iniciar, existe: existe, total: function () { return lista().length; } };
})();
