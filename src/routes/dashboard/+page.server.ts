import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// La autenticación ya se verifica en +layout.server.ts
	const { user } = await locals.safeGetSession();

	// Obtener profile del usuario
	const { data: profile } = await locals.supabase
		.from('profile')
		.select('*')
		.eq('profile_id', user!.id)
		.single();

	return {
		profile
	};
};
