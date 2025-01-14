<script lang="ts">
	import { nanoid } from 'nanoid';

	// Components
	import { DropdownMenu } from 'bits-ui';
	import IconMenu from '~icons/ion/menu-sharp';
	import Input from '$lib/components/base/input.svelte';
	import Button from '$lib/components/base/button.svelte';
	import LoadMapDialog from '$lib/components/dialogs/load-map.svelte';

	// Types
	import type { MonadMap } from '$lib/types';

	// Utils
	import { DEFAULT_CENTER, DEFAULT_ZOOM, MAX_MAP_NAME } from '$lib/constants';

	// Props
	interface Props {
		map: MonadMap;
		readOnly?: boolean;
		onAddMap?: (map: MonadMap) => void;
	}
	const { map = $bindable(), readOnly, onAddMap }: Props = $props();

	// State
	import { goto } from '$app/navigation';
	let loadDialogOpen = $state(false);

	// Handlers
	const toggleLoadDialog = () => (loadDialogOpen = !loadDialogOpen);
	const updateEditTime = () => (map.lastEdited = Date.now());

	/** Creates a new blank map */
	const createNewMap = () => {
		onAddMap({
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
		onAddMap({ ...map, name: `${map.name} (copy)`, id: nanoid() });
	};

	/** Clears all markers from the map */
	const clearMap = () => (map.markers = []);

	const shareMap = () => {
		const data = btoa(JSON.stringify(map));
		goto(`/view?map=${data}`);
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
		placeholder="Map name"
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
		<Button onClick={() => {}}>Export</Button>
		<Button onClick={() => {}}>Import</Button>
		<Button onClick={() => {}}>Print</Button>
		<Button onClick={shareMap}>Share</Button>
	</div>
	<div
		class={['hidden h-6 border-l border-red-500/50 2xl:block print:hidden', readOnly && '!hidden']}
	></div>
	<div class={['hidden gap-2 2xl:flex', readOnly && '!hidden']}>
		<Button onClick={clearMap}>Clear</Button>
		<Button onClick={() => {}}>Delete</Button>
	</div>
	<div class="grow"></div>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			class="flex min-h-12 min-w-12 items-center justify-center rounded-full p-0.5 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:bg-red-700/60 md:min-h-8 md:min-w-8 2xl:hidden print:hidden"
			aria-label="Menu"
		>
			<IconMenu class="size-6 md:size-5" />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content
			class="z-20 -ml-2 mt-2 flex w-full flex-col gap-2 rounded-b-[1.25rem] border-b border-red-500 bg-slate-950 p-4 md:ml-2 md:w-1/2 md:border-x lg:w-1/4 2xl:hidden"
		>
			{@render mapNameInput('sm:hidden')}
			{@render dropdownMenuItem('New', createNewMap, 'lg:hidden')}
			{@render dropdownMenuItem('Load', toggleLoadDialog, 'lg:hidden')}
			{@render dropdownMenuItem('Clone', cloneMap, 'lg:hidden')}
			<DropdownMenu.Separator class="border-t border-red-500/50 lg:hidden" />
			{@render dropdownMenuItem('Export', () => {}, 'xl:hidden')}
			{@render dropdownMenuItem('Import', () => {}, 'xl:hidden')}
			{@render dropdownMenuItem('Print', () => {}, 'xl:hidden')}
			{@render dropdownMenuItem('Share', () => {}, 'xl:hidden')}
			<DropdownMenu.Separator class="border-t border-red-500/50 xl:hidden" />
			{@render dropdownMenuItem('Clear', clearMap)}
			{@render dropdownMenuItem('Delete')}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	<LoadMapDialog bind:open={loadDialogOpen} />
</div>
