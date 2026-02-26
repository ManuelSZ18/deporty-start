import { describe, it, expect, vi } from 'vitest';
import { load } from '../routes/calendariodeportivo/+page.server';

// Mock Supabase to simulate a failed connection
const mockSupabase = {
	from: vi.fn().mockImplementation(() => {
		const resolvedFailure = Promise.resolve({ data: null, error: { message: 'fetch failed' } });
		return {
			select: vi.fn().mockReturnThis(),
			in: vi.fn().mockReturnThis(),
			order: vi.fn().mockReturnThis(),
			is: vi.fn().mockImplementation(() => {
				// Simulate the error that throws when the DB is offline
				return {
					order: vi.fn().mockResolvedValue({
						data: null,
						error: { message: 'fetch failed' }
					})
				};
			}),
			then: resolvedFailure.then.bind(resolvedFailure)
		};
	})
};

const mockLocals = {
	supabase: mockSupabase,
	safeGetSession: vi.fn().mockResolvedValue({ session: null })
};

describe('Calendario Deportivo Load Function', () => {
	it('should return a fallback response with an errorMsg when the database connection fails', async () => {
		const response = await load({ locals: mockLocals } as any);
		expect(response).toBeTruthy();
		if (!response) {
			throw new Error('Expected load response');
		}

		expect(response.countries).toEqual([]);
		expect(response.cities).toEqual([]);
		expect(response.events).toEqual([]);
		expect(response.errorMsg).toBe(
			'No se pudo conectar con la base de datos. Por favor, intenta de nuevo más tarde.'
		);
	});
});
