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
| 1. Grupo fundamental | `prerrequisitos-y-bibliografia` (Video 1, sin enunciados numerados), `que-estudiamos-en-topologia-algebraica` (Video 1, sin enunciados numerados), `caminos-y-homotopias` (Video 1), `caminos-y-homotopias-2` (Video 2), `definicion-de-grupo-fundamental` (Video 1), `definicion-de-grupo-fundamental-2` (Video 2), `cambio-de-punto-base` (Video 1), `el-grupo-fundamental-del-circulo` (Video 1), `el-grupo-fundamental-del-circulo-2` (Video 2), `teorema-fundamental-del-algebra` (Video 1), `teorema-del-punto-fijo-de-brouwer` (Video 1), `teorema-de-borsuk-ulam` (Video 1), `el-grupo-fundamental-de-un-producto` (Video 1), `homomorfismos-inducidos` (Video 1), `el-grupo-fundamental-de-la-n-esfera` (Video 1), `r2-no-es-homeomorfo-a-rn` (Video 1), `homotopias-entre-funciones` (Video 1), `homotopias-y-homomorfismos-inducidos` (Video 2) | 1.1 a 1.4; 1.5 a 1.6; 1.7 a 1.10; 1.11; 1.12 a 1.13; 1.14 a 1.17; 1.18 a 1.19; 1.20; 1.21 a 1.22; 1.23; 1.24; 1.25; 1.26 a 1.27; 1.28; 1.29 a 1.31; 1.32 | 1.33 |
| 2. Teorema de van Kampen | `grupos-libres` (Video 1), `productos-libres` (Video 1), `subgrupos-normalmente-generados` (Video 1), `el-teorema-de-van-kampen` (Video 1), `el-teorema-de-van-kampen-2` (Video 2), `todo-grupo-es-un-grupo-fundamental` (Video 1), `todo-grupo-es-un-grupo-fundamental-2` (Video 2), `el-grupo-fundamental-no-detecta-celulas-mayores` (Video 1) | 2.1 a 2.2; 2.3; 2.4; 2.5; 2.6 a 2.8; 2.9 a 2.11; 2.12 | 2.13 |
| 3. Espacios cubrientes | `definicion-de-espacio-cubriente` (Video 1), `la-propiedad-de-levantamiento-de-homotopias` (Video 1), `el-homomorfismo-inducido-por-un-cubriente` (Video 1), `el-numero-de-hojas-de-un-cubriente` (Video 1), `el-criterio-de-levantamiento-de-funciones` (Video 1), `unicidad-del-levantamiento-de-funciones` (Video 1), `construccion-del-cubriente-universal` (Video 1), `construccion-del-cubriente-universal-2` (Video 2), `construccion-del-cubriente-universal-3` (Video 3), `el-teorema-de-clasificacion-de-cubrientes` (Video 1), `el-teorema-de-clasificacion-de-cubrientes-2` (Video 2), `el-teorema-de-clasificacion-de-cubrientes-3` (Video 3), `transformaciones-de-cubierta` (Video 1), `transformaciones-de-cubierta-2` (Video 2) | 3.1 a 3.2; 3.3 a 3.4; 3.5 a 3.8; 3.9; 3.10 a 3.11; 3.12; 3.13 a 3.15; 3.16 a 3.17; 3.18 a 3.21; 3.22; 3.23 a 3.24; 3.25 a 3.26; 3.27 a 3.29; 3.30 | 3.31 |
| 4. Homología | `algebra-homologica` (Video 1), `algebra-homologica-2` (Video 2), `algebra-homologica-3` (Video 3), `algebra-homologica-4` (Video 4) | 4.1 a 4.4; 4.5 a 4.6; 4.7 a 4.9; 4.10 | 4.11 |

## Notación

