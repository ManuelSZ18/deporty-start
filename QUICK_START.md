# 🚀 Quick Start - Design System Deporty 2026

Guía rápida para empezar a usar el sistema de diseño en tu proyecto.

---

## 1️⃣ Usar la Paleta de Colores

### Directamente en CSS

```css
background-color: var(--brand-main);    /* Azul Atlántico */
color: var(--text-dark);                /* Tinta China */
border-color: var(--brand-accent);      /* Coral */
```

### En Estilos Inline (React)

```jsx
<div style={{ color: 'var(--brand-main)' }}>
  Mi texto en Azul Atlántico
</div>
```

### Colores Disponibles

```
Colores principales: --brand-main, --brand-accent, --brand-highlight
Fondos:              --bg-soft, --bg-default, --bg-dark
Texto:               --text-dark, --text-primary, --text-secondary, --text-tertiary
Semánticos:          --color-success, --color-warning, --color-error, --color-info
```

---

## 2️⃣ Usar Componentes CSS

### Card (Tarjeta)

```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Título</h3>
  </div>
  <div class="card__body">
    Contenido de la tarjeta
  </div>
  <div class="card__footer">
    Pie de página
  </div>
</div>
```

### Buttons (Botones)

```html
<!-- Botón Primario -->
<button class="btn btn--primary">Primario</button>

<!-- Botón de Acción (Coral) -->
<button class="btn btn--action">Acción</button>

<!-- Botón Secundario -->
<button class="btn btn--secondary">Secundario</button>

<!-- Tamaños -->
<button class="btn btn--sm">Pequeño</button>
<button class="btn btn--lg">Grande</button>

<!-- Full Width -->
<button class="btn btn--primary btn--full">Ancho Completo</button>
```

### Forms (Formularios)

```html
<div class="form-group">
  <div class="form-field">
    <label class="form-label" for="name">Nombre</label>
    <input id="name" type="text" class="input" placeholder="Tu nombre">
  </div>
  
  <div class="form-field">
    <label class="form-label" for="message">Mensaje</label>
    <textarea class="textarea" placeholder="Tu mensaje..."></textarea>
  </div>
</div>
```

### Alerts (Notificaciones)

```html
<div class="alert alert--success">✓ Éxito</div>
<div class="alert alert--error">✗ Error</div>
<div class="alert alert--warning">⚠ Advertencia</div>
<div class="alert alert--info">ℹ Información</div>
```

### Badges (Etiquetas)

```html
<span class="badge badge--primary">Abierto</span>
<span class="badge badge--success">Completado</span>
<span class="badge badge--warning">Próximamente</span>
<span class="badge badge--coral">Especial</span>
```

### Grid Layout

```html
<!-- 2 columnas -->
<div class="grid grid--2">
  <div class="card">Elemento 1</div>
  <div class="card">Elemento 2</div>
</div>

<!-- 3 columnas -->
<div class="grid grid--3">
  <div class="card">Elemento 1</div>
  <div class="card">Elemento 2</div>
  <div class="card">Elemento 3</div>
</div>

<!-- 4 columnas -->
<div class="grid grid--4">
  <div class="card">Elemento 1</div>
  <!-- ... -->
</div>
```

---

## 3️⃣ Usar el Componente EventCard

### Importación

```jsx
import EventCard from './components/EventCard';
```

### Uso Básico

```jsx
<EventCard
  title="100m Estilo Libre"
  subtitle="Categoría Adultos"
  date="22 de Febrero, 2026"
  time="09:00 AM"
  location="Piscina Olímpica de Madrid"
  distance="100m"
  category="Adultos"
  price="€25.00"
  status="open"
  onRegister={() => console.log('Registrado')}
  onViewDetails={() => console.log('Ver detalles')}
/>
```

### Con Imagen

```jsx
<EventCard
  title="Campeonato Regional"
  image="/path/to/image.jpg"
  {...otherProps}
/>
```

### Estados de Evento

```jsx
status="open"      /* Abierto (azul) */
status="closing"   /* Cerrando (naranja) */
status="closed"    /* Cerrado (verde) */
status="full"      /* Completo (coral) */
```

---

## 4️⃣ Usar Espaciado Modular

### Variables de Espaciado (8px base)

```css
--space-xs:   4px
--space-sm:   8px
--space-md:   16px
--space-lg:   24px
--space-xl:   32px
--space-2xl:  48px
--space-3xl:  64px
```

### Ejemplo en CSS

```css
.container {
  padding: var(--space-lg);      /* 24px */
  margin-bottom: var(--space-xl); /* 32px */
  gap: var(--space-md);          /* 16px */
}
```

### Ejemplo en React

```jsx
<div style={{
  padding: 'var(--space-lg)',
  marginBottom: 'var(--space-xl)'
}}>
  Contenido
</div>
```

---

