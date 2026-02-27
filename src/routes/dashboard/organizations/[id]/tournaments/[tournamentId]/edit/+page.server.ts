import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { normalizeToIsoDate } from '$lib/utils/dateUtils';

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
		const startDateInput = formData.get('startDate') as string;
		const endDateInput = formData.get('endDate') as string;
		const deadlineInput = (formData.get('deadline') as string) || null;

		const startDate = normalizeToIsoDate(startDateInput);
		const endDate = normalizeToIsoDate(endDateInput);
		const deadlineDatePart = deadlineInput ? deadlineInput.split('T')[0] : null;
		const normalizedDeadlineDate = deadlineDatePart ? normalizeToIsoDate(deadlineDatePart) : null;
		const deadline = deadlineInput
			? deadlineInput.includes('T')
				? deadlineInput
				: normalizedDeadlineDate
			: null;

		if (!name?.trim() || !startDateInput || !endDateInput) {
			return fail(400, {
				error: 'missing_fields',
				name: name ?? '',
				startDate: startDateInput ?? '',
				endDate: endDateInput ?? '',
				deadline: deadlineInput ?? ''
			});
		}

		if (!startDate || !endDate || (deadlineInput && !normalizedDeadlineDate)) {
			return fail(400, {
				error: 'invalid_dates',
				name: name ?? '',
				startDate: startDateInput ?? '',
				endDate: endDateInput ?? '',
				deadline: deadlineInput ?? ''
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
