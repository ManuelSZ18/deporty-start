import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { user } = await locals.safeGetSession();
	if (!user) throw error(401, 'Unauthorized');

	// Fetch tournament
	const { data: tournament, error: tError } = await locals.supabase
		.from('tournament')
		.select('*')
		.eq('tournament_id', params.tournamentId)
		.eq('organization_id', params.id)
		.is('deleted_at', null)
		.single();

	if (tError || !tournament) {
		throw error(404, 'Tournament not found');
	}

	// Fetch categories for this tournament
	const { data: categories } = await locals.supabase
		.from('category')
		.select('*')
		.eq('tournament_id', params.tournamentId)
		.is('deleted_at', null)
		.order('name');

	// Check if user is owner of the organization
	const { data: org } = await locals.supabase
		.from('organization')
		.select('owner_id')
		.eq('organization_id', params.id)
		.single();

	return {
		tournament,
		categories: categories || [],
		organizationId: params.id,
		isOwner: org?.owner_id === user.id
	};
};

export const actions: Actions = {
	deleteTournament: async ({ params, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user) return fail(401, { error: 'unauthorized' });

		const { error: delError } = await locals.supabase
			.from('tournament')
			.update({ deleted_at: new Date().toISOString() })
			.eq('tournament_id', params.tournamentId);

		if (delError) {
			console.error('Tournament delete error:', delError);
			return fail(500, { error: 'delete_error' });
		}

		redirect(303, `/dashboard/organizations/${params.id}/tournaments`);
	},

	deleteCategory: async ({ request, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user) return fail(401, { error: 'unauthorized' });

		const formData = await request.formData();
		const categoryId = formData.get('categoryId') as string;

		const { error: delError } = await locals.supabase
			.from('category')
			.update({ deleted_at: new Date().toISOString() })
			.eq('category_id', categoryId);

		if (delError) {
			console.error('Category delete error:', delError);
			return fail(500, { error: 'delete_error' });
		}

		return { categoryDeleted: true };
	}
};
