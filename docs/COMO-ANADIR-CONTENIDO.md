# Cómo añadir una clase (paso a paso)

No necesitas terminal ni instalar nada. Todo desde la web de GitHub.

## Opción A — desde el navegador (la habitual)

1. Entra a tu repositorio en GitHub.
2. Abre la carpeta `contenido/clases/` (o `skills/`, `agentes/`, `otros/`).
3. Pulsa **Add file → Create new file**.
4. Escribe el nombre del archivo en minúsculas y con guiones, terminado en `.md`.
   Ejemplo: `02-subagentes-en-la-practica.md`
5. Pega el contenido. **Importante:** empieza siempre por el bloque de metadatos:

   ```
   ---
   titulo: Subagentes en la práctica
   resumen: Cuándo delegar y cuándo no.
   fecha: 2026-09-20
   modulo: Módulo 2 · Agentes
   nivel: Intermedio
   tags: [agentes, contexto]
   ---
   ```

   Debajo, la clase en markdown normal.
6. Abajo del todo, pulsa **Commit changes**.
7. Espera ~1 minuto. El robot regenera el índice y el sitio se actualiza solo.

### Cómo saber si funcionó

- ✅ Abres el sitio, entras a la sección y ves tu clase en una tarjeta nueva.
- ❌ Si no aparece: casi siempre es el bloque `---` mal puesto (falta el de
  cierre, o hay un espacio antes del primer `---`). En GitHub, pestaña
  **Actions**, el workflow "Regenerar índice" te dirá si falló.

## Opción B — pidiéndomelo a mí

Dime "añade esta clase" y me pasas el texto. Yo creo el archivo, relleno los
metadatos, regenero el índice y lo subo.

## Campos de metadatos

| Campo | Obligatorio | Para qué |
|---|---|---|
| `titulo` | **Sí** | El título de la tarjeta |
| `resumen` | Recomendado | La frase bajo el título |
| `fecha` | Recomendado | Ordena las entradas (formato `2026-09-20`) |
| `modulo` | Solo clases | Agrupa y crea los filtros |
| `categoria` | Skills/agentes/otros | Igual que `modulo` pero en esas secciones |
| `nivel` | No | Básico / Intermedio / Avanzado |
| `tags` | No | Alimenta el buscador. Formato: `[uno, dos]` |

## Regenerar el índice a mano (solo si hace falta)

```bash
npm run indexar
```
