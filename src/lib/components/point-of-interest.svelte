<script lang="ts">
	import type { Marker } from '$lib/types';
	import Input from './input.svelte';
	import IconDown from '~icons/ion/caret-down-sharp';

	interface Props {
		marker: Marker;
		index: number;
	}

	let { marker, index }: Props = $props();
	let isExpanded: boolean = $state(false);
</script>

<div id="container" class="flex w-full items-center gap-2 border border-red-500">
	<div class="min-w-6 font-nova text-xl">{index + 1}</div>
	<div class="flex flex-col pr-8 overflow-y-hidden">
		<h3 class="font-nova">{marker.title}</h3>
		<p class="text-sm truncate">{marker.description}</p>
	</div>
</div>

<style>
	#container {
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
		background: linear-gradient(
				135deg,
				transparent calc(100% - (2rem / sqrt(2)) - 1px),
				#ef4444 calc(100% - (2rem / sqrt(2)) - 1px)
			)
			bottom right;
		background-origin: border-box;
	}
</style>
