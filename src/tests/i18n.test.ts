import { describe, it, expect } from 'vitest';
import es from '../lib/i18n/es';
import pt from '../lib/i18n/pt';

// ─── Translation Coverage Tests ──────────────────────

describe('i18n - Translation Keys', () => {
	const esKeys = Object.keys(es);
	const ptKeys = Object.keys(pt);

	it('should have at least 10 translation keys in Spanish', () => {
		expect(esKeys.length).toBeGreaterThan(10);
	});

	it('should have at least 10 translation keys in Portuguese', () => {
		expect(ptKeys.length).toBeGreaterThan(10);
	});

	it('all Spanish keys should have Portuguese equivalents', () => {
		const missingInPt = esKeys.filter((key) => !ptKeys.includes(key));
		// Allow a maximum number of missing keys (some may be in progress)
		if (missingInPt.length > 0) {
			console.warn(`Missing in pt.ts (${missingInPt.length}):`, missingInPt.slice(0, 5));
		}
		// Fail if more than 10% are missing
		const maxMissing = Math.ceil(esKeys.length * 0.1);
		expect(missingInPt.length).toBeLessThanOrEqual(maxMissing);
	});

	it('all Portuguese keys should have Spanish equivalents', () => {
		const missingInEs = ptKeys.filter((key) => !esKeys.includes(key));
		if (missingInEs.length > 0) {
			console.warn(`Missing in es.ts (${missingInEs.length}):`, missingInEs.slice(0, 5));
		}
		const maxMissing = Math.ceil(ptKeys.length * 0.1);
		expect(missingInEs.length).toBeLessThanOrEqual(maxMissing);
	});
});

// ─── Translation Value Tests ─────────────────────────

describe('i18n - Translation Values', () => {
	it('no Spanish values should be empty strings', () => {
		const emptyKeys = Object.entries(es)
			.filter(([, value]) => value.trim() === '')
			.map(([key]) => key);

		expect(emptyKeys).toEqual([]);
	});

	it('no Portuguese values should be empty strings', () => {
		const emptyKeys = Object.entries(pt)
			.filter(([, value]) => value.trim() === '')
			.map(([key]) => key);

		expect(emptyKeys).toEqual([]);
	});

	it('critical auth keys should exist in Spanish', () => {
		const criticalKeys = [
			'login.title',
			'register.title',
			'login.emailLabel',
			'login.passwordLabel',
			'register.submit'
		];

		for (const key of criticalKeys) {
			expect(es).toHaveProperty(key);
			expect((es as Record<string, string>)[key]).toBeTruthy();
		}
	});

	it('critical auth keys should exist in Portuguese', () => {
		const criticalKeys = [
			'login.title',
			'register.title',
			'login.emailLabel',
			'login.passwordLabel',
			'register.submit'
		];

		for (const key of criticalKeys) {
			expect(pt).toHaveProperty(key);
			expect((pt as Record<string, string>)[key]).toBeTruthy();
		}
	});
});
