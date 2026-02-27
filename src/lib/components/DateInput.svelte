<script lang="ts">
	import flatpickr from 'flatpickr';
	import 'flatpickr/dist/flatpickr.css';
	import { Spanish } from 'flatpickr/dist/l10n/es.js';
	import { untrack } from 'svelte';

	let {
		value = $bindable(''),
		id = '',
		name = '',
		placeholder = '',
		required = false,
		class: className = ''
	} = $props();

	let inputEl: HTMLInputElement;
	let fp: flatpickr.Instance;

	$effect(() => {
		if (inputEl) {
			fp = flatpickr(inputEl, {
				locale: Spanish,
				dateFormat: 'Y-m-d',
				altInput: true,
				altFormat: 'd/m/Y',
				defaultDate: untrack(() => value) || undefined,
				onChange: (selectedDates, dateStr) => {
					value = dateStr;
				}
			});

			// Fix HTML5 validation for hidden altInput
			if (required && fp.altInput) {
				fp.altInput.setAttribute('required', 'true');
				inputEl.removeAttribute('required');
			}

			return () => {
				fp?.destroy();
			};
		}
	});

	// Reactivity: Sync external value changes into flatpickr
	$effect(() => {
		if (fp && value !== fp.input.value) {
			// Avoid infinite loop by checking if value actually differs from currently formatted string
			if (value) {
				fp.setDate(value, false);
			} else {
				fp.clear();
			}
		}
	});
</script>

<div class="relative w-full">
	<input
		bind:this={inputEl}
		type="text"
		{id}
		{name}
		{placeholder}
		{required}
		class={className}
		data-input
	/>
</div>
