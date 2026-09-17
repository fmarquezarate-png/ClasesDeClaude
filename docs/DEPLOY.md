# Publicar el sitio

El sitio es HTML estático: **no hay compilación**. Cualquier hosting sirve y
nunca puede fallar un "build".

## Opción 1 — GitHub Pages (cero configuración externa)

1. GitHub → tu repo → **Settings** → **Pages**.
2. En **Source**, elige **GitHub Actions**.
3. Listo. Cada push a `main` publica.
4. La URL será `https://fmarquezarate-png.github.io/ClasesDeClaude/`.

El workflow ya está en `.github/workflows/pages.yml`.

## Opción 2 — Vercel (recomendada si quieres dominio propio)

1. Entra en vercel.com y conecta tu cuenta de GitHub.
2. **Add New → Project** → elige `ClasesDeClaude`.
3. Framework Preset: **Other**. Build Command: vacío. Output Directory: `.`
4. **Deploy**.

Cada push publica solo. La configuración ya está en `vercel.json`.

## Opción 3 — Netlify

Igual que Vercel; la configuración está en `netlify.toml` (publish = `.`,
sin comando de build).

## Verlo en tu ordenador antes de publicar

El sitio carga archivos con `fetch`, así que **abrir `index.html` a doble clic
no funciona** (el navegador lo bloquea). Necesitas un servidor local:

```bash
npm run dev
```

Y abres `http://localhost:4321`.

## Qué hacer si algo no se ve

1. ¿La entrada está en `contenido/indice.json`? Si no, el índice no se regeneró.
2. Pestaña **Actions** en GitHub: ¿algún workflow en rojo?
3. Recarga forzada del navegador (Ctrl+Shift+R) por si quedó caché vieja.
