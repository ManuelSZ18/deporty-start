<script lang="ts">
	import intlTelInput from 'intl-tel-input';
	import 'intl-tel-input/styles';

	let {
		value = $bindable(''),
		isValid = $bindable(false),
		options = {},
		class: className = '',
		placeholder = '',
		required = false,
		id = 'phone'
	} = $props();

	let inputEl: HTMLInputElement | undefined = $state();
	let iti: any;

	$effect(() => {
		if (!inputEl) return;

		iti = intlTelInput(inputEl, {
			...options,
			loadUtils: () => import('intl-tel-input/build/js/utils.js')
		});

		const handleChange = () => {
			value = iti.getNumber();
			isValid = iti.isValidNumber();
		};

		inputEl.addEventListener('countrychange', handleChange);
		inputEl.addEventListener('input', handleChange);

		// Initialize values
		handleChange();

		return () => {
			if (inputEl) {
				inputEl.removeEventListener('countrychange', handleChange);
				inputEl.removeEventListener('input', handleChange);
			}
			if (iti) iti.destroy();
		};
	});
</script>

<div class="intl-tel-input-wrapper w-full">
	<input
		type="tel"
		bind:this={inputEl}
		class={className}
		{placeholder}
		{required}
		{id}
		autocomplete="tel"
	/>
</div>

<style>
	/* Make the input wrapper fill the width correctly */
	:global(.iti) {
		width: 100%;
	}
</style>
