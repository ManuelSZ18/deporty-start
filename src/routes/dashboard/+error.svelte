<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/i18n';
</script>

<div class="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
	<!-- Error Code Badge -->
	<div
		class="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl font-bold text-red-500"
	>
		{$page.status}
	</div>

	<h1 class="mb-3 text-2xl font-bold text-gray-900">
		{$page.status === 404 ? $t('error.notFound') : $t('error.title')}
	</h1>

	<p class="mb-8 max-w-sm text-gray-500">
		{$page.status === 404
			? $t('error.notFoundMessage')
			: $page.error?.message || $t('error.genericMessage')}
	</p>

	<a
		href="/dashboard"
		class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
	>
		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M11 17l-5-5m0 0l5-5m-5 5h12"
			/>
		</svg>
		{$t('error.goDashboard')}
	</a>
</div>
