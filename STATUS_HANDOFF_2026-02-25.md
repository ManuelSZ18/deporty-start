# Estado del proyecto — 2026-02-25 (handoff para continuar mañana)

## 1) Estado actual (confirmado hoy)

- Rama: `main`
- Repo limpio y sincronizado con remoto (`origin/main`).
- Últimos commits relevantes:
  - `5a9851f` — chore: ignore local diagnostic and temporary artifacts
  - `9d56fe4` — feat: stabilize i18n, dashboard calendar, sports save flow, and local supabase migrations
  - `f2d0d65` — feat: Implementación completa de Calendario Deportivo
- Salud técnica actual:
  - `npm run check` ✅ (0 errores, 0 warnings)
  - `npm run lint` ✅
  - `npm run test` ✅ (39/39)

## 2) Lo más importante para producción

### Runtime / deploy

- Framework: SvelteKit + adapter Vercel (`svelte.config.js`).
- Node requerido: `>=20` (definido en `package.json`).

### Variables de entorno obligatorias

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

Notas:

- El cliente también acepta fallback `PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`.
- Cuidado con `.env.local`: en local tiene prioridad y puede apuntar a Supabase local en vez de remoto.
- En producción (Vercel), definir variables en Project Settings > Environment Variables.

### Auth en Supabase (Google + callback)

Configurar en Supabase Auth:

- `Site URL`: dominio real de producción (ej. `https://tu-dominio.vercel.app`).
- Redirect URLs:
  - `https://tu-dominio.vercel.app/auth/callback`
  - `http://localhost:5173/auth/callback` (solo dev)

## 3) Base de datos: requisito crítico para que funcione Deportes

Se confirmó que el guardado de deportes depende de que exista `profile.sports` (tipo `text[]`).

### Migraciones relevantes (ordenadas)

En `supabase/migrations/` existen:

1. `20260222024620_remote_schema.sql`
2. `20260222223122_add_avatar_storage.sql`
3. `20260225153000_add_calendar_events.sql`
4. `20260226013029_add_departments.sql`
5. `20260226021000_add_missing_latam_countries.sql`
6. `20260226040000_seed_latam_states_cities.sql`
7. `20260226043000_add_profile_sports_column.sql` ← crítica
8. `20260226050000_seed_default_sports.sql` ← crítica

### Checklist mínimo de producción DB

- Aplicar TODAS las migraciones pendientes al proyecto remoto.
- Verificar que la tabla `profile` tenga columna `sports text[] not null default '{}'`.
- Verificar datos en tabla `sport` (seed de deportes por defecto).
- Verificar políticas RLS para permitir `UPDATE profile` del usuario autenticado sobre su propio `profile_id`.

## 4) Funcionalidad reciente implementada (resumen)

- Correcciones i18n ES/PT para claves faltantes en dashboard/sports/calendario/sidebar.
- Opción de navegación a `Calendario deportivo` en dashboard.
- Calendario deportivo con selección dinámica de deportes y default de Natación (si existe; fallback al primero).
- Ajustes de flujo de registro/login y mejoras de estabilidad en tests.
- Ajustes de tooling (`vitest`, `lint`, etc.) para mantener CI local en verde.

## 5) Comandos útiles para retomar mañana

- Desarrollo: `npm run dev`
- Calidad: `npm run check && npm run lint && npm run test`
- Supabase local (si se usa):
  - `npx supabase start`
  - `npx supabase migration up --local`

## 6) Riesgos / puntos de atención

- Principal riesgo: confundir entorno local vs remoto de Supabase.
  - Síntoma típico: errores `PGRST204` por columna no encontrada en schema cache.
- Si reaparece el problema en producción:
  1. confirmar URL/keys del entorno activo,
  2. confirmar migración `add_profile_sports_column` aplicada en remoto,
  3. revisar RLS de `profile`.

## 7) Estado para continuar

- Base de código estable y validada hoy.
- Próximo paso recomendado mañana (si vas a deploy):
  1. aplicar migraciones en Supabase remoto,
  2. validar flujo real: Login → Dashboard → Mis Deportes → Guardar,
  3. desplegar en Vercel con env vars correctas.
