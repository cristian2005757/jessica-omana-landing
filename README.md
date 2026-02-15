# Jessica Omaña — Manual UGC-Airbnb

Landing page de producto digital estilo Hotmart, enfocada en conversión. Diseño pensado para destacar ante reclutadores: UX copy, Core Web Vitals, accesibilidad y microinteracciones.

## Tecnologías

- **HTML5** — Semántica, ARIA, SEO
- **CSS3** — Variables, responsive, animaciones
- **JavaScript** — Vanilla (modal, menú, scroll spy, reveal)

## Características

### Conversión
- Hero con propuesta de valor + stats
- Sección **Plan** (Problema → Solución → Resultado)
- Beneficios, contenido incluido, testimonios, FAQ
- Modal de checkout (demo) listo para Hotmart

### UX / Accesibilidad
- Nav activo por sección visible (IntersectionObserver)
- Botones con `:focus-visible` y microinteracciones
- Modal: cierra con Esc, click en backdrop, devuelve foco
- Animaciones respetan `prefers-reduced-motion`

### Performance (Core Web Vitals)
- Hero en WebP + preload
- `width`/`height` en imágenes (evita CLS)
- Testimonios con `loading="lazy"`

### Detalle
- Animación reveal (fade + slide) en cards/panels
- Header sticky, menú móvil que cierra al navegar
- Signature discreta en footer

## Estructura

```
jessica-omana-landing/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/
│       ├── hero-1.webp       # Hero optimizado
│       ├── Imagen landing.jpg
│       └── testimonio1-4.jpg
├── package.json
└── README.md
```

## Cómo ejecutar

Abrir `index.html` en el navegador. Sin servidor necesario.

```bash
# Opcional: regenerar hero en WebP
npm run img:hero
```

## Créditos

Built by [Cristian Alvarez](#) · Landing Systems
