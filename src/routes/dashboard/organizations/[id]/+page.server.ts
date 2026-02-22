import { error } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { id } = params;
	const { supabase } = locals;
	const { user } = await locals.safeGetSession();

	if (!user) {
		throw error(401, 'Unauthorized');
	}

	// 1. Fetch Organization
	const { data: organization, error: orgError } = await supabase
		.from('organization')
		.select('*')
		.eq('organization_id', id)
		.is('deleted_at', null)
		.single();

	if (orgError || !organization) {
		console.error('Error fetching organization:', orgError);
		throw error(404, 'Organization not found');
	}

	// 2. Fetch Teams for this Organization
	const { data: teams, error: teamsError } = await supabase
		.from('team')
		.select('*')
		.eq('organization_id', id)
		.is('deleted_at', null)
		.order('created_at', { ascending: false });

	if (teamsError) {
		console.error('Error fetching teams:', teamsError);
	}

	return {
		organization,
		teams: teams || [],
		isOwner: organization.owner_id === user.id
	};
};

export const actions: Actions = {
	deleteOrg: async ({ params, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user) return fail(401, { error: 'unauthorized' });

		const { error: deleteError } = await locals.supabase
			.from('organization')
			.update({ deleted_at: new Date().toISOString() })
			.eq('organization_id', params.id)
			.eq('owner_id', user.id);

		if (deleteError) {
			console.error('Error deleting organization:', deleteError);
			return fail(500, { error: 'delete_error' });
		}

		throw redirect(303, '/dashboard/organizations');
	},

	deleteTeam: async ({ request, params, locals }) => {
		const { user } = await locals.safeGetSession();
		if (!user) return fail(401, { error: 'unauthorized' });

		const formData = await request.formData();
		const teamId = formData.get('teamId') as string;

		if (!teamId) return fail(400, { error: 'missing_team_id' });

		// Verify user owns the organization before deleting team
		const { data: org } = await locals.supabase
			.from('organization')
			.select('owner_id')
			.eq('organization_id', params.id)
			.single();

		if (org?.owner_id !== user.id) {
			return fail(403, { error: 'forbidden' });
		}

		const { error: deleteError } = await locals.supabase
			.from('team')
			.update({ deleted_at: new Date().toISOString() })
			.eq('team_id', teamId)
			.eq('organization_id', params.id);

		if (deleteError) {
			console.error('Error deleting team:', deleteError);
			return fail(500, { error: 'delete_error' });
		}

		return { teamDeleted: true };
	}
};
