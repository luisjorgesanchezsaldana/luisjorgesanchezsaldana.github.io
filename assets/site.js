const $=id=>document.getElementById(id);
const I={
 en:{fAll:"All",tPub:"Published",tAcc:"Accepted",tSub:"Preprint",fSub:"Preprints",tPrep:"In preparation",and:"and",with:"with",single:"Single author",
   empty:"No publications match “%q”. Try a coauthor's surname or a word from the title.",pv:"Published version",paper:"paper",papers:"papers",
   lvPhd:"PhD",lvMsc:"Master's",lvBsc:"Bachelor's",ph:"Search: K-theory, Kevin Li, Teichmüller…",btn:"ES",btnL:"Cambiar a español"},
 es:{fAll:"Todas",tPub:"Publicado",tAcc:"Aceptado",tSub:"Preprint",fSub:"Preprints",tPrep:"En preparación",and:"y",with:"con",single:"Autor único",
   empty:"Ninguna publicación coincide con “%q”. Prueba con el apellido de un coautor o una palabra del título.",pv:"Versión publicada",paper:"artículo",papers:"artículos",
   lvPhd:"Doctorado",lvMsc:"Maestría",lvBsc:"Licenciatura",ph:"Buscar: teoría K, Kevin Li, Teichmüller…",btn:"EN",btnL:"Switch to English"}
};
// Spanish versions of static text: a string replaces the element's content, an array lists [english, spanish] substitutions
const ES={
 nRes:"Investigación",nPub:"Publicaciones",nCo:"Coautores",nSt:"Estudiantes",nCu:"Cursos",nCt:"Contacto",
 eyebrow:"Topología algebraica · Teoría geométrica de grupos",
 role:[["Full Professor (tenured)","Profesor Titular A de Tiempo Completo"]],
 bYt:"Clases en YouTube",bGgt:"Seminario de TGG",
 resLede:"Estudio grupos discretos a través de los espacios en los que actúan: espacios clasificantes para familias de subgrupos, propiedades de finitud y la teoría K algebraica que predice la conjetura de Farrell–Jones.",
 hInt:"Intereses",
 ints:[["Algebraic and topological K-theory","Teoría K algebraica y topológica"],["Algebraic topology","Topología algebraica"],["Classifying spaces for groups","Espacios clasificantes de grupos"],["Finiteness properties of groups","Propiedades de finitud de grupos"],["Geometric group theory","Teoría geométrica de grupos"]],
 note:[["I co-organize the ","Co-organizo el "],["Long-distance GGT seminar","Seminario a distancia de TGG"],[" with "," con "],[" and "," y "]],
 hCar:"Trayectoria",
 tl:[["Current","Actual"],["Full Professor","Profesor Titular"],["Postdoc,","Posdoctorado,"],["<small>with ","<small>con "],["PhD,","Doctorado,"],["advisor ","asesor: "]],
 pubLede:[["All preprints are on","Todos los preprints están en"],["Filter by status or search by title, coauthor or journal.","Filtra por estado o busca por título, coautor o revista."]],
 coLede:"Personas con las que he escrito artículos. Selecciona el número de artículos para ver nuestro trabajo conjunto.",
 stLede:"Tesis que he dirigido.",
 cuLede:"Cursos en video con notas y ejercicios.",
 cu1:"Grupo fundamental, espacios cubrientes, homología · 88 videos",
 cu2:"De las permutaciones a los teoremas de Sylow · notas, cuestionarios y videos",
 hMail:"Correo",hAddr:"Dirección"
};
let lang="en";
const L=k=>I[lang][k]??k;
const EN=new Map();document.querySelectorAll("[data-i]").forEach(el=>EN.set(el,el.innerHTML));
function setLang(l){
  lang=l;document.documentElement.lang=l;
  EN.forEach((en,el)=>{const t=ES[el.dataset.i];
    el.innerHTML=l==="en"||t==null?en:typeof t==="string"?t:t.reduce((h,[a,b])=>h.split(a).join(b),en)});
  const b=document.getElementById("lang");b.textContent=L("btn");b.setAttribute("aria-label",L("btnL"));
  const qEl=document.getElementById("q");if(qEl)qEl.placeholder=L("ph");
  if($("pubs")){renderChips();renderPubs()}if($("coauth"))renderCo();if($("studs"))renderSt();
  try{localStorage.setItem("ljss-lang",l)}catch(e){}
}
const P={
  colin:["Nestor Colín","https://sites.google.com/im.unam.mx/nestor-colin/home"],
  rita:["Rita Jiménez Rolland","https://www.matem.unam.mx/~rita/"],
  porf:["Porfirio L. León Álvarez","https://sites.google.com/view/porfrio-l-len-lvarez/"],
  li:["Kevin Li","https://kevinlimath.wordpress.com/"],
  omar:["Omar Antolín-Camarena","https://www.matem.unam.mx/~omar/"],
  flores:["Ramón Flores","https://cluje28.wixsite.com/webderay"],
  mario:["Mario Velásquez","https://sites.google.com/site/mavelasquezm/"],
  guerch:["Yassine Guerch","https://perso.ens-lyon.fr/yassine.guerch/mes-articles/"],
  hughes:["Sam Hughes","https://samhughesmaths.github.io/"],
  legh:["Luis Eduardo García-Hernández","https://mathlegh.com/research"],
  emp:["Eduardo Martínez-Pedroza","https://www.math.mun.ca/~emartinezped/"],
  djp:["Daniel Juan-Pineda","http://www.matmor.unam.mx/es/personal/investigadores/daniel/"],
  hidber:["Cristhian E. Hidber"], trujillo:["Alejandra Trujillo-Negrete"],
  joecken:["Kyle Joecken"], lafont:["Jean-François Lafont","https://people.math.osu.edu/lafont.1/"],
  arci:["José Antonio Arciniega-Nevarez"], jlcm:["José Luis Cisneros-Molina","http://www.matcuer.unam.mx/paginas/jlcm/"],
  busta:["Mauricio Bustamante","https://sites.google.com/view/mbustamante/"],
  efm:["Eduardo Flores Martínez"]
};
const CRP=["colin","rita","porf"];
// s: prep | sub | acc | pub
const pubs=[
 {t:"Finiteness properties of Bestvina–Brady kernels for graph products with torsion",w:["efm"],y:2026,s:"sub",v:"Preprint",ax:"2611.15976"},
 {t:"The proper geometric dimension of the mapping class groups of non-orientable surfaces with punctures",w:CRP,y:2026,s:"sub",v:"Preprint",ax:"2609.22505"},
 {t:"Contractible Rips complexes of groups via metric gluings",w:["li"],y:2026,s:"sub",v:"Preprint",ax:"2608.24279"},
 {t:"Centralizers and classifying spaces for commutativity of SL₂(ℤ[1/p])",w:["omar","flores"],y:2026,s:"sub",v:"Submitted",ax:"2607.28001"},
 {t:"Finiteness properties and quasi-isometry of group pairs",w:["li"],y:2026,s:"sub",v:"Submitted",ax:"2603.06535"},
 {t:"A note on higher coherence of graphs of groups",w:["li"],y:2026,s:"acc",j:"J. Group Theory",v:"to appear",pv:"https://doi.org/10.1515/jgth-2025-0187",ax:"2511.16409"},
 {t:"A spine for the Teichmüller space of a non-orientable surface with punctures",w:CRP,y:2025,s:"pub",j:"Bull. London Math. Soc.",v:"(2025)",pv:"https://doi.org/10.1112/blms.70228",ax:"2504.05404"},
 {t:"A note on finiteness properties of vertex stabilisers",w:["li"],y:2026,s:"pub",j:"Proc. Amer. Math. Soc.",v:"154 (2026), 4587–4595",pv:"https://doi.org/10.1090/proc/17750",ax:"2502.14751"},
 {t:"The proper geometric dimension of the full mapping class group of a punctured orientable surface",w:CRP,y:2025,s:"pub",j:"J. Group Theory",v:"(2025)",pv:"https://doi.org/10.1515/jgth-2024-0227",ax:"2412.14410"},
 {t:"On the K-theory of groups of the form ℤⁿ ⋊ ℤ/m with m square-free",w:["mario"],y:2027,s:"pub",j:"Proc. Amer. Math. Soc.",v:"155 (2027), 127–140",pv:"https://doi.org/10.1090/proc/17848",ax:"2410.09263"},
 {t:"On the dimension of Harer's spine for the decorated Teichmüller space",w:CRP,y:2026,s:"pub",j:"Homology Homotopy Appl.",v:"28 (2026), no. 2, 67–78",pv:"https://intlpress.com/JDetail/2054560156660047874",ax:"2409.04392"},
 {t:"On the group cohomology of groups of the form ℤⁿ ⋊ ℤ/m with m square-free",w:["mario"],y:2024,s:"sub",v:"Submitted",ax:"2403.14569"},
 {t:"Centralisers and the virtually cyclic dimension of Out(F_N)",w:["guerch","hughes"],y:2023,s:"sub",v:"Submitted",ax:"2308.01590"},
 {t:"The classifying space for commutativity of geometric orientable 3-manifold groups",w:["omar","legh"],y:2025,s:"pub",j:"Topology Appl.",v:"367 (2025)",pv:"https://www.sciencedirect.com/science/article/pii/S0166864125002822",ax:"2307.04997"},
 {t:"Commensurators of abelian subgroups and the virtually abelian dimension of mapping class groups",w:["porf","rita"],y:2024,s:"pub",j:"J. Pure Appl. Algebra",v:"228 (2024), no. 6",pv:"https://www.sciencedirect.com/science/article/pii/S0022404923002487",ax:"2303.16961"},
 {t:"A survey on quasi-isometries of pairs: invariants and rigidity",w:["hughes","emp"],y:2025,s:"pub",j:"Geometric methods in group theory. Papers dedicated to Ruth Charney, Sémin. Congr.",v:"34, SMF (2025), 137–154",pv:"https://zbmath.org/1583.20069",ax:"2112.15046"},
 {t:"Bowditch taut spectrum and dimensions of groups",w:["emp"],y:2024,s:"pub",j:"Michigan Math. J.",v:"74 (2024), no. 3",pv:"https://doi.org/10.1307/mmj/20216121",ax:"2107.10643"},
 {t:"Quasi-isometry invariance of relative filling functions",w:["hughes","emp"],y:2023,s:"pub",j:"Groups Geom. Dyn.",v:"17 (2023), no. 4, 1483–1515",pv:"https://doi.org/10.4171/GGD/737",ax:"2107.03355"},
 {t:"Classifying spaces for the family of virtually abelian subgroups of orientable 3-manifold groups",w:["porf"],y:2022,s:"pub",j:"Forum Math.",v:"34 (2022), no. 5, 1277–1296",pv:"https://doi.org/10.1515/forum-2022-0006",ax:"2105.05905"},
 {t:"Quasi-isometric rigidity of subgroups and filtered ends",w:["emp"],y:2022,s:"pub",j:"Algebr. Geom. Topol.",v:"22 (2022), no. 6, 3023–3057",pv:"https://msp.org/agt/2022/22-6/p12.xhtml",ax:"2012.10494"},
 {t:"On the algebraic K-theory of 3-manifold groups",w:["djp"],y:2022,s:"pub",j:"J. Pure Appl. Algebra",v:"226 (2022), no. 7, 106981",pv:"https://doi.org/10.1016/j.jpaa.2021.106981",ax:"2011.11811"},
 {t:"On the dimension of the mapping class groups of a non-orientable surface",w:["hidber","trujillo"],y:2022,s:"pub",j:"Homology Homotopy Appl.",v:"24 (2022), no. 1, 347–372",pv:"https://doi.org/10.4310/HHA.2022.v24.n1.a17",ax:"2007.12542"},
 {t:"On the dimension of groups that satisfy certain conditions on their finite subgroups",w:[],y:2022,s:"pub",j:"Glasg. Math. J.",v:"64 (2022), no. 1, 45–50",pv:"https://doi.org/10.1017/S0017089520000531",ax:"2001.09185"},
 {t:"Groups acting on trees and the Eilenberg–Ganea problem for families",w:[],y:2020,s:"pub",j:"Proc. Amer. Math. Soc.",v:"148 (2020), no. 12, 5469–5479",pv:"https://doi.org/10.1090/proc/15203",ax:"1911.03457"},
 {t:"Brown's criterion and classifying spaces for families",w:["emp"],y:2020,s:"pub",j:"J. Pure Appl. Algebra",v:"224 (2020), no. 10, 106377",pv:"https://www.sciencedirect.com/science/article/pii/S002240492030075X",ax:"1908.05543"},
 {t:"Virtually cyclic dimension for 3-manifold groups",w:["joecken","lafont"],y:2021,s:"pub",j:"Groups Geom. Dyn.",v:"15 (2021), no. 2, 577–606",pv:"https://doi.org/10.4171/GGD/607",ax:"1904.04632"},
 {t:"Relative group homology theories with coefficients and the comparison homomorphism",w:["arci","jlcm"],y:2021,s:"pub",j:"Quaest. Math.",v:"44 (2021), no. 8, 1107–1132",pv:"https://doi.org/10.2989/16073606.2020.1770895",ax:"1809.01209"},
 {t:"The algebraic and topological K-theory of the Hilbert modular group",w:["mario"],y:2018,s:"pub",j:"Homology Homotopy Appl.",v:"20 (2018), no. 2, 377–402",pv:"https://doi.org/10.4310/HHA.2018.v20.n2.a19",ax:"1706.04691"},
 {t:"On the algebraic K-theory of the Hilbert modular group",w:["busta"],y:2016,s:"pub",j:"Algebr. Geom. Topol.",v:"16 (2016), no. 4, 2107–2125",pv:"https://projecteuclid.org/euclid.agt/1511895909",ax:"1505.03452"},
 {t:"The K- and L-theoretic Farrell–Jones isomorphism conjecture for braid groups",w:["djp"],y:2016,s:"pub",j:"Topology and Geometric Group Theory (Ohio State, 2010–2011)",v:"Springer, 33–43",pv:"https://link.springer.com/book/10.1007/978-3-319-43674-6",ax:"1511.02737"},
 {t:"On the ranks of the algebraic K-theory of hyperbolic groups",w:["djp"],y:2014,s:"pub",j:"Bol. Soc. Mat. Mex. (3)",v:"20 (2014), no. 2, 277–285",pv:"https://doi.org/10.1007/s40590-014-0042-6",ax:"1511.02767"}
];
const TAGS={pub:["pub-d","tPub"],acc:["acc","tAcc"],sub:["sub","tSub"],prep:["prep","tPrep"]};
const FILTERS=[["all","fAll"],["pub","tPub"],["acc","tAcc"],["sub","fSub"]];
let filt="all",query="";
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const norm=s=>s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();
const who=w=>w.map(k=>P[k][1]?`<a href="${P[k][1]}">${esc(P[k][0])}</a>`:esc(P[k][0]));
function joinNames(a){return a.length<2?a.join(""):a.slice(0,-1).join(", ")+" "+L("and")+" "+a[a.length-1]}
pubs.sort((a,b)=>(b.y||9999)-(a.y||9999));
pubs.forEach((p,i)=>{p.n=pubs.length-i;p.hay=norm([p.t,p.j||"",p.v,...p.w.map(k=>P[k][0])].join(" "))});

