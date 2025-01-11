<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		title?: string;
		class?: string;
		onClick: () => void;
	}

	const { children, title, class: classOverrides, onClick }: Props = $props();
	$inspect(children);
</script>

<button
	class={[
		'h-10 min-w-20 rounded-full border border-red-500 bg-red-950/40 px-2 py-1 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-700/60',
		classOverrides
	]}
	{title}
	onclick={onClick}
>
	{@render children()}
</button>
