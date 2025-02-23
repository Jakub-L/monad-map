<script lang="ts">
	import { Dialog } from 'bits-ui';
	import Button from '$lib/components/base/button.svelte';

	import IconClose from '~icons/ion/close-sharp';
	import IconChecked from '~icons/ic/baseline-check-box';
	import IconUnchecked from '~icons/ic/baseline-check-box-outline-blank';
	import IconIndeterminate from '~icons/ic/baseline-indeterminate-check-box';
	import IconSpinner from '~icons/ion/load-c';

	import type { MonadMap } from '$lib/types';
	import type { Map } from 'svelte-maplibre';

	import {
		addMarkerSource,
		clearMarkers,
		drawMarkers,
		hideLayers,
		normalizeFilename,
		showLayers
	} from '$lib/utils';

	import { mapRef, maps, selectedMapId, textLayers, textLayersState } from '$lib/state.svelte';

	// Props
	interface Props {
		open: boolean;
	}

	let { open = $bindable() }: Props = $props();

	// State
	const selectedId: string = $derived(selectedMapId.value);
	const selectedMap: MonadMap = $derived(maps.value[selectedId]);
	const mapRefVal: Map = $derived(mapRef.val)!;
	let isSaving: boolean = $state(false);

	let allChecked = $derived(Object.values(textLayersState.value).every((v) => v));
	let someChecked = $derived(Object.values(textLayersState.value).some((v) => v));

	// Handlers
	const toggleCheckbox = (id: string) => {
		textLayersState.value[id] = !textLayersState.value[id];
	};

	const toggleAll = () => {
		textLayersState.value = textLayers.reduce((acc, layer) => ({ ...acc, [layer.id]: !allChecked }), {});
	};

	const saveMap = async () => {
		if (!mapRefVal) return;
		isSaving = true;

		const hiddenLayers: string[] = textLayers.reduce((acc, { id }) => {
			if (!textLayersState.value[id]) acc.push(id);
			return acc;
		}, [] as string[]);

		hideLayers(mapRefVal, hiddenLayers);
		addMarkerSource(mapRefVal, selectedMap.markers);
		drawMarkers(mapRefVal);

		// Ensure the map is fully rendered
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const link = document.createElement('a');
		link.href = mapRefVal.getCanvas().toDataURL('image/png');
		link.download = normalizeFilename(selectedMap.name, `untitled map ${selectedMap.id}`);
		link.click();

		clearMarkers(mapRefVal);
		showLayers(mapRefVal, hiddenLayers);
		isSaving = false;
		open = false;
	};
</script>

{#snippet Checkbox(
	id: string,
	checked: boolean,
	label: string,
	onchange: () => void,
	indeterminate: boolean = false,
	containerClass: string = ''
)}
	<div class={['flex items-center gap-2', containerClass]}>
		<button onclick={onchange} class="opacity-80">
			{#if indeterminate}
				<IconIndeterminate class="h-5 w-5" />
			{:else if checked}
				<IconChecked class="h-5 w-5" />
			{:else}
				<IconUnchecked class="h-5 w-5" />
			{/if}
		</button>
		<input class="sr-only" type="checkbox" {id} {checked} {onchange} />
		<label for={id}>{label}</label>
	</div>
{/snippet}

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-10 bg-slate-950/80" />
		<Dialog.Content
			class="truncated-rect-8 fixed left-[50%] top-[50%] z-10 flex w-full max-w-fit translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-red-500 !bg-slate-950 px-4 py-2"
		>
			<div class="flex items-center justify-between">
				<Dialog.Title class="font-nova text-xl">Save map</Dialog.Title>
				<Dialog.Close
					class="flex h-10 w-10 items-center justify-center rounded-full hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-700/60"
				>
					<IconClose class="h-5 w-5" />
				</Dialog.Close>
			</div>
			<Dialog.Description class="relative mb-6 flex flex-col gap-2">
				<div
					class={[
						'absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[-50%] transform flex-col items-center justify-center gap-4',
						!isSaving && 'invisible'
					]}
				>
					<IconSpinner class="mb-4 size-10 animate-[spin_2s_linear_infinite] opacity-70" />
					<span class="font-nova text-lg">Saving...</span>
					<span class="text-sm">Please wait</span>
				</div>
				<div class={['flex flex-col', isSaving && 'invisible']}>
					<p>Choose which labels to include in the map:</p>
					<div class="flex flex-col gap-1">
						{@render Checkbox(
							'all',
							allChecked,
							'All labels',
							toggleAll,
							someChecked && !allChecked
						)}

						{#each textLayers as layer}
							{@render Checkbox(
								layer.id,
								textLayersState.value[layer.id],
								layer.name,
								() => toggleCheckbox(layer.id),
								false,
								'ml-4'
							)}
						{/each}
					</div>
					<Button onClick={saveMap} class="mt-2 grow">Save map</Button>
				</div>
			</Dialog.Description>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
