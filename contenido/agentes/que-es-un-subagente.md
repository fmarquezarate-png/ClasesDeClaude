---
titulo: Qué es un subagente
resumen: Cuándo delegar trabajo a un agente aparte y cuándo es un desperdicio de tokens.
fecha: 2026-09-17
categoria: Fundamentos
tags: [agentes, subagentes, contexto]
---

# Qué es un subagente

Un subagente es una sesión de Claude aparte, con su propio contexto, a la que se
le encarga una tarea concreta. Devuelve un resultado, no toda su conversación.

## Cuándo sí

- Búsquedas amplias donde solo importa la conclusión.
- Tareas largas y paralelizables.

## Cuándo no

- Tareas cortas: arrancar un agente cuesta más de lo que ahorra.
- Cuando el contexto de la conversación actual es imprescindible: el subagente
  empieza en frío.

## Autoevaluación

1. ¿Por qué un subagente puede ser más caro que hacer la tarea directo?
2. ¿Qué información pierde un subagente al arrancar?
