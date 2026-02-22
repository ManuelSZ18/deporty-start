<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';

	let { data, form } = $props();
	let isSubmitting = $state(false);
</script>

<div class="mx-auto w-full max-w-2xl">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-gray-900">{$t('profile.title')}</h1>
		<p class="mt-1 text-gray-500">{$t('profile.subtitle')}</p>
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
					{$t('profile.error')}
				</div>
			{/if}

			<!-- Avatar -->
			<div class="flex items-center gap-4">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl font-bold text-white shadow-lg"
				>
					{data.profile?.first_name?.[0] ?? '?'}{data.profile?.last_name?.[0] ?? ''}
				</div>
				<div>
					<p class="text-lg font-semibold text-gray-900">
						{data.profile?.first_name ?? ''}
						{data.profile?.last_name ?? ''}
					</p>
					{#if data.profile?.nickname}
						<p class="text-sm text-blue-600">@{data.profile.nickname}</p>
					{/if}
				</div>
			</div>

			<hr class="border-gray-100" />

			<!-- Email (read-only) -->
			<div>
				<label for="email" class="mb-2 block text-sm font-medium text-gray-700">
					{$t('profile.emailLabel')}
				</label>
				<input
					type="email"
					id="email"
					value={data.user?.email ?? ''}
					disabled
					class="block w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
				/>
				<p class="mt-1 text-xs text-gray-400">{$t('profile.emailHint')}</p>
			</div>

			<!-- First Name & Last Name -->
			<div class="grid gap-4 sm:grid-cols-2">
				<div>
					<label for="firstName" class="mb-2 block text-sm font-medium text-gray-700">
						{$t('register.firstNameLabel')}
					</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={form?.firstName ?? data.profile?.first_name ?? ''}
						required
						placeholder={$t('register.firstNamePlaceholder')}
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
					/>
				</div>
				<div>
					<label for="lastName" class="mb-2 block text-sm font-medium text-gray-700">
						{$t('register.lastNameLabel')}
					</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={form?.lastName ?? data.profile?.last_name ?? ''}
						required
						placeholder={$t('register.lastNamePlaceholder')}
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
					/>
				</div>
			</div>

			<!-- Nickname -->
			<div>
				<label for="nickname" class="mb-2 block text-sm font-medium text-gray-700">
					{$t('register.nicknameLabel')}
				</label>
				<input
					type="text"
					id="nickname"
					name="nickname"
					value={form?.nickname ?? data.profile?.nickname ?? ''}
					placeholder={$t('register.nicknamePlaceholder')}
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
				/>
				<p class="mt-1 text-xs text-gray-400">{$t('register.nicknameHint')}</p>
			</div>

			<!-- Birth Date -->
			<div>
				<label for="birthDate" class="mb-2 block text-sm font-medium text-gray-700">
					{$t('register.birthDateLabel')}
				</label>
				<input
					type="date"
					id="birthDate"
					name="birthDate"
					value={form?.birthDate ?? data.profile?.birth_date ?? ''}
					required
					class="block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
				/>
			</div>

			<!-- Submit -->
			<button
				type="submit"
				disabled={isSubmitting}
				class="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
			>
				{isSubmitting ? $t('profile.saving') : $t('profile.save')}
			</button>
		</form>
	</div>
</div>
