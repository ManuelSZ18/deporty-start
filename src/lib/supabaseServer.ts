import { createServerClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Crea un cliente Supabase para uso en el servidor (hooks, +page.server.ts, +server.ts).
 * Maneja cookies automáticamente para sesiones de auth.
 *
 * ⚠️  No almacenar en variables globales — debe crearse por request.
 */
export function createSupabaseServerClient(event: RequestEvent) {
	const supabaseUrl = env.PUBLIC_SUPABASE_URL;
	const supabaseKey =
		env.PUBLIC_SUPABASE_ANON_KEY ?? env['PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY'];

	if (!supabaseUrl || !supabaseKey) {
		throw new Error(
			'Missing Supabase public env vars: PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY'
		);
	}

	return createServerClient(supabaseUrl, supabaseKey, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					try {
						event.cookies.set(name, value, {
							...options,
							path: options?.path ?? '/'
						});
					} catch {
						// Ignorar: cookies.set() después de que la respuesta fue generada
					}
				});
			}
		}
	});
}