- `I` es el intervalo unitario `[0,1]`; `X` es un espacio topológico cualquiera.
- Los caminos se llaman `f`, `g`, ...; un camino es la función `I → X`, no solo su imagen.
- Una homotopía de caminos es una familia `f_t`, `0 ≤ t ≤ 1`, con función asociada `F: I × I → X`, `F(s,t) = f_t(s)`. La variable `s` recorre el camino y `t` es el tiempo.
- En los dibujos, `t = 0` queda arriba (camino `f_0`) y `t = 1` abajo (camino `f_1`); los lados verticales del cuadrado van a los extremos `x_0` y `x_1`.
- Homotopía relativa a los extremos: se escribe `rel {0,1}`; caminos homotópicos: `f_0 ≃ f_1 rel {0,1}`.
- Pares y puntos base: si $A\subseteq X$, $B\subseteq Y$ y $f(A)\subseteq B$, se escribe `f: (X,A) → (Y,B)`; con $A=\{x_0\}$, $B=\{y_0\}$ se escribe `f: (X,x_0) → (Y,y_0)` (que $f$ manda el punto base en el punto base). El homomorfismo inducido es `f_*: π_1(X,x_0) → π_1(Y,y_0)`, `f_*[γ] = [f∘γ]` (notas 1.11 y 1.14).
- Homotopía entre funciones (no entre caminos): `H: X × I → Y` con `H(x,0) = g(x)` (tiempo 0, arriba en los dibujos, negro) y `H(x,1) = f(x)` (tiempo 1, abajo, azul); «preserva el punto base» si `H(x_0,t) = y_0` para todo `t`. Se mantiene el mismo orden `g` en 0 y `f` en 1 en las definiciones de la nota.
- Unidad 2 (grupos): el grupo libre en un conjunto $S$ es $F_S$ (palabras en el alfabeto $S\cup\bar S$, palabra vacía $\varnothing$); $F_2$ es el grupo libre en dos letras. El grupo cíclico infinito generado por $a$ se escribe $\mathbb{Z}\langle a\rangle$. El producto libre es $G*H$, y el de una colección, $\mathop{\scalebox{1.4}{$*$}}_{\alpha\in I}G_\alpha$ en el `.tex` y `\mathop{\Large *}\limits_{\alpha\in I}G_\alpha` en el `.html` (KaTeX). El subgrupo generado es $\langle S\rangle$ y el normalmente generado, $\langle\!\langle S\rangle\!\rangle$ (también $\langle S\rangle^{\trianglelefteq}$).
- Unidad 3 (espacios cubrientes): un espacio (o proyección) cubriente es $p\colon\tilde X\to X$; otros cubrientes de $X$ se escriben $q\colon\hat X\to X$. Una vecindad abierta $U$ de $x$ cuya preimagen $p^{-1}(U)$ es unión disjunta de abiertos que se proyectan homeomorfamente a $U$ es una *vecindad regular*, y esos abiertos son las *hojas* de $\tilde X$ sobre $U$ (Definiciones 3.1 y 3.2). En las figuras, las hojas van en azul y el punto $x$ y los intervalos que se levantan, en verde. $S^1$ se ve como los complejos unitarios.
- Levantamientos de funciones (nota 3.11): $f\colon(Y,y_0)\to(X,x_0)$ con levantamiento $\tilde f\colon(Y,y_0)\to(\tilde X,\tilde x_0)$; el levantamiento de un camino compuesto se escribe $\widetilde{f\gamma}$ en el `.tex` y en KaTeX, y en los SVG como «fγ» con una «∼» encima (un `<text>` aparte, `font-size:12px`), no con la tilde combinante, que solo cubre la «f».
- Cubriente universal y clasificación (notas 3.13 a 3.22): el cubriente universal construido es $p_1\colon\tilde X\to X$ con $\tilde X=\{[\gamma]:\gamma(0)=x_0\}$ y $p_1[\gamma]=\gamma(1)$; $\mathcal U$ es la base de abiertos arco-conexos con $\pi_1(U)\to\pi_1(X)$ constante y $U_{[\gamma]}=\{[\gamma\cdot\eta]:\eta\subseteq U\}$; el cubriente asociado a $H\le\pi_1(X,x_0)$ es $p\colon X_H\to X$, $X_H=\tilde X/\!\sim$, con punto base $\tilde x_0=[[c_{x_0}]]$.
- Unidad 4 (homología): $R$ es un anillo asociativo con uno; un complejo de cadenas es $(C_\bullet,\partial)$ con $\partial_{p-1}\circ\partial_p=0$; ciclos $Z_p=\ker\partial_p$, fronteras $F_p=B_p=\operatorname{Im}\partial_{p+1}$ y homología $H_p(C_\bullet)=Z_p/F_p$; el inducido de $f$ en homología es $\bar f_p$ (o $f_p$). Los diagramas conmutativos van como `array` en el `.tex` y en KaTeX.
- Cuando una nota introduzca notación nueva, agregarla aquí.

## Estilo

- Las notas siguen el video: no agregan resultados ni demostraciones que no estén en él. Si se agrega un comentario propio, se marca como «Comentario».
- Los enunciados numerados son las definiciones (`defn`), proposiciones (`prop`), teoremas (`teo`), lemas (`lema`) y corolarios (`cor`). **Comparten un solo contador por unidad**: `u.n` (Definición 1.5, Proposición 1.6, Teorema 1.7, ...). En el `.tex`, cada nota declara `\unidad{u}{n}` justo después de `\input{preambulo}`, con `n` el primer número libre de esa unidad según la tabla de abajo; los enunciados se pueden etiquetar con `\label` y citar con `\ref`. En HTML la etiqueta se escribe a mano: las definiciones van en `<div class="def"><b>Definición 1.5 (nombre).</b> ...</div>` y los demás en `<div class="thm"><b>Proposición 1.6.</b> <i>enunciado</i></div>`. Los tipos y los números deben coincidir en el PDF y en el HTML. Las demostraciones usan `proof` en el `.tex` y no se numeran.
- Figuras: TikZ en el PDF y SVG en el HTML, con los mismos colores (negro para `f_0`, azul para `f_1`, verde para los extremos).
- En el `.tex`, el signo ¿ se escribe con la ligadura `?``: con el preámbulo actual, un ¿ escrito directamente sale como «£» en el PDF. En el `.html` se escribe ¿ normal.
- Lo mismo pasa con las comillas latinas: en el `.tex` se escriben `\guillemotleft{}` y `\guillemotright{}` (un « o » escrito directamente sale como «ń» y «ż»). En el `.html` se escriben « y » normales.
- `verificar-notas.py --compilar` compila en una copia aparte y **no** actualiza el `.pdf` del repositorio: después de cualquier cambio al `.tex` hay que recompilar el PDF (`latexmk -lualatex <slug>.tex`) antes de subirlo.
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
