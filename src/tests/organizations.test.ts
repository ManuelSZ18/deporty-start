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
	options: {
		user?: { id: string } | null;
		insertReturn?: { error: unknown };
		updateReturn?: { error: unknown };
		orgOwner?: string | null;
	} = {}
) {
	const user = options.user === undefined ? { id: 'user-123' } : options.user;

	const mockChain = {
		select: vi.fn().mockReturnThis(),
		eq: vi.fn().mockReturnThis(),
		is: vi.fn().mockReturnThis(),
		single: vi.fn().mockResolvedValue({
			data:
				options.orgOwner !== undefined ? { owner_id: options.orgOwner } : { owner_id: 'user-123' },
			error: null
		}),
		insert: vi.fn().mockResolvedValue(options.insertReturn ?? { error: null }),
		update: vi.fn().mockReturnThis(),
		order: vi.fn().mockResolvedValue({ data: [], error: null })
	};

	return {
		supabase: {
			from: vi.fn().mockReturnValue(mockChain),
			auth: { signOut: vi.fn() }
		},
		safeGetSession: vi.fn().mockResolvedValue({ session: {}, user })
	};
}

// ─── Create Organization Tests ────────────────────────

describe('Create Organization Action', () => {
	async function getAction() {
		const mod = await import('../routes/dashboard/organizations/new/+page.server.js');
		return mod.actions.default;
	}

	it('should fail with unauthorized when no user', async () => {
		const action = await getAction();
		const formData = createFormData({ name: 'Mi Org' });
		const locals = createMockLocals({ user: null });

		const result = await action({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals
		} as any);

		expect(result?.status).toBe(401);
		expect(result?.data?.error).toBe('unauthorized');
	});

	it('should fail with missing_name when name is empty', async () => {
		const action = await getAction();
		const formData = createFormData({ name: '' });
		const locals = createMockLocals();

		const result = await action({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals
		} as any);

		expect(result?.status).toBe(400);
		expect(result?.data?.error).toBe('missing_name');
	});

	it('should fail with missing_name when name is only whitespace', async () => {
		const action = await getAction();
		const formData = createFormData({ name: '   ' });
		const locals = createMockLocals();

		const result = await action({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals
		} as any);

		expect(result?.status).toBe(400);
		expect(result?.data?.error).toBe('missing_name');
	});

	it('should insert with correct data when valid', async () => {
		const action = await getAction();
		const formData = createFormData({ name: 'Mi Organización' });
		const locals = createMockLocals();

		try {
			await action({
				request: new Request('http://localhost', { method: 'POST', body: formData }),
				locals
			} as any);
		} catch {
			// redirect throws
		}

		expect(locals.supabase.from).toHaveBeenCalledWith('organization');
	});

	it('should NOT send description field to database', async () => {
		const action = await getAction();
		const formData = createFormData({ name: 'Mi Org', description: 'Some desc' });
		const locals = createMockLocals();
		const mockChain = locals.supabase.from('organization');

		try {
			await action({
				request: new Request('http://localhost', { method: 'POST', body: formData }),
				locals
			} as any);
		} catch {
			// redirect throws
		}

		// Verify insert was called without description
		const insertCall = mockChain.insert.mock.calls[0]?.[0];
		if (insertCall) {
			expect(insertCall).not.toHaveProperty('description');
		}
	});

	it('should return db_error on insert failure', async () => {
		const action = await getAction();
		const formData = createFormData({ name: 'Mi Org' });
		const locals = createMockLocals({
			insertReturn: { error: { message: 'DB error' } }
		});

		const result = await action({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals
		} as any);

		expect(result?.status).toBe(500);
		expect(result?.data?.error).toBe('db_error');
	});
});

// ─── Delete Team Security Tests ───────────────────────

describe('Delete Team Action - Ownership Security', () => {
	async function getActions() {
		const mod = await import('../routes/dashboard/organizations/[id]/+page.server.js');
		return mod.actions;
	}

	it('should fail with unauthorized when no user', async () => {
		const actions = await getActions();
		const formData = createFormData({ teamId: 'team-1' });
		const locals = createMockLocals({ user: null });

		const result = await actions.deleteTeam({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			params: { id: 'org-1' },
			locals
		} as any);

		expect(result?.status).toBe(401);
	});

	it('should fail with missing_team_id when teamId is not provided', async () => {
		const actions = await getActions();
		const formData = createFormData({});
		const locals = createMockLocals();

		const result = await actions.deleteTeam({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			params: { id: 'org-1' },
			locals
		} as any);

		expect(result?.status).toBe(400);
		expect(result?.data?.error).toBe('missing_team_id');
	});
});
