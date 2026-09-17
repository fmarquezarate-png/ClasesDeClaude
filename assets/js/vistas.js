/* Construcción del HTML de cada vista. */

import { SECCIONES_CONTENIDO, buscarSeccion } from './config.js';
import { entradasDe, todasLasEntradas, buscarEntrada, cargarMarkdown, aHtml } from './datos.js';
import { estadoDe, ETIQUETA_ESTADO, resumen } from './progreso.js';

function escapar(texto = '') {
  return String(texto).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function tarjeta(entrada) {
  const estado = estadoDe(entrada.seccion, entrada.slug);
  const clase = estado === 'pendiente' ? '' : ' estado-' + estado;
  const tags = (entrada.tags || []).slice(0, 3)
    .map((t) => `<span class="etiqueta">#${escapar(t)}</span>`).join('');
  return `
    <a class="tarjeta" href="#/${entrada.seccion}/${escapar(entrada.slug)}">
      <h3>${escapar(entrada.titulo)}</h3>
      <p>${escapar(entrada.resumen || '')}</p>
      <div class="metas">
        <span class="etiqueta${clase}">${ETIQUETA_ESTADO[estado]}</span>
        ${entrada.fecha ? `<span class="etiqueta">${escapar(entrada.fecha)}</span>` : ''}
        ${tags}
      </div>
    </a>`;
}

function vacio(mensaje) {
  return `<div class="vacio">${escapar(mensaje)}</div>`;
}

export async function vistaInicio() {
  const entradas = await todasLasEntradas();
  const { hechos, total } = resumen(entradas);
  const ultimas = entradas.slice(0, 6);

  const conteos = await Promise.all(
    SECCIONES_CONTENIDO.map(async (s) => ({ ...s, n: (await entradasDe(s.id)).length }))
  );

  return `
    <section class="encabezado-seccion">
      <h1>Clases de Claude</h1>
      <p>Tu espacio para repasar todo lo que vamos construyendo. Llevas ${hechos} de ${total} entradas estudiadas.</p>
    </section>

    <div class="rejilla">
      ${conteos.map((s) => `
        <a class="tarjeta" href="#/${s.id}">
          <h3>${s.emoji} ${escapar(s.nombre)}</h3>
          <p>${escapar(s.descripcion)}</p>
          <div class="metas"><span class="etiqueta">${s.n} ${s.n === 1 ? 'entrada' : 'entradas'}</span></div>
        </a>`).join('')}
    </div>

    <section class="encabezado-seccion" style="margin-top:34px">
      <h1 style="font-size:1.25rem">Últimas entradas</h1>
    </section>
    ${ultimas.length ? `<div class="rejilla">${ultimas.map(tarjeta).join('')}</div>`
                     : vacio('Todavía no hay contenido. Añade tu primer archivo en contenido/clases/.')}
  `;
}

export async function vistaSeccion(seccionId, filtro = '') {
  const seccion = buscarSeccion(seccionId);
  const lista = (await entradasDe(seccionId)).map((e) => ({ ...e, seccion: seccionId }));
  const campo = seccion.agrupar || 'categoria';

  const grupos = [...new Set(lista.map((e) => e[campo] || 'Sin clasificar'))].sort();
  const visibles = filtro ? lista.filter((e) => (e[campo] || 'Sin clasificar') === filtro) : lista;

  return `
    <section class="encabezado-seccion">
      <h1>${seccion.emoji} ${escapar(seccion.nombre)}</h1>
      <p>${escapar(seccion.descripcion)}</p>
    </section>

    ${grupos.length > 1 ? `
      <div class="filtros" data-filtros="${seccionId}">
        <button class="chip${filtro ? '' : ' activo'}" data-valor="">Todo</button>
        ${grupos.map((g) => `<button class="chip${filtro === g ? ' activo' : ''}" data-valor="${escapar(g)}">${escapar(g)}</button>`).join('')}
      </div>` : ''}

    ${visibles.length ? `<div class="rejilla">${visibles.map(tarjeta).join('')}</div>`
                      : vacio('Sección vacía por ahora. Añade un archivo .md en contenido/' + seccionId + '/')}
  `;
}

export async function vistaEntrada(seccionId, slug) {
  const seccion = buscarSeccion(seccionId);
  const entrada = await buscarEntrada(seccionId, slug);
  if (!entrada) return vistaNoEncontrada();

  const markdown = await cargarMarkdown(entrada.archivo);
  const estado = estadoDe(seccionId, slug);

  return `
    <a class="volver" href="#/${seccionId}">← ${escapar(seccion.nombre)}</a>
    <article class="articulo">${aHtml(markdown)}</article>
    <div class="barra-articulo">
      <button class="boton primario" id="btn-estado" data-seccion="${seccionId}" data-slug="${escapar(slug)}">
        ${ETIQUETA_ESTADO[estado]}
      </button>
      <span class="etiqueta">Clic para cambiar: pendiente → estudiando → estudiado</span>
    </div>
  `;
}

export function vistaNoEncontrada() {
  return `
    <section class="encabezado-seccion">
      <h1>No encontrado</h1>
      <p>Esa página no existe o el archivo aún no está en el índice.</p>
    </section>
    <a class="boton" href="#/inicio">Volver al inicio</a>
  `;
}

export function vistaError(mensaje) {
  return `
    <section class="encabezado-seccion">
      <h1>Algo falló</h1>
      <p>${escapar(mensaje)}</p>
    </section>`;
}
