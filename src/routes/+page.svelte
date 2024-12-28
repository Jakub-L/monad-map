<script lang="ts">
	import '../app.css';
	import { nanoid } from 'nanoid';

	// Components
	import { MapEvents, MapLibre, Marker } from 'svelte-maplibre';

	// Types
	import type { MapMouseEvent } from 'maplibre-gl';

	// State
	import { center, zoom, markers } from '$lib/map-state.svelte';

	// Handlers
	const addMarker = ({ lngLat }: MapMouseEvent) => {
		markers.push({
			id: nanoid(),
			lngLat,
			title: '',
			description: ''
		});
	};

	const selectMarker = () => {
		console.log('click');
	};
</script>

<div class="flex h-svh flex-col">
	<h1>MonadMap</h1>
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
			{#each markers as marker, i (marker.id)}
				<div class="flex items-center">
					<span>{i + 1}</span>
					<input bind:value={marker.description} />
					<button>v</button>
				</div>
			{/each}
		</div>
	</div>
</div>
