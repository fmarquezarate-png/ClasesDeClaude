/* Genera contenido/indice.json leyendo el frontmatter de cada .md.
   Uso:  node scripts/generar-indice.mjs
   No hace falta para que el sitio funcione en producción: el índice ya
   está versionado en el repo. Esto solo lo regenera cuando añadimos
   contenido nuevo. */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, basename } from 'node:path';

const RAIZ = new URL('..', import.meta.url).pathname;
const SECCIONES = ['clases', 'skills', 'agentes', 'otros'];

function leerFrontmatter(texto) {
  if (!texto.startsWith('---')) return {};
  const fin = texto.indexOf('\n---', 3);
  if (fin === -1) return {};
  const bloque = texto.slice(3, fin);
  const datos = {};

  for (const linea of bloque.split('\n')) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith('#')) continue;
    const sep = limpia.indexOf(':');
    if (sep === -1) continue;

    const clave = limpia.slice(0, sep).trim();
    let valor = limpia.slice(sep + 1).trim();

    if (valor.startsWith('[') && valor.endsWith(']')) {
      datos[clave] = valor.slice(1, -1).split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      datos[clave] = valor.replace(/^["']|["']$/g, '');
    }
  }
  return datos;
}

const indice = { actualizado: new Date().toISOString().slice(0, 10), secciones: {} };
const avisos = [];

for (const seccion of SECCIONES) {
  const carpeta = join(RAIZ, 'contenido', seccion);
  let archivos = [];
  try {
    archivos = (await readdir(carpeta)).filter((f) => f.endsWith('.md') && !f.startsWith('_'));
  } catch {
    avisos.push(`Carpeta no encontrada: contenido/${seccion}/`);
  }

  const entradas = [];
  for (const archivo of archivos.sort()) {
    const texto = await readFile(join(carpeta, archivo), 'utf8');
    const meta = leerFrontmatter(texto);
    const slug = meta.slug || basename(archivo, '.md');

    if (!meta.titulo) avisos.push(`Sin "titulo" en contenido/${seccion}/${archivo}`);

    entradas.push({
      slug,
      titulo: meta.titulo || slug,
      resumen: meta.resumen || '',
      fecha: meta.fecha || '',
      tags: meta.tags || [],
      modulo: meta.modulo || '',
      categoria: meta.categoria || '',
      nivel: meta.nivel || '',
      archivo: `contenido/${seccion}/${archivo}`,
    });
  }

  indice.secciones[seccion] = entradas;
  console.log(`${seccion}: ${entradas.length} entrada(s)`);
}

await writeFile(join(RAIZ, 'contenido', 'indice.json'), JSON.stringify(indice, null, 2) + '\n');
console.log('\nÍndice escrito en contenido/indice.json');
if (avisos.length) console.log('\nAvisos:\n- ' + avisos.join('\n- '));
