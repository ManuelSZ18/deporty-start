# Deporty

Aplicación de eventos deportivos construida con Next.js 14.

## Tecnologías

- **Next.js 14** - Framework React
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos (Neon.tech)
- **Vercel** - Deployment

## Inicio Rápido

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu DATABASE_URL

# Ejecutar migraciones
npx prisma migrate dev

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run start    # Servidor producción
npm run lint     # Linter
```

## Estructura

```
deporty-start/
├── app/          # Páginas y componentes
├── prisma/       # Esquema de base de datos
├── public/       # Assets estáticos
└── lib/          # Utilidades
```

## Deployment

El proyecto está configurado para deployment automático en Vercel.

```bash
git push origin main
```
