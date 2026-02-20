<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/i18n';
</script>

<main
	class="relative flex h-full min-h-0 flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 py-12"
>
	<!-- Grid Background -->
	<div
		class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]"
	></div>

	<div class="relative z-10 mx-auto w-full max-w-md text-center">
		<!-- Error Code -->
		<div
			class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 text-4xl font-bold text-red-400"
		>
			{$page.status}
		</div>

		<h1 class="mb-3 text-3xl font-bold text-white">
			{$page.status === 404 ? $t('error.notFound') : $t('error.title')}
		</h1>

		<p class="mb-8 text-slate-400">
			{$page.status === 404
				? $t('error.notFoundMessage')
				: $page.error?.message || $t('error.genericMessage')}
		</p>

		<a
			href="/"
			class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/40 transition-all hover:scale-[1.02] hover:shadow-blue-500/50 active:scale-[0.99]"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
				/>
			</svg>
			{$t('error.goHome')}
		</a>
	</div>
</main>
