<script lang="ts">
	import '../app.css';
	import { nanoid } from 'nanoid';

	// Components
	import { MapEvents, MapLibre, Marker } from 'svelte-maplibre';
	import IconDown from '~icons/ion/caret-down-sharp';
	import Input from '$lib/components/input.svelte';

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
				<div class="flex items-center">
					<span>{i + 1}</span>
					<Input
						bind:value={marker.description}
						label="Name"
						placeholder="Point of interest name"
					/>
					<button title="Expand description"><IconDown class="h-6 w-6" /></button>
				</div>
			{/each}
		</div>
	</div>
</div>
