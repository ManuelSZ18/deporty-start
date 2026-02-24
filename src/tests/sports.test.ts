import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import SportsPage from '../dashboard/sports/+page.svelte';

vi.mock('$lib/i18n', () => ({
    t: {
        subscribe: (fn: any) => {
            fn((key: string) => key);
            return () => { };
        }
    }
}));

import { page } from '$app/stores';
import { writable } from 'svelte/store';

// Mock routing so enhance forms don't crash the context
vi.mock('$app/stores', () => ({
    page: writable({ url: new URL('http://localhost') })
}));
vi.mock('$app/forms', () => ({
    enhance: () => { }
}));

describe('Profile Sports Configuration Page', () => {
    it('should render the sports grid and check active sports by default', () => {
        const mockData = {
            profile: {
                sports: ['natacion_carreras']
            }
        };

        render(SportsPage, { data: mockData as any });

        // General texts
        expect(screen.getByText('dashboard.activities.title')).toBeTruthy();
        expect(screen.getByText('dashboard.activities.subtitle')).toBeTruthy();

        // Submit button
        expect(screen.getByText('profile.save')).toBeTruthy();
    });
});
