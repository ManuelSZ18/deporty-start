<script lang="ts">
	import { t } from '$lib/i18n';

	let { data } = $props();
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 py-12"
>
	<!-- Background Pattern -->
	<div
		class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"
	></div>

	<div class="relative z-10 w-full max-w-2xl">
		<div
			class="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 shadow-2xl backdrop-blur-xl"
		>
			<div class="p-8 sm:p-10">
				<!-- Header -->
				<div class="mb-8 text-center">
					<h1 class="mb-2 text-3xl font-bold text-white">
						{$t('dashboard.welcome', { name: data.user?.user_metadata?.first_name ?? '' })}
					</h1>
					<p class="text-slate-400">{$t('dashboard.subtitle')}</p>
				</div>

				<!-- Profile Card -->
				{#if data.profile}
					<div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6">
						<div class="flex items-center gap-4">
							<div
								class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-xl font-bold text-white"
							>
								{data.profile.first_name?.[0]}{data.profile.last_name?.[0]}
							</div>
							<div>
								<h2 class="text-lg font-semibold text-white">
									{data.profile.first_name}
									{data.profile.last_name}
								</h2>
								<p class="text-sm text-slate-400">{data.user?.email}</p>
								{#if data.profile.nickname}
									<p class="text-sm text-blue-400">@{data.profile.nickname}</p>
								{/if}
							</div>
						</div>
					</div>
				{:else}
					<div class="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 text-center">
						<p class="text-slate-400">{data.user?.email}</p>
					</div>
				{/if}

				<!-- Logout -->
				<form method="POST" action="/logout" class="mt-6">
					<button
						type="submit"
						class="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
					>
						{$t('nav.logout')}
					</button>
				</form>
			</div>
		</div>
	</div>
</div>
