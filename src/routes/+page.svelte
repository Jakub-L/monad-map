<script lang="ts">
	import '../app.css';
	import { nanoid } from 'nanoid';

	// Components
	import { MapEvents, MapLibre, Marker } from 'svelte-maplibre';

	// Types
	import type { MapMouseEvent } from 'maplibre-gl';

	// State
	import { center, zoom, markers } from '$lib/map-state.svelte';
	import PointOfInterest from '$lib/components/point-of-interest.svelte';

	// Handlers
	const addMarker = ({ lngLat }: MapMouseEvent) => {
		markers.push({
			id: nanoid(),
			lngLat,
			title: `Lorem ipsum dolor sit amet, consectetur cras amet.`,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu justo vestibulum, pulvinar urna non, ornare nisi. Pellentesque dignissim tincidunt leo a pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer lorem nulla, mollis laoreet bibendum id, gravida in risus. Mauris facilisis mi volutpat ipsum dapibus, et molestie sapien finibus augue.'
		});
	};

	const selectMarker = () => {
		console.log('click');
	};
</script>

<div class="flex max-h-full flex-col">
	<h1 class="m-2 font-nova text-3xl uppercase">Monad//Map</h1>
	<div class="grid max-h-full grow grid-cols-3 gap-2">
		<MapLibre
			style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
			standardControls
			class="col-span-2 ml-2 mb-2"
			{zoom}
			{center}
		>
			<MapEvents onclick={addMarker} />
			{#each markers as marker, i (marker.id)}
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
		<div class="flex max-h-full flex-col">
			<h2 class="font-nova text-xl">Points of Interest</h2>
			<div id="poi-list" class="flex flex-col gap-4 overflow-y-auto my-2 pr-2">
				{#each markers as marker, i (marker.id)}
					<PointOfInterest {marker} index={i} />
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	#poi-list {
		max-height: calc(100dvh - 7rem);
	}
</style>
