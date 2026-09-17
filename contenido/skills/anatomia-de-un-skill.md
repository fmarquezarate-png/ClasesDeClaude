---
titulo: Anatomía de un skill
resumen: Qué es un skill de Claude, de qué partes se compone y cuándo conviene crear uno.
fecha: 2026-09-17
categoria: Fundamentos
tags: [skills, SKILL.md]
---

# Anatomía de un skill

Un *skill* es una carpeta con instrucciones que Claude carga **solo cuando hacen
falta**. Es memoria bajo demanda.

## Partes

- `SKILL.md` — el archivo principal: nombre, descripción y las instrucciones.
- La **descripción** es lo más importante: decide cuándo se activa el skill.
- Archivos de apoyo opcionales (plantillas, referencias, scripts).

## Cuándo crear uno

Cuando repites las mismas instrucciones en tres chats distintos, eso es un skill.

## Autoevaluación

1. ¿Qué campo decide si un skill se activa o no?
2. ¿Diferencia entre un skill y pegar el contexto a mano en cada chat?
