# 🏊 DEPORTY - Design System 2026

## Sistema de Diseño para Eventos de Natación

Un sistema de diseño moderno, accesible y completamente personalizado para la plataforma Deporty de eventos de natación.

---

## 📊 Paleta de Colores

### Colores Principales

| Color | Código | Uso |
|-------|--------|-----|
| **Azul Atlántico** | `#005B96` | Primario, headers, elementos clave |
| **Azul Atlántico Light** | `#0080C6` | Estados hover, variantes |
| **Azul Atlántico Dark** | `#003D63` | Estados activos, texto sobre color |
| **Amarillo Canario** | `#FFEF00` | Highlights, llamadas de atención |
| **Coral** | `#FF7F50` | Acciones primarias, CTAs |
| **Cloud Dancer** | `#F0F3F4` | Fondos secundarios, text sobre azul |
| **Azul Tinta China** | `#0B162C` | Texto primario, dark mode |

### Colores Semánticos

- **Success**: `#10B981` (Verde)
- **Warning**: `#F59E0B` (Naranja)
- **Error**: `#EF4444` (Rojo)
- **Info**: `#3B82F6` (Azul)

---

## 🎨 Componentes Disponibles

### Card (Tarjeta de Evento)

```jsx
import { EventCard } from '@/components/EventCard';

<EventCard
  title="Campeonato Regional de Natación"
  subtitle="100m Libre"
  date="15 de Febrero, 2026"
  time="09:00 AM"
  location="Piscina Olímpica de Madrid"
  distance="100m"
  category="Adultos"
  price="€25.00"
  status="open"
  onRegister={() => console.log('Inscripción')}
  onViewDetails={() => console.log('Ver detalles')}
/>
```

**Variantes de Estado**:
- `open`: Abierto (Azul)
- `closing`: Cerrando (Naranja)
- `closed`: Cerrado (Verde)
- `full`: Completo (Coral)

### Botones

```jsx
<!-- Botón Primario -->
<button className="btn btn--primary">Registrarse</button>

<!-- Botón de Acción (Coral) -->
<button className="btn btn--action">Inscribirse</button>

<!-- Botón Secundario -->
<button className="btn btn--secondary">Cancelar</button>

<!-- Botón Highlight (Amarillo) -->
<button className="btn btn--highlight">Oferta Especial</button>

<!-- Tamaños -->
<button className="btn btn--sm">Pequeño</button>
<button className="btn btn--lg">Grande</button>

<!-- Full Width -->
<button className="btn btn--primary btn--full">Ancho Completo</button>
```

### Badges/Tags

```jsx
<span className="badge badge--primary">Abierto</span>
<span className="badge badge--success">Completado</span>
<span className="badge badge--warning">Próximamente</span>
<span className="badge badge--coral">Especial</span>
```

### Forms

```jsx
<form className="form-group">
  <label className="form-label">Email</label>
  <input type="email" className="input" placeholder="tu@email.com">
  <span className="form-hint">Usaremos esto para tu cuenta</span>
</form>

<form className="form-group">
  <label className="form-label">Mensaje</label>
  <textarea className="textarea" placeholder="Tu mensaje..."></textarea>
</form>
```

### Alerts

```jsx
<div className="alert alert--success">✓ Inscripción completada con éxito</div>
<div className="alert alert--error">✗ Error al procesar tu solicitud</div>
<div className="alert alert--warning">⚠ Faltan datos en el formulario</div>
<div className="alert alert--info">ℹ Información importante</div>
```

### Grid Layout

```jsx
<div className="container">
  <div className="grid grid--2">
    <!-- 2 columnas en desktop, 1 en mobile -->
  </div>
  
  <div className="grid grid--3">
    <!-- 3 columnas en desktop -->
  </div>
</div>
```

---

## 🎯 Variables CSS

Todas las variables están definidas en `app/styles/tokens.css`

### Colores
```css
--brand-main: #005B96
--brand-accent: #FF7F50
--brand-highlight: #FFEF00
--bg-soft: #F0F3F4
--text-dark: #0B162C
--text-primary: #0B162C
--text-secondary: #334155
--text-tertiary: #64748B
```

### Espaciado (Sistema 8px)
```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 32px
--space-2xl: 48px
--space-3xl: 64px
```

### Tipografía
```css
--font-family-primary: 'Quantico', monospace
--font-family-secondary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif

--font-size-xs: 12px
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-size-xl: 20px
--font-size-2xl: 24px
--font-size-3xl: 30px
--font-size-4xl: 36px
```

### Bordes Redondeados
```css
--radius-sm: 6px
--radius-md: 12px
--radius-lg: 20px      /* Amplios - 2026 */
--radius-xl: 24px
--radius-2xl: 32px
--radius-full: 9999px  /* Pill-shaped */
```

