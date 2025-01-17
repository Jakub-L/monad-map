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
</script>

<MapLibre
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
	class={mapClasses}
	standardControls={!readOnly}
	bind:zoom
	bind:center
>
	<MapEvents onclick={(e) => !readOnly && addMarker?.(e)} />
	{#each markers as marker, i (marker.id)}
		<Marker
			draggable={!readOnly}
			bind:lngLat={marker.lngLat}
			class="grid h-8 w-8 place-items-center rounded-full border border-red-500  bg-red-950 font-nova hover:bg-red-700 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-800"
		>
			<span>{i + 1}</span>
		</Marker>
	{/each}
</MapLibre>
