import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    const { session, user } = await locals.safeGetSession();

    const profile = user ? await locals.supabase.from('profile').select('avatar_url').eq('profile_id', user.id).single() : null;

    return json({
        user_metadata: user?.user_metadata,
        profile_db: profile?.data,
        session_exists: !!session
    });
};
