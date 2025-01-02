<script lang="ts">
	import '../app.css';
	import { nanoid } from 'nanoid';

	// Components
	import { MapEvents, MapLibre, Marker } from 'svelte-maplibre';
	import PointOfInterest from '$lib/components/point-of-interest.svelte';
	import Toolbar from '$lib/components/toolbar.svelte';

	// Types
	import type { MapMouseEvent } from 'maplibre-gl';
	import type { PoI } from '$lib/types';

	// Utils
	import { MAX_MARKERS } from '$lib/constants';

	// State
	import { selectedMapId, maps } from '$lib/state.svelte';
	const selectedId = selectedMapId.value;
	const selectedMap = maps.value[selectedId];

	// Handlers
	const addMarker = ({ lngLat }: MapMouseEvent) => {
		if (selectedMap.markers.length >= MAX_MARKERS) return;
		selectedMap.markers.push({
			id: nanoid(),
			lngLat,
			title: `Lorem ipsum dolor sit amet, consectetur cras amet.`,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu justo vestibulum, pulvinar urna non, ornare nisi. Pellentesque dignissim tincidunt leo a pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer lorem nulla, mollis laoreet bibendum id, gravida in risus. Mauris facilisis mi volutpat ipsum dapibus, et molestie sapien finibus augue.'
		} as PoI);
	};

	const selectMarker = () => {
		console.log('click');
	};
</script>

<div class="flex h-full max-h-full flex-col">
	<Toolbar />
	{#if selectedMap}
		<div class="grid max-h-full grow grid-cols-3 gap-2">
			<MapLibre
				style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
				standardControls
				class="col-span-2 mb-2 ml-2"
				bind:zoom={selectedMap.zoom}
				bind:center={selectedMap.center}
			>
				<MapEvents onclick={addMarker} />
				{#each selectedMap.markers as marker, i (marker.id)}
					<Marker
						draggable
						bind:lngLat={marker.lngLat}
						class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-red-300 text-black shadow-2xl focus:outline-2 focus:outline-black"
						onclick={selectMarker}
					>
						<span>{i + 1}</span>
					</Marker>
				{/each}
			</MapLibre>
			<div class="flex max-h-full flex-col pr-2">
				<div class="flex items-center justify-between font-nova">
					<h2 class="text-xl">Points of Interest</h2>
					<span class="text-lg">{selectedMap.markers.length}/{MAX_MARKERS}</span>
				</div>
				<div id="poi-list" class="my-2 flex flex-col gap-4 overflow-y-auto">
					{#each selectedMap.markers as marker, i (marker.id)}
						<PointOfInterest {marker} index={i} />
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	#poi-list {
		max-height: calc(100dvh - 7rem);
	}
</style>
