<script lang="ts">
	import '../app.css';

	// Components
	import { MapLibre } from 'svelte-maplibre';

	// State
	import { center, zoom } from '$lib/map-state.svelte';
</script>

<div class="grid h-svh grid-cols-12">
	<MapLibre
		style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
		standardControls
		class="col-span-6 h-full"
		{zoom}
		{center}
	></MapLibre>
	<div>Hello</div>
</div>
