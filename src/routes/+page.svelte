<script lang="ts">
	import '../app.css';
	import { nanoid } from 'nanoid';

	// Components
	import PrintableMap from '$lib/components/printable-map.svelte';
	import PointOfInterest from '$lib/components/point-of-interest.svelte';
	import Toolbar from '$lib/components/toolbar.svelte';
	import IconMapPin from '~icons/ion/location-outline';

	// Types
	import type { MapMouseEvent } from 'maplibre-gl';
	import type { MonadMap, PoI } from '$lib/types';

	// Utils
	import { MAX_MARKERS } from '$lib/constants';

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
			title: `Lorem ipsum dolor sit amet, consectetur cras amet.`,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu justo vestibulum, pulvinar urna non, ornare nisi. Pellentesque dignissim tincidunt leo a pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer lorem nulla, mollis laoreet bibendum id, gravida in risus. Mauris facilisis mi volutpat ipsum dapibus, et molestie sapien finibus augue.'
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
</script>

<div class="flex h-full max-h-full flex-col print:min-w-3xl print:min-w-3xl">
	<Toolbar />
	{#if selectedMap}
		<div
			class="grid max-h-full grow grid-rows-2 gap-2 lg:grid-cols-3 lg:grid-rows-1 print:grid-cols-1 print:grid-rows-2 print:gap-0"
		>
			<PrintableMap
				markers={selectedMap.markers}
				bind:zoom={selectedMap.zoom}
				bind:center={selectedMap.center}
				{addMarker}
				class="lg:col-span-2"
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
						<div
							id="marker-placeholder"
							class="flex grow flex-col items-center justify-center !bg-red-950/40 p-8 opacity-90"
						>
							<IconMapPin class="mb-4 size-10 opacity-70" />
							<span class="font-nova text-lg">No points of interest.</span>
							<span class="text-sm">Click on the map to add a marker.</span>
						</div>
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
