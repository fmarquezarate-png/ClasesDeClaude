# Clases de Claude

Sitio web personal para repasar y estudiar las clases, skills y agentes que
vamos construyendo con Claude.

- **Sin compilación**: HTML, CSS y JavaScript planos. Lo que subes, se publica.
- **Contenido en markdown**: cada clase es un archivo de texto en `contenido/`.
- **Menú hamburguesa** con 5 secciones: Inicio · Clases · Skills · Agentes · Otros.
- **Progreso de estudio**, buscador global y tema claro/oscuro.

## Empezar

| Quiero… | Lee |
|---|---|
| Entender qué hay en cada carpeta | [docs/ESTRUCTURA.md](docs/ESTRUCTURA.md) |
| Añadir una clase nueva | [docs/COMO-ANADIR-CONTENIDO.md](docs/COMO-ANADIR-CONTENIDO.md) |
| Publicar el sitio | [docs/DEPLOY.md](docs/DEPLOY.md) |
| Ver qué falta por decidir | [docs/ROADMAP.md](docs/ROADMAP.md) |

## Verlo en local

```bash
npm run dev      # abre http://localhost:4321
npm run indexar  # regenera contenido/indice.json tras añadir archivos
```

> Abrir `index.html` a doble clic **no funciona**: el navegador bloquea la
> lectura de archivos locales. Usa `npm run dev`.

## Estructura corta

```
contenido/      ← tus clases, skills, agentes y otros (lo que tocas tú)
plantillas/     ← plantillas para empezar una entrada nueva
assets/         ← el motor del sitio (estilos y JavaScript)
docs/           ← instrucciones paso a paso
scripts/        ← generador del índice
```

## Estado

v0.1 — esqueleto navegable con contenido de ejemplo. Ver el
[roadmap](docs/ROADMAP.md) para lo que viene.
