import { createBrowserClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';

/**
 * Crea un cliente Supabase para uso en el browser (componentes client-side).
 * Maneja cookies automáticamente para sesiones de auth.
 */
export function createSupabaseBrowserClient() {
    const supabaseUrl = env.PUBLIC_SUPABASE_URL;
    const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY ?? env['PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY'];

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase public env vars: PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY');
    }

    return createBrowserClient(supabaseUrl, supabaseKey);
}
