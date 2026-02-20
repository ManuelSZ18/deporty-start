import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { user } = await locals.safeGetSession();
	if (!user) throw error(401, 'Unauthorized');

	const { data: tournament, error: tError } = await locals.supabase
		.from('tournament')
		.select('*')
		.eq('tournament_id', params.tournamentId)
		.is('deleted_at', null)
		.single();

	if (tError || !tournament) throw error(404, 'Tournament not found');

	return { tournament, organizationId: params.id };
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

		const { error: updateErr } = await locals.supabase
			.from('tournament')
			.update({
				name,
				start_date: startDate,
				end_date: endDate,
				registration_deadline: deadline,
				updated_at: new Date().toISOString()
			})
			.eq('tournament_id', params.tournamentId);

		if (updateErr) {
			console.error('Tournament update error:', updateErr);
			return fail(500, { error: 'db_error', name, startDate, endDate, deadline: deadline ?? '' });
		}

		redirect(303, `/dashboard/organizations/${params.id}/tournaments/${params.tournamentId}`);
	}
};