function renderChips(){
  const c=document.getElementById("chips");
  c.innerHTML=FILTERS.map(([k,l])=>{
    const n=k==="all"?pubs.length:pubs.filter(p=>p.s===k||(k==="sub"&&p.s==="prep")).length;
    return `<button class="chip" type="button" id="f-${k}" data-k="${k}" aria-pressed="${k===filt}">${L(l)}<span class="n">${n}</span></button>`}).join("");
  c.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{filt=b.dataset.k;renderChips();renderPubs()});
}
function renderPubs(){
  const q=norm(query.trim());
  const list=pubs.filter(p=>(filt==="all"||p.s===filt||(filt==="sub"&&p.s==="prep"))&&(!q||p.hay.includes(q)));
  const el=document.getElementById("pubs");
  if(!list.length){el.innerHTML=`<li class="empty">${L("empty").replace("%q",esc(query))}</li>`;return}
  el.innerHTML=list.map(p=>{
    const [cls,lab]=TAGS[p.s];
    const auth=p.w.length?`${L("with")} ${joinNames(who(p.w))}`:L("single");
    const venue=p.j?` · <i>${esc(p.j)}</i> ${esc(lang==="es"?p.v.replace("proceedings, to appear","memorias, por aparecer").replace("to appear","por aparecer"):p.v)}`:"";
    const links=[p.pv?`<a href="${p.pv}">${L("pv")} ↗</a>`:"",p.ax?`<a href="https://arxiv.org/abs/${p.ax}">arXiv:${p.ax}</a>`:""].join(" ");
    return `<li class="pub"><span class="num">${p.n}</span><span class="yr">${p.y||"—"}</span><div style="min-width:0">
      <p class="t">${esc(p.t)}</p><p class="meta">${auth}${venue}</p>
      <div class="row"><span class="tag ${cls}">${L(lab)}</span>${links}</div></div></li>`}).join("");
}
if($("q")){const p=new URLSearchParams(location.search).get("q");if(p){query=p;$("q").value=p}$("q").addEventListener("input",e=>{query=e.target.value;renderPubs()})}

