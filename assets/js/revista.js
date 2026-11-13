/* ==========================================================
   REVISTA INTERACTIVA
   Muestra una revista como un libro que se hojea con giro de
   página real (la hoja se curva y proyecta sombra al pasar).
   El giro lo resuelve la librería StPageFlip, que se carga solo
   cuando un caso tiene una sección de tipo "revista".

   Uso desde presentaciones.js:
     window.Revista.html(seccion, proyecto)  -> marcado de la sección
     window.Revista.iniciar(elemento)        -> activa el libro
     window.Revista.detener()                -> libera los libros abiertos

   La sección necesita:
     piezas:  páginas en orden de lectura (src, alt)
     pliegos: [{ titulo, folio }] uno por cada par de páginas
   ========================================================== */
(function () {
  'use strict';

  var LIBRERIA = 'https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js';
  var carga = null;          // promesa compartida de la librería
  var abiertos = [];         // libros activos, para liberarlos al cerrar el caso

  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // Carga la librería una sola vez; si ya existe, la reutiliza
  function cargarLibreria() {
    if (window.St && window.St.PageFlip) return Promise.resolve();
    if (carga) return carga;
    carga = new Promise(function (ok, falla) {
      var s = document.createElement('script');
      s.src = LIBRERIA;
      s.async = true;
      s.onload = function () { (window.St && window.St.PageFlip) ? ok() : falla(); };
      s.onerror = falla;
      document.head.appendChild(s);
    });
    carga.catch(function () { carga = null; });
    return carga;
  }

  var FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  var LUPA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5M11 8.5v5M8.5 11h5"/></svg>';

  /* ---------- Marcado ---------- */
  function html(s) {
    var paginas = s.piezas || [], pliegos = s.pliegos || [];
    var hojas = paginas.map(function (x, i) {
      // Las páginas pares van a la izquierda del pliego y las impares a la derecha
      return '<div class="revista__pagina revista__pagina--' + (i % 2 ? 'der' : 'izq') + '" data-density="soft">' +
        '<img src="' + esc(x.src) + '" alt="' + esc(x.alt) + '" decoding="async" draggable="false"' + (i > 1 ? ' loading="lazy"' : '') + '>' +
        '<span class="revista__papel" aria-hidden="true"></span>' +
      '</div>';
    }).join('');
    var minis = pliegos.map(function (p, i) {
      var a = paginas[2 * i], b = paginas[2 * i + 1];
      return '<li><button type="button" class="revista__mini" data-pliego="' + i + '" aria-label="Ir a ' + esc(p.titulo) + '"' + (i === 0 ? ' aria-current="true"' : '') + '>' +
        (a ? '<img src="' + esc(a.mini || a.src) + '" alt="" loading="lazy">' : '') +
        (b ? '<img src="' + esc(b.mini || b.src) + '" alt="" loading="lazy">' : '') +
      '</button></li>';
    }).join('');
    var primero = pliegos[0] || { titulo: '', folio: '' };
    var folios = pliegos.map(function (p) { return p.folio || ''; });
    return '<div class="revista" data-revista data-folios="' + esc(JSON.stringify(folios)) + '">' +
      '<div class="revista__escena">' +
        '<button type="button" class="revista__flecha revista__flecha--ant" aria-label="Página anterior" disabled>' + FLECHA + '</button>' +
        '<div class="revista__libro">' +
          '<span class="revista__canto revista__canto--izq" aria-hidden="true"></span>' +
          '<span class="revista__canto revista__canto--der" aria-hidden="true"></span>' +
          '<div class="revista__hojas">' + hojas + '</div>' +
        '</div>' +
        '<button type="button" class="revista__flecha revista__flecha--sig" aria-label="Página siguiente">' + FLECHA + '</button>' +
      '</div>' +
      '<div class="revista__pie">' +
        '<p class="revista__lectura" aria-live="polite"><strong class="revista__seccion">' + esc(primero.titulo) + '</strong>' +
          '<span class="revista__folio">Págs. ' + esc(primero.folio) + '</span></p>' +
        '<ul class="revista__miniaturas">' + minis + '</ul>' +
        '<button type="button" class="revista__ampliar">' + LUPA + 'Ampliar pliego</button>' +
      '</div>' +
      '<p class="revista__ayuda">Arrastra la esquina de una página, usa las flechas o el teclado para hojear.</p>' +
    '</div>';
  }

  /* ---------- Vista ampliada para leer los textos ---------- */
  function ampliar(imagenes, titulo, volver, origen) {
    var capa = document.createElement('div');
    capa.className = 'revista-ampliada';
    capa.setAttribute('role', 'dialog');
    capa.setAttribute('aria-modal', 'true');
    capa.setAttribute('aria-label', titulo);
    capa.innerHTML =
      '<div class="revista-ampliada__barra"><span>' + esc(titulo) + '</span><button type="button" class="revista-ampliada__cerrar">Cerrar</button></div>' +
      '<div class="revista-ampliada__lienzo"><div class="revista-ampliada__pliego' + (imagenes.length === 1 ? ' es-una' : '') + '">' +
        imagenes.map(function (src) { return '<img src="' + esc(src) + '" alt="" draggable="false">'; }).join('') +
      '</div></div>';
    // El caso se abre como diálogo modal (capa superior del navegador): la vista
    // ampliada debe vivir dentro de ese diálogo para quedar por encima de él
    var dialogo = origen && origen.closest('dialog');
    (dialogo || document.body).appendChild(capa);
    var lienzo = capa.querySelector('.revista-ampliada__lienzo');
    var cerrar = capa.querySelector('.revista-ampliada__cerrar');
    // Escape cierra solo la vista ampliada, no el caso completo
    function cancelar(e) { e.preventDefault(); salir(); }
    if (dialogo) dialogo.addEventListener('cancel', cancelar);
    function salir() {
      document.removeEventListener('keydown', tecla, true);
      if (dialogo) dialogo.removeEventListener('cancel', cancelar);
      capa.remove();
      if (volver) volver.focus();
    }
    function tecla(e) { if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); salir(); } }
    document.addEventListener('keydown', tecla, true);
    cerrar.addEventListener('click', salir);
    cerrar.focus();
    // Arrastrar con el ratón para recorrer el pliego ampliado
    var arr = null;
    lienzo.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      arr = { x: e.clientX, y: e.clientY, l: lienzo.scrollLeft, t: lienzo.scrollTop };
      lienzo.classList.add('arrastrando');
    });
    lienzo.addEventListener('pointermove', function (e) {
      if (!arr) return;
      lienzo.scrollLeft = arr.l - (e.clientX - arr.x);
      lienzo.scrollTop = arr.t - (e.clientY - arr.y);
    });
    ['pointerup', 'pointerleave'].forEach(function (t) {
      lienzo.addEventListener(t, function () { arr = null; lienzo.classList.remove('arrastrando'); });
    });
  }

  /* ---------- Activación ---------- */
  function iniciar(el) {
    if (el.dataset.lista) return;
    el.dataset.lista = '1';

    var hojasEl = el.querySelector('.revista__hojas');
    var paginas = Array.prototype.slice.call(el.querySelectorAll('.revista__pagina'));
    var srcs = paginas.map(function (p) { return p.querySelector('img').getAttribute('src'); });
    var minis = Array.prototype.slice.call(el.querySelectorAll('.revista__mini'));
    var pliegos = minis.map(function (b) { return b.getAttribute('aria-label').replace(/^Ir a /, ''); });
    var folios = JSON.parse(el.dataset.folios || '[]');
    var ant = el.querySelector('.revista__flecha--ant');
    var sig = el.querySelector('.revista__flecha--sig');
    var seccion = el.querySelector('.revista__seccion');
    var folio = el.querySelector('.revista__folio');
    var cantoIzq = el.querySelector('.revista__canto--izq');
    var cantoDer = el.querySelector('.revista__canto--der');
    var total = paginas.length;
    var libro = null, pagina = 0, vertical = false;

    // Pliego al que pertenece una página
    function pliegoDe(p) { return Math.floor(p / 2); }

    function actualizar() {
      var k = pliegoDe(pagina), n = minis.length;
      seccion.textContent = pliegos[k] || '';
      folio.textContent = folios[k] ? 'Págs. ' + folios[k] : '';
      minis.forEach(function (b, i) { if (i === k) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
      ant.disabled = pagina <= 0;
      sig.disabled = vertical ? pagina >= total - 1 : pliegoDe(pagina) >= n - 1;
      // Los cantos crecen con las hojas que quedan de cada lado
      cantoIzq.style.setProperty('--grosor', (2 + k * 3) + 'px');
      cantoDer.style.setProperty('--grosor', (2 + (n - 1 - k) * 3) + 'px');
    }

    function ir(destino) {
      destino = Math.max(0, Math.min(total - 1, destino));
      if (libro) libro.flip(destino, 'bottom');
      else { pagina = destino - (destino % 2); mostrarSinLibreria(); }
    }
    function siguiente() { if (libro) libro.flipNext('bottom'); else ir(pagina + 2); }
    function anterior() { if (libro) libro.flipPrev('bottom'); else ir(pagina - 2); }

    // Respaldo si la librería no carga: los pliegos cambian con un fundido
    function mostrarSinLibreria() {
      el.classList.add('sin-giro');
      paginas.forEach(function (p, i) { p.classList.toggle('visible', pliegoDe(i) === pliegoDe(pagina)); });
      actualizar();
    }

    ant.addEventListener('click', anterior);
    sig.addEventListener('click', siguiente);
    minis.forEach(function (b) { b.addEventListener('click', function () { ir(Number(b.dataset.pliego) * 2); }); });

    // Teclado: solo cuando la revista está a la vista
    function tecla(e) {
      if (!el.isConnected) return document.removeEventListener('keydown', tecla);
      if (document.querySelector('.revista-ampliada, .visor:not([hidden])')) return;
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); siguiente(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); anterior(); }
    }
    document.addEventListener('keydown', tecla);

    el.querySelector('.revista__ampliar').addEventListener('click', function (e) {
      var k = pliegoDe(pagina);
      var lista = vertical ? [srcs[pagina]] : [srcs[2 * k], srcs[2 * k + 1]].filter(Boolean);
      ampliar(lista, (pliegos[k] || '') + (folios[k] ? ' · págs. ' + folios[k] : ''), e.currentTarget, el);
    });

    cargarLibreria().then(function () {
      if (!el.isConnected) return;
      libro = new window.St.PageFlip(hojasEl, {
        width: 1406, height: 1988,          // proporción de una página A4
        size: 'stretch',
        minWidth: 280, maxWidth: 1406,
        minHeight: 396, maxHeight: 1988,
        showCover: false,                   // se abre directamente en el primer pliego
        usePortrait: true,                  // en pantallas angostas, una página a la vez
        drawShadow: true, maxShadowOpacity: .6,
        flippingTime: 950,
        showPageCorners: true,
        mobileScrollSupport: true,
        swipeDistance: 24,
        autoSize: true
      });
      libro.loadFromHTML(paginas);
      el.classList.add('lista');
      vertical = libro.getOrientation() === 'portrait';
      el.classList.toggle('es-vertical', vertical);
      libro.on('flip', function (e) { pagina = e.data; actualizar(); });
      libro.on('changeOrientation', function (e) {
        vertical = e.data === 'portrait';
        el.classList.toggle('es-vertical', vertical);
        actualizar();
      });
      abiertos.push(libro);
      actualizar();
    }).catch(mostrarSinLibreria);

    // En pantallas táctiles la ayuda habla de deslizar en lugar del teclado
    if (window.matchMedia && window.matchMedia('(hover: none)').matches) {
      el.querySelector('.revista__ayuda').textContent = 'Desliza la página hacia un lado o toca las flechas para hojear.';
    }
    actualizar();
  }

  function detener() {
    abiertos.forEach(function (l) { try { l.destroy(); } catch (e) { /* ya no existe */ } });
    abiertos = [];
  }

  window.Revista = { html: html, iniciar: iniciar, detener: detener };
})();
