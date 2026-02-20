<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/i18n';

	let { children, data } = $props();
	let sidebarOpen = $state(false);

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

		<!-- Sidebar Footer: User Info -->
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
