import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const { session, user } = await locals.safeGetSession();

    // Proteger ruta: si no hay sesión, redirigir a login
    if (!session || !user) {
        redirect(303, '/login');
    }

    // Obtener profile del usuario
    const { data: profile } = await locals.supabase
        .from('profile')
        .select('*')
        .eq('profile_id', user.id)
        .single();

    return {
        user,
        profile,
    };
};
