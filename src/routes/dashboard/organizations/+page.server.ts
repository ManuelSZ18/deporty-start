import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { supabase } = locals;
	const { user } = await locals.safeGetSession();

	// Ya sabemos que hay usuario gracias al guard en +layout.server.ts (o debería estar)
	// Pero por seguridad usamos user?.id
	if (!user) return { organizations: [] };

	const { data: organizations, error } = await supabase
		.from('organization')
		.select('*')
		.eq('owner_id', user.id)
		.is('deleted_at', null)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Error fetching organizations:', error);
		return { organizations: [] };
	}

	return {
		organizations: organizations || []
	};
};
