import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    login: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            return fail(400, { error: 'missing_fields', email });
        }

        const { error } = await locals.supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error('Login error:', error.message);

            if (error.message.includes('Invalid login credentials')) {
                return fail(400, { error: 'invalid_credentials', email });
            }
            if (error.message.includes('Email not confirmed')) {
                return fail(400, { error: 'email_not_confirmed', email });
            }

            return fail(500, { error: 'auth_error', email });
        }

        redirect(303, '/dashboard');
    },

    forgotPassword: async ({ request, locals, url }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;

        if (!email) {
            return fail(400, { error: 'missing_email' });
        }

        const { error } = await locals.supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${url.origin}/auth/callback?type=recovery`,
        });

        if (error) {
            console.error('Password reset error:', error.message);
            return fail(500, { error: 'reset_error' });
        }

        return { success: true, resetSent: true };
    },
};
