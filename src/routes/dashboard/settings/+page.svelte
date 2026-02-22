<script lang="ts">
	import { t } from '$lib/i18n';
	import LanguageSelector from '$lib/components/LanguageSelector.svelte';
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-2xl font-bold text-gray-900">{$t('settings.title')}</h1>
		<p class="mt-1 text-sm text-gray-500">{$t('settings.subtitle')}</p>
	</div>

	<!-- Language Section -->
	<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-blue-500/5 sm:p-8">
		<h2 class="mb-1 text-lg font-semibold text-gray-900">{$t('settings.languageLabel')}</h2>
		<p class="mb-4 text-sm text-gray-500">{$t('settings.languageHint')}</p>

		<LanguageSelector />
	</div>
</div>
