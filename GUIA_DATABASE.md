# Guía de Configuración de Base de Datos para Deporty

## Opción 1: Vercel Postgres (Recomendado para proyectos en Vercel)

### Paso 1: Crear la Base de Datos
1. Ve a tu proyecto en Vercel Dashboard
2. Click en la pestaña **Storage**
3. Click en **Create Database** → **Postgres**
4. Selecciona región: **Washington, D.C., USA (iad1)** 
5. Click **Create**

### Paso 2: Conectar al Proyecto
1. En la página de la base de datos, click **Connect Project**
2. Selecciona tu proyecto `deporty-start`
3. Vercel automáticamente creará estas variables:
   - `POSTGRES_URL` (con pooler) ← **Usa esta para DATABASE_URL**
   - `POSTGRES_URL_NON_POOLING` (sin pooler) ← **Usa esta para DIRECT_URL**
   - `POSTGRES_PRISMA_URL` (optimizada para Prisma)

### Paso 3: Configurar Variables de Entorno
En Vercel Dashboard → Settings → Environment Variables:

```bash
# Opción A: Usar las variables automáticas
DATABASE_URL=$POSTGRES_PRISMA_URL
DIRECT_URL=$POSTGRES_URL_NON_POOLING

# Opción B: Copiar las URLs directamente
DATABASE_URL=postgres://default:xxx@xxx-pooler.postgres.vercel-storage.com:5432/verceldb
DIRECT_URL=postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb
```

### Paso 4: Local Development
Crea/actualiza tu `.env`:

```bash
# Copia las URLs desde Vercel Dashboard → Storage → .env.local tab
DATABASE_URL="postgres://default:xxx@xxx-pooler.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
DIRECT_URL="postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb?sslmode=require"
```

---

## Opción 2: Neon (Mejor para escalabilidad y precio)

### Paso 1: Crear cuenta y proyecto
1. Ve a [neon.tech](https://neon.tech)
2. Sign up/Login con GitHub
3. Click **New Project**
4. Nombre: `deporty`
5. Región: **US East (Ohio)** (más cercana a iad1)
6. Postgres version: **16** (la más reciente)
7. Click **Create Project**

### Paso 2: Obtener Connection Strings
En el Dashboard de Neon, verás:

```bash
# Connection String (con pooler)
postgres://user:pass@ep-xxx.us-east-2.aws.neon.tech/deporty?sslmode=require

# Para obtener la URL con pooler, agrega parámetro:
postgres://user:pass@ep-xxx.us-east-2.aws.neon.tech/deporty?sslmode=require&pgbouncer=true&connection_limit=1
```

### Paso 3: Configurar en Vercel
Vercel Dashboard → Settings → Environment Variables:

```bash
DATABASE_URL=postgres://user:pass@ep-xxx.us-east-2.aws.neon.tech/deporty?sslmode=require&pgbouncer=true&connection_limit=1

DIRECT_URL=postgres://user:pass@ep-xxx.us-east-2.aws.neon.tech/deporty?sslmode=require
```

### Paso 4: Local Development (.env)
```bash
DATABASE_URL="postgres://user:pass@ep-xxx.us-east-2.aws.neon.tech/deporty?sslmode=require&pgbouncer=true&connection_limit=1"
DIRECT_URL="postgres://user:pass@ep-xxx.us-east-2.aws.neon.tech/deporty?sslmode=require"
```

---

## 🚀 Ejecutar Migraciones

### Desarrollo (Local)
```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# Ver base de datos
npx prisma studio
```

### Producción (Vercel)
Las migraciones se ejecutan automáticamente en el build gracias a:
```json
// vercel.json
{
  "buildCommand": "prisma generate && next build"
}
```

Si necesitas ejecutar migraciones manualmente en producción:
```bash
# Desde tu terminal local
npx prisma migrate deploy
```

---

## 📊 Comparación Rápida

| Característica | Vercel Postgres | Neon |
|---------------|----------------|------|
| **Integración** | ⭐⭐⭐ Perfecta | ⭐⭐ Buena |
| **Precio Free Tier** | 256 MB | 512 MB |
| **Escalabilidad** | ⭐⭐ Media | ⭐⭐⭐ Excelente |
| **Latencia con Vercel** | ⭐⭐⭐ Mínima | ⭐⭐ Baja |
| **Auto-scaling** | ❌ No | ✅ Sí |
| **Branching** | ❌ No | ✅ Sí |

**Recomendación:** 
- **Vercel Postgres** si quieres simplicidad y mínima latencia
- **Neon** si necesitas más espacio, branching, o planeas escalar

---

## ✅ Verificar Configuración

Una vez configurado, verifica con:

```bash
# Test de conexión
npx prisma db pull

# Ver datos
npx prisma studio
```

## 🆘 Troubleshooting

### Error: "Too many connections"
- ✅ Verifica que uses URL con pooler
- ✅ Asegúrate de tener `connection_limit=1` en DATABASE_URL
- ✅ Revisa que `lib/prisma.js` use el singleton pattern

### Error: "Can't reach database server"
- ✅ Verifica que la URL tenga `?sslmode=require`
- ✅ Confirma que las credenciales sean correctas
- ✅ Checa que la región esté accesible

---

¿Qué opción prefieres configurar? Puedo ayudarte paso a paso.