## 5️⃣ Usar Tipografía

### Tamaños

```css
--font-size-xs:   12px
--font-size-sm:   14px
--font-size-base: 16px
--font-size-lg:   18px
--font-size-xl:   20px
--font-size-2xl:  24px
--font-size-3xl:  30px
--font-size-4xl:  36px
```

### Pesos

```css
--font-weight-light:      300
--font-weight-normal:     400
--font-weight-medium:     500
--font-weight-semibold:   600
--font-weight-bold:       700
```

### Ejemplo

```css
h1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}
```

---

## 6️⃣ Usar Sombras y Bordes

### Sombras

```css
box-shadow: var(--shadow-sm);   /* Sutil */
box-shadow: var(--shadow-md);   /* Mediano */
box-shadow: var(--shadow-lg);   /* Grande (por defecto en cards) */
```

### Bordes Redondeados

```css
border-radius: var(--radius-sm);   /* 6px */
border-radius: var(--radius-md);   /* 12px */
border-radius: var(--radius-lg);   /* 20px (amplios) */
border-radius: var(--radius-xl);   /* 24px */
border-radius: var(--radius-full); /* Circular */
```

---

## 7️⃣ Hacer Responsive

### Mobile First

```css
/* Base: mobile (320px) */
.elemento { width: 100%; }

/* Tablet en adelante */
@media (min-width: 768px) {
  .elemento { width: 50%; }
}

/* Desktop en adelante */
@media (min-width: 1024px) {
  .elemento { width: 33.333%; }
}
```

### Usar Grid Responsive

```html
<!-- Automáticamente responsive -->
<div class="grid grid--3">
  <!-- 1 columna en mobile -->
  <!-- 2 columnas en tablet -->
  <!-- 3 columnas en desktop -->
</div>
```

---

## 8️⃣ Ejemplos Completos

### Card de Evento Personalizado

```jsx
import EventCard from './components/EventCard';

function EventosPage() {
  return (
    <div className="container">
      <h1 style={{ color: 'var(--brand-main)' }}>
        Próximos Eventos
      </h1>
      
      <div className="grid grid--3">
        <EventCard
          title="100m Libre"
          status="open"
          price="€25.00"
          onRegister={() => handleRegister()}
          {...eventData}
        />
        {/* Más cards */}
      </div>
    </div>
  );
}
```

### Formulario Personalizado

```jsx
function LoginForm() {
  return (
    <form className="auth-form form-group">
      <div className="form-field">
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="input"
          placeholder="tu@email.com"
        />
      </div>
      
      <button className="btn btn--primary btn--full">
        Iniciar Sesión
      </button>
    </form>
  );
}
```

### Página con Features

```jsx
function FeaturesPage() {
  const features = [
    { icon: '🎯', title: 'Eventos Curados' },
    { icon: '📊', title: 'Seguimiento' },
    { icon: '👥', title: 'Comunidad' },
  ];

  return (
    <div className="container">
      <h2 style={{ color: 'var(--brand-main)' }}>
        ¿Por qué Deporty?
      </h2>
      
      <div className="grid grid--3">
        {features.map(f => (
          <div key={f.title} className="card">
            <div style={{ fontSize: '3rem' }}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>Descripción aquí...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🔧 Troubleshooting

### Las variables CSS no funcionan
✓ Verificar que `tokens.css` está importado en `globals.css`
✓ Verificar que el archivo está en `app/styles/tokens.css`

### El componente EventCard no se importa
✓ Verificar que el archivo es `EventCard.jsx`
✓ Usar importación: `import EventCard from './components/EventCard'`

### Estilos no se aplican
✓ Verificar que el CSS está antes que el HTML en `globals.css`
✓ Verificar que las clases están escritas correctamente
✓ Usar DevTools para inspeccionar

### Dark mode no funciona
✓ Cambiar preferencia de color en SO (Settings → Dark Mode)
✓ Verificar `@media (prefers-color-scheme: dark)` en `tokens.css`

---

## 📚 Recursos

- **Documentación Completa**: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
- **Guía Técnica**: [README_DESIGN_SYSTEM.md](./README_DESIGN_SYSTEM.md)
- **Resumen Implementación**: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
- **Código**: `app/styles/` y `app/components/`

---

## ⚡ Tips & Tricks

1. **Siempre usar variables** - Nunca hardcodear colores
2. **Modular el CSS** - Usar clases combinables
3. **Espaciado modular** - Respetar el sistema 8px
4. **Accesibilidad** - Siempre incluir labels en inputs
5. **Mobile first** - Diseñar para mobile primero
6. **Reutilizar componentes** - Evitar código duplicado
7. **Documentar** - Comentar código complejo
8. **Testear** - Probar en mobile, tablet, desktop

---

**¡Listo para empezar!** 🚀

Cualquier duda, revisar la documentación completa en [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)