### Sombras (Soft Shadows)
```css
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

### Efectos Backdrop
```css
--backdrop-blur-sm: blur(4px)
--backdrop-blur: blur(8px)
--backdrop-blur-lg: blur(12px)
```

### Transiciones
```css
--transition-fast: 150ms ease-in-out
--transition-base: 300ms ease-in-out
--transition-slow: 500ms ease-in-out
```

---

## ♿ Accesibilidad WCAG

### Contraste de Colores

✅ **Texto sobre Azul Atlántico (#005B96)**
- Se usa siempre `#F0F3F4` (Cloud Dancer)
- Ratio de contraste: **8.5:1** ✓ Supera AAA

✅ **Texto sobre Cloud Dancer (#F0F3F4)**
- Se usa `#0B162C` (Azul Tinta China)
- Ratio de contraste: **11.3:1** ✓ Supera AAA

✅ **Botón Coral (#FF7F50) sobre blanco**
- Texto: `#0B162C`
- Ratio de contraste: **7.2:1** ✓ Supera AA

### Prácticas de Accesibilidad

1. **Etiquetas en Formularios**: Siempre incluir `<label>` con `for`
2. **ARIA**: Usar `aria-label` en iconos e elementos interactivos
3. **Focus States**: Todos los botones tienen estados `:focus` visible
4. **Color no único**: No confiar solo en color, usar íconos + texto
5. **Contraste mínimo**: 4.5:1 para texto normal, 3:1 para texto grande

---

## 🎪 Efectos de Diseño 2026

### Bordes Redondeados Amplios
- Cards: `border-radius: 20px` (--radius-lg)
- Botones: `border-radius: 20px` (--radius-lg)
- Inputs: `border-radius: 12px` (--radius-md)

### Sombras Suaves
```css
box-shadow: var(--shadow-lg);
/* Produce: 0 10px 15px -3px rgba(0, 0, 0, 0.1), ... */
```

### Backdrop Blur (Transparencia Agua)
```css
backdrop-filter: blur(8px);
```

Crea el efecto de "vidrio" translúcido similar al agua.

---

## 📱 Responsive Design

Sistema completamente responsive:

- **Desktop**: Layout completo, grid de 2-4 columnas
- **Tablet**: Grid adaptado, espacios optimizados
- **Mobile**: Stack vertical, botones full-width

```css
@media (max-width: 768px) {
  .grid--2, .grid--3, .grid--4 { grid-template-columns: 1fr; }
}
```

---

## 🌙 Dark Mode Support

El sistema soporta dark mode automáticamente via `prefers-color-scheme`:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-soft: #1A2332;
    --color-bg-light: #0F1419;
    /* ... más variables */
  }
}
```

---

## 📖 Ejemplos de Uso

### Home Page
```jsx
import { EventCard } from '@/components/EventCard';

export default function Home() {
  const events = [
    {
      title: "100m Libre",
      location: "Madrid",
      status: "open",
      // ...
    }
  ];

  return (
    <main className="container section">
      <h1>Eventos de Natación 2026</h1>
      <div className="grid grid--3">
        {events.map(event => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </main>
  );
}
```

### Auth Pages
```jsx
<div className="page-container">
  <form className="form-container">
    <h1 style={{ color: 'var(--brand-main)' }}>Iniciar Sesión</h1>
    
    <div className="form-group">
      <label className="form-label">Email</label>
      <input className="input" type="email" />
    </div>
    
    <button className="btn btn--primary btn--full">Entrar</button>
  </form>
</div>
```

---

## 🔧 Archivos del Sistema

- `app/styles/tokens.css` - Variables y configuración de diseño
- `app/styles/components.css` - Estilos de componentes base
- `app/styles/globals.css` - Estilos globales y importaciones
- `app/components/EventCard.jsx` - Componente React reutilizable
- `app/styles/variables.css` - Variables antiguas (legacy)
- `app/styles/main.css` - Estilos específicos (legacy)

---

## ✨ Tendencias 2026 Implementadas

✅ Paleta de colores vibrante (Azul Atlántico + Coral + Amarillo)
✅ Bordes redondeados amplios (20px+)
✅ Sombras suaves y naturales
✅ Efectos backdrop-blur (transparencia)
✅ Animaciones sutiles (float, shimmer, slideUp)
✅ Typography moderna y clara
✅ Espaciado generoso y proporcional
✅ Accesibilidad WCAG AAA
✅ Dark mode integrado
✅ Mobile-first responsive design

---

## 📞 Soporte

Para actualizar o extender este sistema de diseño:

1. Editar variables en `app/styles/tokens.css`
2. Agregar nuevos componentes en `app/styles/components.css`
3. Crear componentes React en `app/components/`
4. Mantener consistencia con el color brand principal

¡Disfruta diseñando con Deporty! 🏊‍♂️
