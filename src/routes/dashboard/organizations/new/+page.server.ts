import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		const { supabase } = locals;
		const { user } = await locals.safeGetSession();

		if (!user) {
			return fail(401, { error: 'unauthorized', name: undefined, description: undefined });
		}

		if (!name || name.trim().length === 0) {
			return fail(400, { error: 'missing_name', name, description });
		}

		const { error } = await supabase.from('organization').insert({
			name,
			description,
			owner_id: user.id
		});

		if (error) {
			console.error('Error creating organization:', error);
			return fail(500, { error: 'db_error', name, description });
		}

		throw redirect(303, '/dashboard/organizations');
	}
};
