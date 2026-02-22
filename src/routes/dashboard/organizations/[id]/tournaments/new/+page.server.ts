import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return { organizationId: params.id };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user)
			return fail(401, {
				error: 'unauthorized',
				name: '',
				startDate: '',
				endDate: '',
				deadline: ''
			});

		const formData = await request.formData();
		const name = formData.get('name') as string;
		const startDate = formData.get('startDate') as string;
		const endDate = formData.get('endDate') as string;
		const deadline = (formData.get('deadline') as string) || null;

		if (!name?.trim() || !startDate || !endDate) {
			return fail(400, {
				error: 'missing_fields',
				name: name ?? '',
				startDate: startDate ?? '',
				endDate: endDate ?? '',
				deadline: deadline ?? ''
			});
		}

		const { error } = await locals.supabase.from('tournament').insert({
			organization_id: params.id,
			name,
			start_date: startDate,
			end_date: endDate,
			registration_deadline: deadline
		});

		if (error) {
			console.error('Tournament create error:', error);
			return fail(500, { error: 'db_error', name, startDate, endDate, deadline: deadline ?? '' });
		}

		throw redirect(303, `/dashboard/organizations/${params.id}/tournaments`);
	}
};
