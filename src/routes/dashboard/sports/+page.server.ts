import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
    const { profile } = await parent();
    return {
        profile
    };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const { user } = await locals.safeGetSession();
        if (!user) {
            return fail(401, { error: 'unauthorized' });
        }

        try {
            const formData = await request.formData();
            const sports = formData.getAll('sports') as string[];

            const { error } = await locals.supabase
                .from('profile')
                .update({ sports })
                .eq('profile_id', user.id);

            if (error) {
                console.error('Error updating sports:', error);
                return fail(500, { error: 'sports_update_failed' });
            }
        } catch (error) {
            console.error('Action sports error:', error);
            return fail(500, { error: 'Unknown server error' });
        }

        throw redirect(303, '/dashboard');
    }
};
