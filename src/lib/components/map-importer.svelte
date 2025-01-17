<script lang="ts">
	import { nanoid } from 'nanoid';

	// Components
	import { Dialog } from 'bits-ui';
	import Button from './base/button.svelte';
	import IconClose from '~icons/ion/close-sharp';

	// Types
	import type { Snippet } from 'svelte';
	import type { MonadMap } from '$lib/types';

	// Props
	interface Props {}

	// State
	import { maps, selectedMapId } from '$lib/state.svelte';
	let fileSelector: HTMLInputElement;
	let mapToImport: MonadMap | null = $state(null);
	let mapWithConflict: MonadMap | null = $state(null);
	let isDialogOpen = $state(false);

	// Utils
	const reset = () => {
		mapToImport = null;
		mapWithConflict = null;
		isDialogOpen = false;
		fileSelector.value = '';
	};

	// Handlers
	/** Handles the import of an agent from a JSON file */
	const importFile = (event: Event) => {
		const { files } = event.target as HTMLInputElement;
		const reader = new FileReader();

		reader.onload = (e: Event) => {
			const target = e.target as FileReader;
			const importedMap: MonadMap = JSON.parse(target.result as string);

			if (maps.value[importedMap.id]) {
				mapToImport = importedMap;
				mapWithConflict = maps.value[importedMap.id];
				isDialogOpen = true;
			} else {
				maps.value = { ...maps.value, [importedMap.id]: importedMap };
				selectedMapId.value = importedMap.id;
			}
		};

		if (files) reader.readAsText(files[0]);
	};

	const handleReplaceImport = () => {
		if (!mapToImport) return;
		maps.value = { ...maps.value, [mapToImport?.id]: mapToImport };
		selectedMapId.value = mapToImport.id;
		reset();
	};

	const handleKeepBoth = () => {
		if (!mapToImport) return;
		const newMap = {
			...mapToImport,
			id: nanoid(),
			lastEdited: Date.now(),
			name: `${mapToImport.name} (copy)`
		};
		maps.value = { ...maps.value, [newMap.id]: newMap };
		selectedMapId.value = newMap.id;
		reset();
	};
</script>

<Button onClick={() => fileSelector.click()}>Import</Button>
<div class="sr-only">
	<label for="map-import">Import a map</label>
	<input
		bind:this={fileSelector}
		type="file"
		accept=".json"
		name="map-import"
		onchange={importFile}
	/>
</div>

<Dialog.Root bind:open={isDialogOpen}>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-10 bg-slate-950/80" />
		<Dialog.Content
			class="truncated-rect-8 fixed left-[50%] top-[50%] z-10 flex w-full max-w-fit translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-red-500 !bg-slate-950 px-4 py-2"
		>
			<div class="flex items-center justify-between">
				<Dialog.Title class="font-nova text-xl">Conflicting map data</Dialog.Title>
				<Dialog.Close
					class="flex h-10 w-10 items-center justify-center rounded-full hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-700/60"
				>
					<IconClose class="h-5 w-5" />
				</Dialog.Close>
			</div>
			<Dialog.Description class="mb-6 flex flex-col gap-2">
				<p>A map with the same ID already exists.</p>
				<p>How would you like to deal with the conflict?</p>
				<button
					class="flex flex-col border border-red-500 bg-red-950/30 p-2 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-[98%] active:bg-red-700/60"
					onclick={handleReplaceImport}
				>
					<span>Import and replace</span>
					<span class="text-xs">This will keep: {mapToImport?.name || 'Untitled map'}</span>
					<span class="text-xs">
						Last edited: {new Date(mapToImport?.lastEdited ?? 0).toLocaleString()}
					</span>
				</button>
				<button
					class="flex flex-col border border-red-500 bg-red-950/30 p-2 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-[98%] active:bg-red-700/60"
					onclick={reset}
				>
					<span>Don&apos;t import</span>
					<span class="text-xs">This will keep: {mapWithConflict?.name || 'Untitled map'}</span>
					<span class="text-xs">
						Last edited: {new Date(mapWithConflict?.lastEdited ?? 0).toLocaleString()}
					</span>
				</button>
				<button
					class="flex flex-col border border-red-500 bg-red-950/30 p-2 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-[98%] active:bg-red-700/60"
					onclick={handleKeepBoth}
				>
					Import, but keep both
				</button>
			</Dialog.Description>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
