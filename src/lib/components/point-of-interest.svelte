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

	const toggle = () => (isExpanded = !isExpanded);
</script>

<div id="container" class="flex w-full gap-2 border border-red-500 px-2 py-1">
	<span class="min-w-6 text-center font-nova text-xl">{index + 1}</span>
	<div class="flex flex-col overflow-hidden">
		<h3 class="truncate font-nova">{marker.title}</h3>
		<div
			class={[
				'grid overflow-hidden transition-all duration-300',
				isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
			]}
		>
			<p class="overflow-hidden text-sm opacity-85">
				{marker.description}
			</p>
		</div>
	</div>
	<button onclick={toggle} class="self-start">
		<IconDown class={['h-6 w-6 transition-all duration-200', isExpanded && '-scale-100']} />
	</button>
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
