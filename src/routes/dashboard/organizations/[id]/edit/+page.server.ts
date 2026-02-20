import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { user } = await locals.safeGetSession();
	if (!user) throw error(401, 'Unauthorized');

	const { data: organization, error: orgError } = await locals.supabase
		.from('organization')
		.select('*')
		.eq('organization_id', params.id)
		.eq('owner_id', user.id)
		.is('deleted_at', null)
		.single();

	if (orgError || !organization) {
		throw error(404, 'Organization not found');
	}

	return { organization };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user) return fail(401, { error: 'unauthorized', name: '', description: '' });

		const formData = await request.formData();
		const name = formData.get('name') as string;
		const description = (formData.get('description') as string) || null;

		if (!name || name.trim().length === 0) {
			return fail(400, { error: 'missing_name', name: name ?? '', description: description ?? '' });
		}

		const { error: updateError } = await locals.supabase
			.from('organization')
			.update({
				name,
				description,
				updated_at: new Date().toISOString()
			})
			.eq('organization_id', params.id)
			.eq('owner_id', user.id);

		if (updateError) {
			console.error('Organization update error:', updateError);
			return fail(500, { error: 'db_error', name, description: description ?? '' });
		}

		redirect(303, `/dashboard/organizations/${params.id}`);
	}
};
