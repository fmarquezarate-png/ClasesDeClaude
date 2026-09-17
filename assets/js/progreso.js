/* Progreso de estudio, guardado en el navegador (localStorage).
   Estados: 'pendiente' | 'estudiando' | 'hecho' */

const CLAVE = 'clasesdeclaude:progreso:v1';
const ESTADOS = ['pendiente', 'estudiando', 'hecho'];

function leer() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || {};
  } catch {
    return {};
  }
}

function escribir(datos) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(datos));
  } catch {
    /* modo incógnito o almacenamiento lleno: el sitio sigue funcionando */
  }
}

export function idDe(seccion, slug) {
  return seccion + '/' + slug;
}

export function estadoDe(seccion, slug) {
  return leer()[idDe(seccion, slug)] || 'pendiente';
}

export function fijarEstado(seccion, slug, estado) {
  const datos = leer();
  if (estado === 'pendiente') delete datos[idDe(seccion, slug)];
  else datos[idDe(seccion, slug)] = estado;
  escribir(datos);
  return estado;
}

export function siguienteEstado(seccion, slug) {
  const actual = estadoDe(seccion, slug);
  const siguiente = ESTADOS[(ESTADOS.indexOf(actual) + 1) % ESTADOS.length];
  return fijarEstado(seccion, slug, siguiente);
}

export function resumen(entradas) {
  const datos = leer();
  const hechos = entradas.filter((e) => datos[idDe(e.seccion, e.slug)] === 'hecho').length;
  return { hechos, total: entradas.length };
}

export const ETIQUETA_ESTADO = {
  pendiente: 'Pendiente',
  estudiando: 'Estudiando',
  hecho: 'Estudiado ✓',
};
