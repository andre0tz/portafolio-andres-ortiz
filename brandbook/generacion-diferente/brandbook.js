/* Brandbook · Generación Diferente
   Interacciones: barra e índice, apariciones, brasas del portada,
   lectura del símbolo, versiones, capas de construcción, área de
   seguridad, usos incorrectos, copiar colores, Facebook, Instagram
   y visor de aplicaciones. Todo funciona sin animaciones si el
   sistema pide movimiento reducido. */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)');
  var conMovimiento = function () { return !quieto.matches; };

  /* ---------- Aviso breve ---------- */
  var aviso = $('#aviso'), avisoT;
  function avisar(t) {
    aviso.textContent = t;
    aviso.classList.add('visible');
    clearTimeout(avisoT);
    avisoT = setTimeout(function () { aviso.classList.remove('visible'); }, 2000);
  }

  /* ---------- Barra, progreso y sección activa ---------- */
  var barra = $('#barra'), progreso = $('#progreso'), barraSeccion = $('#barraSeccion');
  var secciones = $$('main > .sec');
  var enlaces = $$('.indice a');
  function alDesplazar() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    progreso.style.setProperty('--p', h > 0 ? (y / h).toFixed(4) : 0);
    barra.classList.toggle('solida', y > 40);
  }
  window.addEventListener('scroll', alDesplazar, { passive: true });
  alDesplazar();

  if ('IntersectionObserver' in window) {
    var ioSec = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var s = en.target;
        document.body.dataset.tono = s.dataset.tono || 'noche';
        barraSeccion.textContent = s.dataset.nombre || '';
        enlaces.forEach(function (a) { a.classList.toggle('activo', a.dataset.ir === s.id); });
      });
    }, { rootMargin: '-40px 0px -88% 0px' });
    secciones.forEach(function (s) { ioSec.observe(s); });
  }

  /* ---------- Índice ---------- */
  var btnIndice = $('#btnIndice'), indice = $('#indice');
  function abrirIndice(abrir) {
    indice.classList.toggle('abierto', abrir);
    document.body.classList.toggle('indice-abierto', abrir);
    btnIndice.setAttribute('aria-expanded', String(abrir));
    if (abrir) { var a = $('a.activo', indice) || $('a', indice); a.focus({ preventScroll: true }); }
  }
  btnIndice.addEventListener('click', function () { abrirIndice(!indice.classList.contains('abierto')); });
  enlaces.forEach(function (a) { a.addEventListener('click', function () { abrirIndice(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && indice.classList.contains('abierto')) { abrirIndice(false); btnIndice.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (indice.classList.contains('abierto') && !indice.contains(e.target) && !btnIndice.contains(e.target)) abrirIndice(false);
  });

  /* ---------- Apariciones ---------- */
  var rvs = $$('.rv, .trazo-naranja, .proporcion');
  if ('IntersectionObserver' in window) {
    var ioRv = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); ioRv.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    rvs.forEach(function (el) { ioRv.observe(el); });
  } else {
    rvs.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Portada: brasas y resplandor ---------- */
  var hero = $('#portada'), lienzo = $('#brasas'), ctx = lienzo && lienzo.getContext('2d');
  var brasas = [], heroVisible = true, raf = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  function medir() {
    if (!lienzo) return;
    lienzo.width = hero.clientWidth * dpr;
    lienzo.height = hero.clientHeight * dpr;
  }
  function nuevaBrasa(inicio) {
    var w = lienzo.width, h = lienzo.height;
    return {
      x: Math.random() * w,
      y: inicio ? Math.random() * h : h + 10 * dpr,
      r: (Math.random() * 1.8 + .6) * dpr,
      v: (Math.random() * .6 + .25) * dpr,
      d: Math.random() * Math.PI * 2,
      a: Math.random() * .6 + .25,
      c: Math.random() < .78 ? '247,101,21' : '245,190,58'
    };
  }
  function cuadro() {
    raf = 0;
    if (!heroVisible || !conMovimiento()) return;
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    for (var i = 0; i < brasas.length; i++) {
      var b = brasas[i];
      b.y -= b.v; b.d += .02; b.x += Math.sin(b.d) * .35 * dpr;
      var vida = b.y / lienzo.height;
      if (b.y < -10) { brasas[i] = nuevaBrasa(false); continue; }
      ctx.beginPath();
      ctx.fillStyle = 'rgba(' + b.c + ',' + (b.a * Math.min(1, vida * 1.4)).toFixed(3) + ')';
      ctx.shadowColor = 'rgba(' + b.c + ',.8)';
      ctx.shadowBlur = 8 * dpr;
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(cuadro);
  }
  function iniciarBrasas() {
    if (!ctx || !conMovimiento()) return;
    medir();
    var n = innerWidth < 640 ? 26 : 48;
    brasas = [];
    for (var i = 0; i < n; i++) brasas.push(nuevaBrasa(true));
    if (!raf) raf = requestAnimationFrame(cuadro);
  }
  if (ctx) {
    iniciarBrasas();
    window.addEventListener('resize', function () { medir(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (ents) {
        heroVisible = ents[0].isIntersecting;
        if (heroVisible && !raf) raf = requestAnimationFrame(cuadro);
      }).observe(hero);
    }
    quieto.addEventListener && quieto.addEventListener('change', function () {
      if (conMovimiento()) iniciarBrasas(); else ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    });
  }
  var resplandor = $('#resplandor');
  if (resplandor && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      resplandor.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      resplandor.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }

  /* ---------- Lectura del símbolo ---------- */
  var puntos = $$('.punto-lectura'), itemsLectura = $$('#lecturaLista li');
  function leer(n) {
    puntos.forEach(function (p) { p.classList.toggle('activo', p.dataset.lectura === String(n)); });
    itemsLectura.forEach(function (li) {
      var on = li.dataset.lectura === String(n);
      li.classList.toggle('activo', on);
      $('button', li).setAttribute('aria-expanded', String(on));
    });
  }
  puntos.forEach(function (p) {
    p.addEventListener('click', function () { leer(p.dataset.lectura); });
    p.addEventListener('mouseenter', function () { leer(p.dataset.lectura); });
  });
  itemsLectura.forEach(function (li) { $('button', li).addEventListener('click', function () { leer(li.dataset.lectura); }); });
  leer(0);

  /* ---------- Versiones del logotipo ---------- */
  var tabs = $$('.selector [role="tab"]'), marcaSel = $('.selector__marca');
  function moverMarca(t) {
    marcaSel.style.width = t.offsetWidth + 'px';
    marcaSel.style.transform = 'translateX(' + t.offsetLeft + 'px)';
  }
  function elegir(t, foco) {
    tabs.forEach(function (x) {
      var on = x === t;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      $('#' + x.getAttribute('aria-controls')).hidden = !on;
    });
    moverMarca(t);
    if (foco) t.focus();
    t.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: conMovimiento() ? 'smooth' : 'auto' });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { elegir(t); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (k === 'Home') n = tabs[0];
      if (k === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); elegir(n, true); }
    });
  });
  if (tabs.length) {
    requestAnimationFrame(function () { moverMarca($('.selector [aria-selected="true"]')); });
    window.addEventListener('resize', function () { moverMarca($('.selector [aria-selected="true"]')); });
    if (document.fonts) document.fonts.ready.then(function () { moverMarca($('.selector [aria-selected="true"]')); });
  }
  var escenario = $('#escenario');
  $$('.escenario__ctrl button').forEach(function (b) {
    b.addEventListener('click', function () {
      escenario.dataset.fondo = b.dataset.fondo;
      $$('.escenario__ctrl button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    });
  });

  /* ---------- Construcción ---------- */
  var lienzoConstr = $('#lienzoConstr');
  $$('.capas input[data-capa]').forEach(function (inp) {
    inp.addEventListener('change', function () {
      $$('[data-capa="' + inp.dataset.capa + '"]', lienzoConstr).forEach(function (g) { g.classList.toggle('oculta', !inp.checked); });
    });
  });
  var llamaContorno = $('#llamaContorno');
  if (llamaContorno) llamaContorno.addEventListener('change', function () { $('.constr').classList.toggle('transparente', llamaContorno.checked); });
  if ('IntersectionObserver' in window && lienzoConstr) {
    var ioC = new IntersectionObserver(function (ents) {
      if (ents[0].isIntersecting) { lienzoConstr.classList.add('dibujado'); ioC.disconnect(); }
    }, { threshold: .3 });
    ioC.observe(lienzoConstr);
  } else if (lienzoConstr) lienzoConstr.classList.add('dibujado');

  /* ---------- Área de seguridad ---------- */
  var btnInvadir = $('#btnInvadir'), zonaVisual = $('#zonaVisual');
  if (btnInvadir) btnInvadir.addEventListener('click', function () {
    var on = !zonaVisual.classList.contains('invadida');
    zonaVisual.classList.toggle('invadida', on);
    btnInvadir.setAttribute('aria-pressed', String(on));
    btnInvadir.textContent = on ? 'Devolverle su espacio' : 'Probar qué pasa si se invade';
  });

  /* ---------- Usos incorrectos ---------- */
  $$('.error__carta').forEach(function (c) {
    c.addEventListener('click', function () {
      var on = c.getAttribute('aria-pressed') !== 'true';
      c.setAttribute('aria-pressed', String(on));
    });
  });

  /* ---------- Copiar colores ---------- */
  $$('[data-copiar]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.dataset.copiar;
      function ok() { avisar(v + ' copiado'); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(v).then(ok, function () { avisar(v); });
      } else {
        try {
          var t = document.createElement('textarea'); t.value = v; document.body.appendChild(t); t.select();
          document.execCommand('copy'); t.remove(); ok();
        } catch (e) { avisar(v); }
      }
    });
  });

  /* ---------- Facebook: dispositivo y zonas ---------- */
  var fbEscena = $('#fbEscena'), notas = $('.fb__notas');
  function dispositivo(d) {
    fbEscena.dataset.disp = d;
    notas.classList.toggle('web', d === 'web');
    notas.classList.toggle('movil', d === 'movil');
    $$('.interruptor button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.disp === d)); });
  }
  $$('.interruptor button').forEach(function (b) { b.addEventListener('click', function () { dispositivo(b.dataset.disp); }); });
  if (fbEscena) dispositivo(fbEscena.dataset.disp);
  var verZonas = $('#verZonas');
  if (verZonas) verZonas.addEventListener('change', function () { fbEscena.classList.toggle('ver-zonas', verZonas.checked); });

  /* ---------- Instagram: perfil y publicaciones ---------- */
  var igPantalla = $('#igPantalla'), igFeed = $('#igFeed');
  function abrirPost(n) {
    if (!igPantalla) return;
    igPantalla.dataset.vista = 'feed';
    var pub = $('[data-pub="' + n + '"]', igFeed);
    var cont = $('.ig-feed', igPantalla);
    if (pub && cont) {
      var top = pub.offsetTop - $('.ig-feed__top', cont).offsetHeight;
      cont.scrollTo({ top: top, behavior: conMovimiento() ? 'smooth' : 'auto' });
    }
    $$('.posts-info button').forEach(function (b) { b.classList.toggle('activo', b.dataset.post === String(n)); });
  }
  $$('[data-post]').forEach(function (b) { b.addEventListener('click', function () { abrirPost(b.dataset.post); }); });
  var igVolver = $('#igVolver');
  if (igVolver) igVolver.addEventListener('click', function () {
    igPantalla.dataset.vista = 'perfil';
    $$('.posts-info button').forEach(function (b) { b.classList.remove('activo'); });
  });

  /* ---------- Aplicaciones: flotación con el scroll ---------- */
  var flotantes = $$('[data-flotar]'), tick = false;
  function flotar() {
    tick = false;
    if (!conMovimiento()) return;
    var vh = innerHeight;
    flotantes.forEach(function (img) {
      var r = img.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var centro = (r.top + r.height / 2 - vh / 2) / vh;
      img.style.setProperty('--fy', (centro * -18 * Number(img.dataset.flotar)).toFixed(1) + 'px');
    });
  }
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(flotar); } }, { passive: true });
  flotar();

  /* ---------- Visor ---------- */
  var visor = $('#visor'), visorImg = $('#visorImg');
  var ultimo = null;
  $$('[data-zoom]').forEach(function (b) {
    b.addEventListener('click', function () {
      ultimo = b;
      visorImg.src = b.dataset.zoom;
      visorImg.alt = b.dataset.titulo + ' con la identidad de Generación Diferente';
      $('#visorTitulo').textContent = b.dataset.titulo;
      $('#visorDesc').textContent = b.dataset.desc;
      if (visor.showModal) visor.showModal(); else visor.setAttribute('open', '');
    });
  });
  function cerrarVisor() { if (visor.close) visor.close(); else visor.removeAttribute('open'); }
  $('#visorCerrar').addEventListener('click', cerrarVisor);
  visor.addEventListener('click', function (e) { if (e.target === visor) cerrarVisor(); });
  visor.addEventListener('close', function () { if (ultimo) ultimo.focus(); });
})();
