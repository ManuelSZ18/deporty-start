import { createSupabaseServerClient } from '$lib/supabaseServer';
import type { Handle } from '@sveltejs/kit';

/**
 * Hook principal del servidor.
 * Se ejecuta en CADA request antes de llegar a la ruta.
 *
 * Responsabilidades:
 * 1. Crear el cliente Supabase server-side (per-request, no singleton)
 * 2. Proveer safeGetSession() para obtener sesión validada
 * 3. Adjuntar ambos a event.locals para uso en +page.server.ts, +server.ts, etc.
 */
export const handle: Handle = async ({ event, resolve }) => {
	// 1. Crear Supabase server client para este request
	event.locals.supabase = createSupabaseServerClient(event);

	// 2. Proveer helper seguro para obtener sesión
	//    Usa getUser() que valida el JWT contra Supabase Auth,
	//    a diferencia de getSession() que solo lee cookies (spoofeable).
	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();

		if (!session) {
			return { session: null, user: null };
		}

		// Validar el usuario con el servidor (seguro, no spoofeable)
		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();

		if (error) {
			return { session: null, user: null };
		}

		return { session, user };
	};

	// 3. Resolver la ruta e Inyectar Cabeceras de Seguridad
	const response = await resolve(event, {
		filterSerializedResponseHeaders(name) {
			// Supabase necesita pasar content-range para paginación
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});

	// Si SvelteKit resuelve un 404 (Not Found)
	if (response.status === 404) {
		const { user } = await event.locals.safeGetSession();
		// Si el usuario está activo, mandarlo automáticamente a su panel de control en lugar del Error 404 o el Landing Page
		if (user) {
			return new Response(null, {
				status: 303,
				headers: { location: '/dashboard' }
			});
		}
	}

	// Inyectar Security Headers requeridos
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	response.headers.set('X-XSS-Protection', '1; mode=block');

	return response;
};
