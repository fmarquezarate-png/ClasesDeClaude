/* Punto de entrada: menú, tema, buscador y router por hash (#/seccion/slug). */

import { SECCIONES, buscarSeccion } from './config.js';
import { entradasDe, todasLasEntradas } from './datos.js';
import { siguienteEstado, ETIQUETA_ESTADO, resumen } from './progreso.js';
import { vistaInicio, vistaSeccion, vistaEntrada, vistaNoEncontrada, vistaError } from './vistas.js';

const $ = (sel) => document.querySelector(sel);
const vista = $('#vista');

/* ---------- Tema ---------- */
const CLAVE_TEMA = 'clasesdeclaude:tema';
function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  $('#btn-tema').textContent = tema === 'oscuro' ? '🌙' : '☀️';
  try { localStorage.setItem(CLAVE_TEMA, tema); } catch {}
}
try { aplicarTema(localStorage.getItem(CLAVE_TEMA) || 'oscuro'); } catch { aplicarTema('oscuro'); }
$('#btn-tema').addEventListener('click', () => {
  aplicarTema(document.documentElement.dataset.tema === 'oscuro' ? 'claro' : 'oscuro');
});

/* ---------- Menú hamburguesa ---------- */
const menu = $('#menu-lateral');
const velo = $('#velo');
const btnMenu = $('#btn-menu');

function abrirMenu(abrir) {
  menu.classList.toggle('abierto', abrir);
  menu.setAttribute('aria-hidden', String(!abrir));
  btnMenu.setAttribute('aria-expanded', String(abrir));
  velo.hidden = !abrir;
  document.body.style.overflow = abrir ? 'hidden' : '';
}

btnMenu.addEventListener('click', () => abrirMenu(!menu.classList.contains('abierto')));
velo.addEventListener('click', () => abrirMenu(false));
$('#btn-cerrar-menu').addEventListener('click', () => abrirMenu(false));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { abrirMenu(false); cerrarBuscador(); }
  if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); abrirBuscador(); }
});

async function pintarMenu() {
  const cintas = $('#cintas');
  const partes = [];
  for (const s of SECCIONES) {
    const n = s.tipo === 'coleccion' ? (await entradasDe(s.id)).length : null;
    partes.push(`
      <li class="cinta">
        <a href="#/${s.id}" data-seccion="${s.id}">
          <span class="cinta-emoji">${s.emoji}</span>
          <span class="cinta-texto">
            <span class="cinta-nombre">${s.nombre}</span>
            <span class="cinta-desc">${s.descripcion}</span>
          </span>
          ${n !== null ? `<span class="cinta-conteo">${n}</span>` : ''}
        </a>
      </li>`);
  }
  cintas.innerHTML = partes.join('');
  cintas.addEventListener('click', (e) => { if (e.target.closest('a')) abrirMenu(false); });
}

async function pintarProgreso() {
  const { hechos, total } = resumen(await todasLasEntradas());
  $('#progreso-texto').textContent = `${hechos} de ${total} estudiados`;
  $('#progreso-barra').style.width = total ? `${Math.round((hechos / total) * 100)}%` : '0%';
}

function marcarCintaActiva(seccionId) {
  document.querySelectorAll('#cintas a').forEach((a) => {
    a.classList.toggle('activa', a.dataset.seccion === seccionId);
  });
}

/* ---------- Buscador ---------- */
const buscador = $('#buscador');
const inputBuscar = $('#buscador-input');

function abrirBuscador() {
  buscador.hidden = false;
  inputBuscar.value = '';
  $('#buscador-resultados').innerHTML = '';
  inputBuscar.focus();
}
function cerrarBuscador() { buscador.hidden = true; }

$('#btn-buscar').addEventListener('click', abrirBuscador);
buscador.addEventListener('click', (e) => { if (e.target === buscador) cerrarBuscador(); });

inputBuscar.addEventListener('input', async () => {
  const q = inputBuscar.value.trim().toLowerCase();
  const caja = $('#buscador-resultados');
  if (q.length < 2) { caja.innerHTML = ''; return; }

  const entradas = await todasLasEntradas();
  const hits = entradas.filter((e) => {
    const texto = [e.titulo, e.resumen, (e.tags || []).join(' '), e.modulo, e.categoria]
      .filter(Boolean).join(' ').toLowerCase();
    return texto.includes(q);
  }).slice(0, 12);

  caja.innerHTML = hits.length
    ? hits.map((e) => `
        <li><a href="#/${e.seccion}/${e.slug}">
          ${e.titulo}<small>${buscarSeccion(e.seccion)?.nombre || e.seccion} · ${e.resumen || ''}</small>
        </a></li>`).join('')
    : '<li><a>Sin resultados</a></li>';
});

$('#buscador-resultados').addEventListener('click', (e) => { if (e.target.closest('a[href]')) cerrarBuscador(); });

/* ---------- Router ---------- */
function rutaActual() {
  const hash = location.hash.replace(/^#\/?/, '');
  const partes = hash.split('/').filter(Boolean).map(decodeURIComponent);
  return { seccion: partes[0] || 'inicio', slug: partes[1] || null };
}

async function render() {
  const { seccion, slug } = rutaActual();
  const config = buscarSeccion(seccion);
  vista.innerHTML = '<p class="cargando">Cargando…</p>';

  try {
    if (!config) vista.innerHTML = vistaNoEncontrada();
    else if (config.tipo === 'portada') vista.innerHTML = await vistaInicio();
    else if (slug) vista.innerHTML = await vistaEntrada(seccion, slug);
    else vista.innerHTML = await vistaSeccion(seccion);
  } catch (err) {
    vista.innerHTML = vistaError(err.message);
  }

  marcarCintaActiva(seccion);
  window.scrollTo({ top: 0 });
  await pintarProgreso();
}

/* Interacciones dentro de la vista (delegación de eventos) */
vista.addEventListener('click', async (e) => {
  const chip = e.target.closest('.chip');
  if (chip) {
    const cont = chip.closest('[data-filtros]');
    vista.innerHTML = await vistaSeccion(cont.dataset.filtros, chip.dataset.valor);
    return;
  }

  const btn = e.target.closest('#btn-estado');
  if (btn) {
    const estado = siguienteEstado(btn.dataset.seccion, btn.dataset.slug);
    btn.textContent = ETIQUETA_ESTADO[estado];
    await pintarProgreso();
  }
});

window.addEventListener('hashchange', render);

(async function iniciar() {
  try {
    await pintarMenu();
  } catch (err) {
    vista.innerHTML = vistaError('No se pudo cargar el índice: ' + err.message);
    return;
  }
  await render();
})();
