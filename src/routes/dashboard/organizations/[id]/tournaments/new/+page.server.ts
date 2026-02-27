import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { normalizeToIsoDate } from '$lib/utils/dateUtils';

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
