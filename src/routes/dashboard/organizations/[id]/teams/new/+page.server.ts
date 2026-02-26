import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { supabase } = locals;
	const { user } = await locals.safeGetSession();

	if (!user) {
		throw error(401, 'Unauthorized');
	}

	// 1. Fetch Sports for the dropdown
	const { data: sports, error: sportsError } = await supabase
		.from('sport')
		.select('sport_id, name')
		.order('name');

	if (sportsError) {
		console.error('Error fetching sports:', sportsError);
	}

	// Verify organization exists and user has access (read-only verification handled by UI usually,
	// but here we just need sports. RLS will handle insertion failure if not owner)

	return {
		sports: sports || [],
		organizationId: params.id
	};
};

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const sport_id = formData.get('sport_id') as string;
		const organization_id = params.id;

		const { supabase } = locals;
		const { user } = await locals.safeGetSession();

		if (!user) {
			return fail(401, {
				error: 'unauthorized',
				name: undefined,
				sport_id: undefined,
				category: undefined
			});
		}

		if (!name || name.trim().length === 0) {
			return fail(400, {
				error: 'missing_name',
				name,
				sport_id,
				category: formData.get('category')?.toString() || ''
			});
		}

		if (!sport_id) {
			return fail(400, {
				error: 'missing_sport',
				name,
				sport_id,
				category: formData.get('category')?.toString() || ''
			});
		}

		const { error: insertError } = await supabase.from('team').insert({
			name,
			organization_id,
			sport_id
		});

		if (insertError) {
			console.error('Error creating team:', insertError);
			return fail(500, {
				error: 'db_error',
				name,
				sport_id,
				category: formData.get('category')?.toString() || ''
			});
		}

		throw redirect(303, `/dashboard/organizations/${organization_id}`);
	}
};
