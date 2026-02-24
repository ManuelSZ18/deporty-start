import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import DashboardPage from '../dashboard/+page.svelte';

// Mock implementation of t mapping for localization
vi.mock('$lib/i18n', () => ({
    t: {
        subscribe: (fn: any) => {
            fn((key: string) => key);
            return () => { };
        }
    }
}));

describe('Dashboard Main Page', () => {
    it('should render the Call to Action when the user has no sports active', () => {
        const mockData = {
            profile: {
                sports: [],
                first_name: 'Test',
                nickname: 'Tester'
            }
        };

        render(DashboardPage, { data: mockData as any });

        // It should display the empty sport selector state language key
        expect(screen.getByText('dashboard.sportSelector.empty')).toBeTruthy();
        // It should render the button leading to the /sports route
        expect(screen.getByText('sidebar.sports')).toBeTruthy();
    });

    it('should render the sport dropdown and contextual cards when user has sports', () => {
        const mockData = {
            profile: {
                sports: ['futbol', 'padel'],
                first_name: 'Test',
                nickname: 'Tester'
            }
        };

        render(DashboardPage, { data: mockData as any });

        // Validates that the dropdown selector exists
        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeTruthy();

        // Should render translation keys mapped to their sports
        expect(screen.getByText('sports.futbol')).toBeTruthy();
        expect(screen.getByText('sports.padel')).toBeTruthy();

        // Dashboard Cards should be active
        expect(screen.getByText('dashboard.cards.upcomingEvents')).toBeTruthy();
        expect(screen.getByText('dashboard.cards.upcomingEventsDesc')).toBeTruthy();
        expect(screen.getByText('dashboard.cards.eventRegistration')).toBeTruthy();
        expect(screen.getByText('sidebar.organizations')).toBeTruthy();
    });
});
