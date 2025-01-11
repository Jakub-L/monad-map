<script lang="ts">
	import type { Component } from 'svelte';

	interface Props {
		label: string;
		Icon: Component;
		onClick: () => void;
	}

	const { label, Icon, onClick }: Props = $props();
</script>

<button
	class="flex min-h-12 min-w-12 items-center justify-center rounded-full p-0.5 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:bg-red-700/60 md:min-h-8 md:min-w-8"
	onclick={onClick}
	aria-label={label}
	title={label}
>
	<Icon class="size-6 md:size-5"></Icon>
</button>
