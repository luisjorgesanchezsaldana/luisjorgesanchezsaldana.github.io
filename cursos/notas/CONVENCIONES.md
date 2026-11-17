# Convenciones de las notas de los videos

Notas escritas de los videos del curso de topología algebraica. Este archivo es la referencia para que todas las notas del curso sean consistentes; léelo, y lee las notas ya hechas, antes de escribir una nueva.

## Archivos de cada nota

Cada nota vive en `cursos/notas/` con el mismo nombre base (el *slug*: minúsculas, sin acentos, con guiones):

- `<slug>.tex`: fuente en LaTeX. Empieza con `\documentclass[11pt]{article}`, define `\videoid{...}` (el identificador del video de YouTube) y hace `\input{preambulo}`.
- `<slug>.pdf`: PDF compilado con LuaLaTeX (`lualatex <slug>.tex`).
- `<slug>.html`: fragmento HTML que la página carga al desplegar las notas.
- Si un tema tiene dos videos, el segundo lleva el sufijo `-2` (por ejemplo `caminos-y-homotopias-2`).
- `preambulo.tex`: paquetes, colores, entorno `defn` y entorno `erratas`, compartidos por todas las notas. Un cambio de estilo se hace ahí, una sola vez.

## Cómo se engancha una nota a la página

En `cursos/topologia-algebraica.html`, el tema correspondiente (objeto `C`, lista `units` → `items`) recibe el campo:

```
"nb": {"video": 1, "src": "notas/<slug>.html", "pdf": "notas/<slug>.pdf"}
```

`video` indica a cuál de los videos del tema corresponden las notas ("Notas del Video 1"). Con eso aparecen el botón desplegable y el botón "Descargar PDF" debajo de los enlaces del tema. Las fórmulas del fragmento HTML usan `\( ... \)` y `\[ ... \]` y se dibujan con KaTeX al abrir las notas.

## Pasos para una nota nueva

1. Leer este archivo y las notas ya hechas (`.tex`) para reutilizar notación y estilo.
2. Obtener del video la transcripción y capturas de los dibujos del pizarrón.
3. Escribir el `.tex`, compilarlo y revisar el PDF.
4. Escribir el fragmento `.html` con el mismo contenido (la figura en SVG).
5. Agregar el campo `nb` al tema en la página.
6. Subir a `main` y comprobar la página en línea.

## Notación

- `I` es el intervalo unitario `[0,1]`; `X` es un espacio topológico cualquiera.
- Los caminos se llaman `f`, `g`, ...; un camino es la función `I → X`, no solo su imagen.
- Una homotopía de caminos es una familia `f_t`, `0 ≤ t ≤ 1`, con función asociada `F: I × I → X`, `F(s,t) = f_t(s)`. La variable `s` recorre el camino y `t` es el tiempo.
- En los dibujos, `t = 0` queda arriba (camino `f_0`) y `t = 1` abajo (camino `f_1`); los lados verticales del cuadrado van a los extremos `x_0` y `x_1`.
- Homotopía relativa a los extremos: se escribe `rel {0,1}`; caminos homotópicos: `f_0 ≃ f_1 rel {0,1}`.
- Cuando una nota introduzca notación nueva, agregarla aquí.

## Estilo

- Las notas siguen el video: no agregan resultados ni demostraciones que no estén en él. Si se agrega un comentario propio, se marca como «Comentario».
- Las definiciones usan el entorno `defn` y se numeran desde 1 dentro de cada nota; en HTML van en `<div class="def">` sin número. (Si se decide numerar por unidad o por tema, cambiarlo aquí y en `preambulo.tex`.)
- Figuras: TikZ en el PDF y SVG en el HTML, con los mismos colores (negro para `f_0`, azul para `f_1`, verde para los extremos).
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
