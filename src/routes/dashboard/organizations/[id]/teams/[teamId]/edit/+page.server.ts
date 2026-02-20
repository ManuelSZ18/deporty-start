import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { user } = await locals.safeGetSession();
	if (!user) throw error(401, 'Unauthorized');

	const { data: team, error: teamError } = await locals.supabase
		.from('team')
		.select('*')
		.eq('team_id', params.teamId)
		.eq('organization_id', params.id)
		.is('deleted_at', null)
		.single();

	if (teamError || !team) {
		throw error(404, 'Team not found');
	}

	const { data: sports } = await locals.supabase
		.from('sport')
		.select('*')
		.is('deleted_at', null)
		.order('name');

	return { team, sports: sports || [] };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user) return fail(401, { error: 'unauthorized', name: '', sportId: '', category: '' });

		const formData = await request.formData();
		const name = formData.get('name') as string;
		const sportId = formData.get('sportId') as string;
		const category = (formData.get('category') as string) || null;

		if (!name?.trim()) {
			return fail(400, {
				error: 'missing_name',
				name: name ?? '',
				sportId: sportId ?? '',
				category: category ?? ''
			});
		}

		const { error: updateError } = await locals.supabase
			.from('team')
			.update({
				name,
				sport_id: sportId || null,
				category,
				updated_at: new Date().toISOString()
			})
			.eq('team_id', params.teamId);

		if (updateError) {
			console.error('Team update error:', updateError);
			return fail(500, {
				error: 'db_error',
				name,
				sportId: sportId ?? '',
				category: category ?? ''
			});
		}

		redirect(303, `/dashboard/organizations/${params.id}`);
	}
};
