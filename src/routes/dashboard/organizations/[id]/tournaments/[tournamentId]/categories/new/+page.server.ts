import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return { organizationId: params.id, tournamentId: params.tournamentId };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user)
			return fail(401, {
				error: 'unauthorized',
				name: '',
				gender: '',
				minAge: '',
				maxAge: '',
				cost: ''
			});

		const formData = await request.formData();
		const name = formData.get('name') as string;
		const gender = formData.get('gender') as string;
		const minAge = (formData.get('minAge') as string) || null;
		const maxAge = (formData.get('maxAge') as string) || null;
		const cost = (formData.get('cost') as string) || '0';

		if (!name?.trim() || !gender) {
			return fail(400, {
				error: 'missing_fields',
				name: name ?? '',
				gender: gender ?? '',
				minAge: minAge ?? '',
				maxAge: maxAge ?? '',
				cost
			});
		}

		const { error } = await locals.supabase.from('category').insert({
			tournament_id: params.tournamentId,
			name,
			gender,
			min_age: minAge ? parseInt(minAge) : null,
			max_age: maxAge ? parseInt(maxAge) : null,
			cost: parseFloat(cost) || 0
		});

		if (error) {
			console.error('Category create error:', error);
			return fail(500, {
				error: 'db_error',
				name,
				gender,
				minAge: minAge ?? '',
				maxAge: maxAge ?? '',
				cost
			});
		}

		redirect(303, `/dashboard/organizations/${params.id}/tournaments/${params.tournamentId}`);
	}
};
