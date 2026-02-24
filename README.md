# DeportyApp

![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)
![SvelteKit](https://img.shields.io/badge/sveltekit-2-FF3E00?logo=svelte&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-SSR-3ECF8E?logo=supabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)

Plataforma web integral para la gestión, organización y seguimiento de actividades deportivas. Construida con tecnologías modernas para asegurar un rendimiento óptimo, mantenibilidad y una excelente experiencia de usuario.

---

## 🚀 Características Principales

* **Autenticación Sólida**: Integración segura con Supabase Auth. Soporte para inicio de sesión clásico (Email/Contraseña) y proveedores sociales (Google OAuth).
* **Panel de Administración (Dashboard)**: Sistema completo para la gestión privada que incluye:
  * Control de Perfil de Usuario.
  * Gestión de Organizaciones.
  * Configuración del Sistema.
  * Administración de Deportes.
* **Internacionalización (i18n)**: Soporte multi-idioma integrado nativamente (actualmente Español y Portugués).
* **Rendimiento SSR**: Aprovechamiento de Server-Side Rendering mediante SvelteKit para tiempos de carga ultrarrápidos y un SEO óptimo.
* **Diseño Moderno y Responsivo**: Interfaz construida íntegramente con Tailwind CSS v4, asegurando adaptabilidad a cualquier dispositivo.

## 🛠️ Stack Tecnológico

* **Frontend Framework**: [Svelte 5](https://svelte.dev/) y [SvelteKit](https://kit.svelte.dev/)
* **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Backend as a Service (BaaS)**: [Supabase](https://supabase.com/) (`@supabase/ssr`, `@supabase/supabase-js`)
* **Lenguaje Principal**: [TypeScript](https://www.typescriptlang.org/)
* **Testing**: [Vitest](https://vitest.dev/)
* **Herramientas de Calidad de Código**: ESLint y Prettier

---

## ⚙️ Instalación y Configuración Local

### Requisitos Previos
Asegúrate de contar con un entorno preparado:
* Node.js (versión `>=20.0.0`)
* Un gestor de paquetes (`npm`, `pnpm` o `yarn`)

### Paso a Paso

1. **Clonar el repositorio y descargar dependencias**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd DeportyApp
   npm install
   ```

2. **Variables de Entorno**:
   Copia el archivo de ejemplo y configura tu instancia de Supabase:
   ```bash
   cp .env.example .env
   ```
   Rellena el archivo `.env` con las credenciales de tu proyecto de Supabase:
   ```env
   PUBLIC_SUPABASE_URL=TU_URL_DE_PROYECTO
   PUBLIC_SUPABASE_ANON_KEY=TU_API_KEY_ANONIMA
   ```

3. **Configuración de Supabase Auth (Opcional - Google OAuth)**:
   * Accede a tu panel en Supabase.
   * Ve a `Authentication -> Providers` y habilita **Google**.
   * En `Authentication -> URL Configuration`:
     * **Site URL**: Configura la URL base (`http://localhost:5173` para desarrollo).
     * **Redirect URLs**: Añade los webhooks de autenticación (ej. `http://localhost:5173/auth/callback`).

---

## 🏃‍♂️ Desarrollo

Para iniciar el servidor de desarrollo interactivo con Hot-Module-Replacement (HMR):

```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

### Otros Comandos Útiles

| Comando | Descripción |
| :--- | :--- |
| `npm run build` | Compila la aplicación y optimiza los assets para despliegue en producción. |
| `npm run preview` | Previsualiza el build de producción simulando un entorno real. |
| `npm run check` | Analiza el código buscando errores de TypeScript y Svelte. |
| `npm run lint` | Analiza problemas de estilo de código y buenas prácticas con ESLint. |
| `npm run format`| Auto-formatea el código fuente utilizando Prettier. |
| `npm run test`  | Ejecuta los tests configurados con Vitest. |

---

## 📁 Estructura Principal del Proyecto

* `/src/routes/`: Contiene las vistas principales (Landing, `/login`, `/register`).
* `/src/routes/dashboard/`: Vistas protegidas de la plataforma administrativa.
* `/src/lib/`: Utilidades comunes, sistema de internacionalización (i18n), clientes de Supabase y componentes reusables de UI.
* `/static/`: Assets públicos e imágenes.

---

## 🤝 Contribuciones y Soporte

El código base sigue convenciones estrictas de linting y formateo. Si deseas contribuir:
1. Crea tu rama (`git checkout -b feature/nueva-funcionalidad`).
2. Verifica el código localmente (`npm run lint` y `npm run check`).
3. Envía un Pull Request describiendo detalladamente tus cambios.
