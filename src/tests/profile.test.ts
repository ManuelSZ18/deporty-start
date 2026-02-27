import { describe, it, expect, vi } from 'vitest';

function createFormData(data: Record<string, string>): FormData {
	const fd = new FormData();
	for (const [key, value] of Object.entries(data)) {
		fd.set(key, value);
	}
	return fd;
}

function createMockLocals() {
	const remove = vi.fn().mockResolvedValue({ error: null });
	const upload = vi.fn().mockResolvedValue({ error: null });
	const getPublicUrl = vi
		.fn()
		.mockReturnValue({ data: { publicUrl: 'https://example.com/avatar.webp' } });
	const updateUser = vi.fn().mockResolvedValue({ error: null });
	const eq = vi.fn().mockResolvedValue({ error: null });
	const update = vi.fn().mockReturnValue({ eq });
	const from = vi.fn().mockImplementation((table: string) => {
		if (table === 'profile') {
			return { update };
		}
		return {
			select: vi.fn(),
			eq: vi.fn(),
			single: vi.fn()
		};
	});

	return {
		supabase: {
			auth: {
				updateUser
			},
			storage: {
				from: vi.fn().mockReturnValue({ remove, upload, getPublicUrl })
			},
			from
		},
		safeGetSession: vi.fn().mockResolvedValue({
			session: { user: { id: 'user-1' } },
			user: { id: 'user-1', email: 'user@test.com' }
		}),
		mocks: {
			updateUser,
			update,
			eq
		}
	};
}

const validInput = {
	firstName: 'Ana',
	lastName: 'Gomez',
	nickname: 'AnaG',
	birthDate: '1994-06-10',
	phone: '+573001234567'
};

async function getProfileAction() {
	const mod = await import('../routes/dashboard/profile/+page.server.js');
	return mod.actions.default;
}

describe('Profile Action - Phone update', () => {
	it('should fail with invalid_phone when phone is not in E.164 format', async () => {
		const action = await getProfileAction();
		const locals = createMockLocals();
		const formData = createFormData({ ...validInput, phone: '3001234567' });

		const result = await action({
			request: new Request('http://localhost', { method: 'POST', body: formData }),
			locals
		} as any);

		expect(result?.status).toBe(400);
		expect(result?.data?.error).toBe('invalid_phone');
		expect(locals.mocks.updateUser).not.toHaveBeenCalled();
		expect(locals.mocks.update).not.toHaveBeenCalled();
	});

	it('should persist phone in auth metadata and profile on valid submit', async () => {
		const action = await getProfileAction();
		const locals = createMockLocals();
		const formData = createFormData(validInput);

		try {
			await action({
				request: new Request('http://localhost', { method: 'POST', body: formData }),
				locals
			} as any);
			expect.unreachable('Expected redirect');
		} catch (error: any) {
			expect(error.status).toBe(303);
			expect(error.location).toBe('/dashboard');
		}

		expect(locals.mocks.updateUser).toHaveBeenCalledWith(
			expect.objectContaining({
				data: expect.objectContaining({
					phone: '+573001234567'
				})
			})
		);

		expect(locals.mocks.update).toHaveBeenCalledWith(
			expect.objectContaining({
				phone: '+573001234567'
			})
		);
		expect(locals.mocks.eq).toHaveBeenCalledWith('profile_id', 'user-1');
	});
});
