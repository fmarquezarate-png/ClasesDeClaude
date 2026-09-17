/* Carga del índice y de los archivos markdown. */

let cache = null;

export async function cargarIndice() {
  if (cache) return cache;
  const res = await fetch('contenido/indice.json', { cache: 'no-cache' });
  if (!res.ok) throw new Error('No se pudo leer contenido/indice.json');
  cache = await res.json();
  return cache;
}

export async function entradasDe(seccionId) {
  const indice = await cargarIndice();
  const lista = (indice.secciones && indice.secciones[seccionId]) || [];
  return [...lista].sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));
}

export async function todasLasEntradas() {
  const indice = await cargarIndice();
  const salida = [];
  for (const [seccion, lista] of Object.entries(indice.secciones || {})) {
    for (const item of lista) salida.push({ ...item, seccion });
  }
  return salida.sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));
}

export async function buscarEntrada(seccionId, slug) {
  const lista = await entradasDe(seccionId);
  return lista.find((e) => e.slug === slug) || null;
}

export async function cargarMarkdown(ruta) {
  const res = await fetch(ruta, { cache: 'no-cache' });
  if (!res.ok) throw new Error('No se encontró el archivo ' + ruta);
  return quitarFrontmatter(await res.text());
}

/* El frontmatter es el bloque entre --- al principio del .md.
   Sirve para los metadatos; no se muestra en pantalla. */
function quitarFrontmatter(texto) {
  if (!texto.startsWith('---')) return texto;
  const fin = texto.indexOf('\n---', 3);
  return fin === -1 ? texto : texto.slice(fin + 4).replace(/^\s*\n/, '');
}

export function aHtml(markdown) {
  const bruto = window.marked.parse(markdown, { breaks: false, gfm: true });
  return window.DOMPurify.sanitize(bruto, { ADD_ATTR: ['target'] });
}
