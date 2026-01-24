# 🚀 Guía de Configuración de Base de Datos - Deporty

## 📋 Requisitos

✅ Tienes Prisma instalado  
✅ Tienes PostgreSQL configurado  
✅ Variables de entorno configuradas

---

## 🔧 Paso 1: Configurar Base de Datos PostgreSQL

### Opción A: Usar Neon.tech (Recomendado - Gratuito)

1. Ve a [neon.tech](https://neon.tech)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto PostgreSQL
4. Copia la **Connection String** (DATABASE_URL)
5. Pega en `.env.local`:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

### Opción B: Usar Vercel Postgres

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto `deporty-start`
3. Ve a `Storage` → `Create Database` → `Postgres`
4. Copia la `DATABASE_URL`
5. Pega en `.env.local`

### Opción C: PostgreSQL Local (para desarrollo)

```bash
# Instalar PostgreSQL (macOS)
brew install postgresql@15

# Instalar PostgreSQL (Ubuntu/Debian)
sudo apt-get install postgresql

# Crear base de datos local
createdb deporty_db

# Tu DATABASE_URL será:
# postgresql://postgres:password@localhost:5432/deporty_db
```

---

## 🗂️ Paso 2: Aplicar Migraciones

Una vez tengas `DATABASE_URL` en `.env.local`, ejecuta:

```bash
# Crear y ejecutar migración (desarrollo)
npx prisma migrate dev --name init

# O solo aplicar en producción sin generar nueva migración
npx prisma migrate deploy
```

Esto:
✅ Crea las tablas en tu base de datos  
✅ Genera el cliente Prisma  
✅ Crea archivos de migración versionados  

---

## 🧪 Paso 3: Probar la Base de Datos

### Opción A: Prisma Studio (Visual)

```bash
# Abre interfaz visual para administrar BD
npx prisma studio
```

Luego abre `http://localhost:5555` en tu navegador.

### Opción B: CLI (Línea de comandos)

```bash
# Conectar a Prisma REPL
npx prisma db execute --stdin < test.sql
```

---

## 🚀 Paso 4: Probar API de Registro

```bash
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "nombre": "Juan Pérez",
    "password": "miPassword123"
  }'
```

**Respuesta esperada:**
```json
{
  "status": "success",
  "message": "✅ Usuario registrado exitosamente",
  "data": {
    "id": 1,
    "email": "usuario@example.com",
    "nombre": "Juan Pérez"
  }
}
```

---

## 🔑 Paso 5: Probar API de Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "miPassword123"
  }'
```

**Respuesta esperada:**
```json
{
  "status": "success",
  "message": "✅ Login exitoso",
  "usuario": {
    "id": 1,
    "email": "usuario@example.com",
    "nombre": "Juan Pérez"
  }
}
```

---

## 📊 Ver Datos en la Base de Datos

```bash
# Abrir Prisma Studio
npx prisma studio

# O conectar directamente con psql
psql postgresql://user:password@host:5432/database
```

En Prisma Studio puedes:
- ✅ Ver todos los usuarios registrados
- ✅ Crear nuevos usuarios
- ✅ Editar usuarios
- ✅ Eliminar usuarios

---

## 🚨 Solucionar Problemas

### Error: "ECONNREFUSED" o "Database connection error"

**Solución:** Verifica que tu `DATABASE_URL` sea correcta:

```bash
# Probar conexión
psql $DATABASE_URL
```

### Error: "P1002" - El servidor de BD no está disponible

**Solución:** 
- Verifica que el host/puerto son correctos
- Verifica que tu firewall permite conexiones
- Reinicia el servicio de PostgreSQL

### Error: "relation \"Usuario\" does not exist"

**Solución:** Ejecuta las migraciones:

```bash
npx prisma migrate dev --name init
```

---

## 🔐 Paso 6: Deploy a Vercel

Una vez todo funciona localmente:

```bash
# Commit cambios
git add -A
git commit -m "feat: Configurar base de datos"

# Push a GitHub
git push origin main

# Vercel auto-deploy o manual
vercel --prod
```

Vercel detectará automáticamente:
- ✅ `prisma/schema.prisma`
- ✅ Ejecutará migraciones automáticamente
- ✅ Configurará las variables de entorno

---

## 📝 Siguientes Pasos

- [ ] Configurar JWT para autenticación
- [ ] Agregar sesiones con NextAuth
- [ ] Crear dashboard privado
- [ ] Agregar más modelos (Eventos, Deportistas, etc.)

---

## 💡 Preguntas Frecuentes

**¿Cómo cambio de base de datos?**
Simplemente actualiza `DATABASE_URL` en `.env.local` y Prisma se conectará a la nueva BD.

**¿Puedo usar MySQL en lugar de PostgreSQL?**
Sí, cambia en `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

**¿Se sincroniza automáticamente con Vercel?**
Sí, Vercel ejecuta `prisma migrate deploy` automáticamente en cada deploy.

---

¡Listo! Tu base de datos está configurada. 🎉
