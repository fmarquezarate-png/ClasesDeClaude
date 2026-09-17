# Roadmap

Lo que hay hoy y lo que queda por decidir. Se actualiza a medida que avanzamos.

## v0.1 — Esqueleto (hecho)

- [x] Menú hamburguesa con 5 cintas: Inicio, Clases, Skills, Agentes, Otros
- [x] Contenido en markdown, sin compilación
- [x] Índice generado automáticamente
- [x] Buscador global (Ctrl/Cmd + K)
- [x] Filtros por módulo/categoría
- [x] Progreso de estudio (pendiente / estudiando / estudiado)
- [x] Tema claro y oscuro
- [x] Publicación automática

## v0.2 — Por conversar

- [ ] ¿Índice de contenidos lateral dentro de cada clase?
- [ ] ¿Colores de código (resaltado de sintaxis) en los bloques?
- [ ] ¿Modo repaso tipo flashcards con las preguntas de autoevaluación?
- [ ] ¿Enlaces "clase anterior / siguiente"?
- [ ] ¿Sección nueva: Proyectos? ¿Plantillas de prompts?

## Descartado por ahora (y por qué)

- **Login y base de datos**: no aportan nada mientras seas el único usuario y
  añaden mantenimiento y coste. Si un día quieres progreso sincronizado entre
  dispositivos, entonces sí (Supabase).
- **Framework con build (Astro/Next)**: más potente, pero un error tonto en un
  archivo tumba la publicación entera. No compensa todavía.
- **Comentarios**: para uno mismo, ruido.
