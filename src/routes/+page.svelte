<script lang="ts">
	import '../app.css';
	import { nanoid } from 'nanoid';

	// Components
	import PrintableMap from '$lib/components/printable-map.svelte';
	import PointOfInterest from '$lib/components/point-of-interest.svelte';
	import PoiListPlaceholder from '$lib/components/poi-list-placeholder.svelte';
	import Toolbar from '$lib/components/toolbar.svelte';

	// Types
	import type { MapMouseEvent } from 'maplibre-gl';
	import type { MonadMap, PoI } from '$lib/types';

	// Utils
	import { MAX_MARKERS } from '$lib/constants';
	import { blankMap } from '$lib/utils';

	// State
	import { selectedMapId, maps } from '$lib/state.svelte';
	const selectedId: string = $derived(selectedMapId.value);
	const selectedMap: MonadMap = $derived(maps.value[selectedId]);
	const poiCards: Record<string, any> = $state({});

	// Handlers
	const addMarker = ({ lngLat }: MapMouseEvent) => {
		if (selectedMap.markers.length >= MAX_MARKERS) return;
		selectedMap.markers.push({
			id: nanoid(),
			lngLat,
			title: ``,
			description: ''
		} as PoI);
		updateEditTime();
	};

	const deleteMarker = (id: string) => {
		selectedMap.markers = selectedMap.markers.filter((marker) => marker.id !== id);
		updateEditTime();
	};

	const updateEditTime = () => {
		selectedMap.lastEdited = Date.now();
	};

	const addMapAndActivate = (map: MonadMap) => {
		maps.value = { ...maps.value, [map.id]: map };
		selectedMapId.value = map.id;
	};

	const deleteMap = (map: MonadMap) => {
		const newMaps = Object.values(maps.value).filter((m) => m.id !== map.id);
		if (newMaps.length === 0) newMaps.unshift(blankMap());
		maps.value = newMaps.reduce((acc, m) => ({ ...acc, [m.id]: m }), {});
		selectedMapId.value = newMaps[0].id;
	};
</script>

<div class="print:min-w-3xl print:min-w-3xl flex h-full max-h-full flex-col">
	<Toolbar map={selectedMap} onAddMap={addMapAndActivate} onDeleteMap={deleteMap} />
	{#if selectedMap}
		<div
			class="grid max-h-full grow grid-rows-2 gap-2 lg:grid-cols-3 lg:grid-rows-1 print:grid-cols-1 print:grid-rows-2 print:gap-0"
		>
			<PrintableMap
				markers={selectedMap.markers}
				bind:zoom={selectedMap.zoom}
				bind:center={selectedMap.center}
				{addMarker}
				class="lg:col-span-2 print:hidden"
			/>
			<div class="flex max-h-full flex-col gap-2">
				<div class="flex items-center justify-between px-2 font-nova lg:pl-0">
					<h2 class="text-xl">Points of Interest</h2>
					<span class="text-lg print:hidden">{selectedMap.markers.length}/{MAX_MARKERS}</span>
				</div>
				<div
					id="poi-list"
					class="flex h-full flex-col gap-2 overflow-y-auto px-2 lg:pl-0 print:overflow-y-visible"
				>
					{#if selectedMap.markers.length === 0}
						<PoiListPlaceholder />
					{:else}
						{#each selectedMap.markers as marker, i (marker.id)}
							<PointOfInterest
								{marker}
								index={i}
								bind:this={poiCards[marker.id]}
								onUpdateEditTime={updateEditTime}
								onDeleteMarker={() => deleteMarker(marker.id)}
							/>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	#poi-list {
		max-height: calc(100dvh - 6rem);
	}

	@media (max-width: theme('screens.lg')) {
		#poi-list {
			max-height: calc((100dvh - 9rem) / 2);
		}
	}

	#marker-placeholder {
		clip-path: polygon(
			0 0,
			100% 0,
			100% calc(100% - theme('size.8')),
			calc(100% - theme('size.8')) 100%,
			0 100%
		);
		background: linear-gradient(135deg, transparent calc(100% - (theme('size.8') / sqrt(2)) - 1px))
			bottom right;
	}
</style>
