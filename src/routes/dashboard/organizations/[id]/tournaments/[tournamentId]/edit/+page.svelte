<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';

	let { data, form } = $props();
	let isSubmitting = $state(false);
</script>

<div class="mx-auto w-full max-w-2xl">
	<div class="mb-8">
		<a
			href="/dashboard/organizations/{data.organizationId}/tournaments/{data.tournament
				.tournament_id}"
			class="mb-2 block text-sm font-medium text-gray-500 hover:text-gray-900"
		>
			&larr; {data.tournament.name}
		</a>
		<h1 class="text-2xl font-bold text-gray-900">{$t('tournaments.edit.title')}</h1>
	</div>

	<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-blue-500/5 sm:p-10">
		<form
			method="POST"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					isSubmitting = false;
					await update();
				};
			}}
			class="space-y-6"
		>
			{#if form?.error}
				<div class="rounded-lg bg-red-50 p-4 text-sm text-red-600">
					{$t('tournaments.new.error')}
				</div>
			{/if}

			<div>
				<label for="name" class="mb-2 block text-sm font-medium text-gray-700"
					>{$t('tournaments.new.nameLabel')}</label
				>
				<input
					type="text"
					id="name"
					name="name"
					value={form?.name ?? data.tournament.name}
					required
					placeholder={$t('tournaments.new.namePlaceholder')}
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
				/>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<label for="startDate" class="mb-2 block text-sm font-medium text-gray-700"
						>{$t('tournaments.new.startDateLabel')}</label
					>
					<input
						type="date"
						id="startDate"
						name="startDate"
						value={form?.startDate ?? data.tournament.start_date}
						required
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
					/>
				</div>
				<div>
					<label for="endDate" class="mb-2 block text-sm font-medium text-gray-700"
						>{$t('tournaments.new.endDateLabel')}</label
					>
					<input
						type="date"
						id="endDate"
						name="endDate"
						value={form?.endDate ?? data.tournament.end_date}
						required
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
					/>
				</div>
			</div>

			<div>
				<label for="deadline" class="mb-2 block text-sm font-medium text-gray-700"
					>{$t('tournaments.new.deadlineLabel')}</label
				>
				<input
					type="datetime-local"
					id="deadline"
					name="deadline"
					value={form?.deadline ?? data.tournament.registration_deadline ?? ''}
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
				/>
			</div>

			<div class="flex items-center gap-4 pt-4">
				<a
					href="/dashboard/organizations/{data.organizationId}/tournaments/{data.tournament
						.tournament_id}"
					class="rounded-lg px-6 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100"
					>{$t('tournaments.new.cancel')}</a
				>
				<button
					type="submit"
					disabled={isSubmitting}
					class="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:scale-[1.02] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
					>{$t('profile.save')}</button
				>
			</div>
		</form>
	</div>
</div>
