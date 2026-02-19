import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
        teams: teams || []
    };
};
