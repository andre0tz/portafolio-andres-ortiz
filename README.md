# Portafolio de Andres Ortiz

Sitio estático: HTML, CSS y JavaScript sin librerías. Las fuentes van incluidas en la carpeta, así que funciona sin internet.

## Cómo abrirlo

1. Descomprime el ZIP.
2. Doble clic en `index.html`. Se abre en el navegador y todo funciona.
3. Si prefieres un servidor local (recomendado para probar videos), abre una terminal en la carpeta y escribe:

```
python -m http.server 8000
```

Luego entra a http://localhost:8000

## Borradores

Cada proyecto tiene `publicado: true` o `publicado: false` en `assets/js/proyectos.js`. Los que están en `false` no aparecen para los visitantes. Para verlos, abre el sitio con `?borrador` al final de la dirección, por ejemplo `https://andre0tz.github.io/portafolio-andres-ortiz/?borrador`.

El proyecto conceptual de belleza que sustituye a Casiopea está como borrador. Cuando tenga nombre, escríbelo en `titulo` y cambia `publicado` a `true`.

## Cómo ver lo que falta

Abre `index.html?pendientes` (con el servidor: http://localhost:8000/?pendientes). Aparece una lista con todo lo que falta y cada caso muestra sus notas en amarillo. Sin `?pendientes` los visitantes no ven esas notas.

## Cómo agregar tus imágenes

Todo el contenido está en `assets/js/proyectos.js`.

1. Copia la imagen a la carpeta del proyecto. Ejemplo: `assets/proyectos/moncar/publicidad-1.webp`. Cada espacio vacío del sitio muestra la ruta exacta que espera.
2. En `proyectos.js`, busca esa pieza y escribe la ruta en `src`:

```js
{ src: "assets/proyectos/moncar/publicidad-1.webp", archivo: "publicidad-1.webp", alt: "Pieza publicitaria de Grupo Refaccionario Moncar", formato: "cuadrado" }
```

3. Para la portada de una tarjeta, llena `portada` con la ruta de la imagen.
4. Para tu foto, llena `PERFIL.foto`. Se muestra en blanco y negro sobre el panel azul. Funciona mejor con fondo recortado (PNG o WebP con transparencia).

Formatos de pieza: `cuadrado` (1:1), `vertical` (4:5), `horizontal` (3:2), `ancho` (ocupa toda la fila) e `historia` (9:16, para videos y stories).

Para videos usa `tipo: "video"`, el MP4 en `src` y una imagen opcional en `poster`.

Recomendación de peso: exporta en WebP a 1600 px del lado mayor (portadas) y 1200 px (piezas). Los videos en MP4 H.264, de menos de 8 MB.

## Estructura

```
index.html                 página principal
assets/css/estilos.css     estilos, temas claro y oscuro, responsive
assets/js/proyectos.js     perfil, experiencia, formación, herramientas, habilidades y proyectos
assets/js/main.js          filtros, casos, tema, menú y animaciones
assets/fonts/              Anton, Manrope, Caveat Brush, JetBrains Mono (OFL)
assets/proyectos/<slug>/   imágenes y videos de cada proyecto
assets/perfil/             tu foto y CV
```

Cada caso tiene un enlace directo, por ejemplo `index.html#caso/moncar`, útil para mandar un proyecto específico a un reclutador.

## Publicarlo

Sube la carpeta completa a Netlify (arrastrar y soltar), GitHub Pages o Vercel. No necesita compilación.

## Al publicar cambios

En `index.html` los archivos de estilos y scripts llevan `?v=` con un número de versión. Cuando cambies `proyectos.js`, `main.js` o `estilos.css`, sube ese número (por ejemplo de `20261017d` a `20261018a`). Así los visitantes reciben la versión nueva en lugar de la que su navegador tenía guardada.
