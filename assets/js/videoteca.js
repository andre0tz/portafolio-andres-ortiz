/* ==========================================================
   VIDEOTECA
   Dentro del proyecto "Videos", cada video es una tarjeta.
   Al abrir una tarjeta, se expande y dentro aparecen el video,
   su información (contexto, aportación, decisiones) y sus cuadros
   clave. Los datos vienen de window.VIDEOS (videos.js).
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

  /* ---------- Contenido interior de una tarjeta abierta ---------- */
  function interior(v) {
    var decisiones = (v.decisiones || []).map(function (d, i) {
      return '<li><span class="vt__num">' + dos(i + 1) + '</span><div><strong>' + esc(d.titulo) + '</strong><p>' + esc(d.texto) + '</p></div></li>';
    }).join('');
    var cuadros = (v.cuadros || []).map(function (c, i) {
      return '<button type="button" class="pieza__btn vt__cuadro" data-src="' + esc(c.src) + '" data-alt="' + esc('Cuadro del video: ' + c.titulo) +
        '" data-titulo="' + esc(c.titulo) + '" data-desc="' + esc(v.resumen || '') + '" data-seccion="' + esc(v.titulo) + '" data-k="' + i + '" aria-label="Ampliar: ' + esc(c.titulo) + '">' +
        '<img src="' + esc(c.src) + '" alt="" loading="lazy" decoding="async"></button>';
    }).join('');
    return '<div class="vt__principal">' +
        '<figure class="vt__pantalla' + (v.formato === 'vertical' ? ' vt__pantalla--vertical' : '') + '">' +
          '<div class="vt__marco"><video class="vt__video" src="' + esc(v.src) + '"' + (v.poster ? ' poster="' + esc(v.poster) + '"' : '') +
            ' controls playsinline preload="metadata" aria-label="' + esc(v.titulo) + '"></video></div>' +
          '<figcaption class="vt__pie"><span>' + esc(v.cliente || v.etiqueta || '') + '</span><span>' + esc(v.duracion || '') + '</span></figcaption>' +
        '</figure>' +
        '<div class="vt__ficha">' +
          '<dl class="vt__datos">' +
            (v.contexto ? '<div><dt>Contexto</dt><dd>' + esc(v.contexto) + '</dd></div>' : '') +
            (v.participacion ? '<div><dt>Mi aportación</dt><dd>' + esc(v.participacion) + '</dd></div>' : '') +
          '</dl>' +
          (decisiones ? '<p class="vt__sub">Decisiones de diseño</p><ol class="vt__decisiones">' + decisiones + '</ol>' : '') +
        '</div>' +
      '</div>' +
      (cuadros ? '<div class="vt__cuadros" data-grupo><p class="vt__sub">Cuadros clave</p><div class="vt__cuadros-fila">' + cuadros + '</div></div>' : '');
  }

  /* ---------- Una tarjeta por video ---------- */
  function html() {
    var V = lista();
    if (!V.length) return '<p class="vt__vacio">Próximamente.</p>';
    return '<ul class="videoteca" data-videoteca>' + V.map(function (v, k) {
      var id = 'vt-' + esc(v.slug);
      return '<li class="vt__tarjeta vt__tarjeta--' + esc(v.formato || 'horizontal') + '" data-v="' + k + '" id="' + id + '">' +
        // Cabecera: siempre visible; al pulsarla abre o cierra la tarjeta
        '<button type="button" class="vt__abrir" aria-expanded="false" aria-controls="' + id + '-cont">' +
          '<span class="vt__mini"><img src="' + esc(v.poster) + '" alt="" loading="lazy" decoding="async"><span class="vt__play" aria-hidden="true"></span>' +
            (v.duracion ? '<span class="vt__dur">' + esc(v.duracion) + '</span>' : '') + '</span>' +
          '<span class="vt__txt">' +
            '<span class="vt__etq">' + esc(v.etiqueta || 'Video') + '</span>' +
            '<strong class="vt__titulo">' + esc(v.titulo) + '</strong>' +
            (v.resumen ? '<span class="vt__resumen">' + esc(v.resumen) + '</span>' : '') +
            '<span class="vt__accion" aria-hidden="true"><span class="vt__accion-abrir">Ver video</span><span class="vt__accion-cerrar">Cerrar</span></span>' +
          '</span>' +
        '</button>' +
        // Interior: se llena al abrir la tarjeta (así el video no se descarga antes)
        '<div class="vt__contenido" id="' + id + '-cont" hidden></div>' +
      '</li>';
    }).join('') + '</ul>';
  }

  /* ---------- Abrir y cerrar tarjetas ---------- */
  function iniciar(el) {
    var V = lista();
    if (!V.length) return;
    var tarjetas = Array.prototype.slice.call(el.querySelectorAll('.vt__tarjeta'));
    var suave = !matchMedia('(prefers-reduced-motion: reduce)').matches;

    function cerrar(t) {
      var b = t.querySelector('.vt__abrir'), c = t.querySelector('.vt__contenido');
      var video = c.querySelector('video'); if (video) video.pause();
      b.setAttribute('aria-expanded', 'false');
      t.classList.remove('abierta');
      c.hidden = true;
    }

    function abrir(t, reproducir) {
      // Solo una tarjeta abierta a la vez
      tarjetas.forEach(function (o) { if (o !== t && o.classList.contains('abierta')) cerrar(o); });
      var v = V[Number(t.dataset.v)];
      var b = t.querySelector('.vt__abrir'), c = t.querySelector('.vt__contenido');
      if (!c.firstChild) c.innerHTML = interior(v);
      b.setAttribute('aria-expanded', 'true');
      t.classList.add('abierta');
      c.hidden = false;
      history.replaceState(null, '', '#caso/videos/' + v.slug);
      t.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: 'start' });
      if (reproducir) { var video = c.querySelector('video'); var p = video && video.play(); if (p && p.catch) p.catch(function () {}); }
    }

    tarjetas.forEach(function (t) {
      t.querySelector('.vt__abrir').addEventListener('click', function () {
        if (t.classList.contains('abierta')) { cerrar(t); history.replaceState(null, '', '#caso/videos'); }
        else abrir(t, true);
      });
    });

    // Enlace directo: #caso/videos/slug abre esa tarjeta (sin reproducir)
    var pedido = window.__subproyecto; window.__subproyecto = null;
    if (pedido) {
      var t = tarjetas.filter(function (x) { return V[Number(x.dataset.v)].slug === pedido; })[0];
      if (t) setTimeout(function () { abrir(t, false); }, 80);
    }
  }

  // ¿El slug corresponde a un video? (lo usa main.js para enlaces antiguos)
  function existe(slug) { return lista().some(function (v) { return v.slug === slug; }); }

  window.Videoteca = { html: html, iniciar: iniciar, existe: existe, total: function () { return lista().length; } };
})();
