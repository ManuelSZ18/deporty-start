<script lang="ts">
	import { t } from '$lib/i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Array of sport objects from the relational junction table
	let userSports = $derived(data.userSports || []);

	import { untrack } from 'svelte';

	// Create a state to bind the selected dropdown to (defaults to first sport if available)
	let selectedSport = $state<string>('');

	$effect(() => {
		untrack(() => {
			if (!selectedSport && userSports.length > 0) {
				selectedSport = userSports[0].sport_id;
			}
		});
	});
</script>

<div class="mx-auto w-full max-w-4xl">
	<div
		class="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-blue-500/5"
	>
		<div class="p-8 sm:p-10">
			<!-- Empty State -->
			{#if userSports.length === 0}
				<div class="text-center">
					<div
						class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50 text-2xl text-yellow-600"
					>
						<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold text-gray-900">
						{$t('dashboard.sportSelector.empty')}
					</h3>
					<a
						href="/dashboard/sports"
						class="inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-blue-700"
					>
						{$t('sidebar.sports')}
					</a>
				</div>
			{:else}
				<!-- Sport Selector Header -->
				<div
					class="mb-8 flex flex-col gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center sm:justify-between"
				>
					<div>
						<h2 class="text-base font-bold text-gray-900">Participar en:</h2>
					</div>

					<div class="relative min-w-[200px]">
						<select
							bind:value={selectedSport}
							class="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pr-10 pl-4 font-medium text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						>
							{#each userSports as sport}
								<option value={sport.sport_id}>{sport.name}</option>
							{/each}
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
						>
							<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</div>
				</div>

				<!-- Contextual Sport Dashboards Cards -->
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<!-- Próximos eventos -->
					<!-- To implement specific routes later, we pass ?sport= param -->
					<a
						href="/dashboard/events?sport={selectedSport}"
						class="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
					>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"
						>
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-bold text-gray-900">{$t('dashboard.cards.upcomingEvents')}</h3>
							<p class="mt-1 line-clamp-2 text-xs text-gray-500">
								{$t('dashboard.cards.upcomingEventsDesc')}
							</p>
						</div>
					</a>

					<!-- Inscripción de eventos -->
					<a
						href="/dashboard/enrollments?sport={selectedSport}"
						class="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
					>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
						>
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-bold text-gray-900">{$t('dashboard.cards.enrollEvents')}</h3>
							<p class="mt-1 line-clamp-2 text-xs text-gray-500">
								{$t('dashboard.cards.enrollEventsDesc')}
							</p>
						</div>
					</a>

					<!-- Organizaciones -->
					<a
						href="/dashboard/organizations?sport={selectedSport}"
						class="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md sm:col-span-2 lg:col-span-1"
					>
						<div
							class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
						>
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
								/>
							</svg>
						</div>
						<div>
							<h3 class="font-bold text-gray-900">{$t('dashboard.cards.organizations')}</h3>
							<p class="mt-1 line-clamp-2 text-xs text-gray-500">
								{$t('dashboard.cards.organizationsDesc')}
							</p>
						</div>
					</a>
				</div>
			{/if}
		</div>
	</div>
</div>