const cnt={};pubs.forEach(p=>p.w.forEach(k=>cnt[k]=(cnt[k]||0)+1));
const sur=k=>norm(P[k][0].split(" ").slice(-1)[0]);
const ca=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]||sur(a).localeCompare(sur(b)));
function renderCo(){document.getElementById("coauth").innerHTML=ca.map(k=>{const [n,u]=P[k];
  const nm=u?`<a class="nm" href="${u}">${esc(n)}</a>`:`<span class="nm">${esc(n)}</span>`;
  return `<li>${nm}<button type="button" data-n="${esc(n)}">${cnt[k]} ${L(cnt[k]===1?"paper":"papers")}</button></li>`}).join("");
document.querySelectorAll("#coauth button").forEach(b=>b.onclick=()=>{
  location.href="publications.html?q="+encodeURIComponent(b.dataset.n)})}

const S=[
 ["lvPhd",[["Porfirio L. León Álvarez","Espacios clasificantes de grupos discretos para la familia de subgrupos virtualmente abelianos","UNAM","2024"]]],
 ["lvMsc",[
   ["Eduardo Flores Martínez","A Bestvina–Brady type construction for groups with torsion","UNAM","2025"],
   ["Porfirio L. León Álvarez","El teorema de Eilenberg–Ganea para familias","UNAM","2019"]]],
 ["lvBsc",[
   ["Alonso García Molina","Las conjeturas de Kaplansky en grupos hiperbólicos","UNAM","2026"],
   ["Víctor Eduardo San Martín Macías","Grupos de dimensión 1","UNAM","2024"],
   ["Diana Belén Vizcaíno Torres","El espectro terso de Bowditch y grupos generados por dos elementos","UNAM","2024"],
   ["Vivian Daniela de León","Una cota para el orden del grupo de isometrías de una superficie hiperbólica","UNAM","2024"],
   ["Diego Leipen Lara","Invarianza cuasiisométrica de propiedades de finitud","UNAM","2023"],
   ["Félix Lugo","La obstrucción de finitud de Wall","UNISON","2018"],
   ["Sandy Guadalupe Aguilar Rojas","El problema de la palabra para grupos de trenzas","UABC","2018"]]]
];
function renderSt(){document.getElementById("studs").innerHTML=S.map(([lvl,xs])=>`<div><h3>${L(lvl)} · ${xs.length}</h3><ol>${xs.map(([n,t,u,y])=>
  `<li><span class="nm">${esc(n)}</span><span class="th">${esc(t)}</span><span class="in">${u} · ${y}</span></li>`).join("")}</ol></div>`).join("")}
document.getElementById("lang").addEventListener("click",()=>setLang(lang==="en"?"es":"en"));
let saved=null;try{saved=localStorage.getItem("ljss-lang")}catch(e){}
setLang(saved||"en");
