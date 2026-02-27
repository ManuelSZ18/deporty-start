<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';
	import { formatDateLatam } from '$lib/utils/dateUtils';

	let { data } = $props();
	let tournament = $derived(data.tournament);
	let categories = $derived(data.categories);
	let isOwner = $derived(data.isOwner);

	let confirmDelete = $state(false);
	let deletingCategoryId = $state<string | null>(null);

	function getStatus(startDate: string, endDate: string): string {
		const now = new Date();
		if (now < new Date(startDate)) return 'upcoming';
		if (now > new Date(endDate)) return 'finished';
		return 'active';
	}

	let tournamentStatus = $derived(getStatus(tournament.start_date, tournament.end_date));

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

<div class="space-y-8">
	<!-- Breadcrumb -->
	<div>
		<a
			href="/dashboard/organizations/{data.organizationId}/tournaments"
			class="text-sm font-medium text-gray-500 hover:text-gray-900"
		>
			&larr; {$t('tournaments.title')}
		</a>
	</div>

	<!-- Tournament Header -->
	<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
		<div class="flex items-start justify-between gap-4">
			<div>
				<span
					class="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold {statusColors[
						tournamentStatus
					]}"
				>
					{statusLabels[tournamentStatus]()}
				</span>
				<h1 class="text-3xl font-bold text-gray-900">{tournament.name}</h1>
				<div class="mt-3 space-y-1 text-sm text-gray-500">
					<p>
						📅 {formatDateLatam(tournament.start_date)} — {formatDateLatam(tournament.end_date)}
					</p>
					{#if tournament.registration_deadline}
						<p>
							⏰ {$t('tournaments.detail.deadline')}: {formatDateLatam(
								tournament.registration_deadline
							)}
						</p>
					{/if}
				</div>
			</div>

			{#if isOwner}
				<div class="flex items-center gap-2">
					<a
						href="/dashboard/organizations/{data.organizationId}/tournaments/{tournament.tournament_id}/edit"
						class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:border-blue-200 hover:text-blue-600"
					>
						{$t('crud.edit')}
					</a>
					{#if !confirmDelete}
						<button
							type="button"
							onclick={() => (confirmDelete = true)}
							class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:border-red-200 hover:text-red-600"
						>
							{$t('crud.delete')}
						</button>
					{:else}
						<form method="POST" action="?/deleteTournament" use:enhance>
							<div class="flex items-center gap-2">
								<button
									type="submit"
									class="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
									>{$t('crud.confirmDelete')}</button
								>
								<button
									type="button"
									onclick={() => (confirmDelete = false)}
									class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700"
									>{$t('crud.cancel')}</button
								>
							</div>
						</form>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<!-- Categories Section -->
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-bold text-gray-900">{$t('tournaments.detail.categories')}</h2>
			{#if isOwner}
				<a
					href="/dashboard/organizations/{data.organizationId}/tournaments/{tournament.tournament_id}/categories/new"
					class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:border-blue-200 hover:text-blue-600"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v16m8-8H4"
						/></svg
					>
					{$t('tournaments.detail.newCategory')}
				</a>
			{/if}
		</div>

		{#if categories.length === 0}
			<div class="rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 py-12 text-center">
				<p class="text-gray-500">{$t('tournaments.detail.noCategories')}</p>
			</div>
		{:else}
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each categories as cat}
					<div class="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
						<div class="mb-2 flex items-center justify-between">
							<h3 class="text-lg font-bold text-gray-900">{cat.name}</h3>
							<span
								class="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700"
							>
								{cat.gender}
							</span>
						</div>
						<div class="space-y-1 text-sm text-gray-500">
							{#if cat.min_age || cat.max_age}
								<p>🎂 {cat.min_age ?? '∞'} — {cat.max_age ?? '∞'} años</p>
							{/if}
							{#if cat.cost > 0}
								<p>💰 ${cat.cost}</p>
							{/if}
						</div>
						{#if isOwner}
							<div class="mt-3 flex items-center gap-2 border-t border-gray-50 pt-3">
								<a
									href="/dashboard/organizations/{data.organizationId}/tournaments/{tournament.tournament_id}/categories/{cat.category_id}/edit"
									class="text-xs font-medium text-gray-400 hover:text-blue-600"
								>
									{$t('crud.edit')}
								</a>
								{#if deletingCategoryId !== cat.category_id}
									<button
										type="button"
										onclick={() => (deletingCategoryId = cat.category_id)}
										class="text-xs font-medium text-gray-400 hover:text-red-600"
									>
										{$t('crud.delete')}
									</button>
								{:else}
									<form method="POST" action="?/deleteCategory" use:enhance>
										<input type="hidden" name="categoryId" value={cat.category_id} />
										<div class="flex items-center gap-1">
											<button
												type="submit"
												class="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700"
												>{$t('crud.confirmDelete')}</button
											>
											<button
												type="button"
												onclick={() => (deletingCategoryId = null)}
												class="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
												>{$t('crud.cancel')}</button
											>
										</div>
									</form>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
