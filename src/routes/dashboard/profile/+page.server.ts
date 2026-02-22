import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { user } = await locals.safeGetSession();

	if (!user) {
		return { profile: null };
	}

	const { data: profile } = await locals.supabase
		.from('profile')
		.select('*')
		.eq('profile_id', user.id)
		.single();

	return {
		profile
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user)
			return fail(401, {
				error: 'unauthorized',
				firstName: '',
				lastName: '',
				nickname: '',
				birthDate: ''
			});

		const formData = await request.formData();
		const firstName = formData.get('firstName') as string;
		const lastName = formData.get('lastName') as string;
		const nickname = (formData.get('nickname') as string)?.trim() || null;
		const birthDate = formData.get('birthDate') as string;

		if (!firstName || !lastName || !birthDate) {
			return fail(400, {
				error: 'missing_fields',
				firstName: firstName ?? '',
				lastName: lastName ?? '',
				nickname: nickname ?? '',
				birthDate: birthDate ?? ''
			});
		}

		const { error } = await locals.supabase
			.from('profile')
			.update({
				first_name: firstName,
				last_name: lastName,
				nickname,
				birth_date: birthDate,
				updated_at: new Date().toISOString()
			})
			.eq('profile_id', user.id);

		if (error) {
			console.error('Profile update error:', error);
			return fail(500, {
				error: 'update_error',
				firstName,
				lastName,
				nickname: nickname ?? '',
				birthDate
			});
		}

		return { success: true };
	}
};
