import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session, user } = await locals.safeGetSession();

	// Proteger todas las rutas /dashboard/*
	if (!session || !user) {
		redirect(303, '/login');
	}

	// Obtener el perfil siempre fresco desde la base de datos
	const { data: profile } = await locals.supabase
		.from('profile')
		.select('*')
		.eq('profile_id', user.id)
		.single();

	return {
		session,
		user,
		profile
	};
};
