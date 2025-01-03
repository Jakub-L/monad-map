<script lang="ts">
	import { nanoid } from 'nanoid';
	import { DEFAULT_CENTER, DEFAULT_ZOOM } from '$lib/constants';
	import { selectedMapId, maps } from '$lib/state.svelte';
	import LoadMapDialog from '$lib/components/load-map-dialog.svelte';
	import type { MonadMap } from '$lib/types';

	// STATE
	const selectedId = $derived(selectedMapId.value);
	const selectedMap = $derived(maps.value[selectedId]);
	let loadDialogOpen = $state(false);

	// UTILS
	const saveAndActivate = (map: MonadMap) => {
		maps.value = { ...maps.value, [map.id]: map };
		selectedMapId.value = map.id;
	};

	// HANDLERS
	const toggleLoadDialog = () => (loadDialogOpen = !loadDialogOpen);

	const createNewMap = () => {
		saveAndActivate({
			id: nanoid(),
			name: 'Unnamed map',
			center: DEFAULT_CENTER,
			zoom: DEFAULT_ZOOM,
			markers: []
		});
	};

	/** Clones current map and activates it */
	const cloneMap = () => {
		saveAndActivate({ ...selectedMap, name: `${selectedMap.name} (copy)`, id: nanoid() });
	};

	/** Clears all markers from the map */
	const clearMap = () => (selectedMap.markers = []);
</script>

{#snippet toolbarButton(text: string, fn?: () => void)}
	<button
		class="min-w-20 rounded-full border border-red-500 px-2 py-1 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-700/60"
		onclick={fn}>{text}</button
	>
{/snippet}

<div class="flex items-center gap-6">
	<h1 class="m-2 font-nova text-3xl uppercase">Monad//Map</h1>
	<div class="h-8 border-l border-red-500/50"></div>
	<span class="font-nova text-xl">{selectedMap.name ?? 'No map loaded'}</span>
	<div class="flex items-center gap-2">
		{@render toolbarButton('New', createNewMap)}
		{@render toolbarButton('Load', toggleLoadDialog)}
		{@render toolbarButton('Rename')}
		{@render toolbarButton('Clone', cloneMap)}
		<div class="h-6 border-l border-red-500/50"></div>
		{@render toolbarButton('Export')}
		{@render toolbarButton('Import')}
		{@render toolbarButton('Print')}
		<div class="h-6 border-l border-red-500/50"></div>
		{@render toolbarButton('Clear', clearMap)}
		{@render toolbarButton('Delete')}
	</div>
</div>
<LoadMapDialog bind:open={loadDialogOpen} />
