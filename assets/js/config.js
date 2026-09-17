/* Configuración del sitio: las "cintas" del menú hamburguesa.
   Para añadir una sección nueva: añade un objeto aquí, crea la carpeta
   contenido/<id>/ y vuelve a generar el índice. Nada más. */

export const SITIO = {
  nombre: 'Clases de Claude',
  repo: 'https://github.com/fmarquezarate-png/ClasesDeClaude',
};

export const SECCIONES = [
  {
    id: 'inicio',
    nombre: 'Inicio',
    emoji: '🏠',
    descripcion: 'Resumen y últimas entradas',
    tipo: 'portada',
  },
  {
    id: 'clases',
    nombre: 'Clases',
    emoji: '📚',
    descripcion: 'Lecciones paso a paso',
    tipo: 'coleccion',
    agrupar: 'modulo',
  },
  {
    id: 'skills',
    nombre: 'Skills',
    emoji: '🧩',
    descripcion: 'Skills de Claude documentados',
    tipo: 'coleccion',
    agrupar: 'categoria',
  },
  {
    id: 'agentes',
    nombre: 'Agentes',
    emoji: '🤖',
    descripcion: 'Subagentes y orquestación',
    tipo: 'coleccion',
    agrupar: 'categoria',
  },
  {
    id: 'otros',
    nombre: 'Otros',
    emoji: '🗂️',
    descripcion: 'Prompts, glosario y recursos',
    tipo: 'coleccion',
    agrupar: 'categoria',
  },
];

export const SECCIONES_CONTENIDO = SECCIONES.filter((s) => s.tipo === 'coleccion');

export function buscarSeccion(id) {
  return SECCIONES.find((s) => s.id === id) || null;
}
