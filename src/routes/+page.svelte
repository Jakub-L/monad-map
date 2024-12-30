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

<div class="flex h-svh flex-col">
	<h1 class="font-nova uppercase">Monad//Map</h1>
	<div class="grid h-full grid-cols-3">
		<MapLibre
			style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
			standardControls
			class="col-span-2 h-full"
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
		<div>
			<h2 class="font-nova">Points of Interest</h2>
			{#each markers as marker, i (marker.id)}
				<PointOfInterest {marker} index={i} />
			{/each}
		</div>
	</div>
</div>
