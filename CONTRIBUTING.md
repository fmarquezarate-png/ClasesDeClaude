# Cómo se trabaja en este repo

## Ramas

- `main` — lo que está publicado.
- `claude/...` — ramas de trabajo de Claude Code. Se juntan a `main` vía Pull Request.

## Commits

Formato corto en castellano, con prefijo:

- `feat:` algo nuevo
- `fix:` un arreglo
- `docs:` documentación
- `contenido:` una clase, skill o agente nuevo
- `chore:` mantenimiento

Ejemplo: `contenido: clase 03 sobre subagentes`

## Antes de subir contenido

1. El archivo empieza por el bloque `---` de metadatos, con `titulo` como mínimo.
2. El nombre del archivo va en minúsculas y con guiones.
3. Si trabajas en local, ejecuta `npm run indexar`. Si subes desde la web de
   GitHub, el robot lo hace por ti.
