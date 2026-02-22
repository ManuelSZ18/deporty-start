import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * Auth callback handler.
 * Supabase redirige aquí después de:
 * - Confirmación de email
 * - Reset de contraseña
 * - OAuth (Google, etc.)
 *
 * Extrae el code del query string y lo intercambia por una sesión.
 */
export const GET: RequestHandler = async ({ url, locals }) => {
	const code = url.searchParams.get('code');
	const type = url.searchParams.get('type');

	if (code) {
		const { error } = await locals.supabase.auth.exchangeCodeForSession(code);

		if (error) {
			console.error('Auth callback error:', error.message);
			throw redirect(303, '/login?error=callback_failed');
		}
	}

	// Redirigir según el tipo de callback
	if (type === 'recovery') {
		// TODO: redirigir a página de cambiar contraseña
		throw redirect(303, '/dashboard');
	}

	throw redirect(303, '/dashboard');
};
