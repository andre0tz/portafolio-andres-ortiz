/* =====================================================================
   PRESENTACIONES DE PROYECTOS
   Cada sección de un proyecto puede tener un "tipo":

   - "feed"       Publicaciones en marcos de Instagram, en un muro de tres
                  columnas desfasadas que se mueven a distinta velocidad.
   - "escenario"  Publicaciones en marcos de Instagram que pasan en un
                  carrusel con profundidad. Admite capítulos.
   - "historias"  Historias dentro de un teléfono que las reproduce,
                  con vista de Instagram o de Facebook.
   - "carruseles" Carruseles de Instagram que se deslizan.
   - (sin tipo)   Galería normal (la pinta main.js).

   Encabezado de cada sección (opcional):
     encabezado: { ante: "texto a mano", linea1: "...", linea2: "..." }
     unidad: "publicaciones"  (se muestra con el número de piezas)
   ===================================================================== */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var limpiezas = [];

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function dos(n) { return String(n).padStart(2, '0'); }
  function icono(id, clase) { return '<svg class="' + (clase || 'ico') + '" aria-hidden="true"><use href="#' + id + '"/></svg>'; }

  /* ---------- Cuenta y avatar ---------- */
  function cuentaDe(p) {
    var c = p.cuenta || {};
    var nombre = c.nombre || p.titulo || '';
    var ini = c.iniciales || nombre.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
    return { nombre: nombre, iniciales: ini, color: c.color || '#1f4fe0', foto: c.foto || '' };
  }
  function avatar(cu, clase) {
    var dentro = cu.foto ? '<img src="' + esc(cu.foto) + '" alt="">' : esc(cu.iniciales);
    return '<span class="' + (clase || 'ig__avatar') + '" style="--c:' + esc(cu.color) + '" aria-hidden="true"><span>' + dentro + '</span></span>';
  }
  function imagen(x) {
    return '<img src="' + esc(x.src) + '" alt="' + esc(x.alt) + '" loading="lazy" decoding="async">';
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
      '</footer>';
  }
  function postIG(x, p, cu, extra) {
    var media = x.src
      ? '<button type="button" class="pieza__btn ig__media" aria-label="Ampliar: ' + esc(x.alt) + '">' + imagen(x) + '</button>'
      : '<div class="ig__media">' + hueco(x, p.slug) + '</div>';
    return '<article class="ig"' + (extra || '') + '>' + cabeceraIG(cu) + media + accionesIG() + '</article>';
  }

  /* ---------- Encabezado de sección ---------- */
  function contar(s) {
    if (s.capitulos) return s.capitulos.reduce(function (a, c) { return a + c.piezas.length; }, 0);
    if (s.carruseles) return s.carruseles.length;
    return (s.piezas || []).length;
  }
  function encabezado(s) {
    var e = s.encabezado || {};
    var l1 = e.linea1 || s.titulo || '', l2 = e.linea2 || '';
    var n = contar(s), unidad = s.unidad || (n === 1 ? 'pieza' : 'piezas');
    return '<header class="sec-cab" data-aparece>' +
      '<div class="sec-cab__texto">' +
        (e.ante ? '<p class="sec-cab__ante">' + esc(e.ante) + '</p>' : '') +
        '<h3 class="sec-cab__titulo"><span class="l1"><span>' + esc(l1) + '</span></span>' + (l2 ? '<span class="l2"><span>' + esc(l2) + '</span></span>' : '') + '</h3>' +
      '</div>' +
      (s.nota ? '<div class="sec-cab__lado"><p class="sec-cab__nota">' + esc(s.nota) + '</p></div>' : '') +
    '</header>';
  }

  /* ---------- Feed: muro de tres columnas ---------- */
  function feed(s, p) {
    var cu = cuentaDe(p), cols = [[], [], []];
    s.piezas.forEach(function (x, k) { cols[k % 3].push(postIG(x, p, cu, ' style="--k:' + k + '"')); });
    return '<div class="feed" data-feed data-grupo>' + cols.map(function (c, i) {
      return '<div class="feed__col" data-vel="' + [-0.6, 1, -0.25][i] + '">' + c.join('') + '</div>';
    }).join('') + '</div>';
  }

  function iniciarFeed(el, raiz) {
    // El visor recorre las piezas en su orden original, no por columnas.
    var orden = $$('.ig', el).sort(function (a, b) { return a.style.getPropertyValue('--k') - b.style.getPropertyValue('--k'); });
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.pieza__btn');
      if (!b || !window.abrirVisorLista) return;
      e.stopPropagation();
      var lista = orden.map(function (ig) { var im = $('img', ig); return im ? { src: im.currentSrc || im.src, alt: im.alt } : null; }).filter(Boolean);
      var pos = orden.indexOf(b.closest('.ig'));
      window.abrirVisorLista(lista, Math.max(0, pos), b);
    });
    if (reducir) return;
    var cols = $$('.feed__col', el), pendiente = false;
    function mover() {
      pendiente = false;
      var r = el.getBoundingClientRect(), vh = innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      var t = (vh - r.top) / (vh + r.height) - 0.5;
      cols.forEach(function (c) { c.style.transform = 'translate3d(0,' + (t * 120 * Number(c.dataset.vel)).toFixed(1) + 'px,0)'; });
    }
    function alMover() { if (!pendiente) { pendiente = true; requestAnimationFrame(mover); } }
    raiz.addEventListener('scroll', alMover, { passive: true });
    limpiezas.push(function () { raiz.removeEventListener('scroll', alMover); });
    mover();
  }

  /* ---------- Escenario: carrusel con profundidad ---------- */
  function pista(piezas, p, cu, etiqueta) {
    return '<div class="escena">' +
      '<button type="button" class="escena__flecha escena__flecha--prev" data-paso="-1" aria-label="Publicación anterior">' + icono('i-flecha', 'ico gira-izq') + '</button>' +
      '<div class="escena__pista" data-grupo tabindex="0" aria-label="' + esc(etiqueta) + '">' +
        piezas.map(function (x, k) { return '<div class="escena__item">' + postIG(x, p, cu, ' style="--k:' + k + '"') + '</div>'; }).join('') +
      '</div>' +
      '<button type="button" class="escena__flecha escena__flecha--next" data-paso="1" aria-label="Publicación siguiente">' + icono('i-flecha', 'ico gira-der') + '</button>' +
      '<p class="escena__puntos" aria-hidden="true">' + piezas.map(function (_, k) { return '<i' + (k === 0 ? ' class="on"' : '') + '></i>'; }).join('') + '</p>' +
    '</div>';
  }
  function escenario(s, p) {
    var cu = cuentaDe(p), id = 'esc-' + p.slug;
    var caps = s.capitulos || [{ titulo: s.titulo, piezas: s.piezas || [] }];
    var tabs = caps.length > 1 ? '<div class="capitulos" role="tablist" aria-label="Capítulos">' + caps.map(function (c, k) {
      return '<button type="button" role="tab" id="' + id + '-t' + k + '" aria-controls="' + id + '-p' + k + '" aria-selected="' + (k === 0) + '"' + (k ? ' tabindex="-1"' : '') + '>' +
        esc(c.titulo) + '<sup>' + c.piezas.length + '</sup></button>';
    }).join('') + '</div>' : '';
    return '<div class="escenario" data-escenario>' + tabs +
      caps.map(function (c, k) {
        return '<div class="escenario__panel" role="' + (caps.length > 1 ? 'tabpanel' : 'group') + '" id="' + id + '-p' + k + '"' +
          (caps.length > 1 ? ' aria-labelledby="' + id + '-t' + k + '"' : '') + (k ? ' hidden' : '') + '>' +
          (c.nota && caps.length > 1 ? '<p class="escenario__nota">' + esc(c.nota) + '</p>' : '') +
          pista(c.piezas, p, cu, c.titulo) +
        '</div>';
      }).join('') +
    '</div>';
  }

  function iniciarEscena(esc_) {
    var tr = $('.escena__pista', esc_), items = $$('.escena__item', tr), puntos = $$('.escena__puntos i', esc_);
    var prev = $('[data-paso="-1"]', esc_), next = $('[data-paso="1"]', esc_), pend = false, actual = 0;
    function pintar() {
      pend = false;
      var r = tr.getBoundingClientRect(), centro = r.left + r.width / 2, mejor = 0, dmin = 1e9;
      items.forEach(function (it, k) {
        var ir = it.getBoundingClientRect(), d = (ir.left + ir.width / 2 - centro) / ir.width, ad = Math.min(Math.abs(d), 2.2);
        if (Math.abs(d) < dmin) { dmin = Math.abs(d); mejor = k; }
        if (!reducir) {
          var g = it.firstElementChild;
          g.style.transform = 'perspective(1400px) rotateY(' + (Math.max(-1.6, Math.min(1.6, d)) * -22).toFixed(2) + 'deg) scale(' + (1 - ad * 0.14).toFixed(3) + ')';
          g.style.opacity = (1 - ad * 0.32).toFixed(3);
        }
        it.style.zIndex = String(100 - Math.round(ad * 10));
        it.classList.toggle('es-centro', Math.abs(d) < 0.5);
      });
      actual = mejor;
      puntos.forEach(function (pt, k) { pt.classList.toggle('on', k === actual); });
      prev.disabled = actual === 0; next.disabled = actual === items.length - 1;
    }
    function programar() { if (!pend) { pend = true; requestAnimationFrame(pintar); } }
    function ir(k) {
      var it = items[Math.max(0, Math.min(items.length - 1, k))];
      tr.scrollTo({ left: it.offsetLeft - (tr.clientWidth - it.offsetWidth) / 2, behavior: reducir ? 'auto' : 'smooth' });
    }
    tr.addEventListener('scroll', programar, { passive: true });
    addEventListener('resize', programar);
    limpiezas.push(function () { removeEventListener('resize', programar); });
    [prev, next].forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); ir(actual + Number(b.dataset.paso)); }); });
    tr.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); ir(actual + (e.key === 'ArrowRight' ? 1 : -1)); }
    });
    // Un clic en una publicación lateral la trae al centro en lugar de ampliarla.
    tr.addEventListener('click', function (e) {
      var it = e.target.closest('.escena__item');
      if (it && !it.classList.contains('es-centro')) { e.stopPropagation(); e.preventDefault(); ir(items.indexOf(it)); }
    }, true);
    esc_.__pintar = programar;
    programar();
  }

  function iniciarEscenario(el) {
    $$('.escena', el).forEach(iniciarEscena);
    var tabs = $$('[role="tab"]', el), panels = $$('.escenario__panel', el);
    function activar(k, foco) {
      tabs.forEach(function (t, i) { t.setAttribute('aria-selected', String(i === k)); t.tabIndex = i === k ? 0 : -1; });
      panels.forEach(function (pn, i) {
        pn.hidden = i !== k;
        if (i === k) {
          pn.classList.remove('entra'); void pn.offsetWidth; pn.classList.add('entra');
          var e = $('.escena', pn), tr = $('.escena__pista', pn);
          tr.scrollLeft = 0;
          if (e.__pintar) e.__pintar();
        }
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

  /* ---------- Historias en teléfono ---------- */
  function historias(s, p) {
    var cu = cuentaDe(p), con = s.piezas.filter(function (x) { return x.src; });
    if (!con.length) return null;
    return '<div class="historias" data-historias data-plataforma="ig">' +
      '<div class="historias__mini" aria-label="Historias">' + con.map(function (x, k) {
        return '<button type="button" data-ir-historia="' + k + '" aria-label="Ver historia ' + (k + 1) + '"' + (k === 0 ? ' aria-current="true"' : '') + '><img src="' + esc(x.src) + '" alt="" loading="lazy" decoding="async"></button>';
      }).join('') + '</div>' +
      '<div class="telefono">' +
        '<div class="telefono__estado" aria-hidden="true"><span>9:41</span><i class="telefono__isla"></i><span class="telefono__senal"><b></b><b></b><b></b></span></div>' +
        '<div class="historia__ui" aria-hidden="true">' +
          '<div class="historia__progreso">' + con.map(function () { return '<span class="seg"><i></i></span>'; }).join('') + '</div>' +
          '<div class="historia__cab">' + avatar(cu, 'historia__avatar') + '<b>' + esc(cu.nombre) + '</b>' + icono('i-ig-mas', 'ico historia__mas') + '</div>' +
        '</div>' +
        '<div class="historia__marco">' +
          con.map(function (x, k) { return '<img class="historia__img' + (k === 0 ? ' activa' : '') + '" src="' + esc(x.src) + '" alt="' + esc(x.alt) + '"' + (k ? ' loading="lazy"' : '') + ' decoding="async">'; }).join('') +
          '<button type="button" class="historia__zona historia__zona--prev" data-paso="-1" aria-label="Historia anterior"></button>' +
          '<button type="button" class="historia__zona historia__zona--next" data-paso="1" aria-label="Historia siguiente"></button>' +
        '</div>' +
        '<div class="historia__barra" aria-hidden="true">' +
          '<span class="historia__campo solo-ig">Enviar mensaje</span>' + icono('i-ig-corazon', 'ico solo-ig') + icono('i-ig-enviar', 'ico solo-ig') +
          '<span class="historia__campo solo-fb">Responder…</span><span class="historia__reac solo-fb"><i class="r-like">' + icono('i-fb-like') + '</i><i class="r-love">' + icono('i-ig-corazon') + '</i></span>' +
        '</div>' +
      '</div>' +
      '<div class="historias__panel">' +
        '<p class="historias__etq">Ver como</p>' +
        '<div class="segmentado" role="group" aria-label="Ver como">' +
          '<button type="button" data-plat="ig" aria-pressed="true">Instagram</button>' +
          '<button type="button" data-plat="fb" aria-pressed="false">Facebook</button>' +
        '</div>' +
        '<div class="historias__ctrl">' +
          '<button type="button" class="redondo" data-pausa aria-label="Pausar">' + icono('i-pausa', 'ico ico-pausa') + icono('i-play', 'ico ico-play') + '</button>' +
          '<button type="button" class="enlace-mono" data-ampliar>Ver en grande</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function iniciarHistorias(el) {
    var imgs = $$('.historia__img', el), segs = $$('.seg', el), minis = $$('[data-ir-historia]', el), n = imgs.length, actual = 0;
    var pausa = $('[data-pausa]', el);
    function ir(k) {
      actual = (k + n) % n;
      imgs.forEach(function (im, i) { im.classList.toggle('activa', i === actual); });
      segs.forEach(function (sg, i) { sg.classList.remove('activa'); sg.classList.toggle('hecha', i < actual); });
      void segs[actual].offsetWidth;
      segs[actual].classList.add('activa');
      minis.forEach(function (m, i) { if (i === actual) m.setAttribute('aria-current', 'true'); else m.removeAttribute('aria-current'); });
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
      io.observe(el); limpiezas.push(function () { io.disconnect(); });
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
        '<figcaption>' + esc(c.titulo) + '</figcaption>' +
      '</figure>';
    }).join('') + '</div>';
  }

  function iniciarCarrusel(el) {
    var tr = $('.carrusel__pista', el), puntos = $$('.carrusel__puntos i', el.closest('.ig')), num = $('.carrusel__num b', el);
    var prev = $('[data-desliza="-1"]', el), next = $('[data-desliza="1"]', el), n = $$('.carrusel__slide', tr).length;
    function idx() { return Math.round(tr.scrollLeft / Math.max(1, tr.clientWidth)); }
    function pintar() {
      var i = Math.min(n - 1, Math.max(0, idx()));
      puntos.forEach(function (p, k) { p.classList.toggle('on', k === i); });
      num.textContent = i + 1;
      prev.hidden = i === 0; next.hidden = i === n - 1;
    }
    function ir(d) { tr.scrollTo({ left: (idx() + d) * tr.clientWidth, behavior: reducir ? 'auto' : 'smooth' }); }
    tr.addEventListener('scroll', function () { requestAnimationFrame(pintar); }, { passive: true });
    [prev, next].forEach(function (b) { b.addEventListener('click', function (e) { e.stopPropagation(); ir(Number(b.dataset.desliza)); }); });
    tr.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.stopPropagation(); e.preventDefault(); ir(e.key === 'ArrowRight' ? 1 : -1); }
    });
    pintar();
  }

  /* ---------- Abanico: piezas superpuestas que se abren ---------- */
  function abanico(s, p) {
    var cu = cuentaDe(p), n = s.piezas.length;
    return '<div class="abanico" data-grupo style="--n:' + n + '">' +
      s.piezas.map(function (x, k) { return postIG(x, p, cu, ' style="--i:' + k + ';--d:' + (k - (n - 1) / 2) + '"'); }).join('') +
    '</div>';
  }

  /* ---------- Collage de portada ---------- */
  function collage(p) {
    var cu = cuentaDe(p), lista = [p.portada].concat(p.collage || p.vistazo || []).filter(Boolean).slice(0, 5);
    var nombre = p.titulo || '';
    return '<div class="collage collage--' + lista.length + '" data-grupo>' +
      lista.map(function (src, k) {
        return '<div class="collage__p" style="--k:' + k + '">' + postIG({ src: src, alt: 'Publicación de ' + nombre }, p, cu) + '</div>';
      }).join('') +
    '</div>';
  }

  /* ---------- Interfaz pública ---------- */
  var TIPOS = { feed: feed, escenario: escenario, historias: historias, carruseles: carruseles, abanico: abanico };

  window.Presenta = {
    html: function (s, p) { var f = TIPOS[s.tipo]; return f ? f(s, p) : null; },
    encabezado: encabezado,
    collage: collage,
    postIG: function (x, p) { return postIG(x, p, cuentaDe(p)); },
    iniciar: function (raiz) {
      $$('[data-feed]', raiz).forEach(function (el) { iniciarFeed(el, raiz); });
      $$('[data-escenario]', raiz).forEach(iniciarEscenario);
      $$('[data-historias]', raiz).forEach(iniciarHistorias);
      $$('[data-carrusel]', raiz).forEach(iniciarCarrusel);
      var aparecen = $$('[data-aparece], .feed .ig', raiz);
      if ('IntersectionObserver' in window && !reducir) {
        var io = new IntersectionObserver(function (en) {
          en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('visto'); io.unobserve(x.target); } });
        }, { root: raiz, rootMargin: '0px 0px -10% 0px', threshold: .05 });
        aparecen.forEach(function (a) { io.observe(a); });
        limpiezas.push(function () { io.disconnect(); });
      } else aparecen.forEach(function (a) { a.classList.add('visto'); });
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
    detener: function () { limpiezas.forEach(function (f) { f(); }); limpiezas = []; },
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
