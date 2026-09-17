---
titulo: Cómo funciona este sitio
resumen: La clase cero. Cómo está montado el repositorio y cómo añadir contenido sin romper nada.
fecha: 2026-09-17
modulo: Módulo 0 · Setup
nivel: Básico
tags: [setup, repositorio, markdown]
---

# Cómo funciona este sitio

Esta es la clase cero: entender la máquina antes de usarla.

## La idea en una frase

Cada clase, skill o agente es **un archivo de texto** (`.md`) dentro de la carpeta
`contenido/`. El sitio lee un índice y los muestra. No hay base de datos, no hay
servidor, no hay nada que se pueda romper al publicar.

## Las piezas

| Pieza | Qué hace | ¿Lo tocas tú? |
|---|---|---|
| `index.html` | El esqueleto de la página | Casi nunca |
| `assets/` | Estilos y código de la web | No |
| `contenido/` | **Tus clases, skills y agentes** | Sí, siempre |
| `contenido/indice.json` | La lista de todo el contenido | Se genera solo |
| `docs/` | Instrucciones para ti | Solo leer |

## El frontmatter

Arriba de cada archivo hay un bloque entre `---`. Eso es el *frontmatter*:
los metadatos de la clase. Es lo que permite que el buscador y los filtros
funcionen.

```
---
titulo: Cómo funciona este sitio
resumen: Una frase que se ve en la tarjeta
fecha: 2026-09-17
modulo: Módulo 0 · Setup
tags: [setup, repositorio]
---
```

> Piénsalo como la cabecera de una tabla en Power BI: sin columnas bien
> nombradas, ningún filtro funciona después.

## Conceptos clave

- **Markdown**: texto plano con marcas simples (`#` para títulos, `-` para listas).
- **Frontmatter**: los metadatos de arriba del archivo.
- **Índice**: `contenido/indice.json`, la lista que lee la web.
- **Slug**: el nombre del archivo sin `.md`; es lo que va en la URL.

## Autoevaluación

1. ¿Dónde pondrías una clase nueva sobre skills de Claude?
2. ¿Qué pasa si te olvidas el `titulo` en el frontmatter?
3. ¿Por qué el sitio no necesita compilarse para publicarse?
