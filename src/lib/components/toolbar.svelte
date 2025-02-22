<script lang="ts">
	import { nanoid } from 'nanoid';

	// Components
	import { DropdownMenu } from 'bits-ui';
	import IconMenu from '~icons/ion/menu-sharp';
	import Input from '$lib/components/base/input.svelte';
	import Button from '$lib/components/base/button.svelte';
	import LoadMapDialog from '$lib/components/dialogs/load-map.svelte';
	import ConfirmDialog from '$lib/components/dialogs/confirm.svelte';
	import MapImporter from './map-importer.svelte';

	// Types
	import type { MonadMap } from '$lib/types';

	// Utils
	import { MAX_MAP_NAME } from '$lib/constants';
	import {
		addMarkerSource,
		blankMap,
		clearMarkers,
		drawMarkers,
		fitMapToMarkers,
		normalizeFilename
	} from '$lib/utils';

	// Props
	interface Props {
		map: MonadMap;
		readOnly?: boolean;
		onAddMap?: (map: MonadMap) => void;
		onDeleteMap?: (map: MonadMap) => void;
	}

	const { map = $bindable(), readOnly, onAddMap, onDeleteMap }: Props = $props();

	// State
	import { mapRef } from '$lib/state.svelte';
	import type { LngLatBoundsLike } from 'svelte-maplibre';
	let loadDialogOpen = $state(false);
	let confirmClearDialogOpen = $state(false);
	let confirmDeleteDialogOpen = $state(false);

	// Handlers
	const toggleLoadDialog = () => (loadDialogOpen = !loadDialogOpen);
	const toggleConfirmClearDialog = () => (confirmClearDialogOpen = !confirmClearDialogOpen);
	const toggleConfirmDeleteDialog = () => (confirmDeleteDialogOpen = !confirmDeleteDialogOpen);
	const updateEditTime = () => (map.lastEdited = Date.now());

	/** Creates a new blank map */
	const createNewMap = () => {
		onAddMap?.(blankMap());
	};

	/** Clones current map and activates it */
	const cloneMap = () => {
		onAddMap?.({ ...map, name: `${map.name} (copy)`, id: nanoid() });
	};

	/** Clears all markers from the map */
	const clearMap = () => (map.markers = []);

	/** Exports the current map as a JSON file */
	const exportData = () => {
		const link = document.createElement('a');
		const file = new Blob([JSON.stringify(map, null, 4)], { type: 'application/json' });

		const saveFilename = normalizeFilename(map.name, `untitled map ${map.id}`);
		link.href = URL.createObjectURL(file);
		link.download = `${saveFilename}.json`;
		link.click();
	};

	/** Prints the current map */
	const savePoIs = () => {
		window.print();
	};

	const saveMap = async () => {
		const mapRefVal = mapRef.val;
		if (!mapRefVal) return;

		fitMapToMarkers(mapRefVal, map.markers);
		addMarkerSource(mapRefVal, map.markers);
		drawMarkers(mapRefVal);

		// Ensure the map is fully rendered
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const link = document.createElement('a');
		link.href = mapRefVal.getCanvas().toDataURL('image/png');
		link.download = normalizeFilename(map.name, `untitled map ${map.id}`);
		link.click();

		clearMarkers(mapRefVal);
	};
</script>

