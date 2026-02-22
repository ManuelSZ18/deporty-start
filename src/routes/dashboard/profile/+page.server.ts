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

		// Update user_metadata in Supabase Auth to keep session in sync
		const { error: authError } = await locals.supabase.auth.updateUser({
			data: {
				first_name: firstName,
				last_name: lastName,
				nickname
			}
		});

		if (authError) {
			console.error('Auth metadata update error:', authError);
			// We continue even if this fails, to not block the main profile update,
			// but in an ideal scenario this should be an all-or-nothing transaction.
		}

		const { error: profileError } = await locals.supabase
			.from('profile')
			.update({
				first_name: firstName,
				last_name: lastName,
				nickname,
				birth_date: birthDate,
				updated_at: new Date().toISOString()
			})
			.eq('profile_id', user.id);

		if (profileError) {
			console.error('Profile update error:', profileError);
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
