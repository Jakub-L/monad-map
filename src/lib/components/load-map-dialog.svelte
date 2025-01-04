<script lang="ts">
	import { Dialog } from 'bits-ui';
	import IconClose from '~icons/ion/close-sharp';

	import { maps } from '$lib/state.svelte';

	interface Props {
		open: boolean;
	}

	let { open = $bindable() }: Props = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-10 bg-slate-950/80" />
		<Dialog.Content
			class="truncated-rect-8 fixed left-[50%] top-[50%] z-10 flex w-full max-w-fit translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-red-500 !bg-slate-950 px-4 py-2"
		>
			<div class="flex items-center justify-between">
				<Dialog.Title class="font-nova text-xl">Load a map</Dialog.Title>
				<Dialog.Close
					class="h-10 w-10 rounded-full justify-center flex items-center hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-700/60"
				>
					<IconClose class="h-5 w-5" />
				</Dialog.Close>
			</div>
			<Dialog.Description class="mb-6 flex flex-col gap-2">
				{#each Object.values(maps.value) as map}
					<button
						class="border border-red-500 bg-red-950/30 p-2 text-left hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-[98%] active:bg-red-700/60"
					>
						<h3 class="font-nova">{map.name}</h3>
						<div class="flex justify-between gap-20 text-xs">
							<p>{map.markers.length} point{map.markers.length === 1 ? '' : 's'} of interest</p>
							<p>Last edited: {new Date(map.lastEdited).toLocaleString()}</p>
						</div>
					</button>
				{/each}
			</Dialog.Description>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
