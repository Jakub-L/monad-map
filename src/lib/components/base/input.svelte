<script lang="ts">
	interface Props {
		value: string;
		classOverrides?: string;
		maxLength: number;
		placeholder: string;
		title: string;
		isTextarea?: boolean;
		onKeyDown?: (event: KeyboardEvent) => void;
    onInput?: (event: Event) => void;
	}

	let {
		value = $bindable(),
		classOverrides,
		maxLength,
		placeholder,
		title,
		isTextarea,
		onKeyDown,
    onInput
	}: Props = $props();
</script>

{#if isTextarea}
	<textarea
		name={title}
		class={[
			'grow rounded-r-[1.25rem] border border-red-500 bg-red-950/40 p-1 text-left placeholder:text-red-50/90 hover:bg-red-700/30 focus:outline focus:outline-4 focus:-outline-offset-1 focus:outline-red-400 focus-visible:bg-red-950/80 print:hidden',
			classOverrides
		]}
		rows={4}
		onkeydown={onKeyDown}
    oninput={onInput}
		maxlength={maxLength}
		{placeholder}
		bind:value
	></textarea>{:else}
	<input
		class={[
			'h-9 grow rounded-r-[1.25rem] border border-red-500 bg-red-950/40 p-1 placeholder:text-red-50/90 hover:bg-red-700/30 focus:outline focus:outline-4 focus:-outline-offset-1 focus:outline-red-400 focus-visible:bg-red-950/80 print:hidden',
			classOverrides
		]}
		name={title}
		onkeydown={onKeyDown}
    oninput={onInput}
		maxlength={maxLength}
		{placeholder}
		bind:value
	/>
{/if}

<style>
	textarea {
		field-sizing: content;
	}
</style>
