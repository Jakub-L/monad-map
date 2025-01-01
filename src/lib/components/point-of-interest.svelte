<script lang="ts">
	import type { PoI } from '$lib/types';
	import Input from './input.svelte';
	import IconDown from '~icons/ion/caret-down-sharp';

	interface Props {
		marker: PoI;
		index: number;
	}

	let { marker, index }: Props = $props();
	let isExpanded: boolean = $state(false);

	const toggle = () => (isExpanded = !isExpanded);
</script>

<div id="container" class="flex w-full flex-col border border-red-500 px-2 py-1">
	<div class="flex items-center gap-2">
		<span class="min-w-6 text-center font-nova text-xl">{index + 1}</span>
		<h3 class="grow truncate font-nova">{marker.title}</h3>
		<button
			onclick={toggle}
			class="group group flex min-h-8 min-w-8 items-center justify-center self-start rounded-full p-0.5 hover:bg-red-100/15 hover:text-red-500 active:bg-red-100/15 active:text-red-800"
		>
			<IconDown
				class={[
					'h-5 w-5 transition-all duration-200 group-active:scale-90',
					isExpanded && '-scale-100'
				]}
			/>
		</button>
	</div>
	<p
		class={[
			'ml-8 mr-10 overflow-hidden border-t border-red-500/50 pt-1 text-sm opacity-85',
			!isExpanded && 'truncate'
		]}
	>
		{marker.description}
	</p>
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
