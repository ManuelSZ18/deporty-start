<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';

	let isSubmitting = $state(false);
	let { form } = $props();
</script>

<div class="mx-auto max-w-2xl px-4 py-8">
	<div class="mb-8">
		<h1 class="text-3xl font-bold text-gray-900">{$t('organizations.new.title')}</h1>
		<p class="mt-2 text-gray-500">{$t('organizations.subtitle')}</p>
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
			<!-- Error Message -->
			{#if form?.error}
				<div class="rounded-lg bg-red-50 p-4 text-sm text-red-600">
					{$t('organizations.new.error')}
				</div>
			{/if}

			<div>
				<label for="name" class="mb-2 block text-sm font-medium text-gray-700">
					{$t('organizations.new.nameLabel')}
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={form?.name ?? ''}
					required
					placeholder={$t('organizations.new.namePlaceholder')}
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
				/>
			</div>

			<div>
				<label for="description" class="mb-2 block text-sm font-medium text-gray-700">
					{$t('organizations.new.descriptionLabel')}
				</label>
				<textarea
					id="description"
					name="description"
					value={form?.description ?? ''}
					rows="4"
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
				></textarea>
			</div>

			<div class="flex items-center gap-4 pt-4">
				<a
					href="/dashboard/organizations"
					class="rounded-lg px-6 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
				>
					{$t('organizations.new.cancel')}
				</a>
				<button
					type="submit"
					disabled={isSubmitting}
					class="flex-1 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
				>
					{isSubmitting ? $t('register.submitting') : $t('organizations.new.submit')}
				</button>
			</div>
		</form>
	</div>
</div>
