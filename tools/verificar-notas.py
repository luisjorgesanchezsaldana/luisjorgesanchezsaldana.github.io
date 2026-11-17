#!/usr/bin/env python3
"""Verifica la consistencia de las notas de los videos (ver cursos/notas/CONVENCIONES.md).

  python3 tools/verificar-notas.py [--compilar]

Revisa, para cada nota en cursos/notas/*.tex:
  - que existan .tex, .html y .pdf, y que el .tex declare \\videoid y \\unidad{u}{n};
  - que los enunciados numerados (definiciones, proposiciones, teoremas, lemas, corolarios; un solo
    contador por unidad) del .tex y del .html tengan los mismos tipos y números (u.n, u.n+1, ...);
  - que la sección de erratas esté en los dos o en ninguno;
  - que las notas enganchadas a la página estén en la unidad correcta y que su campo "nb" apunte a archivos existentes;
  - que, dentro de cada unidad, la numeración sea continua entre notas (sin huecos ni solapes);
  - que la tabla de CONVENCIONES.md coincida con lo calculado.
Con --compilar, además compila cada .tex con LuaLaTeX en una carpeta temporal.
Sale con código 1 si hay errores.
"""
import glob, json, os, re, subprocess, sys, tempfile, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NOTAS = os.path.join(ROOT, "cursos", "notas")
errores, avisos = [], []


def leer(p):
    with open(p, encoding="utf8") as f:
        return f.read()


def sin_comentarios_tex(t):
    return re.sub(r"(?m)(?<!\\)%.*$", "", t)


pagina = leer(os.path.join(ROOT, "cursos", "topologia-algebraica.html"))
C = json.loads(re.search(r"^const C=(\{.*\});$", pagina, re.M).group(1))
enganchadas = {}  # slug -> (unidad, orden)
orden = 0
for ui, un in enumerate(C["units"], 1):
    for it in un["items"]:
        orden += 1
        for nb in ([it["nb"]] if isinstance(it.get("nb"), dict) else it.get("nb", [])):
            slug = os.path.basename(nb["src"])[:-5]
            enganchadas[slug] = (ui, orden, nb.get("video", 1))
            for k in ("src", "pdf"):
                if not os.path.exists(os.path.join(ROOT, "cursos", nb[k])):
                    errores.append("%s: el campo nb.%s apunta a un archivo que no existe (%s)" % (it["t"], k, nb[k]))

notas = {}
for tex in sorted(glob.glob(os.path.join(NOTAS, "*.tex"))):
    slug = os.path.basename(tex)[:-4]
    if slug == "preambulo":
        continue
    t = sin_comentarios_tex(leer(tex))
    for ext in ("html", "pdf"):
        if not os.path.exists(os.path.join(NOTAS, slug + "." + ext)):
            errores.append("%s: falta %s.%s" % (slug, slug, ext))
    if not re.search(r"\\newcommand\{\\videoid\}\{[\w-]+\}", t):
        errores.append("%s.tex: no define \\videoid" % slug)
    m = re.search(r"^\\unidad\{(\d+)\}\{(\d+)\}", t, re.M)
    if not m:
        errores.append("%s.tex: no declara \\unidad{u}{n}" % slug)
        continue
    u, n = int(m.group(1)), int(m.group(2))
    NOMBRES = {"defn": "Definición", "prop": "Proposición", "teo": "Teorema", "lema": "Lema", "cor": "Corolario"}
    tipos = re.findall(r"\\begin\{(defn|prop|teo|lema|cor)\}", t)
    k = len(tipos)
    esperadas = [(NOMBRES[x], "%d.%d" % (u, n + i)) for i, x in enumerate(tipos)]
    h = os.path.join(NOTAS, slug + ".html")
    if os.path.exists(h):
        hs = re.sub(r"<!--.*?-->", "", leer(h), flags=re.S)
        etiquetas = re.findall(r'<div class="(?:def|thm)"><b>(Definición|Proposición|Teorema|Lema|Corolario) (\d+\.\d+)', hs)
        if etiquetas != esperadas:
            errores.append("%s: enunciados numerados del .tex %s no coinciden con los del .html %s" % (slug, esperadas, etiquetas))
        if ("\\begin{erratas}" in t) != ('class="erratas"' in hs):
            errores.append("%s: la sección de erratas está en un formato y no en el otro" % slug)
    notas[slug] = (u, n, k)
    if slug in enganchadas and enganchadas[slug][0] != u:
        errores.append("%s: declara la unidad %d pero está enganchada en la unidad %d" % (slug, u, enganchadas[slug][0]))

# continuidad por unidad: primero las notas enganchadas (en el orden del curso), luego los borradores
for u in sorted({v[0] for v in notas.values()}):
    def clave(s):
        e = enganchadas.get(s)
        return (0, e[1], e[2], 0) if e else (1, 0, 0, notas[s][1])
    lista = sorted((s for s, v in notas.items() if v[0] == u), key=clave)
    sig = 1
    sig_enganchadas = 1
    for s in lista:
        _, n, k = notas[s]
        if n != sig:
            errores.append("unidad %d: %s empieza en %d.%d pero se esperaba %d.%d (hueco o solape)" % (u, s, u, n, u, sig))
        sig = n + k
        if s in enganchadas:
            sig_enganchadas = sig
    fila = re.search(r"^\|\s*%d\.[^\n]*$" % u, leer(os.path.join(NOTAS, "CONVENCIONES.md")), re.M)
    if fila:
        libre = [c.strip() for c in fila.group(0).strip().strip("|").split("|")][3]
        if libre != "%d.%d" % (u, sig_enganchadas):
            errores.append("CONVENCIONES.md: 'Siguiente libre' de la unidad %d dice %s y debería decir %d.%d" % (u, libre, u, sig_enganchadas))

if "--compilar" in sys.argv:
    for slug in notas:
        d = tempfile.mkdtemp()
        for f in glob.glob(os.path.join(NOTAS, "*.tex")):
            shutil.copy(f, d)
        r = subprocess.run(["latexmk", "-lualatex", "-interaction=nonstopmode", "-halt-on-error", slug + ".tex"],
                           cwd=d, capture_output=True, text=True)
        if r.returncode != 0:
            errores.append("%s.tex: no compila (revisar %s/%s.log)" % (slug, d, slug))
        else:
            shutil.rmtree(d, ignore_errors=True)

for a in avisos:
    print("aviso:", a)
for e in errores:
    print("ERROR:", e)
print("%d nota(s) revisada(s); %d error(es)" % (len(notas), len(errores)))
sys.exit(1 if errores else 0)
