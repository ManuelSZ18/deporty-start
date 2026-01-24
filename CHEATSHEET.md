# 🎯 Cheat Sheet Vercel para Deporty

## 🚀 Deploy Rápido

```bash
# Instalar (una sola vez)
npm install -g vercel

# Deploy a producción
vercel --prod

# Deploy a staging (preview)
vercel

# Ver logs
vercel logs

# Ver proyecto
vercel projects

# Configurar variables
vercel env add
```

## 🔧 Estructura de Rutas

### Crear nueva endpoint

1. **Archivo:** `/api/v1/ruta/archivo.js`
2. **URL accesible:** `GET|POST /api/v1/ruta/archivo`

```javascript
// /api/v1/users/perfil.js
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    res.status(200).json({ 
        user: 'data',
        message: 'Success'
    });
}
```

## 📊 Caching

```javascript
// API: Sin cache (siempre fresh)
res.setHeader('Cache-Control', 'no-cache, no-store');

// Página: Cache corto (1 hora)
res.setHeader('Cache-Control', 'max-age=3600');

// Assets: Cache largo (1 año)
res.setHeader('Cache-Control', 'max-age=31536000, immutable');
```

## 🔐 Headers de Seguridad

```javascript
res.setHeader('X-Frame-Options', 'DENY');
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-XSS-Protection', '1; mode=block');
res.setHeader('Strict-Transport-Security', 'max-age=31536000');
```

## 📝 vercel.json Essentials

```json
{
  "functions": {
    "api/**/*.js": {
      "memory": 512,
      "maxDuration": 10,
      "runtime": "nodejs18.x"
    }
  },
  
  "env": [
    "DATABASE_URL",
    "JWT_SECRET"
  ],
  
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache" }
      ]
    }
  ]
}
```

## 🌍 Variables de Entorno

```bash
# En Vercel Dashboard → Settings → Environment Variables

CORS_ORIGIN=https://tu-dominio.com
JWT_SECRET=tu_secret_aqui
DATABASE_URL=mongodb+srv://...
NODE_ENV=production
```

Acceder en código:
```javascript
const dbUrl = process.env.DATABASE_URL;
```

## 🧪 Pruebas Locales

```bash
# Instalar CLI
npm install -g vercel

# Iniciar dev server
vercel dev

# Abre http://localhost:3000
```

## 📱 Resolver CORS

```javascript
// En function o middleware
res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

if (req.method === 'OPTIONS') {
    res.status(200).end();
}
```

## 🔍 Debugging

```bash
# Ver logs en tiempo real
vercel logs -f

# Ver logs de una función
vercel logs api/v1/auth/registro.js

# Ver detalles de deployment
vercel deployments list

# Ver inspection de build
vercel builds list
```

## 💡 Consejos de Rendimiento

1. **Assets versionados** → Cache 1 año
   ```html
   <link rel="stylesheet" href="/assets/css/main.css">
   <!-- Vercel CDN automáticamente versionado -->
   ```

2. **APIs sin cache**
   ```javascript
   res.setHeader('Cache-Control', 'no-cache, no-store');
   ```

3. **Lazy load Google Fonts**
   ```html
   <link rel="preload" href="..." as="style" 
         onload="this.onload=null;this.rel='stylesheet'">
   ```

4. **Comprimir respuestas**
   ```javascript
   // Vercel lo hace automáticamente
   // Solo asegúrate de no tener payload muy grandes
   ```

5. **Usar Edge Network**
   - Vercel automáticamente usa la ubicación más cercana
   - 280+ data centers globales
   - No requiere config adicional

## 🎯 Migración de Express a Vercel

**Antes (Express):**
```javascript
const express = require('express');
const app = express();

app.post('/api/v1/auth/registro', (req, res) => {
    // handler
});

app.listen(3000);
```

**Después (Vercel):**
```javascript
// /api/v1/auth/registro.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    // handler
}
```

## ⚠️ Gotchas Comunes

### ❌ Rutas relativas

```javascript
// ❌ NO
const controller = require('./controllers/auth');

// ✅ SÍ
import authController from '../controllers/authController.js';
```

### ❌ Puertos fijos

```javascript
// ❌ NO
app.listen(3000);

// ✅ Vercel maneja puertos automáticamente
export default handler;
```

### ❌ Archivos grandes

```javascript
// ❌ NO - timeout
const data = fs.readFileSync('large-file.txt');

// ✅ Usa streams o BD
```

### ❌ Long-running tasks

```javascript
// ❌ NO - 10s timeout
setTimeout(() => { ... }, 15000);

// ✅ Usa job queues (Bull, RabbitMQ)
```

## 📊 Monitoreo

En **Vercel Dashboard → Analytics:**

1. **Real-time metrics**
   - Requests
   - Response time
   - Bandwidth

2. **Web Vitals**
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)

3. **Errors**
   - 5xx errors
   - Function errors
   - Build errors

## 💳 Facturación

| Plan | Costo | Incluye |
|------|-------|---------|
| **Free** | $0 | 100 builds/mes, 100GB bandwidth |
| **Pro** | $20/mes | 500 builds/mes, 1TB bandwidth |
| **Enterprise** | Contactar | Unlimited everything |

## 🔗 Links Útiles

```
Dashboard:          https://vercel.com/dashboard
Docs:               https://vercel.com/docs
API Reference:      https://vercel.com/docs/api
Status:             https://vercelstatus.com
Community:          https://github.com/vercel/next.js/discussions
```

## 📌 Comandos más usados

```bash
vercel              # Deploy a staging
vercel --prod       # Deploy a producción
vercel logs         # Ver logs
vercel env list     # Listar variables
vercel remove       # Eliminar deployment
vercel rollback     # Revertir a versión anterior
vercel list         # Listar proyectos
```

---

**Referencia rápida completa para Vercel**
