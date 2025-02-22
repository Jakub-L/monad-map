<script lang="ts">
	// Components
	import { MapEvents, MapLibre, Marker } from 'svelte-maplibre';

	// Types
	import type { PoI } from '$lib/types';

	// Props
	interface Props {
		zoom?: number;
		center?: [number, number];
		class?: string;
		markers: PoI[];
		readOnly?: boolean;
		addMarker?: (event: any) => void;
	}

	let {
		zoom = $bindable(),
		center = $bindable(),
		class: mapClasses,
		markers = $bindable([]),
		readOnly,
		addMarker
	}: Props = $props();

	// State
	import { mapRef } from '$lib/state.svelte';
</script>

<MapLibre
	style="/map-styles/monad.json"
	class={mapClasses}
	standardControls={!readOnly}
	preserveDrawingBuffer
	bind:zoom
	bind:center
	bind:map={mapRef.val}
	onload={() => mapRef.val?.setPixelRatio(4)}
>
	<MapEvents onclick={(e) => !readOnly && addMarker?.(e)} />
	{#each markers as marker, i (marker.id)}
		<Marker
			draggable={!readOnly}
			bind:lngLat={marker.lngLat}
			class="grid h-8 w-8 place-items-center rounded-full border-2 border-red-500  bg-slate-950 font-nova hover:bg-slate-700 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-800 print:border-red-900 print:bg-white"
		>
			<span>{i + 1}</span>
		</Marker>
	{/each}
</MapLibre>
