<script lang="ts">
	import IconClear from '~icons/ion/close-sharp';

	interface Props {
		value: string;
		label: string;
		placeholder?: string;
		clearable?: boolean;
		classOverrides?: string;
		setWidth?: string;
		onclear?: () => void;
		onchange?: (event: Event) => void;
		onblur?: (event: Event) => void;
		oninput?: (event: Event) => void;
	}

	let {
		value = $bindable(),
		label,
		placeholder,
		clearable,
		classOverrides,
		setWidth,
		onclear,
		onblur,
		onchange,
		oninput
	}: Props = $props();
</script>

<div class="flex items-center gap-0.5">
	<input
		class="rounded-br-large rounded-tl-large border-mn-pink-500 bg-mn-pink-1250 flex h-12 w-full grow border px-4 focus-visible:border-white focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white {setWidth} {classOverrides}"
		bind:value
		{onchange}
		{onblur}
		{oninput}
		{placeholder}
		aria-label={label}
	/>
	{#if clearable}
		<button
			class="hover:bg-mn-purple-900 active:bg-mn-purple-1100 flex aspect-square h-10 w-10 items-center justify-center rounded-full focus-visible:border-white focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-white"
			title="Clear"
			onclick={onclear}
		>
			<IconClear class="h-6 w-6" />
		</button>
	{/if}
</div>
