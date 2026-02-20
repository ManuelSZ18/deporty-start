<script lang="ts">
	import { t } from '$lib/i18n';

	let { data } = $props();
	let tournaments = $derived(data.tournaments);

	function getStatus(startDate: string, endDate: string): string {
		const now = new Date();
		const start = new Date(startDate);
		const end = new Date(endDate);
		if (now < start) return 'upcoming';
		if (now > end) return 'finished';
		return 'active';
	}

	const statusColors: Record<string, string> = {
		upcoming: 'bg-blue-50 text-blue-700',
		active: 'bg-green-50 text-green-700',
		finished: 'bg-gray-100 text-gray-500'
	};

	const statusLabels: Record<string, () => string> = {
		upcoming: () => $t('tournaments.status.upcoming'),
		active: () => $t('tournaments.status.active'),
		finished: () => $t('tournaments.status.finished')
	};
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<a
				href="/dashboard/organizations/{data.organizationId}"
				class="text-sm font-medium text-gray-500 hover:text-gray-900"
			>
				&larr; {$t('sidebar.organizations')}
			</a>
			<h1 class="mt-2 text-2xl font-bold text-gray-900">{$t('tournaments.title')}</h1>
			<p class="text-gray-500">{$t('tournaments.subtitle')}</p>
		</div>
		<a
			href="/dashboard/organizations/{data.organizationId}/tournaments/new"
			class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:bg-blue-700"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			{$t('tournaments.create')}
		</a>
	</div>

	{#if tournaments.length === 0}
		<div
			class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 py-16 text-center"
		>
			<svg
				class="mx-auto mb-4 h-12 w-12 text-gray-300"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
				/>
			</svg>
			<p class="text-gray-500">{$t('tournaments.empty')}</p>
			<p class="mt-1 text-sm text-gray-400">{$t('tournaments.emptyCta')}</p>
		</div>
	{:else}
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each tournaments as tournament}
				{@const status = getStatus(tournament.start_date, tournament.end_date)}
				<a
					href="/dashboard/organizations/{data.organizationId}/tournaments/{tournament.tournament_id}"
					class="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
				>
					<div class="p-6">
						<div class="mb-3 flex items-center justify-between">
							<span class="rounded-full px-2.5 py-0.5 text-xs font-semibold {statusColors[status]}">
								{statusLabels[status]()}
							</span>
						</div>
						<h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600">
							{tournament.name}
						</h3>
						<div class="mt-3 space-y-1 text-sm text-gray-500">
							<p>
								📅 {new Date(tournament.start_date).toLocaleDateString()} — {new Date(
									tournament.end_date
								).toLocaleDateString()}
							</p>
							{#if tournament.registration_deadline}
								<p>
									⏰ {$t('tournaments.detail.deadline')}: {new Date(
										tournament.registration_deadline
									).toLocaleDateString()}
								</p>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
