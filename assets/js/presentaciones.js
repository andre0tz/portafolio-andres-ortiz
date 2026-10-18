/* =====================================================================
   PRESENTACIONES DE PROYECTOS
   Cada sección de un proyecto puede tener un "tipo" de presentación:

   - "mazo"       Publicaciones en marcos de Instagram apiladas como
                  mazo. Se abren en abanico al pasar el cursor.
   - "historias"  Historias dentro de un teléfono que las reproduce,
                  con vista de Instagram o de Facebook.
   - "carruseles" Carruseles de Instagram que se deslizan.
   - "campana"    Campaña dividida en capítulos, cada uno en un muro
                  con perspectiva.
   - (sin tipo)   Galería normal.

   Uso desde main.js: Presenta.html(seccion, proyecto) y
   Presenta.iniciar(contenedor) después de pintar el caso.
   ===================================================================== */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var observadores = [];

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function dos(n) { return String(n).padStart(2, '0'); }
  function icono(id, clase) { return '<svg class="' + (clase || 'ico') + '" aria-hidden="true"><use href="#' + id + '"/></svg>'; }

  function cuentaDe(p) {
    var c = p.cuenta || {};
    var nombre = c.nombre || p.titulo || '';
    var ini = c.iniciales || nombre.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
    return { nombre: nombre, iniciales: ini, color: c.color || '#1f4fe0' };
  }
  function avatar(cu, clase) {
    return '<span class="' + (clase || 'ig__avatar') + '" style="--c:' + esc(cu.color) + '" aria-hidden="true"><span>' + esc(cu.iniciales) + '</span></span>';
  }
  function imagen(x, extra) {
    return '<img src="' + esc(x.src) + '" alt="' + esc(x.alt) + '" loading="lazy" decoding="async"' + (extra || '') + '>';
  }
  function hueco(x, slug) {
    return '<div class="hueco"><svg aria-hidden="true"><use href="#i-imagen"/></svg><span>Imagen pendiente</span><code>' +
      esc('assets/proyectos/' + slug + '/' + (x.archivo || '')) + '</code></div>';
  }

  /* ---------- Marco de publicación de Instagram ---------- */
  function cabeceraIG(cu) {
    return '<header class="ig__cab">' + avatar(cu) + '<span class="ig__nombre">' + esc(cu.nombre) + '</span>' + icono('i-ig-mas', 'ig__mas') + '</header>';
  }
  function accionesIG(medio) {
    return '<footer class="ig__acciones">' +
      '<button type="button" class="ig__like" aria-pressed="false" aria-label="Me gusta">' + icono('i-ig-corazon') + '</button>' +
      icono('i-ig-comentario') + icono('i-ig-enviar') +
      '<span class="ig__medio">' + (medio || '') + '</span>' +
      icono('i-ig-guardar') +
      '</footer><div class="ig__texto" aria-hidden="true"><i></i><i></i></div>';
  }
  function postIG(x, p, cu, atributos) {
    var media = x.src
      ? '<button type="button" class="pieza__btn ig__media" aria-label="Ampliar: ' + esc(x.alt) + '">' + imagen(x) + '</button>'
      : '<div class="ig__media">' + hueco(x, p.slug) + '</div>';
    return '<article class="ig"' + (atributos || '') + '>' + cabeceraIG(cu) + media + accionesIG() + '</article>';
  }

  /* ---------- Mazo ---------- */
  function mazo(s, p) {
    var cu = cuentaDe(p), n = s.piezas.length;
    return '<div class="mazo" data-mazo>' +
      '<div class="mazo__escena"><div class="mazo__pila" data-grupo>' +
        s.piezas.map(function (x, k) { return postIG(x, p, cu, ' data-k="' + k + '" data-pos="' + (k < 3 ? k : 'x') + '"'); }).join('') +
      '</div></div>' +
      '<div class="mazo__panel">' +
        '<p class="mazo__contador"><b data-actual>01</b><span>/ ' + dos(n) + '</span></p>' +
        '<p class="mazo__ayuda"><span class="solo-hover">Pasa el cursor sobre el mazo para abrirlo. Usa las flechas para recorrerlo y haz clic en la publicación del frente para verla en grande.</span><span class="solo-tactil">Desliza el mazo o usa las flechas para recorrerlo. Toca la publicación del frente para verla en grande.</span></p>' +
        '<div class="mazo__ctrl">' +
          '<button type="button" class="redondo" data-mover="-1" aria-label="Publicación anterior">' + icono('i-flecha', 'ico gira-izq') + '</button>' +
          '<button type="button" class="redondo redondo--lleno" data-mover="1" aria-label="Publicación siguiente">' + icono('i-flecha', 'ico gira-der') + '</button>' +
        '</div>' +
        '<button type="button" class="enlace-mono" data-cuadricula aria-expanded="false">Ver las ' + n + ' en cuadrícula</button>' +
      '</div>' +
      '<div class="mazo__grid" data-grupo hidden>' + s.piezas.map(function (x) { return postIG(x, p, cu); }).join('') + '</div>' +
    '</div>';
  }

  function iniciarMazo(el) {
    var pila = $('.mazo__pila', el), cartas = $$('.ig', pila), n = cartas.length, actual = 0;
    var contador = $('[data-actual]', el);
    function pintar(dir) {
      cartas.forEach(function (c, k) {
        var pos = (k - actual + n) % n;
        c.dataset.pos = pos < 3 ? String(pos) : (pos === n - 1 && dir === 1 ? 'sale' : 'x');
        c.setAttribute('aria-hidden', String(pos !== 0));
        $$('button', c).forEach(function (b) { b.tabIndex = pos === 0 ? 0 : -1; });
      });
      contador.textContent = dos(actual + 1);
    }
    function mover(d) { actual = (actual + d + n) % n; pintar(d); }
    pintar(0);
    $$('[data-mover]', el).forEach(function (b) { b.addEventListener('click', function () { mover(Number(b.dataset.mover)); }); });
    pila.addEventListener('click', function (e) {
      var carta = e.target.closest('.ig');
      if (carta && carta.dataset.pos !== '0') { e.stopPropagation(); e.preventDefault(); actual = Number(carta.dataset.k); pintar(1); }
    }, true);
    var x0 = null;
    pila.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    pila.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { mover(dx < 0 ? 1 : -1); }
    });
    var btn = $('[data-cuadricula]', el), grid = $('.mazo__grid', el);
    btn.addEventListener('click', function () {
      var abrir = grid.hidden;
      grid.hidden = !abrir;
      btn.setAttribute('aria-expanded', String(abrir));
      btn.textContent = abrir ? 'Ocultar cuadrícula' : 'Ver las ' + n + ' en cuadrícula';
      if (abrir) grid.scrollIntoView({ block: 'nearest', behavior: reducir ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Historias en teléfono ---------- */
  function historias(s, p) {
    var cu = cuentaDe(p), con = s.piezas.filter(function (x) { return x.src; });
    if (!con.length) return galeriaSimple(s, p);
    return '<div class="historias" data-historias data-plataforma="ig">' +
      '<div class="telefono">' +
        '<div class="telefono__estado" aria-hidden="true"><span>9:41</span><i class="telefono__isla"></i><span class="telefono__senal"><b></b><b></b><b></b></span></div>' +
        '<div class="historia">' +
          '<div class="historia__marco">' +
            con.map(function (x, k) { return '<img class="historia__img' + (k === 0 ? ' activa' : '') + '" src="' + esc(x.src) + '" alt="' + esc(x.alt) + '"' + (k ? ' loading="lazy"' : '') + ' decoding="async">'; }).join('') +
            '<div class="historia__progreso" aria-hidden="true">' + con.map(function () { return '<span class="seg"><i></i></span>'; }).join('') + '</div>' +
            '<div class="historia__cab" aria-hidden="true">' + avatar(cu, 'historia__avatar') + '<b>' + esc(cu.nombre) + '</b>' + icono('i-ig-mas', 'ico historia__mas') + '</div>' +
            '<button type="button" class="historia__zona historia__zona--prev" data-paso="-1" aria-label="Historia anterior"></button>' +
            '<button type="button" class="historia__zona historia__zona--next" data-paso="1" aria-label="Historia siguiente"></button>' +
          '</div>' +
          '<div class="historia__barra" aria-hidden="true">' +
            '<span class="historia__campo solo-ig">Enviar mensaje</span>' + icono('i-ig-corazon', 'ico solo-ig') + icono('i-ig-enviar', 'ico solo-ig') +
            '<span class="historia__campo solo-fb">Responder…</span><span class="historia__reac solo-fb"><i class="r-like">' + icono('i-fb-like') + '</i><i class="r-love">' + icono('i-ig-corazon') + '</i></span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="historias__panel">' +
        '<div class="segmentado" role="group" aria-label="Ver como">' +
          '<button type="button" data-plat="ig" aria-pressed="true">Instagram</button>' +
          '<button type="button" data-plat="fb" aria-pressed="false">Facebook</button>' +
        '</div>' +
        '<p class="historias__contador"><b data-actual>01</b><span>/ ' + dos(con.length) + '</span></p>' +
        '<div class="historias__mini">' + con.map(function (x, k) {
          return '<button type="button" data-ir-historia="' + k + '" aria-label="Ver historia ' + (k + 1) + '"' + (k === 0 ? ' aria-current="true"' : '') + '><img src="' + esc(x.src) + '" alt="" loading="lazy" decoding="async"></button>';
        }).join('') + '</div>' +
        '<div class="historias__ctrl">' +
          '<button type="button" class="redondo" data-pausa aria-label="Pausar">' + icono('i-pausa', 'ico ico-pausa') + icono('i-play', 'ico ico-play') + '</button>' +
          '<button type="button" class="enlace-mono" data-ampliar>Ver en grande</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function iniciarHistorias(el) {
    var imgs = $$('.historia__img', el), segs = $$('.seg', el), minis = $$('[data-ir-historia]', el), n = imgs.length, actual = 0;
    var contador = $('[data-actual]', el), pausa = $('[data-pausa]', el);
    function ir(k) {
      actual = (k + n) % n;
      imgs.forEach(function (im, i) { im.classList.toggle('activa', i === actual); });
      segs.forEach(function (sg, i) {
        sg.classList.remove('activa');
        sg.classList.toggle('hecha', i < actual);
      });
      void segs[actual].offsetWidth;
      segs[actual].classList.add('activa');
      minis.forEach(function (m, i) { if (i === actual) m.setAttribute('aria-current', 'true'); else m.removeAttribute('aria-current'); });
      contador.textContent = dos(actual + 1);
    }
    segs.forEach(function (sg) { $('i', sg).addEventListener('animationend', function () { if (sg.classList.contains('activa')) ir(actual + 1); }); });
    $$('[data-paso]', el).forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); ir(actual + Number(b.dataset.paso)); }); });
    minis.forEach(function (m) { m.addEventListener('click', function () { ir(Number(m.dataset.irHistoria)); }); });
    $$('[data-plat]', el).forEach(function (b) {
      b.addEventListener('click', function () {
        el.dataset.plataforma = b.dataset.plat;
        $$('[data-plat]', el).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      });
    });
    pausa.addEventListener('click', function () {
      var p = el.classList.toggle('pausado');
      pausa.setAttribute('aria-label', p ? 'Reproducir' : 'Pausar');
    });
    $('[data-ampliar]', el).addEventListener('click', function (e) {
      if (window.abrirVisorLista) window.abrirVisorLista(imgs.map(function (im) { return { src: im.currentSrc || im.src, alt: im.alt }; }), actual, e.currentTarget);
    });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (en) { el.classList.toggle('fuera', !en[0].isIntersecting); }, { threshold: .35 });
      io.observe(el); observadores.push(io);
    }
    if (reducir) el.classList.add('pausado');
    ir(0);
  }

  /* ---------- Carruseles de Instagram ---------- */
  function carruseles(s, p) {
    var cu = cuentaDe(p);
    return '<div class="carruseles">' + (s.carruseles || []).map(function (c, j) {
      var n = c.piezas.length;
      return '<figure class="carrusel-pieza" style="--j:' + j + '">' +
        '<article class="ig ig--carrusel">' + cabeceraIG(cu) +
          '<div class="ig__media carrusel" data-carrusel>' +
            '<div class="carrusel__pista" data-grupo tabindex="0" aria-label="Carrusel: ' + esc(c.titulo) + '">' +
              c.piezas.map(function (x) {
                return x.src ? '<button type="button" class="pieza__btn carrusel__slide" aria-label="Ampliar: ' + esc(x.alt) + '">' + imagen(x) + '</button>'
                             : '<div class="carrusel__slide">' + hueco(x, p.slug) + '</div>';
              }).join('') +
            '</div>' +
            '<span class="carrusel__num" aria-hidden="true"><b>1</b>/' + n + '</span>' +
            '<button type="button" class="carrusel__flecha carrusel__flecha--prev" data-desliza="-1" aria-label="Lámina anterior" hidden>' + icono('i-flecha', 'ico gira-izq') + '</button>' +
            '<button type="button" class="carrusel__flecha carrusel__flecha--next" data-desliza="1" aria-label="Lámina siguiente">' + icono('i-flecha', 'ico gira-der') + '</button>' +
          '</div>' +
          accionesIG('<span class="carrusel__puntos" aria-hidden="true">' + c.piezas.map(function (_, k) { return '<i' + (k === 0 ? ' class="on"' : '') + '></i>'; }).join('') + '</span>') +
        '</article>' +
        '<figcaption><span class="mono">Carrusel ' + dos(j + 1) + '</span>' + esc(c.titulo) + '</figcaption>' +
      '</figure>';
    }).join('') + '</div>';
  }

  function iniciarCarrusel(el) {
    var pista = $('.carrusel__pista', el), puntos = $$('.carrusel__puntos i', el.closest('.ig')), num = $('.carrusel__num b', el);
    var prev = $('[data-desliza="-1"]', el), next = $('[data-desliza="1"]', el), n = $$('.carrusel__slide', pista).length;
    function idx() { return Math.round(pista.scrollLeft / Math.max(1, pista.clientWidth)); }
    function pintar() {
      var i = Math.min(n - 1, Math.max(0, idx()));
      puntos.forEach(function (p, k) { p.classList.toggle('on', k === i); });
      num.textContent = i + 1;
      prev.hidden = i === 0; next.hidden = i === n - 1;
    }
    pista.addEventListener('scroll', function () { requestAnimationFrame(pintar); }, { passive: true });
    [prev, next].forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        pista.scrollTo({ left: (idx() + Number(b.dataset.desliza)) * pista.clientWidth, behavior: reducir ? 'auto' : 'smooth' });
      });
    });
    pista.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.stopPropagation(); e.preventDefault();
        pista.scrollTo({ left: (idx() + (e.key === 'ArrowRight' ? 1 : -1)) * pista.clientWidth, behavior: reducir ? 'auto' : 'smooth' });
      }
    });
    pintar();
  }

  /* ---------- Campaña por capítulos ---------- */
  function campana(s, p) {
    var id = 'camp-' + p.slug;
    var caps = s.capitulos || [];
    return '<div class="campana" data-campana>' +
      '<div class="campana__tabs" role="tablist" aria-label="Capítulos de la campaña">' +
        caps.map(function (c, k) {
          return '<button type="button" role="tab" id="' + id + '-t' + k + '" aria-controls="' + id + '-p' + k + '" aria-selected="' + (k === 0) + '"' + (k ? ' tabindex="-1"' : '') + '>' +
            '<span class="mono">' + dos(k + 1) + '</span><b>' + esc(c.titulo) + '</b><sup>' + c.piezas.length + ' piezas</sup></button>';
        }).join('') +
      '</div>' +
      caps.map(function (c, k) {
        var cols = Math.min(c.piezas.length, 4);
        return '<div class="campana__panel' + (k === 0 ? ' entra' : '') + '" role="tabpanel" id="' + id + '-p' + k + '" aria-labelledby="' + id + '-t' + k + '"' + (k ? ' hidden' : '') + '>' +
          (c.nota ? '<p class="campana__nota">' + esc(c.nota) + '</p>' : '') +
          '<div class="muro"><div class="muro__plano" data-grupo style="--cols:' + cols + '">' +
            c.piezas.map(function (x, i) {
              return x.src ? '<button type="button" class="pieza__btn muro__pieza" style="--i:' + i + '" aria-label="Ampliar: ' + esc(x.alt) + '">' + imagen(x) + '</button>'
                           : '<div class="muro__pieza" style="--i:' + i + '">' + hueco(x, p.slug) + '</div>';
            }).join('') +
          '</div></div>' +
        '</div>';
      }).join('') +
    '</div>';
  }

  function iniciarCampana(el) {
    var tabs = $$('[role="tab"]', el), panels = $$('[role="tabpanel"]', el);
    function activar(k, foco) {
      tabs.forEach(function (t, i) { t.setAttribute('aria-selected', String(i === k)); t.tabIndex = i === k ? 0 : -1; });
      panels.forEach(function (pn, i) {
        pn.hidden = i !== k;
        pn.classList.remove('entra');
        if (i === k) { void pn.offsetWidth; pn.classList.add('entra'); }
      });
      if (foco) tabs[k].focus();
    }
    tabs.forEach(function (t, k) {
      t.addEventListener('click', function () { activar(k); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault(); e.stopPropagation();
          activar((k + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length, true);
        }
      });
    });
  }

  /* ---------- Galería normal (respaldo) ---------- */
  function galeriaSimple(s, p) {
    return null; // main.js pinta la galería por defecto
  }

  /* ---------- Interfaz pública ---------- */
  var TIPOS = { mazo: mazo, historias: historias, carruseles: carruseles, campana: campana };

  window.Presenta = {
    html: function (s, p) {
      var f = TIPOS[s.tipo];
      return f ? f(s, p) : null;
    },
    iniciar: function (raiz) {
      $$('[data-mazo]', raiz).forEach(iniciarMazo);
      $$('[data-historias]', raiz).forEach(iniciarHistorias);
      $$('[data-carrusel]', raiz).forEach(iniciarCarrusel);
      $$('[data-campana]', raiz).forEach(iniciarCampana);
      if (raiz.dataset.likes) return;
      raiz.dataset.likes = '1';
      raiz.addEventListener('click', function (e) {
        var like = e.target.closest('.ig__like');
        if (!like) return;
        e.stopPropagation();
        var on = like.getAttribute('aria-pressed') !== 'true';
        like.setAttribute('aria-pressed', String(on));
        like.classList.remove('late'); void like.offsetWidth; if (on) like.classList.add('late');
      });
    },
    detener: function () {
      observadores.forEach(function (o) { o.disconnect(); });
      observadores = [];
    },
    piezas: function (p) {
      var out = [];
      (p.secciones || []).forEach(function (s) {
        (s.piezas || []).forEach(function (x) { out.push(x); });
        (s.capitulos || []).forEach(function (c) { c.piezas.forEach(function (x) { out.push(x); }); });
        (s.carruseles || []).forEach(function (c) { c.piezas.forEach(function (x) { out.push(x); }); });
      });
      return out;
    }
  };
})();
