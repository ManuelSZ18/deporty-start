<script lang="ts">
	interface Props {
		variant?: 'text' | 'circle' | 'card';
		width?: string;
		height?: string;
		lines?: number;
	}

	let { variant = 'text', width = 'w-full', height = '', lines = 1 }: Props = $props();

	const variantClasses: Record<string, string> = {
		text: 'h-4 rounded',
		circle: 'rounded-full',
		card: 'rounded-2xl'
	};

	const defaultHeights: Record<string, string> = {
		text: '',
		circle: 'h-12 w-12',
		card: 'h-40'
	};
</script>

{#if variant === 'text' && lines > 1}
	<div class="space-y-3 {width}">
		{#each Array(lines) as _, i}
			<div
				class="animate-pulse bg-gray-200 {variantClasses.text} {i === lines - 1
					? 'w-3/4'
					: 'w-full'} {height}"
			></div>
		{/each}
	</div>
{:else}
	<div
		class="animate-pulse bg-gray-200 {variantClasses[variant]} {width} {height ||
			defaultHeights[variant]}"
	></div>
{/if}
