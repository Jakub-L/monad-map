<script lang="ts">
	import { nanoid } from 'nanoid';

	import type { MonadMap } from '$lib/types';
	import { DEFAULT_CENTER, DEFAULT_ZOOM, MAX_MAP_NAME } from '$lib/constants';

	import { selectedMapId, maps } from '$lib/state.svelte';

	import LoadMapDialog from '$lib/components/load-map-dialog.svelte';

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
	const updateEditTime = () => (selectedMap.lastEdited = Date.now());

	const createNewMap = () => {
		saveAndActivate({
			id: nanoid(),
			name: 'Unnamed map',
			lastEdited: Date.now(),
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
		class="h-10 min-w-20 rounded-full border border-red-500 bg-red-950/40 px-2 py-1 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-700/60"
		onclick={fn}>{text}</button
	>
{/snippet}

<div class="flex h-16 items-center gap-6">
	<h1 class="ml-2 font-nova text-3xl uppercase">Monad//Map</h1>
	<div class="h-8 border-l border-red-500/50"></div>
	<div class="flex grow items-center justify-stretch gap-4 pr-4">
		<input
			class="h-10 max-w-96 grow rounded-r-full border border-red-500 bg-red-950/40 px-2 py-1 font-nova text-xl hover:bg-red-700/30 focus:outline focus:outline-4 focus:-outline-offset-1 focus:outline-red-400 focus-visible:bg-red-950/80"
			bind:value={selectedMap.name}
			oninput={updateEditTime}
			aria-label="Map name"
			maxlength={MAX_MAP_NAME}
		/>
		<div class="h-6 border-l border-red-500/50"></div>
		<div class="flex gap-2">
			{@render toolbarButton('New', createNewMap)}
			{@render toolbarButton('Load', toggleLoadDialog)}
			{@render toolbarButton('Clone', cloneMap)}
		</div>
		<div class="h-6 border-l border-red-500/50"></div>
		<div class="flex gap-2">
			{@render toolbarButton('Export')}
			{@render toolbarButton('Import')}
			{@render toolbarButton('Print')}
			{@render toolbarButton('Share')}
		</div>
		<div class="h-6 border-l border-red-500/50"></div>
		<div class="flex gap-2">
			{@render toolbarButton('Clear', clearMap)}
			{@render toolbarButton('Delete')}
		</div>
	</div>
	<LoadMapDialog bind:open={loadDialogOpen} />
</div>
