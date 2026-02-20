<script lang="ts">
	interface Props {
		size?: 'sm' | 'md' | 'lg';
		color?: string;
	}

	let { size = 'md', color = 'text-blue-500' }: Props = $props();

	const sizeClasses: Record<string, string> = {
		sm: 'h-4 w-4 border-2',
		md: 'h-8 w-8 border-[3px]',
		lg: 'h-12 w-12 border-4'
	};
</script>

<div
	class="inline-block animate-spin rounded-full border-current border-r-transparent {sizeClasses[
		size
	]} {color}"
	role="status"
	aria-label="Cargando"
>
	<span class="sr-only">Cargando...</span>
</div>
