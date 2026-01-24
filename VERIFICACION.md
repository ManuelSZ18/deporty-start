# 🔍 Verificación de Configuración en Vercel

## Endpoint de Health Check

He creado un endpoint para verificar que todo está correctamente configurado en Vercel.

### 📍 URL del Endpoint

**Local:**
```
http://localhost:3000/api/health
```

**Producción (después del despliegue):**
```
https://tu-proyecto.vercel.app/api/health
```

---

## ✅ Cómo Verificar

### 1. Espera a que termine el despliegue en Vercel
Ve a tu dashboard de Vercel y espera a que el deployment tenga el status "Ready".

### 2. Abre el endpoint en tu navegador
```
https://deporty-start.vercel.app/api/health
```

O usa curl desde tu terminal:
```bash
curl https://deporty-start.vercel.app/api/health
```

---

## 📊 Respuesta Esperada (TODO OK)

Si todo está bien configurado, verás algo como:

```json
{
  "status": "ok",
  "timestamp": "2026-01-24T...",
  "database": {
    "connected": true,
    "userCount": 0,
    "host": "ep-falling-forest-ahgfh1ib-pooler.c-3.us-east-1.aws.neon.tech"
  },
  "environment": {
    "nodeEnv": "production",
    "hasDirectUrl": true,
    "hasDatabaseUrl": true
  },
  "region": "iad1",
  "deployment": {
    "vercel": true,
    "url": "deporty-start-xxx.vercel.app"
  }
}
```

### ✅ Indicadores de éxito:
- `status: "ok"` ✓
- `database.connected: true` ✓
- `database.host` contiene `-pooler` ✓
- `environment.hasDirectUrl: true` ✓
- `environment.hasDatabaseUrl: true` ✓
- `region: "iad1"` ✓

---

## ❌ Respuesta de Error (Algo está mal)

Si hay algún problema, verás:

```json
{
  "status": "error",
  "timestamp": "2026-01-24T...",
  "error": {
    "message": "Can't reach database server...",
    "code": "P1001",
    "type": "PrismaClientInitializationError"
  },
  "environment": {
    "nodeEnv": "production",
    "hasDirectUrl": false,
    "hasDatabaseUrl": false
  },
  "hints": [
    "DATABASE_URL no está configurada"
  ]
}
```

### 🔧 Soluciones según el error:

| Error | Solución |
|-------|----------|
| `DATABASE_URL no está configurada` | Agregar la variable en Vercel Settings |
| `DATABASE_URL no usa connection pooler` | Verificar que la URL contenga `-pooler` |
| `Can't reach database server (P1001)` | Verificar credenciales y región de Neon |
| `hasDirectUrl: false` | Agregar DIRECT_URL en Vercel |

---

## 🛠️ Checklist de Verificación

Una vez desplegado, verifica:

- [ ] El endpoint responde (status 200)
- [ ] `status: "ok"`
- [ ] `database.connected: true`
- [ ] El host contiene `-pooler`
- [ ] `region` es `iad1`
- [ ] `userCount` es 0 (o el número de usuarios que tengas)

---

## 🚀 Próximos Pasos

Una vez que el health check pase:

1. **Crea tu primer usuario** con Prisma Studio o una API
2. **Desarrolla la autenticación** (NextAuth.js recomendado)
3. **Construye tu UI** para gestión deportiva

---

**Tip:** Guarda este endpoint en tus favoritos para hacer health checks rápidos después de cada despliegue.
