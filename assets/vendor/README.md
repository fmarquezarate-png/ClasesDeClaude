# Librerías externas (copiadas aquí a propósito)

Estas dos librerías viven en el repo en lugar de cargarse desde un CDN, para que
el sitio no dependa de que un servicio externo esté disponible.

| Archivo | Librería | Versión | Para qué |
|---|---|---|---|
| `marked.min.js` | [marked](https://marked.js.org) | 12.0.2 | Convierte el markdown de las clases en HTML |
| `purify.min.js` | [DOMPurify](https://github.com/cure53/DOMPurify) | 3.1.6 | Limpia ese HTML antes de mostrarlo |

Sus licencias (MIT y Apache-2.0/MPL-2.0) están junto a los archivos.
No las edites a mano: para actualizarlas, se sustituye el archivo por la
versión nueva.
