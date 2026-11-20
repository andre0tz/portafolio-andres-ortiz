"""
Genera versiones ligeras de las imágenes que el portafolio muestra en
tamaño pequeño (las vistas previas de cada tarjeta y sus portadas).

  - Vistas previas: 320 px de ancho.
  - Portadas de tarjeta: 900 px de ancho (la original queda para pantallas grandes).

Escribe las copias en assets/miniaturas/ y un índice en
assets/js/miniaturas.js que main.js consulta. Si una imagen no tiene
miniatura, el sitio usa la original, así que nunca se rompe nada.

Uso:  python3 herramientas/miniaturas.py
Requiere Pillow y Node (para leer proyectos.js).
"""
import json
import subprocess
from pathlib import Path
from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "assets" / "miniaturas"

# Lee los proyectos con Node para no duplicar los datos
datos = json.loads(subprocess.check_output(
    ["node", "-e", "global.window={};require('./assets/js/proyectos.js');"
     "console.log(JSON.stringify(window.PROYECTOS.map(p=>({portada:p.portada,vistazo:p.vistazo||[]}))))"],
    cwd=RAIZ))

pedidos = {}  # ruta original -> ancho deseado
for p in datos:
    for v in p["vistazo"]:
        pedidos.setdefault(v, 320)
    if p["portada"]:
        pedidos[p["portada"]] = 900

indice = {}
for ruta, ancho in pedidos.items():
    origen = RAIZ / ruta
    if not origen.exists():
        continue
    im = Image.open(origen)
    if im.width <= ancho * 1.15:  # ya es pequeña: no vale la pena otra copia
        continue
    destino = SALIDA / Path(ruta).relative_to("assets/proyectos").with_name(Path(ruta).stem + f"-{ancho}.webp")
    destino.parent.mkdir(parents=True, exist_ok=True)
    alto = round(im.height * ancho / im.width)
    im.convert("RGB").resize((ancho, alto), Image.LANCZOS).save(destino, "WEBP", quality=82, method=6)
    indice[ruta] = {"src": destino.relative_to(RAIZ).as_posix(), "ancho": ancho, "original": im.width}

js = ("/* Índice generado por herramientas/miniaturas.py: no se edita a mano.\n"
      "   Relaciona cada imagen con su versión ligera. */\n"
      "window.MINIATURAS = " + json.dumps(indice, ensure_ascii=False, indent=1) + ";\n")
(RAIZ / "assets" / "js" / "miniaturas.js").write_text(js, encoding="utf-8")
print(f"{len(indice)} miniaturas listas")
