<script lang="ts">
	import type { PoI } from '$lib/types';
	import { MapEvents, MapLibre, Marker } from 'svelte-maplibre';

	interface Props {
		zoom?: number;
		center?: [number, number];
		class?: string;
		markers: PoI[];
		addMarker: (event: any) => void;
	}

	let {
		zoom = $bindable(),
		center = $bindable(),
		class: mapClasses,
		markers = [],
		addMarker
	}: Props = $props();
</script>

<MapLibre
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	class={mapClasses}
	standardControls
	bind:zoom
	bind:center
>
	<MapEvents onclick={addMarker} />
	{#each markers as marker, i (marker.id)}
		<Marker
			draggable
			bind:lngLat={marker.lngLat}
			class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-red-300 text-black shadow-2xl hover:bg-green-300 focus:outline-2 focus:outline-black"
		>
			<span>{i + 1}</span>
		</Marker>
	{/each}
</MapLibre>
