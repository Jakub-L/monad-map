<script lang="ts">
	// Components
	import PrintableMap from '$lib/components/printable-map.svelte';
	import Toolbar from '$lib/components/toolbar.svelte';
	import PointOfInterest from '$lib/components/point-of-interest.svelte';
	import PoiListPlaceholder from '$lib/components/poi-list-placeholder.svelte';

	// Types
	import type { PageData } from './+page';

	// Props
	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	// State
	let map = $state(data.map);
</script>

<div class="print:min-w-3xl print:min-w-3xl flex h-full max-h-full flex-col">
	<Toolbar readOnly bind:map />
	<div
		class="grid max-h-full grow grid-rows-2 gap-2 lg:grid-cols-3 lg:grid-rows-1 print:grid-cols-1 print:grid-rows-2 print:gap-0"
	>
		<PrintableMap
			class="lg:col-span-2"
			bind:zoom={map.zoom}
			bind:center={map.center}
			bind:markers={map.markers}
			readOnly
		/>
		<div class="flex max-h-full flex-col gap-2">
			<h2 class="px-2 font-nova text-xl lg:pl-0">Points of Interest</h2>
			<div
				id="poi-list"
				class="flex h-full flex-col gap-2 overflow-y-auto px-2 lg:pl-0 print:overflow-y-visible"
			>
				{#if map.markers.length === 0}
					<PoiListPlaceholder hideSubtitle />
				{:else}
					{#each map.markers as marker, i (marker.id)}
						<PointOfInterest {marker} index={i} readOnly />
					{/each}
				{/if}
			</div>
		</div>
	</div>
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
</style>
