# Convenciones de las notas de los videos

Notas escritas de los videos del curso de topología algebraica. Este archivo es la referencia para que todas las notas del curso sean consistentes; léelo, y lee las notas ya hechas, antes de escribir una nueva.

## Archivos de cada nota

Cada nota vive en `cursos/notas/` con el mismo nombre base (el *slug*: minúsculas, sin acentos, con guiones):

- `<slug>.tex`: fuente en LaTeX. Empieza con `\documentclass[11pt]{article}`, define `\videoid{...}` (el identificador del video de YouTube) y hace `\input{preambulo}`.
- `<slug>.pdf`: PDF compilado con LuaLaTeX (`lualatex <slug>.tex`).
- `<slug>.html`: fragmento HTML que la página carga al desplegar las notas.
- Si un tema tiene dos videos, el segundo lleva el sufijo `-2` (por ejemplo `caminos-y-homotopias-2`).
- `preambulo.tex`: paquetes, colores, entornos de enunciados (`defn`, `prop`, `teo`, `lema`, `cor`) y entorno `erratas`, compartidos por todas las notas. Un cambio de estilo se hace ahí, una sola vez.

## Cómo se engancha una nota a la página

En `cursos/topologia-algebraica.html`, el tema correspondiente (objeto `C`, lista `units` → `items`) recibe el campo:

```
"nb": {"video": 1, "src": "notas/<slug>.html", "pdf": "notas/<slug>.pdf"}
```

`video` indica a cuál de los videos del tema corresponden las notas ("Notas del Video 1"). Con eso aparecen el botón desplegable y el botón "Descargar PDF" debajo de los enlaces del tema. Las fórmulas del fragmento HTML usan `\( ... \)` y `\[ ... \]` y se dibujan con KaTeX al abrir las notas.

## Pasos para una nota nueva

1. Leer este archivo y las notas ya hechas (`.tex`) para reutilizar notación y estilo.
2. Obtener del video la transcripción y capturas de los dibujos del pizarrón.
3. `python3 tools/nueva-nota.py crear --slug ... --unidad N --titulo ... --video-id ...` crea el `.tex` y el `.html` desde `tools/plantillas/` con el número de enunciado que toca.
4. Escribir el contenido del `.tex` y del `.html` (la figura en TikZ y en SVG) y compilar el PDF con LuaLaTeX.
5. `python3 tools/verificar-notas.py --compilar` debe terminar sin errores.
6. **Borrador:** mostrar al autor el PDF y una captura de cómo se ve en la página, y esperar su aprobación. Nada se sube a `main` antes.
7. Con la aprobación: `python3 tools/nueva-nota.py enganchar --slug ... --tema "..." [--video N]` (agrega `nb` a la página y actualiza la tabla de numeración), verificar de nuevo, subir a `main` y comprobar la página en línea.

## Numeración de enunciados por unidad

Definiciones, proposiciones, teoremas, lemas y corolarios comparten **un solo contador por unidad** (1.1, 1.2, ...), pensado para poder hacer referencias cruzadas. Al terminar una nota, actualizar esta tabla con el siguiente número libre de su unidad. Las notas de una unidad deben escribirse en el orden del curso; si se escribe una nota intermedia después, hay que renumerar las que le siguen.

| Unidad | Notas (en orden) | Enunciados numerados usados | Siguiente libre |
|---|---|---|---|
| 1. Grupo fundamental | `prerrequisitos-y-bibliografia` (Video 1, sin enunciados numerados), `que-estudiamos-en-topologia-algebraica` (Video 1, sin enunciados numerados), `caminos-y-homotopias` (Video 1), `caminos-y-homotopias-2` (Video 2), `definicion-de-grupo-fundamental` (Video 1), `definicion-de-grupo-fundamental-2` (Video 2), `cambio-de-punto-base` (Video 1) | 1.1 a 1.4; 1.5 a 1.6; 1.7 a 1.10; 1.11; 1.12 a 1.13 | 1.14 |
| 2. Teorema de van Kampen | | | 2.1 |
| 3. Espacios cubrientes | | | 3.1 |
| 4. Homología | | | 4.1 |

## Notación

- `I` es el intervalo unitario `[0,1]`; `X` es un espacio topológico cualquiera.
- Los caminos se llaman `f`, `g`, ...; un camino es la función `I → X`, no solo su imagen.
- Una homotopía de caminos es una familia `f_t`, `0 ≤ t ≤ 1`, con función asociada `F: I × I → X`, `F(s,t) = f_t(s)`. La variable `s` recorre el camino y `t` es el tiempo.
- En los dibujos, `t = 0` queda arriba (camino `f_0`) y `t = 1` abajo (camino `f_1`); los lados verticales del cuadrado van a los extremos `x_0` y `x_1`.
- Homotopía relativa a los extremos: se escribe `rel {0,1}`; caminos homotópicos: `f_0 ≃ f_1 rel {0,1}`.
- Cuando una nota introduzca notación nueva, agregarla aquí.

## Estilo

- Las notas siguen el video: no agregan resultados ni demostraciones que no estén en él. Si se agrega un comentario propio, se marca como «Comentario».
- Los enunciados numerados son las definiciones (`defn`), proposiciones (`prop`), teoremas (`teo`), lemas (`lema`) y corolarios (`cor`). **Comparten un solo contador por unidad**: `u.n` (Definición 1.5, Proposición 1.6, Teorema 1.7, ...). En el `.tex`, cada nota declara `\unidad{u}{n}` justo después de `\input{preambulo}`, con `n` el primer número libre de esa unidad según la tabla de abajo; los enunciados se pueden etiquetar con `\label` y citar con `\ref`. En HTML la etiqueta se escribe a mano: las definiciones van en `<div class="def"><b>Definición 1.5 (nombre).</b> ...</div>` y los demás en `<div class="thm"><b>Proposición 1.6.</b> <i>enunciado</i></div>`. Los tipos y los números deben coincidir en el PDF y en el HTML. Las demostraciones usan `proof` en el `.tex` y no se numeran.
- Figuras: TikZ en el PDF y SVG en el HTML, con los mismos colores (negro para `f_0`, azul para `f_1`, verde para los extremos).
- En el `.tex`, el signo ¿ se escribe con la ligadura `?``: con el preámbulo actual, un ¿ escrito directamente sale como «£» en el PDF. En el `.html` se escribe ¿ normal.
- Se compila con LuaLaTeX. En el entorno donde se prepararon las primeras notas no estaba el paquete de español de TeX Live, por eso el preámbulo usa `babel` con `provide=*` y desactiva los guiones de palabra; con la instalación completa se puede cambiar a `\usepackage[spanish]{babel}`.

## Observaciones y erratas del video

La sección «Observaciones y erratas del video» **solo aparece si hay algún error que señalar**; si no hay, no se agrega nada ni se deja el título vacío.

- La transcripción automática de YouTube se equivoca con los términos matemáticos. Lo que parezca un error de la explicación se confirma con el autor antes de publicarlo como errata.
- En LaTeX:

  ```
  \begin{erratas}
    \errata{203}{3:23}{Se dice ..., pero debe decir ...}
  \end{erratas}
  ```

  El primer argumento son los segundos (el enlace lleva al minuto exacto del video), el segundo es la marca visible y el tercero es el texto.
- En HTML, al final del fragmento:

  ```
  <div class="erratas"><h4>Observaciones y erratas del video</h4><ul>
    <li><a href="https://www.youtube.com/watch?v=ID&amp;t=203" target="_blank" rel="noopener">3:23</a> Se dice ..., pero debe decir ...</li>
  </ul></div>
  ```
