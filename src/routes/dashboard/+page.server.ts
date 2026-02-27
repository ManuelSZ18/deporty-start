import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// La autenticación ya se verifica en +layout.server.ts
	const { user } = await locals.safeGetSession();

	if (!user) {
		return { profile: null, userSports: [] };
	}

	// Obtener profile del usuario
	const { data: profile } = await locals.supabase
		.from('profile')
		.select('*')
		.eq('profile_id', user.id)
		.single();

	// Obtener los deportes del usuario desde la tabla relacional con el nombre
	const { data: userSportsData } = await locals.supabase
		.from('profile_sport')
		.select('sport_id, sport:sport_id(name)')
		.eq('profile_id', user.id);

	const userSports = (userSportsData ?? []).map((row: any) => ({
		sport_id: row.sport_id,
		name: row.sport?.name ?? 'Deporte'
	}));

	return {
		profile,
		userSports
	};
};
