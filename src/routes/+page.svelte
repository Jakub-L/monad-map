<script lang="ts">
	import '../app.css';
	import { nanoid } from 'nanoid';

	// Components
	import { MapEvents, MapLibre, Marker } from 'svelte-maplibre';
	import PointOfInterest from '$lib/components/point-of-interest.svelte';
	import Toolbar from '$lib/components/toolbar.svelte';
	import IconMapPin from '~icons/ion/location-outline';

	// Types
	import type { MapMouseEvent } from 'maplibre-gl';
	import type { MonadMap, PoI } from '$lib/types';

	// Utils
	import { MAX_MARKERS } from '$lib/constants';

	// State
	import { selectedMapId, maps } from '$lib/state.svelte';
	const selectedId: string = $derived(selectedMapId.value);
	const selectedMap: MonadMap = $derived(maps.value[selectedId]);
	const poiCards: Record<string, any> = $state({});

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
		updateEditTime();
	};

	const deleteMarker = (id: string) => {
		selectedMap.markers = selectedMap.markers.filter((marker) => marker.id !== id);
		updateEditTime();
	};

	const updateEditTime = () => {
		selectedMap.lastEdited = Date.now();
	};
</script>

<div class="flex h-full max-h-full flex-col">
	<Toolbar />
	{#if selectedMap}
		<div class="grid max-h-full grow grid-rows-2 lg:grid-cols-3 gap-2 lg:grid-rows-1">
			<MapLibre
				style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
				standardControls
				class="lg:col-span-2"
				bind:zoom={selectedMap.zoom}
				bind:center={selectedMap.center}
			>
				<MapEvents onclick={addMarker} />
				{#each selectedMap.markers as marker, i (marker.id)}
					<Marker
						draggable
						bind:lngLat={marker.lngLat}
						class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-red-300 text-black shadow-2xl hover:bg-green-300 focus:outline-2 focus:outline-black"
					>
						<span>{i + 1}</span>
					</Marker>
				{/each}
			</MapLibre>
			<div class="flex max-h-full flex-col gap-2">
				<div class="flex items-center justify-between font-nova px-2 lg:pl-0">
					<h2 class="text-xl">Points of Interest</h2>
					<span class="text-lg">{selectedMap.markers.length}/{MAX_MARKERS}</span>
				</div>
				<div id="poi-list" class="flex h-full flex-col overflow-y-auto gap-2 px-2 lg:pl-0">
					{#if selectedMap.markers.length === 0}
						<div
							id="marker-placeholder"
							class="flex grow flex-col items-center justify-center !bg-red-950/40 p-8 opacity-90"
						>
							<IconMapPin class="mb-4 size-10 opacity-70" />
							<span class="font-nova text-lg">No points of interest.</span>
							<span class="text-sm">Click on the map to add a marker.</span>
						</div>
					{:else}
						{#each selectedMap.markers as marker, i (marker.id)}
							<PointOfInterest
								{marker}
								index={i}
								bind:this={poiCards[marker.id]}
								onUpdateEditTime={updateEditTime}
								onDeleteMarker={() => deleteMarker(marker.id)}
							/>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	#poi-list {
		max-height: calc(100dvh - 6rem);
	}

	@media (max-width: theme('screens.lg')) {
		#poi-list {
			max-height: calc((100dvh - 9rem) / 2);
		}
	}

	#marker-placeholder {
		clip-path: polygon(
			0 0,
			100% 0,
			100% calc(100% - theme('size.8')),
			calc(100% - theme('size.8')) 100%,
			0 100%
		);
		background: linear-gradient(135deg, transparent calc(100% - (theme('size.8') / sqrt(2)) - 1px))
			bottom right;
	}
</style>
