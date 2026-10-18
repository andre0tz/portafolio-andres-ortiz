/* =====================================================================
   PORTAFOLIO ANDRES ORTIZ · comportamiento
   Tema, navegación, galería con filtros, casos de proyecto, contacto
   y modo de pendientes (index.html?pendientes).
   ===================================================================== */
(function () {
  'use strict';

  var PERFIL = window.PERFIL || {};
  var raizDoc = document.documentElement;
  var verBorradores = /[?&](borrador|pendientes)\b/.test(location.search);
  if (verBorradores) raizDoc.classList.add('ver-borradores');
  var TODOS = window.PROYECTOS || [];
  var PROYECTOS = TODOS.filter(function (p) { return p.publicado !== false || verBorradores; });
  var EXPERIENCIA = window.EXPERIENCIA || [];
  var FORMACION = window.FORMACION || [];
  var FILTROS = window.FILTROS || [];
  var RELACIONES = window.RELACIONES || {};
  var raiz = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reducirMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function titulo(p) { return p.titulo || p.tituloProvisional || 'Proyecto sin nombre'; }
  function porSlug(slug) { return PROYECTOS.findIndex(function (p) { return p.slug === slug; }); }
  function numero(i) { return String(i + 1).padStart(2, '0'); }
  function vacio(v) { return v == null || v === '' || (Array.isArray(v) && v.length === 0); }
  function guardar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var aviso = $('#aviso'), avisoTimer;
  function avisar(texto) {
    aviso.textContent = texto;
    aviso.classList.add('visible');
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(function () { aviso.classList.remove('visible'); }, 2400);
  }

  /* ---------- Tema ---------- */
  var btnTema = $('#tema');
  function pintarTema() {
    var oscuro = raiz.dataset.theme === 'oscuro';
    btnTema.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
  btnTema.addEventListener('click', function () {
    raiz.dataset.theme = raiz.dataset.theme === 'oscuro' ? 'claro' : 'oscuro';
    guardar('tema', raiz.dataset.theme);
    pintarTema();
  });
  pintarTema();

  /* ---------- Navegación ---------- */
  var nav = $('#nav'), menu = $('#menu'), hamb = $('#hamburguesa');
  function alScroll() { nav.classList.toggle('nav--solida', window.scrollY > 12); }
  window.addEventListener('scroll', alScroll, { passive: true });
  alScroll();

  function cerrarMenu() {
    menu.classList.remove('abierto');
    hamb.setAttribute('aria-expanded', 'false');
    hamb.setAttribute('aria-label', 'Abrir menú');
  }
  hamb.addEventListener('click', function () {
    var abierto = menu.classList.toggle('abierto');
    hamb.setAttribute('aria-expanded', String(abierto));
    hamb.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    if (abierto) { var a = $('a', menu); if (a) a.focus(); }
  });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', cerrarMenu); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('abierto')) { cerrarMenu(); hamb.focus(); }
  });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('abierto') && !nav.contains(e.target)) cerrarMenu();
  });

  if ('IntersectionObserver' in window) {
    var enlaces = $$('[data-seccion]', menu);
    var ioSeccion = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        enlaces.forEach(function (a) { a.classList.toggle('activo', a.dataset.seccion === en.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['proyectos', 'servicios', 'trayectoria', 'sobre-mi', 'contacto'].forEach(function (id) {
      var s = document.getElementById(id); if (s) ioSeccion.observe(s);
    });
  }

  /* ---------- Perfil ---------- */
  $$('[data-perfil]').forEach(function (el) {
    var v = PERFIL[el.dataset.perfil];
    if (!vacio(v)) el.textContent = v;
  });
  if (PERFIL.correo) $$('[data-perfil-href="mailto"]').forEach(function (a) { a.href = 'mailto:' + PERFIL.correo; });
  if (PERFIL.telefono) $$('[data-perfil-href="tel"]').forEach(function (a) { a.href = 'tel:' + PERFIL.telefono; });
  $('#anio').textContent = new Date().getFullYear();

  if (PERFIL.foto) {
    var img = new Image();
    img.alt = 'Retrato de ' + (PERFIL.nombre || 'Andres Ortiz');
    img.decoding = 'async';
    img.src = PERFIL.foto;
    var foto = $('#heroFoto'); foto.innerHTML = ''; foto.appendChild(img);
  }
  if (PERFIL.cv) { var cv = $('#btnCV'); cv.href = PERFIL.cv; cv.setAttribute('download', ''); cv.hidden = false; }
  if (PERFIL.herramientas && PERFIL.herramientas.length) {
    var h = $('#herramientas');
    $('ul', h).innerHTML = PERFIL.herramientas.map(function (t) {
      if (typeof t === 'string') t = { nombre: t };
      return '<li>' + esc(t.nombre) + (t.nivel ? ' <small>' + esc(t.nivel) + '</small>' : '') + '</li>';
    }).join('');
    h.hidden = false;
  }
  if (PERFIL.habilidades && PERFIL.habilidades.length) {
    var hb = $('#habilidades');
    $('.habilidades__grupos', hb).innerHTML = PERFIL.habilidades.map(function (g) {
      return '<div class="habilidades__grupo"><h4>' + esc(g.grupo) + '</h4><ul>' +
        g.lista.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
    hb.hidden = false;
  }
  if (FORMACION.length) {
    var fo = $('#formacion');
    $('ul', fo).innerHTML = FORMACION.map(function (f) {
      return '<li><b>' + esc(f.titulo) + '</b><span>' + esc(f.lugar) + '</span><span class="mono">' + esc(f.periodo) + '</span>' +
        (f.estado ? '<span class="formacion__estado">' + esc(f.estado) + '</span>' : '') + '</li>';
    }).join('');
    fo.hidden = false;
  }

  /* ---------- Trayectoria ---------- */
  var tray = $('#listaTrayectoria');
  if (tray && EXPERIENCIA.length) {
    tray.innerHTML = EXPERIENCIA.map(function (x, k) {
      var enlace = x.proyecto && porSlug(x.proyecto) > -1
        ? '<a class="tray__enlace" href="#caso/' + esc(x.proyecto) + '">Ver proyecto <svg aria-hidden="true"><use href="#i-flecha"/></svg></a>' : '';
      return '<li class="tray__item' + (k === 0 ? ' tray__item--actual' : '') + '" data-reveal>' +
        '<div class="tray__fecha"><span class="mono">' + esc(x.periodo) + '</span>' + (x.tipo ? '<span class="tray__tipo">' + esc(x.tipo) + '</span>' : '') + '</div>' +
        '<div class="tray__puesto"><h3>' + esc(x.empresa) + '</h3><p>' + esc(x.puesto) + '</p>' + enlace + '</div>' +
        '<ul class="tray__tareas">' + (x.tareas || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
      '</li>';
    }).join('');
  }
  var redes = PERFIL.redes || {}, nombresRedes = { instagram: 'Instagram', behance: 'Behance', linkedin: 'LinkedIn' };
  var htmlRedes = Object.keys(redes).filter(function (k) { return redes[k]; }).map(function (k) {
    return '<a href="' + esc(redes[k]) + '" target="_blank" rel="noopener">' + esc(nombresRedes[k] || k) + '</a>';
  }).join('');
  if (htmlRedes) { var r = $('#redes'); r.innerHTML = htmlRedes; r.hidden = false; }

  /* ---------- Galería ---------- */
  var obras = $('#obras'), filtros = $('#filtros'), estadoFiltro = $('#filtroEstado');
  var DISTRIBUCION = [ // tamaño de cada tarjeta en escritorio (columnas de 12, filas)
    { span: 7, filas: 2, clase: 'obra--destacada' },
    { span: 5, filas: 1 }, { span: 5, filas: 1 },
    { span: 4, filas: 1 }, { span: 4, filas: 1 }, { span: 4, filas: 1 },
    { span: 4, filas: 1 }, { span: 4, filas: 1 }, { span: 4, filas: 1 }
  ];

  function portadaHTML(p, i) {
    if (p.portada) return '<div class="obra__portada"><img src="' + esc(p.portada) + '" alt="" loading="lazy" decoding="async"' + (p.portadaPos ? ' style="object-position:' + esc(p.portadaPos) + '"' : '') + '></div>';
    return '<div class="obra__portada"><span class="obra__numero" aria-hidden="true">' + numero(i) + '</span></div>';
  }

  function tarjeta(p, i) {
    var d = DISTRIBUCION[i] || { span: 12, filas: 1, clase: 'obra--ancha' };
    var rel = RELACIONES[p.relacion];
    return '<article class="obra t-' + esc(p.tono) + ' ' + (p.portada ? 'obra--foto' : 'obra--tipo') + ' ' + (d.clase || '') +
      '" style="--span:' + d.span + ';--filas:' + d.filas + '" data-cats="' + esc(p.categorias.join(' ')) + '" data-slug="' + esc(p.slug) + '">' +
      portadaHTML(p, i) +
      '<div class="obra__info">' +
        '<span class="obra__num">' + numero(i) + ' /</span>' +
        '<h3><a class="obra__enlace" href="#caso/' + esc(p.slug) + '">' + esc(titulo(p)) + '</a></h3>' +
        '<span class="obra__disc">' + esc(p.disciplina) + '</span>' +
        (d.filas > 1 || d.span >= 12 ? '<p class="obra__resumen">' + esc(p.resumen) + '</p>' : '') +
        (rel ? '<span class="obra__rel">' + esc(rel) + '</span>' : '') +
      '</div>' +
      '<span class="obra__flecha" aria-hidden="true"><svg><use href="#i-flecha"/></svg></span>' +
      (p.vistazo && p.vistazo.length ? '<div class="obra__vistazo" aria-hidden="true">' + p.vistazo.slice(0, 3).map(function (v, k) {
        return '<img src="' + esc(v) + '" alt="" loading="lazy" decoding="async" style="--k:' + k + '">';
      }).join('') + '</div>' : '') +
      '<span class="obra__chip">' + (p.publicado === false ? '<span class="chip-borrador">Borrador</span>' : '') +
        (p.portada ? '' : '<span class="chip-pendiente">Portada pendiente</span>') + '</span>' +
    '</article>';
  }

  obras.innerHTML = PROYECTOS.map(tarjeta).join('');

  filtros.innerHTML = FILTROS.map(function (f, i) {
    var n = f.id === 'todos' ? PROYECTOS.length : PROYECTOS.filter(function (p) { return p.categorias.indexOf(f.id) > -1; }).length;
    return '<button type="button" class="filtro" data-filtro="' + esc(f.id) + '" aria-pressed="' + (i === 0) + '">' + esc(f.nombre) + ' <sup>' + n + '</sup></button>';
  }).join('');

  filtros.addEventListener('click', function (e) {
    var b = e.target.closest('.filtro'); if (!b) return;
    var f = b.dataset.filtro, visibles = 0;
    $$('.filtro', filtros).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    obras.classList.toggle('filtrado', f !== 'todos');
    $$('.obra', obras).forEach(function (o) {
      var ver = f === 'todos' || o.dataset.cats.split(' ').indexOf(f) > -1;
      o.classList.toggle('oculta', !ver);
      if (ver) { visibles++; o.style.animation = 'none'; void o.offsetWidth; o.style.animation = ''; }
    });
    estadoFiltro.textContent = visibles + (visibles === 1 ? ' proyecto visible' : ' proyectos visibles');
  });

  /* ---------- Caso de proyecto ---------- */
  var caso = $('#caso'), cuerpo = $('#casoCuerpo'), actual = -1, origen = null;

  function piezaHTML(p, slug, desc, seccion) {
    var ruta = 'assets/proyectos/' + slug + '/' + (p.archivo || '');
    var f = 'f-' + (p.formato || 'cuadrado');
    var esVideo = p.tipo === 'video';
    if (p.src) {
      if (esVideo) {
        return '<figure class="pieza ' + f + '"><video src="' + esc(p.src) + '"' + (p.poster ? ' poster="' + esc(p.poster) + '"' : '') +
          ' controls playsinline preload="none" aria-label="' + esc(p.alt) + '"></video></figure>';
      }
      return '<figure class="pieza ' + f + (p.contener ? ' pieza--contener' : '') + '"><button type="button" class="pieza__btn" data-src="' + esc(p.src) + '" data-alt="' + esc(p.alt) +
        '" data-titulo="' + esc(p.titulo || '') + '" data-desc="' + esc(p.desc || desc || '') + '" data-seccion="' + esc(seccion || '') + '" aria-label="Ampliar: ' + esc(p.titulo || p.alt) + '">' +
        '<img src="' + esc(p.src) + '" alt="' + esc(p.alt) + '" loading="lazy" decoding="async"></button></figure>';
    }
    return '<figure class="pieza ' + f + '"><div class="hueco' + (esVideo ? ' hueco--video' : '') + '">' +
      '<svg aria-hidden="true"><use href="' + (esVideo ? '#i-play' : '#i-imagen') + '"/></svg>' +
      '<span>' + (esVideo ? 'Video pendiente' : 'Imagen pendiente') + '</span><code>' + esc(ruta) + '</code></div>' +
      '<figcaption class="sr-only">' + esc(p.alt) + ' (pendiente)</figcaption></figure>';
  }

  function ficha(titulo, valor) {
    if (vacio(valor)) return '';
    var cont = Array.isArray(valor)
      ? '<ul>' + valor.map(function (v) { return '<li>' + esc(v) + '</li>'; }).join('') + '</ul>'
      : esc(valor);
    return '<div class="ficha"><dt>' + esc(titulo) + '</dt><dd>' + cont + '</dd></div>';
  }

  function faltantes(p) {
    var f = [];
    if (!p.titulo) f.push('nombre del proyecto');
    if (!RELACIONES[p.relacion]) f.push('tipo de relación (cliente, profesional, colaboración...)');
    if (!p.contexto) f.push('contexto');
    if (!p.objetivo) f.push('objetivo');
    if (!p.participacion) f.push('tu participación');
    if (!p.concepto) f.push('concepto creativo');
    if (vacio(p.decisiones)) f.push('decisiones de diseño');
    if (vacio(p.entregables)) f.push('entregables');
    if (!p.portada) f.push('portada de la tarjeta');
    var piezas = (window.Presenta ? window.Presenta.piezas(p) : []).filter(function (x) { return !x.src; }).length;
    if (piezas) f.push(piezas + (piezas === 1 ? ' pieza' : ' piezas') + ' sin imagen o video');
    return f;
  }

  function casoHTML(i) {
    var p = PROYECTOS[i], sig = PROYECTOS[(i + 1) % PROYECTOS.length];
    var rel = RELACIONES[p.relacion];
    var fuerte = ['conceptual', 'personal', 'colaboracion'].indexOf(p.relacion) > -1;
    var nombresCat = {};
    FILTROS.forEach(function (f) { nombresCat[f.id] = f.nombre; });

    var visual = (p.portada && window.Presenta) ? '<div class="caso__visual">' + window.Presenta.collage(p) + '</div>' : '';
    var paleta = p.paleta ? ' paleta-hero' : ' t-' + esc(p.tono) + ' obra--tipo';
    var fichasHero = ficha('Contexto', p.contexto) + ficha('Objetivo', p.objetivo) + ficha('Mi aportación', p.participacion);
    var html = '<header class="caso__cabeza' + paleta + (visual ? ' con-visual' : '') + (p.portadaEstilo ? ' portada-' + esc(p.portadaEstilo) : '') + '">' +
      (p.paleta ? '' : '<div class="obra__portada"></div>') +
      '<div class="caso__hero">' +
        '<div class="caso__textos">' +
          '<div class="caso__chips">' +
            (rel ? '<span class="chip' + (fuerte ? ' chip--fuerte' : '') + '">' + esc(rel) + '</span>' : '<span class="chip-pendiente">Relación pendiente</span>') +
            (p.agencia && porSlug(p.agencia) > -1 ? '<button type="button" class="chip chip--enlace" data-ir="' + porSlug(p.agencia) + '">Ver Ink House</button>' : '') +
            p.categorias.map(function (c) { return '<span class="chip">' + esc(nombresCat[c] || c) + '</span>'; }).join('') +
          '</div>' +
          (p.publicado === false ? '<p class="caso__aviso-borrador mono">Borrador: no se muestra al público</p>' : '') +
          '<h2 class="caso__titulo" id="casoTitulo">' + (p.tituloFirma && p.titulo && p.titulo.slice(-p.tituloFirma.length) === p.tituloFirma
            ? esc(p.titulo.slice(0, -p.tituloFirma.length).trim()) + ' <span class="caso__firma">' + esc(p.tituloFirma) + '</span>'
            : esc(titulo(p))) + '</h2>' +
          '<p class="caso__resumen">' + esc(p.resumen) + '</p>' +
          (fichasHero ? '<dl class="caso__fichas">' + fichasHero + '</dl>' : '') +
          (p.aclaracion ? '<p class="caso__aclaracion">' + esc(p.aclaracion) + '</p>' : '') +
        '</div>' + visual +
      '</div>' +
      '<span class="caso__explora" aria-hidden="true">Explora el proyecto <svg><use href="#i-abajo"/></svg></span>' +
    '</header>';

    if (p.cinta && window.Presenta) html += window.Presenta.cinta(p);

    var fichas = ficha('Concepto creativo', p.concepto) + ficha('Entregables', p.entregables);
    var falta = faltantes(p);
    if (fichas || (falta.length && raiz.classList.contains('ver-pendientes'))) {
      html += '<section class="caso__seccion caso__seccion--fichas" aria-label="Más sobre el proyecto">' +
        (fichas ? '<dl class="fichas">' + fichas + '</dl>' : '') +
        (falta.length ? '<p class="nota-pendiente">Pendiente en este proyecto: ' + esc(falta.join(', ')) + '.</p>' : '') +
      '</section>';
    }

    function cabecera(s) {
      return window.Presenta ? window.Presenta.encabezado(s) :
        '<div class="bloque__cab"><h3 class="bloque__titulo">' + esc(s.titulo) + '</h3></div>';
    }
    (p.secciones || []).forEach(function (s) {
      var especial = window.Presenta && window.Presenta.html(s, p);
      if (especial) {
        html += '<section class="caso__seccion caso__seccion--' + esc(s.tipo) + '">' + cabecera(s) + especial + '</section>';
        return;
      }
      var normales = s.piezas.filter(function (x) { return x.formato !== 'ancho'; }).length;
      var historias = s.piezas.every(function (x) { return x.formato === 'historia'; });
      var cols = s.columnas ? 'c' + s.columnas + ' amplia' : (historias && normales >= 4) ? 'c4' : 'c' + Math.max(1, Math.min(normales, 3)) + (normales === 0 ? ' solo-ancho' : '');
      html += '<section class="caso__seccion">' + cabecera(s) +
        '<div class="galeria ' + cols + '" data-grupo>' + s.piezas.map(function (x) { return piezaHTML(x, p.slug, s.nota, (s.encabezado && s.encabezado.ante) || s.titulo); }).join('') + '</div>' +
      '</section>';
    });

    var decs = (p.decisiones || []).filter(function (d) { return d && (d.titulo || typeof d === 'string'); });
    if (decs.length || p.solucion) {
      html += '<section class="caso__seccion caso__seccion--decisiones">' +
        cabecera({ encabezado: p.encabezadoDecisiones || { ante: 'Decisiones de diseño', linea1: 'Por qué', linea2: 'se ve así' }, nota: p.solucion }) +
        (decs.length ? '<div class="decisiones">' + decs.map(function (d) {
          if (typeof d === 'string') d = { titulo: d, texto: '' };
          return '<article class="decision" data-aparece><h4>' + esc(d.titulo) + '</h4>' + (d.texto ? '<p>' + esc(d.texto) + '</p>' : '') + '</article>';
        }).join('') + '</div>' : '') +
      '</section>';
    }

    var rel2 = (p.relacionados || []).map(porSlug).filter(function (k) { return k > -1; });
    if (rel2.length) {
      html += '<section class="caso__seccion caso__seccion--relacionados">' +
        cabecera({ encabezado: { ante: 'Desde la agencia', linea1: 'Clientes que', linea2: 'atendí aquí' }, nota: 'Cada uno tiene su propio caso.', unidad: rel2.length === 1 ? 'caso' : 'casos', piezas: rel2 }) +
        '<div class="relacionados">' +
        rel2.map(function (k) {
          var r = PROYECTOS[k];
          return '<button type="button" class="relacionado t-' + esc(r.tono) + '" data-ir="' + k + '"><span class="mono">' + esc(r.disciplina) + '</span><strong>' + esc(titulo(r)) +
            '</strong><svg aria-hidden="true"><use href="#i-flecha"/></svg></button>';
        }).join('') + '</div></section>';
    }

    if (!vacio(p.proceso)) {
      html += '<section class="caso__seccion"><div class="bloque__cab"><h3 class="bloque__titulo">Proceso</h3></div>' +
        '<div class="galeria c3">' + p.proceso.map(function (x) { return piezaHTML(x, p.slug); }).join('') + '</div></section>';
    }

    if (!vacio(p.resultados)) {
      html += '<section class="caso__seccion"><div class="bloque__cab"><h3 class="bloque__titulo">Resultados</h3></div><div class="resultados">' +
        p.resultados.map(function (r) {
          return '<div class="resultado"><b>' + esc(r.dato) + '</b><p>' + esc(r.descripcion) + '</p>' + (r.fuente ? '<small>' + esc(r.fuente) + '</small>' : '') + '</div>';
        }).join('') + '</div></section>';
    } else if (p.slug === 'moncar') {
      html += '<section class="caso__seccion nota-pendiente">Resultados: agrégalos en <code>resultados</code> solo con cifras que puedas comprobar (periodo y fuente).</section>';
    }

    html += '<button type="button" class="caso__sig" data-ir="' + ((i + 1) % PROYECTOS.length) + '">' +
      '<span><span class="mono">Siguiente proyecto</span><strong>' + esc(titulo(sig)) + '</strong></span>' +
      '<svg aria-hidden="true"><use href="#i-flecha"/></svg></button>';
    return '<div class="caso__lienzo' + (p.paleta ? ' paleta-' + esc(p.paleta) : '') + '" data-titulos="' + esc(p.estiloTitulos || 'contorno') + '"' + (p.acento && !p.paleta ? ' style="--proy:' + esc(p.acento) + '"' : '') + '>' + html + '</div>';
  }

  function mostrar(i) {
    actual = (i + PROYECTOS.length) % PROYECTOS.length;
    if (window.Presenta) window.Presenta.detener();
    cuerpo.innerHTML = casoHTML(actual);
    if (window.Presenta) window.Presenta.iniciar(cuerpo);
    cuerpo.scrollTop = 0;
    history.replaceState(null, '', '#caso/' + PROYECTOS[actual].slug);
  }

  function abrir(i, desde) {
    origen = desde || document.activeElement;
    mostrar(i);
    if (!caso.open) {
      if (typeof caso.showModal === 'function') caso.showModal(); else caso.setAttribute('open', '');
      raiz.style.overflow = 'hidden';
    }
    $('#casoVolver').focus();
  }

  function cerrar() { if (caso.open) caso.close(); }

  caso.addEventListener('close', function () {
    if (visorAbierto()) { visor.hidden = true; visorImg.removeAttribute('src'); }
    if (window.Presenta) window.Presenta.detener();
    raiz.style.overflow = '';
    cuerpo.innerHTML = '';
    history.replaceState(null, '', '#proyectos');
    var slug = PROYECTOS[actual] && PROYECTOS[actual].slug;
    var destino = slug && $('.obra[data-slug="' + slug + '"] .obra__enlace');
    (destino || origen || document.body).focus({ preventScroll: false });
    actual = -1;
  });
  /* ---------- Visor de piezas ---------- */
  /* Cada pieza ampliable declara sus datos (data-src, data-titulo, data-desc,
     data-seccion, data-k). El visor solo usa esos datos: así nunca muestra
     una foto de perfil, una portada u otra imagen que viva en el mismo marco. */
  var visor = $('#visor'), visorImg = $('#visorImg'), visorLista = [], visorPos = 0, visorOrigen = null;
  function visorAbierto() { return !visor.hidden; }
  function pintarVisor() {
    var it = visorLista[visorPos];
    visor.classList.remove('cambia'); void visor.offsetWidth; visor.classList.add('cambia');
    visorImg.src = it.src;
    visorImg.alt = it.alt || it.titulo || '';
    $('#visorSeccion').textContent = it.seccion || '';
    $('#visorTitulo').textContent = it.titulo || it.alt || '';
    $('#visorDesc').textContent = it.desc || '';
    $('#visorDesc').hidden = !it.desc;
    var multiple = visorLista.length > 1;
    $('#visorPrev').hidden = $('#visorNext').hidden = !multiple;
    var minis = $('#visorMinis');
    minis.hidden = !multiple;
    $$('button', minis).forEach(function (b, k) {
      if (k === visorPos) { b.setAttribute('aria-current', 'true'); b.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reducirMovimiento ? 'auto' : 'smooth' }); }
      else b.removeAttribute('aria-current');
    });
  }
  function abrirVisorLista(lista, pos, origen) {
    visorLista = lista.filter(function (x) { return x && x.src; });
    if (!visorLista.length) return;
    visorPos = Math.max(0, Math.min(visorLista.length - 1, pos || 0)); visorOrigen = origen || null;
    $('#visorMinis').innerHTML = visorLista.map(function (x, k) {
      return '<button type="button" data-v="' + k + '" aria-label="Ver: ' + esc(x.titulo || x.alt || ('pieza ' + (k + 1))) + '"><img src="' + esc(x.src) + '" alt="" loading="lazy" decoding="async"></button>';
    }).join('');
    visor.hidden = false;
    pintarVisor();
    $('#visorCerrar').focus();
  }
  window.abrirVisorLista = abrirVisorLista;
  function abrirVisor(btn) {
    var grupo = btn.closest('[data-grupo]') || btn.parentNode;
    // Las copias decorativas (marcadas con inert) no entran al visor.
    var botones = $$('[data-src]', grupo).filter(function (b) { return b.dataset.src && !b.closest('[inert]'); });
    if (botones.length && botones.every(function (b) { return b.dataset.k != null; })) {
      botones.sort(function (a, b) { return Number(a.dataset.k) - Number(b.dataset.k); });
    }
    abrirVisorLista(botones.map(function (b) { return Object.assign({}, b.dataset); }), botones.indexOf(btn), btn);
  }
  function cerrarVisor() {
    visor.hidden = true;
    visorImg.removeAttribute('src');
    $('#visorMinis').innerHTML = '';
    if (visorOrigen) visorOrigen.focus();
  }
  function moverVisor(d) { visorPos = (visorPos + d + visorLista.length) % visorLista.length; pintarVisor(); }
  $('#visorMinis').addEventListener('click', function (e) {
    var b = e.target.closest('[data-v]'); if (!b) return;
    visorPos = Number(b.dataset.v); pintarVisor();
  });
  $('#visorCerrar').addEventListener('click', cerrarVisor);
  $('#visorPrev').addEventListener('click', function () { moverVisor(-1); });
  $('#visorNext').addEventListener('click', function () { moverVisor(1); });
  visor.addEventListener('click', function (e) { if (e.target === visor || e.target === $('.visor__escena', visor)) cerrarVisor(); });
  caso.addEventListener('cancel', function (e) { if (visorAbierto()) { e.preventDefault(); cerrarVisor(); } });
  // Esc con el visor abierto cierra solo el visor, nunca el proyecto.
  caso.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && visorAbierto()) { e.preventDefault(); e.stopPropagation(); cerrarVisor(); }
  }, true);

  caso.addEventListener('click', function (e) {
    if (visorAbierto()) return;
    if (e.target === caso) cerrar();
    var z = e.target.closest('.pieza__btn');
    if (z && z.dataset.src) { e.preventDefault(); abrirVisor(z); return; }
    var ir = e.target.closest('[data-ir]');
    if (ir) mostrar(Number(ir.dataset.ir));
  });
  caso.addEventListener('keydown', function (e) {
    if (visorAbierto()) {
      if (e.key === 'ArrowRight') { e.preventDefault(); moverVisor(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); moverVisor(-1); }
      if (e.key === 'Tab') {
        var f = $$('button:not([hidden])', visor), i = f.indexOf(document.activeElement);
        e.preventDefault(); f.at((i + (e.shiftKey ? -1 : 1) + f.length) % f.length).focus();
      }
      return;
    }
  });
  $('#casoVolver').addEventListener('click', cerrar);

  obras.addEventListener('click', function (e) {
    var a = e.target.closest('.obra__enlace'); if (!a) return;
    e.preventDefault();
    var slug = a.closest('.obra').dataset.slug;
    abrir(porSlug(slug), a);
  });

  function desdeHash() {
    var m = location.hash.match(/^#caso\/([\w-]+)/);
    if (!m) return;
    var i = PROYECTOS.findIndex(function (p) { return p.slug === m[1]; });
    if (i > -1) abrir(i);
  }
  window.addEventListener('hashchange', desdeHash);
  desdeHash();

  /* ---------- Aparición al hacer scroll ---------- */
  var revelar = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reducirMovimiento) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visto'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    revelar.forEach(function (el) { io.observe(el); });
  } else {
    revelar.forEach(function (el) { el.classList.add('visto'); });
  }

  /* Portada: arranca cuando las fuentes están listas para no ver saltos */
  function arrancar() { requestAnimationFrame(function () { document.body.classList.add('listo'); }); }
  if (document.fonts && document.fonts.ready) {
    var hecho = false, una = function () { if (!hecho) { hecho = true; arrancar(); } };
    document.fonts.ready.then(una); setTimeout(una, 900);
  } else arrancar();

  /* ---------- Modo pendientes (index.html?pendientes) ---------- */
  if (raiz.classList.contains('ver-pendientes')) {
    var lista = [];
    if (!PERFIL.foto) lista.push('Foto para la portada (PERFIL.foto)');
    if (!PERFIL.ubicacion) lista.push('Ubicación (PERFIL.ubicacion), opcional');
    if (!PERFIL.cv) lista.push('CV en PDF (PERFIL.cv), opcional');
    if (!Object.keys(redes).some(function (k) { return redes[k]; })) lista.push('Enlaces a redes o Behance (PERFIL.redes)');
    TODOS.filter(function (p) { return p.publicado === false; }).forEach(function (p) {
      lista.push('Borrador oculto al público: ' + titulo(p) + ' (cambia publicado a true para mostrarlo)');
    });
    PROYECTOS.forEach(function (p) {
      var f = faltantes(p); if (f.length) lista.push('<b>' + esc(titulo(p)) + ':</b> ' + esc(f.join(', ')));
    });
    var panel = document.createElement('aside');
    panel.className = 'panel-pendientes';
    panel.setAttribute('aria-label', 'Datos pendientes');
    panel.innerHTML = '<button type="button" aria-label="Ocultar lista">×</button><h2>Pendientes (' + lista.length + ')</h2><ul><li>' +
      lista.map(function (x) { return x.indexOf('<b>') === 0 ? x : esc(x); }).join('</li><li>') + '</li></ul>';
    $('button', panel).addEventListener('click', function () { panel.remove(); });
    document.body.appendChild(panel);
  }
})();
