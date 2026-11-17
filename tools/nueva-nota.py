#!/usr/bin/env python3
"""Herramienta para las notas de los videos del curso (ver cursos/notas/CONVENCIONES.md).

  python3 tools/nueva-nota.py crear --slug S --unidad U --titulo T --video-id ID [--titulo-video TV] [--resumen R]
      Crea cursos/notas/S.tex y S.html desde las plantillas. El primer número de definición
      sale de la tabla de CONVENCIONES.md ("Siguiente libre" de la unidad). No toca la página.

  python3 tools/nueva-nota.py enganchar --slug S --tema "Título exacto del tema" [--video N]
      Agrega el campo "nb" al tema en cursos/topologia-algebraica.html (la nota queda visible
      en la página) y actualiza la tabla de CONVENCIONES.md. Usar SOLO después de que el autor
      apruebe el borrador.
"""
import argparse, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NOTAS = os.path.join(ROOT, "cursos", "notas")
PAGINA = os.path.join(ROOT, "cursos", "topologia-algebraica.html")
CONV = os.path.join(NOTAS, "CONVENCIONES.md")
PLANT = os.path.join(ROOT, "tools", "plantillas")


def leer(p):
    with open(p, encoding="utf8") as f:
        return f.read()


def escribir(p, s):
    with open(p, "w", encoding="utf8") as f:
        f.write(s)


def fila_unidad(texto, u):
    """Devuelve (inicio, fin, celdas) de la fila de la unidad u en la tabla de CONVENCIONES.md."""
    m = re.search(r"^\|\s*%d\.[^\n]*$" % u, texto, re.M)
    if not m:
        sys.exit("No encuentro la fila de la unidad %d en la tabla de CONVENCIONES.md" % u)
    celdas = [c.strip() for c in m.group(0).strip().strip("|").split("|")]
    return m.start(), m.end(), celdas


def siguiente_libre(u):
    _, _, c = fila_unidad(leer(CONV), u)
    mm = re.match(r"%d\.(\d+)$" % u, c[3])
    if not mm:
        sys.exit("No entiendo 'Siguiente libre' de la unidad %d: %r" % (u, c[3]))
    return int(mm.group(1))


def crear(a):
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", a.slug):
        sys.exit("El slug debe ir en minúsculas, sin acentos, con guiones")
    n = siguiente_libre(a.unidad)
    sub = {"@SLUG@": a.slug, "@UNIDAD@": str(a.unidad), "@N@": str(n), "@TITULO@": a.titulo,
           "@VIDEOID@": a.video_id, "@TITULOVIDEO@": a.titulo_video or a.titulo,
           "@RESUMEN@": a.resumen or "Preparan ..."}
    for ext in ("tex", "html"):
        dest = os.path.join(NOTAS, a.slug + "." + ext)
        if os.path.exists(dest):
            sys.exit("Ya existe " + dest)
        s = leer(os.path.join(PLANT, "nota." + ext))
        for k, v in sub.items():
            s = s.replace(k, v)
        escribir(dest, s)
        print("creado", os.path.relpath(dest, ROOT))
    print("Primera definición de la nota: %d.%d" % (a.unidad, n))


def enganchar(a):
    tex = re.sub(r"(?m)(?<!\\)%.*$", "", leer(os.path.join(NOTAS, a.slug + ".tex")))
    m = re.search(r"\\unidad\{(\d+)\}\{(\d+)\}", tex)
    if not m:
        sys.exit("El .tex no declara \\unidad{u}{n}")
    u, n = int(m.group(1)), int(m.group(2))
    usadas = len(re.findall(r"\\begin\{defn\}", tex))
    for ext in ("tex", "html", "pdf"):
        if not os.path.exists(os.path.join(NOTAS, a.slug + "." + ext)):
            sys.exit("Falta cursos/notas/%s.%s" % (a.slug, ext))
    s = leer(PAGINA)
    mc = re.search(r"^const C=(\{.*\});$", s, re.M)
    C = json.loads(mc.group(1))
    hallados = [(ui, it) for ui, un in enumerate(C["units"], 1) for it in un["items"] if it["t"] == a.tema]
    if len(hallados) != 1:
        sys.exit("El tema %r aparece %d veces en la página (debe ser 1)" % (a.tema, len(hallados)))
    ui, it = hallados[0]
    if ui != u:
        sys.exit("El tema está en la unidad %d pero la nota declara la unidad %d" % (ui, u))
    if a.video < 1 or a.video > len(it["videos"]):
        sys.exit("El tema tiene %d video(s); --video fuera de rango" % len(it["videos"]))
    nueva = {"video": a.video, "src": "notas/%s.html" % a.slug, "pdf": "notas/%s.pdf" % a.slug}
    previas = [it["nb"]] if isinstance(it.get("nb"), dict) else list(it.get("nb", []))
    previas = [x for x in previas if x.get("video", 1) != a.video]
    lista = sorted(previas + [nueva], key=lambda x: x["video"])
    it["nb"] = lista[0] if len(lista) == 1 else lista
    nuevo = json.dumps(C, ensure_ascii=False)
    escribir(PAGINA, s[:mc.start(1)] + nuevo + s[mc.end(1):])
    # tabla de convenciones
    t = leer(CONV)
    ini, fin, c = fila_unidad(t, u)
    c[1] = (c[1] + ", " if c[1] else "") + "`%s` (Video %d)" % (a.slug, a.video)
    rango = "%d.%d a %d.%d" % (u, n, u, n + usadas - 1) if usadas > 1 else ("%d.%d" % (u, n) if usadas else "")
    c[2] = (c[2] + "; " if c[2] else "") + rango if rango else c[2]
    c[3] = "%d.%d" % (u, n + usadas)
    t = t[:ini] + "| " + " | ".join(c) + " |" + t[fin:]
    escribir(CONV, t)
    print("enganchada:", a.slug, "-> tema", a.tema, "(unidad %d); siguiente libre %d.%d" % (u, u, n + usadas))


p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
sp = p.add_subparsers(dest="cmd", required=True)
c = sp.add_parser("crear"); c.set_defaults(f=crear)
c.add_argument("--slug", required=True); c.add_argument("--unidad", type=int, required=True)
c.add_argument("--titulo", required=True); c.add_argument("--video-id", required=True)
c.add_argument("--titulo-video"); c.add_argument("--resumen")
e = sp.add_parser("enganchar"); e.set_defaults(f=enganchar)
e.add_argument("--slug", required=True); e.add_argument("--tema", required=True)
e.add_argument("--video", type=int, default=1)
a = p.parse_args()
a.f(a)
