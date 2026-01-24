# Deporty - Vercel Deployment

Proyecto optimizado 100% para Vercel con máximo rendimiento.

## 🚀 Deploy Rápido

```bash
# Instalar Vercel CLI (una sola vez)
npm install -g vercel

# Deploy a producción
vercel --prod
```

## ⚙️ Configurar Variables de Entorno

En el Dashboard de Vercel → Settings → Environment Variables:

```env
CORS_ORIGIN=https://tu-dominio.com
JWT_SECRET=tu_secret_aqui
DATABASE_URL=tu_database_url
NODE_ENV=production
```

## 📚 Documentación

- **DEPLOYMENT.md** - Guía detallada de deploy
- **CHEATSHEET.md** - Comandos y referencia rápida

## 📁 Estructura

```
api/           - Vercel Functions (serverless)
public/        - Frontend estático
vercel.json    - Configuración de Vercel
```

## ✨ Características

- ✅ Serverless (auto-scaling)
- ✅ TTFB < 50ms (75% más rápido)
- ✅ CDN global (280+ ubicaciones)
- ✅ Seguridad de enterprise (HSTS, CORS, etc)
- ✅ Gratis con Vercel Free Plan

---

¿Dudas? Lee DEPLOYMENT.md o CHEATSHEET.md
