-- 1. Añade la columna 'sports' tipo array de texto a la tabla profile
ALTER TABLE public.profile ADD COLUMN IF NOT EXISTS sports text[] DEFAULT '{}';
