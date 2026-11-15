# Actividades de SEO · IFCD0210

Material didáctico del módulo 3 del IFCD0210. Tres actividades guiadas y tres tests de autoevaluación para aprender SEO construyendo, publicando y auditando una web real.

## Contenido

```text
actividades-seo/
├── index.html                          Portada del material
├── actividad-1-seo-basico/             Actividad 1 completa
├── actividad-2-seo-avanzado/           Actividad 2 completa
├── actividad-3-wordpress-woocommerce/  Actividad 3 completa
├── quizzes/                            Tests de autoevaluación
│   ├── index.html
│   ├── assets/
│   └── datos/
├── assets/
│   ├── estilos.css
│   └── actividades.js
├── robots.txt
└── sitemap.xml
```

## Actividades

1. **SEO básico en una web estática.** Crear una web de tres páginas con HTML semántico, metadatos, URLs amigables, canonical, `robots.txt`, `sitemap.xml`, 404, HTTPS, Open Graph y publicación con GitHub Pages.
2. **SEO avanzado en una web estática.** Blog, datos estructurados, Core Web Vitals, imágenes optimizadas, `hreflang`, clústeres y auditoría técnica.
3. **SEO en WordPress y WooCommerce.** Enlaces permanentes, Yoast, taxonomías, duplicados, paginación, fichas de producto, filtros, checkout y rendimiento.

## Publicación

El material está publicado con GitHub Pages en:

```text
https://canodelacuadra.github.io/aprende-seo/
```

Repositorio: <https://github.com/canodelacuadra/aprende-seo>

Para actualizarlo, sube los cambios a la rama `main`. GitHub Pages reconstruye el sitio automáticamente.

### Cómo se configuró

1. Repositorio público `canodelacuadra/aprende-seo`.
2. **Settings → Pages → Build and deployment**.
3. Origen: **Deploy from a branch**, rama `main`, carpeta `/(root)`.
4. HTTPS activado.

Si cambias de repositorio o de usuario, actualiza también:

- `robots.txt` (línea `Sitemap`).
- `sitemap.xml` (todas las etiquetas `<loc>`).

Los ejemplos de `canonical` y Open Graph de la actividad 1 usan `usuario.github.io` de forma intencionada: son plantillas para el alumnado, no la URL de este material.

## Funcionalidades

- Diseño responsive y accesible, con enlace para saltar al contenido y foco visible.
- Bloques de código con botón de copiar.
- Checklist con progreso guardado en `localStorage` y botón de reinicio.
- Índice lateral con sección activa.
- Botón **Imprimir / PDF** con hoja de estilos de impresión.
- Tests con preguntas barajadas, corrección inmediata y explicación.

## Añadir o editar una actividad

Cada actividad es una carpeta con un `index.html` que enlaza a `../assets/estilos.css` y `../assets/actividades.js`. La estructura de secciones recomendada es:

1. Cabecera con objetivos, duración y dificultad.
2. Antes de empezar: requisitos, herramientas y convenciones.
3. Pasos numerados con objetivo, instrucciones, código, comprobación y evidencia.
4. Ampliaciones optativas.
5. Checklist de entrega.
6. Trazabilidad con el test.
7. Autoevaluación.
8. Entrega y rúbrica.

Las cajas didácticas se crean con `caja caja-objetivo`, `caja-comprueba`, `caja-cuidado`, `caja-evidencia`, `caja-ampliacion` y `caja-nota`.

## Créditos

Material elaborado para el IFCD0210. La empresa **TecnoSerprofes** y sus datos de contacto son ficticios.
