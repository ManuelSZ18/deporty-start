# Deporty - Next.js + Vercel

Plataforma de gestión deportiva con Next.js 14 optimizada para Vercel.

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Deploy en Vercel

```bash
# Opción 1: Auto-deploy desde GitHub
# 1. Push a GitHub
# 2. Conecta en https://vercel.com/dashboard
# 3. Auto-deploy en cada push

# Opción 2: Deploy desde CLI
npm install -g vercel
vercel --prod
```

## ⚙️ Variables de Entorno

Crear `.env.local`:

```env
CORS_ORIGIN=https://tu-dominio.com
JWT_SECRET=tu_secret_aqui
DATABASE_URL=tu_database_url
NODE_ENV=production
```

## 📁 Estructura

```
app/
  ├── api/              - API routes (Next.js)
  ├── login/            - Página de login
  ├── signup/           - Página de signup
  ├── page.js           - Home
  ├── layout.js         - Layout global
  └── styles/           - Estilos CSS
public/
  ├── assets/           - Imágenes y assets
  └── site.webmanifest  - PWA manifest
```

## ✨ Features

- ✅ Next.js 14 (App Router)
- ✅ API Routes integradas
- ✅ Optimización automática de imágenes
- ✅ Headers de seguridad
- ✅ Service Worker incluido
- ✅ 100% compatible con Vercel

## 📚 Documentación

- **DEPLOYMENT.md** - Guía completa de deploy
- **CHEATSHEET.md** - Comandos y referencia rápida

---

**Listo para producción con Vercel** 🚀

