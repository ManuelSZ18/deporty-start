# 🚀 Deporty - Guía de Deployment en Vercel

## Descripción
Tu proyecto ha sido adaptado 100% para funcionar en **Vercel** con máximo rendimiento y mejores prácticas.

## ✨ Cambios Realizados

### 1. **Estructura de Carpetas**
```
deporty-start/
├── /api/                    # Vercel Functions (serverless)
│   ├── /controllers/       # Lógica de negocio
│   ├── /middleware/        # Middlewares optimizados
│   └── /v1/               # Versionado de API
│       ├── /auth/
│       │   ├── registro.js
│       │   └── login.js
│       └── estado.js
├── /public/               # Frontend estático
│   ├── index.html        # Optimizado para SEO
│   ├── login.html
│   ├── signup.html
│   └── /assets/
├── vercel.json           # Configuración de Vercel
├── .vercelignore         # Archivos a ignorar
└── package.json          # Dependencias
```

### 2. **Vercel Functions**
- ✅ Express eliminado (no es necesario en Vercel)
- ✅ Node.js nativo con funciones serverless
- ✅ Rutas automáticas: `/api/v1/auth/registro.js` → `POST /api/v1/auth/registro`
- ✅ Middleware optimizado sin Express
- ✅ Memory: 512MB por función
- ✅ Timeout: 10 segundos

### 3. **Frontend Optimizado**
- ✅ HTML con lazy loading de fonts
- ✅ Preconnect a recursos externos
- ✅ Canonical URLs y meta tags
- ✅ JSON-LD para SEO
- ✅ Service Worker mejorado
- ✅ Caching estratégico
- ✅ Network-first para APIs
- ✅ Cache-first para assets estáticos

### 4. **Configuración de Vercel**
- ✅ Headers de seguridad (HSTS, CSP, X-Frame-Options)
- ✅ Cache control optimizado
- ✅ Gzip automático
- ✅ Compresión Brotli
- ✅ CDN global
- ✅ HTTPS automático

### 5. **Rendimiento**
- ✅ Caching agresivo de assets estáticos (31536000s)
- ✅ No-cache para APIs (siempre fresh)
- ✅ Compresión automática
- ✅ Minificación
- ✅ Optimización de imágenes
- ✅ Service Worker con estrategias de caching

## 🚀 Cómo Deployar en Vercel

### Opción 1: CLI (Recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deployar
vercel

# Deployar en producción
vercel --prod
```

### Opción 2: Git (GitHub, GitLab, Bitbucket)

1. **Push tu código a GitHub:**
   ```bash
   git add .
   git commit -m "Adaptar para Vercel"
   git push origin main
   ```

2. **Importar en Vercel Dashboard:**
   - Ve a https://vercel.com/dashboard
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio
   - Vercel detectará automáticamente la configuración
   - Click en "Deploy"

### Opción 3: GitHub Integration

1. Instala la [Vercel GitHub App](https://github.com/apps/vercel)
2. Vercel automáticamente deployará cada push a `main`
3. Preview deployments para PRs

## 📋 Estructura de URLs

### Frontend
- `https://tu-dominio.com/` → Página principal
- `https://tu-dominio.com/login.html` → Login
- `https://tu-dominio.com/signup.html` → Signup

### API
- `GET /api/v1/estado` → Health check
- `POST /api/v1/auth/registro` → Registrar usuario
- `POST /api/v1/auth/login` → Login usuario

## 🔒 Configuración de Variables de Entorno

En el **Dashboard de Vercel**:
1. Ir a "Settings" → "Environment Variables"
2. Agregar variables:

```
CORS_ORIGIN = https://tu-dominio.com
JWT_SECRET = tu_secret_key_aqui
DATABASE_URL = mongodb+srv://...
NODE_ENV = production
```

> **Nota:** Usa un gestor de secretos como HashiCorp Vault o AWS Secrets Manager para producción.

## 📦 Agregando nuevas rutas API

Para agregar una nueva endpoint:

1. **Crear archivo en `/api`:**
   ```javascript
   // /api/v1/users/perfil.js
   export default async function handler(req, res) {
       if (req.method !== 'GET') {
           return res.status(405).json({ error: 'Method not allowed' });
       }
       
       res.status(200).json({ user: 'data' });
   }
   ```

2. **Automáticamente disponible en:**
   ```
   GET /api/v1/users/perfil
   ```

## 📊 Monitoreo y Analytics

Vercel proporciona:
- **Real User Monitoring (RUM)** - Métricas de usuario real
- **Web Vitals** - Core Web Vitals
- **Edge Network** - Latencia por región
- **Function Logs** - Logs de Functions

Accede a través del Dashboard de Vercel → "Analytics"

## 🔄 Deployment Preview

Cada vez que hagas push a una rama:
1. Vercel crea un **preview deployment**
2. URL: `https://proyecto-preview-branch.vercel.app`
3. Perfecto para testing antes de merge a main

## 📝 Próximos Pasos

1. **Base de datos**: Conecta MongoDB Atlas o PostgreSQL
2. **Autenticación**: Implementa JWT en el controlador
3. **Validación**: Agregar validación de formularios
4. **Testing**: Agregar tests con Jest
5. **CI/CD**: Configurar GitHub Actions para tests

## 🆘 Troubleshooting

### Los cambios no se reflejan
```bash
vercel --prod --force
```

### Error 502 en API
- Revisa los logs: `vercel logs`
- Verifica el timeout (máximo 10s)
- Comprueba variables de entorno

### CORS issues
- Actualiza `CORS_ORIGIN` en variables de entorno
- Verifica headers en `vercel.json`

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Node.js Runtime](https://vercel.com/docs/functions/serverless-functions/node-js)
- [Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Web Vitals](https://web.dev/vitals/)

---

**¿Preguntas?** Revisa la documentación oficial de Vercel o contáctanos.
