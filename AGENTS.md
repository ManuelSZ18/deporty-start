# Deporty App Context for Agents

## Proyecto
- **Nombre:** DeportyApp
- **Descripción:** Aplicación web para organizar ligas, gestionar equipos y seguir resultados en tiempo real.
- **Stack Tecnológico:** 
  - Frontend: SvelteKit (Svelte 5) + Tailwind CSS
  - Backend/Auth/BBDD: Supabase
  - UI Components: Componentes propios y Tailwind Forms
  - Node Version: >= 20.0.0

## Estado Actual y Reglas Generales
- **Framework:** Estamos usando **Svelte 5**, no Svelte 4. Esto significa que usamos `$state()`, `$derived()`, `$props()`, `$effect()` y demás runas en lugar de `let variable`, `$: dependencias` y `export let prop`.
- **SSR vs CSR:** La renderización por defecto está habilitada en el servidor (SSR). Fallas como llamadas a objetos de navegador (`window`, `navigator`) directamente en `<script>` o inicializaciones de bibliotecas externas sin manejo de ciclo de vida como `onMount` o `$effect` causarán errores 500 durante la pre-carga/pre-renderización de las rutas SvelteKit (`vite` server render).
- **Componentes problemáticos:**
  - `intl-tel-input/svelteWithUtils` causó errores 500 y de `effect_orphan` en Svelte 5 por incompatibilidad.
  - Para inputs de teléfono se debe usar SIEMPRE el Wrapper nativo `src/lib/components/PhoneInput.svelte` que usa JavaScript vanilla debajo en lugar de depender de adaptadores Svelte 4.

## Estructura de Directorios Clave
- `src/routes`: Rutas de la aplicación (Landing `+page.svelte`, `/dashboard`, `/login`, `/register`).
- `src/lib/components`: Componentes reutilizables de UI (Spinner, PhoneInput, etc).
- `src/lib/auth`: Utilidades de autenticación (Ej: integraciones OAuth).
- `src/hooks.server.ts`: Hook principal de autorización y creación del cliente Supabase SSR per-request. Maneja redirecciones (ej. si el usuario intenta ir a una ruta 404 pero está logueado se le envía al dashboard).

## Buenas Prácticas al Escribir Código
1. Todas las variables reactivas en `.svelte` y `.svelte.ts` DEBEN usar runas de Svelte 5.
2. Evitar `export const ssr = false` en `+page.ts` a menos que sea el último recurso o toda la página sea un widget de navegador. Arreglar el componente envolvente usando `$effect()` es preferible.
3. El Auth se maneja usando Supabase Auth SSR. Revisa `safeGetSession()` definido en `event.locals` a través de `hooks.server.ts`.
