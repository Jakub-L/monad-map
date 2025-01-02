<script lang="ts">
	import { selectedMapId, maps } from '$lib/state.svelte';

	const selectedId = selectedMapId.value;
	const selectedMap = maps.value[selectedId];

	const clearMarkers = () => {
		selectedMap.markers = [];
	};
</script>

<div class="flex gap-10">
	<h1 class="m-2 font-nova text-3xl uppercase">Monad//Map</h1>
	<div class="flex gap-2">
		<button>New</button>
		<button>Save As</button>
		<button>Export</button>
		<button onclick={clearMarkers}>Clear Markers</button>
	</div>
</div>
