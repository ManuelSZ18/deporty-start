import { fail, redirect } from '@sveltejs/kit';
import { RateLimiter } from '$lib/server/rate-limit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async (event) => {
		const { request, locals, getClientAddress } = event;

		// --- Security: Rate Limiting ---
		const clientIp = RateLimiter.getClientIp(request, getClientAddress);
		if (RateLimiter.isRateLimited(clientIp, 5, 60000)) {
			console.warn(`[SECURITY] Login rate limit exceeded for IP: ${clientIp}`);
			return fail(429, { error: 'rate_limited', email: '' });
		}
		// --- End Security ---

		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'missing_fields', email });
		}

		const { error } = await locals.supabase.auth.signInWithPassword({
			email,
			password
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

		// Check if profile is completed
		const profileCompleted =
			error === null
				? (await locals.supabase.auth.getUser()).data.user?.user_metadata?.profile_completed
				: true; // fallback to true if error so we don't redirect

		if (profileCompleted === false) {
			throw redirect(303, '/dashboard/profile');
		}

		throw redirect(303, '/dashboard');
	},

	forgotPassword: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!email) {
			return fail(400, { error: 'missing_email' });
		}

		const { error } = await locals.supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${url.origin}/auth/callback?type=recovery`
		});

		if (error) {
			console.error('Password reset error:', error.message);
			return fail(500, { error: 'reset_error' });
		}

		return { success: true, resetSent: true };
	}
};
