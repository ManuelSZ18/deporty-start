<script lang="ts">
	import { t } from '$lib/i18n';

	let { data } = $props();
	// derived values
	let org = $derived(data.organization);
	let teams = $derived(data.teams);
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
			<!-- Actions (Edit, Delete) could go here -->
		</div>
	</div>

	<!-- Teams Section -->
	<div class="space-y-6">
		<div class="flex items-center justify-between">
			<h2 class="text-xl font-bold text-gray-900">
				{$t('organization.details.teams')}
			</h2>
			<a
				href="/dashboard/organizations/{org.organization_id}/teams/new"
				class="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-blue-200 hover:bg-gray-50 hover:text-blue-600"
			>
				<svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
					></path></svg
				>
				{$t('organization.details.newTeam')}
			</a>
		</div>

		{#if teams.length === 0}
			<!-- Empty Teams State -->
			<div
				class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 py-12 text-center"
			>
				<p class="text-gray-500">{$t('organization.details.noTeams')}</p>
				<a
					href="/dashboard/organizations/{org.organization_id}/teams/new"
					class="mt-2 text-sm font-semibold text-blue-600 hover:underline"
				>
					{$t('organization.details.createTeamCta')}
				</a>
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
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
