import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { session, user } = await locals.safeGetSession();

	// Proteger todas las rutas /dashboard/*
	if (!session || !user) {
		redirect(303, '/login');
	}

	return {
		session,
		user
	};
};
