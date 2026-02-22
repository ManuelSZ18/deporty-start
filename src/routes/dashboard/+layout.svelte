<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/i18n';

	let { children, data } = $props();
	let sidebarOpen = $state(false);
	let showLogoutConfirm = $state(false);

	function closeSidebar() {
		sidebarOpen = false;
	}

	const navItems = $derived([
		{
			href: '/dashboard',
			label: $t('sidebar.home'),
			icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1',
			exact: true
		},
		{
			href: '/dashboard/organizations',
			label: $t('sidebar.organizations'),
			icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
			exact: false
		},
		{
			href: '/dashboard/profile',
			label: $t('sidebar.profile'),
			icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
			exact: true
		},
		{
			href: '/dashboard/settings',
			label: $t('sidebar.settings'),
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
			exact: true
		}
	]);

	function isActive(href: string, exact: boolean): boolean {
		const currentPath = $page.url.pathname;
		return exact ? currentPath === href : currentPath.startsWith(href);
	}
</script>

<div class="flex min-h-0 flex-1">
	<!-- Mobile Sidebar Overlay -->
	{#if sidebarOpen}
		<div
			class="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
			role="button"
			tabindex="-1"
			aria-label={$t('nav.closeMenu')}
			onclick={closeSidebar}
			onkeydown={(e) => e.key === 'Escape' && closeSidebar()}
		></div>
	{/if}

	<!-- Sidebar -->
	<aside
		class="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 {sidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<!-- Sidebar Header -->
		<div class="flex h-16 items-center justify-between border-b border-gray-100 px-4">
			<span class="text-sm font-semibold tracking-wider text-gray-500 uppercase">
				{$t('dashboard.title')}
			</span>
			<button
				class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
				onclick={closeSidebar}
				aria-label={$t('nav.closeMenu')}
			>
				<svg
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<!-- Nav Links -->
		<nav class="flex-1 space-y-1 px-3 py-4" aria-label="Dashboard">
			{#each navItems as item}
				<a
					href={item.href}
					onclick={closeSidebar}
					class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all {isActive(
						item.href,
						item.exact
					)
						? 'bg-blue-50 text-blue-700 shadow-sm'
						: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}"
				>
					<svg
						class="h-5 w-5 shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon} />
					</svg>
					{item.label}
				</a>
			{/each}
		</nav>

		<!-- Sidebar Footer: User Info + Logout -->
		<div class="border-t border-gray-100 p-4">
			<div class="flex items-center gap-3">
				<div
					class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white"
				>
					{data.user?.user_metadata?.first_name?.[0] ?? '?'}{data.user?.user_metadata
						?.last_name?.[0] ?? ''}
				</div>
				<div class="min-w-0 flex-1">
					<p class="truncate text-sm font-medium text-gray-900">
						{data.user?.user_metadata?.first_name ?? ''}
						{data.user?.user_metadata?.last_name ?? ''}
					</p>
					<p class="truncate text-xs text-gray-500">{data.user?.email ?? ''}</p>
				</div>
			</div>

			<!-- Logout Button -->
			<button
				type="button"
				onclick={() => (showLogoutConfirm = true)}
				class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all hover:border-red-300 hover:bg-red-50"
			>
				<svg
					class="h-4 w-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					/>
				</svg>
				{$t('nav.logout')}
			</button>
		</div>
	</aside>

	<!-- Main Content -->
	<div class="flex min-w-0 flex-1 flex-col">
		<!-- Mobile Top Bar -->
		<div class="flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3 lg:hidden">
			<button
				class="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
				onclick={() => (sidebarOpen = true)}
				aria-label={$t('nav.openMenu')}
			>
				<svg
					class="h-5 w-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
			<span class="text-sm font-semibold text-gray-700">{$t('dashboard.title')}</span>
		</div>

		<!-- Page Content -->
		<div class="flex-1 overflow-auto bg-gray-50/50 p-4 sm:p-6 lg:p-8">
			{@render children()}
		</div>
	</div>
</div>

<!-- Logout Confirmation Modal -->
{#if showLogoutConfirm}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		onclick={(e) => {
			if (e.target === e.currentTarget) showLogoutConfirm = false;
		}}
		onkeydown={(e) => {
			if (e.key === 'Escape') showLogoutConfirm = false;
		}}
	>
		<div class="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl">
			<!-- Icon -->
			<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
				<svg
					class="h-6 w-6 text-red-500"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					/>
				</svg>
			</div>

			<h3 class="mb-2 text-center text-lg font-bold text-gray-900">{$t('logout.confirmTitle')}</h3>
			<p class="mb-6 text-center text-sm text-gray-500">{$t('logout.confirmMessage')}</p>

			<div class="flex gap-3">
				<button
					type="button"
					onclick={() => (showLogoutConfirm = false)}
					class="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
				>
					{$t('logout.cancel')}
				</button>
				<form method="POST" action="/logout" class="flex-1">
					<button
						type="submit"
						class="w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-700"
					>
						{$t('logout.confirm')}
					</button>
				</form>
			</div>
		</div>
	</div>
{/if}
