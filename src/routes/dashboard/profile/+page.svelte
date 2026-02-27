<script lang="ts">
	import { enhance } from '$app/forms';
	import { t } from '$lib/i18n';
	import IntlTelInput from 'intl-tel-input/svelteWithUtils';
	import 'intl-tel-input/styles';

	let { data, form } = $props();
	let isSubmitting = $state(false);
	let avatarPreview: string | null = $state(null);
	let optimizedAvatarBlob: Blob | null = $state(null);

	// Initialize a local state for the nickname input
	let localApodo = $state('');
	let phone = $state('');
	let phoneValid = $state(false);

	const phoneOptions = {
		initialCountry: 'auto',
		nationalMode: false,
		strictMode: true,
		geoIpLookup: async (callback: (countryCode: string) => void) => {
			try {
				const response = await fetch('https://ipapi.co/json/');
				const locationData = await response.json();
				callback((locationData?.country_code ?? 'CO').toLowerCase());
			} catch {
				callback('co');
			}
		}
	};

	import { untrack } from 'svelte';

	// Effect to sync the external data/form to the local input state when the component mounts or updates
	$effect(() => {
		// Untrack the external dependencies to initialize, preventing infinite reactive loops
		const defaultNickname =
			form?.nickname !== undefined ? form.nickname : data.profile?.nickname || '';
		const defaultPhone = form?.phone !== undefined ? form.phone : data.profile?.phone || '';

		untrack(() => {
			if (!localApodo && defaultNickname) {
				localApodo = defaultNickname;
			}

			if (!phone && defaultPhone) {
				phone = defaultPhone;
			}
		});
	});

	const isNicknameValid = $derived(!localApodo || /^[a-zA-Z0-9]+$/.test(localApodo));

	async function handleAvatarChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (!file) {
			clearPreview();
			return;
		}

		// Mostrar preview inmediato si se desea o esperar al WebP
		if (avatarPreview) URL.revokeObjectURL(avatarPreview);
		avatarPreview = URL.createObjectURL(file);

		// Optimización WebP
		optimizedAvatarBlob = await optimizeImage(file, 500, 0.8);
	}

	function clearPreview() {
		if (avatarPreview) URL.revokeObjectURL(avatarPreview);
		avatarPreview = null;
		optimizedAvatarBlob = null;
	}

	function optimizeImage(file: File, maxSize: number, quality: number): Promise<Blob> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				const img = new Image();
				img.onload = () => {
					// Calcular nuevas dimensiones
					let width = img.width;
					let height = img.height;

					if (width > height) {
						if (width > maxSize) {
							height = Math.round((height * maxSize) / width);
							width = maxSize;
						}
					} else {
						if (height > maxSize) {
							width = Math.round((width * maxSize) / height);
							height = maxSize;
						}
					}

					const canvas = document.createElement('canvas');
					canvas.width = width;
					canvas.height = height;

					const ctx = canvas.getContext('2d');
					if (!ctx) {
						reject(new Error('Canvas context no disponible'));
						return;
					}

					ctx.drawImage(img, 0, 0, width, height);

					// Convertir a WebP
					canvas.toBlob(
						(blob) => {
							if (blob) {
								resolve(blob);
							} else {
								reject(new Error('Fallo al comprimir la imagen'));
							}
						},
						'image/webp',
						quality
					);
				};
				img.onerror = () => reject(new Error('No se pudo cargar la imagen para optimizar'));
				img.src = e.target?.result as string;
			};
			reader.onerror = () => reject(new Error('Fallo al leer el archivo original'));
			reader.readAsDataURL(file);
		});
	}

	$effect(() => {
		return () => {
			if (avatarPreview) URL.revokeObjectURL(avatarPreview);
		};
	});
</script>

<div class="mx-auto w-full max-w-2xl">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-gray-900">{$t('profile.title')}</h1>
		<p class="mt-1 text-gray-500">{$t('profile.subtitle')}</p>
	</div>

	<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-blue-500/5 sm:p-10">
		<form
			method="POST"
			enctype="multipart/form-data"
			use:enhance={({ formData }) => {
				// Inject the optimized WebP file instead of the original one if available
				if (optimizedAvatarBlob) {
					formData.set('avatar', optimizedAvatarBlob, 'avatar.webp');
				}

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
					{#if form.error === 'invalid_nickname'}
						{$t('auth.error.invalid_nickname')}
					{:else if form.error === 'invalid_phone'}
						{$t('auth.error.invalid_phone')}
					{:else}
						{$t('profile.error')}
					{/if}
				</div>
			{/if}

			<!-- Avatar -->
			<div class="flex items-center gap-4">
				<div class="group relative inline-block shrink-0">
					<div
						class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl font-bold text-white shadow-lg"
					>
						{#if avatarPreview}
							<img src={avatarPreview} alt="Avatar preview" class="h-full w-full object-cover" />
						{:else if data.profile?.avatar_url}
							<img
								src={data.profile.avatar_url}
								alt="Current avatar"
								class="h-full w-full object-cover"
							/>
						{:else}
							{data.profile?.first_name?.[0] ?? '?'}{data.profile?.last_name?.[0] ?? ''}
						{/if}
					</div>
					<label
						for="avatar-input"
						class="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100"
					>
						{$t('profile.changePhoto') || 'Foto'}
					</label>
					<input
						type="file"
						id="avatar-input"
						name="avatar"
						accept="image/*"
						class="sr-only"
						onchange={handleAvatarChange}
					/>
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
					bind:value={localApodo}
					placeholder={$t('register.nicknamePlaceholder')}
					class="block w-full rounded-lg border bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:bg-white focus:ring-2 focus:outline-none {isNicknameValid
						? 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
						: 'border-red-500 focus:border-red-500 focus:ring-red-500/20'}"
				/>
				{#if !isNicknameValid}
					<p class="mt-1 text-xs font-medium text-red-500">{$t('auth.error.invalid_nickname')}</p>
				{:else}
					<p class="mt-1 text-xs text-gray-400">{$t('register.nicknameHint')}</p>
				{/if}
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

			<!-- Phone -->
			<div>
				<label for="phone" class="mb-2 block text-sm font-medium text-gray-700">
					{$t('register.phoneLabel')}
				</label>
				<div
					class="rounded-lg border border-gray-300 bg-gray-50 px-2 py-2 focus-within:border-blue-500"
				>
					<IntlTelInput
						options={phoneOptions}
						inputProps={{
							id: 'phone',
							class:
								'w-full bg-transparent px-2 py-2 text-gray-900 placeholder-gray-400 outline-none',
							placeholder: $t('register.phonePlaceholder'),
							autocomplete: 'tel',
							required: true,
							value: phone
						}}
						onChangeNumber={(number: string) => {
							phone = number;
						}}
						onChangeValidity={(isValid: boolean) => {
							phoneValid = isValid;
						}}
					/>
				</div>
				<input type="hidden" name="phone" value={phone} />
				{#if phone && !phoneValid}
					<p class="mt-1 text-xs font-medium text-red-500">{$t('auth.error.invalid_phone')}</p>
				{:else}
					<p class="mt-1 text-xs text-gray-400">{$t('register.phoneHint')}</p>
				{/if}
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
