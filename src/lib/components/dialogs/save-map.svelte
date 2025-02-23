<script lang="ts">
	import { Dialog } from 'bits-ui';
	import Button from '$lib/components/base/button.svelte';

	import IconClose from '~icons/ion/close-sharp';
	import IconChecked from '~icons/ic/baseline-check-box';
	import IconUnchecked from '~icons/ic/baseline-check-box-outline-blank';
	import IconIndeterminate from '~icons/ic/baseline-indeterminate-check-box';

	import type { MonadMap } from '$lib/types';
	import type { Map } from 'svelte-maplibre';

	import { addMarkerSource, clearMarkers, drawMarkers, normalizeFilename } from '$lib/utils';

	import { mapRef, maps, selectedMapId } from '$lib/state.svelte';

	// Props
	interface Props {
		open: boolean;
	}

	let { open = $bindable() }: Props = $props();

	// State
	const selectedId: string = $derived(selectedMapId.value);
	const selectedMap: MonadMap = $derived(maps.value[selectedId]);
	const mapRefVal: Map = $derived(mapRef.val)!;

	const textLayers = [
		{ id: 'water_name', name: 'Bodies of water' },
		{ id: 'place_country_major', name: 'Major countries' },
		{ id: 'place_country_minor', name: 'Minor countries' },
		{ id: 'place_country_other', name: 'Other countries' },
		{ id: 'place_state', name: 'States, territories and provinces' },
		{ id: 'place_city_large', name: 'Major cities' },
		{ id: 'place_city', name: 'Cities' },
		{ id: 'place_town', name: 'Towns' },
		{ id: 'place_village', name: 'Villages' },
		{ id: 'place_suburb', name: 'Suburbs and subdivisions' },
		{ id: 'highway_name_motorway', name: 'Highways and motorways' },
		{ id: 'highway_name_other', name: 'Roads and streets' },
		{ id: 'place_other', name: 'Other labels' }
	];

	let textLayersState: Record<string, boolean> = $state(
		textLayers.reduce((acc, layer) => ({ ...acc, [layer.id]: true }), {})
	);
	let allChecked = $derived(Object.values(textLayersState).every((v) => v));
	let someChecked = $derived(Object.values(textLayersState).some((v) => v));

	// Handlers
	const toggleCheckbox = (id: string) => {
		textLayersState = { ...textLayersState, [id]: !textLayersState[id] };
	};

	const toggleAll = () => {
		textLayersState = textLayers.reduce((acc, layer) => ({ ...acc, [layer.id]: !allChecked }), {});
	};

	const saveMap = async () => {
		console.log('click', mapRefVal);
		if (!mapRefVal) return;

		addMarkerSource(mapRefVal, selectedMap.markers);
		drawMarkers(mapRefVal);

		// Ensure the map is fully rendered
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const link = document.createElement('a');
		link.href = mapRefVal.getCanvas().toDataURL('image/png');
		link.download = normalizeFilename(selectedMap.name, `untitled map ${selectedMap.id}`);
		link.click();

		clearMarkers(mapRefVal);
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
			<Dialog.Description class="mb-6 flex flex-col gap-2">
				<p>Choose which labels to include in the map:</p>
				<div class="flex flex-col gap-1">
					{@render Checkbox('all', allChecked, 'All labels', toggleAll, someChecked && !allChecked)}

					{#each textLayers as layer}
						{@render Checkbox(
							layer.id,
							textLayersState[layer.id],
							layer.name,
							() => toggleCheckbox(layer.id),
							false,
							'ml-4'
						)}
					{/each}
				</div>
				<Button onClick={saveMap} class="mt-2 grow">Save map</Button>
			</Dialog.Description>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
