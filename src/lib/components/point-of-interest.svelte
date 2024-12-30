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

<div id="container" class="flex my-2 items-center rounded-br-3xl border border-red-500">
	<span class="font-nova text-xl">{index + 1}</span>
	<div>
		<h3 class="font-nova">{marker.title}</h3>
		<p class="text-sm">{marker.description}</p>
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
