# Estructura del repositorio

Qué hay en cada carpeta y quién la toca.

```
ClasesDeClaude/
├── index.html                  ← el esqueleto de la web (rara vez se toca)
├── 404.html                    ← redirección si alguien entra a una URL rara
│
├── assets/                     ← el "motor" del sitio · NO lo tocas tú
│   ├── css/estilos.css         ← todos los estilos, colores y tema claro/oscuro
│   ├── js/
│   │   ├── config.js           ← las secciones del menú hamburguesa
│   │   ├── datos.js            ← carga el índice y los .md
│   │   ├── progreso.js         ← "estudiado / estudiando / pendiente"
│   │   ├── vistas.js           ← cómo se dibuja cada pantalla
│   │   └── app.js              ← menú, buscador, tema y navegación
│   ├── img/favicon.svg
│   └── vendor/                ← marked y DOMPurify (copiadas al repo, sin CDN)
│
├── contenido/                  ← AQUÍ VIVE TODO LO TUYO
│   ├── indice.json             ← lista de todo (se genera solo)
│   ├── clases/                 ← 📚 lecciones paso a paso
│   ├── skills/                 ← 🧩 skills de Claude documentados
│   ├── agentes/                ← 🤖 subagentes y orquestación
│   └── otros/                  ← 🗂️ prompts, glosario, recursos
│
├── plantillas/                 ← copia y pega para empezar una entrada nueva
├── scripts/generar-indice.mjs  ← regenera contenido/indice.json
├── docs/                       ← estas instrucciones
└── .github/workflows/          ← automatizaciones (índice + publicación)
```

## Las secciones del menú

Las 5 cintas del menú hamburguesa salen de `assets/js/config.js`. Cada una
apunta a una carpeta de `contenido/` con el mismo nombre.

| Cinta | Carpeta | Para qué |
|---|---|---|
| 🏠 Inicio | — | Portada: progreso y últimas entradas |
| 📚 Clases | `contenido/clases/` | Lecciones, agrupadas por **módulo** |
| 🧩 Skills | `contenido/skills/` | Skills, agrupados por **categoría** |
| 🤖 Agentes | `contenido/agentes/` | Agentes, agrupados por **categoría** |
| 🗂️ Otros | `contenido/otros/` | Cajón de sastre: prompts, glosario, enlaces |

## Añadir una sección nueva (por ejemplo "Proyectos")

1. Crear la carpeta `contenido/proyectos/`.
2. Añadir el bloque de la sección en `assets/js/config.js`.
3. Añadir `'proyectos'` a la lista `SECCIONES` de `scripts/generar-indice.mjs`.
4. Regenerar el índice.

Son 3 archivos. Pídemelo y lo hago yo.

## Convenciones

- Nombres de archivo en minúsculas, con guiones: `mi-primera-clase.md`.
- Un archivo que empieza por `_` se considera **borrador** y no aparece en la web.
- Las clases se ordenan por `fecha` (de más nueva a más vieja).
