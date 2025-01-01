<script lang="ts">
	import { markers } from '$lib/state.svelte';

	const clearMarkers = () => {
		markers.value = [];
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