<!-- SNIPPETS -->
{#snippet dropdownMenuItem(text: string, fn?: () => void, classOverrides?: string)}
	<DropdownMenu.Item
		class={[
			'flex h-10 items-center rounded-full px-4 py-1 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-700/60',
			classOverrides
		]}
		onclick={fn}
	>
		{text}
	</DropdownMenu.Item>
{/snippet}

{#snippet mapNameInput(classOverrides?: string)}
	<Input
		classOverrides={`h-10 font-nova text-xl rounded-r-full ${classOverrides} ${readOnly && '!hidden'}`}
		bind:value={map.name}
		onInput={updateEditTime}
		title="Map name"
		maxLength={MAX_MAP_NAME}
		placeholder="Enter map name..."
	/>
{/snippet}

<!-- COMPONENT -->
<div class="flex items-center gap-4 p-2">
	<h1 class="font-nova text-3xl uppercase">Monad//Map</h1>
	<div class="mx-2 hidden h-8 border-l border-red-500/50 sm:block print:border-red-700"></div>
	<h2 class={['hidden h-10 items-center font-nova text-xl print:flex', readOnly && '!flex']}>
		{map.name}
	</h2>
	{@render mapNameInput('hidden sm:block md:max-w-96')}
	<div
		class={['hidden h-6 border-l border-red-500/50 lg:block print:hidden', readOnly && '!hidden']}
	></div>
	<div class={['hidden gap-2 lg:flex', readOnly && '!hidden']}>
		<Button onClick={createNewMap}>New</Button>
		<Button onClick={toggleLoadDialog}>Load</Button>
		<Button onClick={cloneMap}>Clone</Button>
	</div>
	<div
		class={['hidden h-6 border-l border-red-500/50 xl:block print:hidden', readOnly && '!hidden']}
	></div>
	<div class={['hidden gap-2 xl:flex', readOnly && '!hidden']}>
		<Button onClick={saveMap}>Save Map</Button>
		<Button onClick={savePoIs}>Save points of interest</Button>
	</div>
	<div
		class={['hidden h-6 border-l border-red-500/50 2xl:block print:hidden', readOnly && '!hidden']}
	></div>
	<div class={['hidden gap-2 2xl:flex', readOnly && '!hidden']}>
		<Button onClick={exportData}>Export</Button>
		<MapImporter />
	</div>

	<div
		class={['hidden h-6 border-l border-red-500/50 2xl:block print:hidden', readOnly && '!hidden']}
	></div>
	<div class={['hidden gap-2 2xl:flex', readOnly && '!hidden']}>
		<Button onClick={toggleConfirmClearDialog}>Clear</Button>
		<Button onClick={toggleConfirmDeleteDialog}>Delete</Button>
	</div>
	<div class="grow"></div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			class={[
				'flex min-h-12 min-w-12 items-center justify-center rounded-full p-0.5 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:bg-red-700/60 md:min-h-8 md:min-w-8 2xl:hidden print:hidden',
				readOnly && '!hidden'
			]}
			aria-label="Menu"
		>
			<IconMenu class="size-6 md:size-5" />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content
			class="z-20 -ml-2 mt-2 flex w-full flex-col gap-2 rounded-b-[1.25rem] border-b border-red-500 bg-slate-950 p-4 md:ml-2 md:w-1/2 md:border-x lg:w-1/4 2xl:hidden print:hidden"
		>
			{@render mapNameInput('sm:hidden')}
			{@render dropdownMenuItem('New', createNewMap, 'lg:hidden')}
			{@render dropdownMenuItem('Load', toggleLoadDialog, 'lg:hidden')}
			{@render dropdownMenuItem('Clone', cloneMap, 'lg:hidden')}
			<DropdownMenu.Separator class="border-t border-red-500/50 lg:hidden" />
			{@render dropdownMenuItem('Export', exportData, '2xl:hidden')}
			<MapImporter
				class="-mb-2 flex h-10 items-center rounded-full border-0 bg-transparent px-4 py-1 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-700/60 2xl:hidden"
			/>
			<DropdownMenu.Separator class="border-t border-red-500/50 xl:hidden" />
			{@render dropdownMenuItem('Save points of interest', savePoIs, 'xl:hidden')}
			{@render dropdownMenuItem('Save Map', saveMap, 'xl:hidden')}
			<DropdownMenu.Separator class="border-t border-red-500/50 2xl:hidden" />
			{@render dropdownMenuItem('Clear', toggleConfirmClearDialog)}
			{@render dropdownMenuItem('Delete', toggleConfirmDeleteDialog)}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	<LoadMapDialog bind:open={loadDialogOpen} />
	<ConfirmDialog
		bind:open={confirmClearDialogOpen}
		title="Remove all points of interest?"
		actionText="Clear"
		onAction={clearMap}
	/>
	<ConfirmDialog
		bind:open={confirmDeleteDialogOpen}
		title="Delete this map?"
		actionText="Delete"
		onAction={() => onDeleteMap?.(map)}
	/>
</div>
