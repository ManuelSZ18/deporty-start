<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';

	let { data, form } = $props();
	let isSubmitting = $state(false);
</script>

<div class="mx-auto w-full max-w-2xl">
	<div class="mb-8">
		<a
			href="/dashboard/organizations/{data.organizationId}/tournaments/{data.tournamentId}"
			class="mb-2 block text-sm font-medium text-gray-500 hover:text-gray-900"
		>
			&larr; {$t('tournaments.detail.categories')}
		</a>
		<h1 class="text-2xl font-bold text-gray-900">{$t('categories.new.title')}</h1>
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
					{$t('categories.new.error')}
				</div>
			{/if}

			<div>
				<label for="name" class="mb-2 block text-sm font-medium text-gray-700">
					{$t('categories.new.nameLabel')}
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={form?.name ?? ''}
					required
					placeholder={$t('categories.new.namePlaceholder')}
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
				/>
			</div>

			<div>
				<label for="gender" class="mb-2 block text-sm font-medium text-gray-700">
					{$t('categories.new.genderLabel')}
				</label>
				<select
					id="gender"
					name="gender"
					required
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
				>
					<option value="Male" selected={form?.gender === 'Male'}
						>{$t('categories.new.genderMale')}</option
					>
					<option value="Female" selected={form?.gender === 'Female'}
						>{$t('categories.new.genderFemale')}</option
					>
					<option value="Mixed" selected={form?.gender === 'Mixed'}
						>{$t('categories.new.genderMixed')}</option
					>
				</select>
			</div>

			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<label for="minAge" class="mb-2 block text-sm font-medium text-gray-700">
						{$t('categories.new.minAgeLabel')}
					</label>
					<input
						type="number"
						id="minAge"
						name="minAge"
						value={form?.minAge ?? ''}
						min="0"
						max="99"
						placeholder="—"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
					/>
				</div>
				<div>
					<label for="maxAge" class="mb-2 block text-sm font-medium text-gray-700">
						{$t('categories.new.maxAgeLabel')}
					</label>
					<input
						type="number"
						id="maxAge"
						name="maxAge"
						value={form?.maxAge ?? ''}
						min="0"
						max="99"
						placeholder="—"
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
					/>
				</div>
			</div>

			<div>
				<label for="cost" class="mb-2 block text-sm font-medium text-gray-700">
					{$t('categories.new.costLabel')}
				</label>
				<input
					type="number"
					id="cost"
					name="cost"
					value={form?.cost ?? '0'}
					min="0"
					step="0.01"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
				/>
			</div>

			<div class="flex items-center gap-4 pt-4">
				<a
					href="/dashboard/organizations/{data.organizationId}/tournaments/{data.tournamentId}"
					class="rounded-lg px-6 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
				>
					{$t('categories.new.cancel')}
				</a>
				<button
					type="submit"
					disabled={isSubmitting}
					class="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
				>
					{$t('categories.new.submit')}
				</button>
			</div>
		</form>
	</div>
</div>
