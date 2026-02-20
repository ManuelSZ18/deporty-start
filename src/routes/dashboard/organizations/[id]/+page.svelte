<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';

	let { data } = $props();
	let org = $derived(data.organization);
	let teams = $derived(data.teams);
	let isOwner = $derived(data.isOwner);

	let confirmDeleteOrg = $state(false);
	let deletingTeamId = $state<string | null>(null);
</script>

<div class="space-y-8">
	<!-- Breadcrumb / Back Link -->
	<div>
		<a
			href="/dashboard/organizations"
			class="text-sm font-medium text-gray-500 hover:text-gray-900"
		>
			&larr; {$t('organizations.title')}
		</a>
	</div>

	<!-- Organization Header -->
	<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
		<div class="flex items-start justify-between gap-4">
			<div>
				<div
					class="bg-gradient-brand mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg shadow-blue-500/30"
				>
					{org.name.charAt(0).toUpperCase()}
				</div>
				<h1 class="text-3xl font-bold text-gray-900">{org.name}</h1>
				{#if org.description}
					<p class="mt-2 max-w-2xl text-lg text-gray-500">{org.description}</p>
				{/if}
			</div>

			<!-- Owner Actions -->
			{#if isOwner}
				<div class="flex items-center gap-2">
					<a
						href="/dashboard/organizations/{org.organization_id}/edit"
						class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all hover:border-blue-200 hover:bg-gray-50 hover:text-blue-600"
					>
						<svg
							class="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							/>
						</svg>
						{$t('crud.edit')}
					</a>
					{#if !confirmDeleteOrg}
						<button
							type="button"
							onclick={() => (confirmDeleteOrg = true)}
							class="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
						>
							<svg
								class="h-4 w-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
							{$t('crud.delete')}
						</button>
					{:else}
						<form method="POST" action="?/deleteOrg" use:enhance>
							<div class="flex items-center gap-2">
								<button
									type="submit"
									class="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-red-700"
								>
									{$t('crud.confirmDelete')}
								</button>
								<button
									type="button"
									onclick={() => (confirmDeleteOrg = false)}
									class="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
								>
									{$t('crud.cancel')}
								</button>
							</div>
						</form>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<!-- Teams Section -->
	<div class="space-y-6">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-bold text-gray-900">
				{$t('organization.details.teams')}
			</h2>
			{#if isOwner}
				<a
					href="/dashboard/organizations/{org.organization_id}/teams/new"
					class="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-blue-200 hover:bg-gray-50 hover:text-blue-600"
				>
					<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 4v16m8-8H4"
						></path></svg
					>
					{$t('organization.details.newTeam')}
				</a>
			{/if}
		</div>

		{#if teams.length === 0}
			<!-- Empty Teams State -->
			<div
				class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 py-12 text-center"
			>
				<p class="text-gray-500">{$t('organization.details.noTeams')}</p>
				{#if isOwner}
					<a
						href="/dashboard/organizations/{org.organization_id}/teams/new"
						class="mt-2 text-sm font-semibold text-blue-600 hover:underline"
					>
						{$t('organization.details.createTeamCta')}
					</a>
				{/if}
			</div>
		{:else}
			<!-- Teams Grid -->
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each teams as team}
					<div
						class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
					>
						<div class="mb-4 flex items-center justify-between">
							<div
								class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600"
							>
								{team.name.charAt(0).toUpperCase()}
							</div>
							<span class="text-xs font-medium text-gray-400">
								{team.sport_id ? 'Sport' : 'General'}
							</span>
						</div>
						<h3 class="text-lg font-bold text-gray-900">
							{team.name}
						</h3>
						{#if team.category}
							<p class="text-sm text-gray-500">{team.category}</p>
						{/if}

						<!-- Team Actions -->
						{#if isOwner}
							<div class="mt-4 flex items-center gap-2 border-t border-gray-50 pt-4">
								<a
									href="/dashboard/organizations/{org.organization_id}/teams/{team.team_id}/edit"
									class="text-xs font-medium text-gray-400 transition-colors hover:text-blue-600"
								>
									{$t('crud.edit')}
								</a>
								{#if deletingTeamId !== team.team_id}
									<button
										type="button"
										onclick={() => (deletingTeamId = team.team_id)}
										class="text-xs font-medium text-gray-400 transition-colors hover:text-red-600"
									>
										{$t('crud.delete')}
									</button>
								{:else}
									<form method="POST" action="?/deleteTeam" use:enhance>
										<input type="hidden" name="teamId" value={team.team_id} />
										<div class="flex items-center gap-1">
											<button
												type="submit"
												class="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700"
											>
												{$t('crud.confirmDelete')}
											</button>
											<button
												type="button"
												onclick={() => (deletingTeamId = null)}
												class="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
											>
												{$t('crud.cancel')}
											</button>
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

	<!-- Tournaments Quick Link -->
	<div class="space-y-4">
		<h2 class="text-xl font-bold text-gray-900">{$t('tournaments.title')}</h2>
		<a
			href="/dashboard/organizations/{org.organization_id}/tournaments"
			class="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
		>
			<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
				<svg
					class="h-6 w-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
					/>
				</svg>
			</div>
			<div>
				<p class="font-semibold text-gray-900">{$t('tournaments.subtitle')}</p>
				<p class="text-sm text-gray-500">{$t('tournaments.create')} →</p>
			</div>
		</a>
	</div>
</div>
