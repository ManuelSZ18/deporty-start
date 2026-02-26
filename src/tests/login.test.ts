import { describe, it, expect, vi } from 'vitest';

// ─── Helpers ──────────────────────────────────────────

function createFormData(data: Record<string, string>): FormData {
	const fd = new FormData();
	for (const [key, value] of Object.entries(data)) {
		fd.set(key, value);
	}
	return fd;
}

function createMockLocals(
	overrides: {
		signInReturn?: { error: unknown };
		resetReturn?: { error: unknown };
	} = {}
) {
	return {
		supabase: {
			auth: {
				signInWithPassword: vi.fn().mockResolvedValue(overrides.signInReturn ?? { error: null }),
				resetPasswordForEmail: vi.fn().mockResolvedValue(overrides.resetReturn ?? { error: null })
			}
		},
		safeGetSession: vi.fn()
	};
}

async function getLoginActions() {
	const mod = await import('../routes/login/+page.server.js');
	return mod.actions;
}

// ─── Login Tests ──────────────────────────────────────

describe('Login Action - Validation', () => {
	it('should fail with missing_fields when email is empty', async () => {
		const actions = await getLoginActions();
		const formData = createFormData({ email: '', password: 'test1234' });
		const locals = createMockLocals();

		const result = await actions.login({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals
		} as any);

		expect(result?.status).toBe(400);
		expect(result?.data?.error).toBe('missing_fields');
	});

	it('should fail with missing_fields when password is empty', async () => {
		const actions = await getLoginActions();
		const formData = createFormData({ email: 'test@test.com', password: '' });
		const locals = createMockLocals();

		const result = await actions.login({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals
		} as any);

		expect(result?.status).toBe(400);
		expect(result?.data?.error).toBe('missing_fields');
	});

	it('should call signInWithPassword with correct credentials', async () => {
		const actions = await getLoginActions();
		const formData = createFormData({ email: 'user@test.com', password: 'password123' });
		const locals = createMockLocals();

		try {
			await actions.login({
				request: new Request('http://localhost', { method: 'POST', body: formData }),
				locals
			} as any);
		} catch {
			// redirect throws
		}

		expect(locals.supabase.auth.signInWithPassword).toHaveBeenCalledWith({
			email: 'user@test.com',
			password: 'password123'
		});
	});

	it('should return invalid_credentials error', async () => {
		const actions = await getLoginActions();
		const formData = createFormData({ email: 'user@test.com', password: 'wrongpass' });
		const locals = createMockLocals({
			signInReturn: { error: { message: 'Invalid login credentials' } }
		});

		const result = await actions.login({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals
		} as any);

		expect(result?.status).toBe(400);
		expect(result?.data?.error).toBe('invalid_credentials');
	});

	it('should return email_not_confirmed error', async () => {
		const actions = await getLoginActions();
		const formData = createFormData({ email: 'user@test.com', password: 'password123' });
		const locals = createMockLocals({
			signInReturn: { error: { message: 'Email not confirmed' } }
		});

		const result = await actions.login({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals
		} as any);

		expect(result?.status).toBe(400);
		expect(result?.data?.error).toBe('email_not_confirmed');
	});

	it('should return generic auth_error for unknown errors', async () => {
		const actions = await getLoginActions();
		const formData = createFormData({ email: 'user@test.com', password: 'password123' });
		const locals = createMockLocals({
			signInReturn: { error: { message: 'Something unexpected' } }
		});

		const result = await actions.login({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals
		} as any);

		expect(result?.status).toBe(500);
		expect(result?.data?.error).toBe('auth_error');
	});
});

// ─── Forgot Password Tests ───────────────────────────

describe('Forgot Password Action', () => {
	it('should fail with missing_email when email is empty', async () => {
		const actions = await getLoginActions();
		const formData = createFormData({ email: '' });
		const locals = createMockLocals();

		const result = await actions.forgotPassword({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals,
			url: new URL('http://localhost')
		} as any);

		expect(result?.status).toBe(400);
		expect(result?.data?.error).toBe('missing_email');
	});

	it('should return success when reset email is sent', async () => {
		const actions = await getLoginActions();
		const formData = createFormData({ email: 'user@test.com' });
		const locals = createMockLocals();

		const result = await actions.forgotPassword({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals,
			url: new URL('http://localhost')
		} as any);

		expect(result?.success).toBe(true);
		expect(result?.resetSent).toBe(true);
	});

	it('should return reset_error on failure', async () => {
		const actions = await getLoginActions();
		const formData = createFormData({ email: 'user@test.com' });
		const locals = createMockLocals({
			resetReturn: { error: { message: 'Rate limit exceeded' } }
		});

		const result = await actions.forgotPassword({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals,
			url: new URL('http://localhost')
		} as any);

		expect(result?.status).toBe(500);
		expect(result?.data?.error).toBe('reset_error');
	});
});
