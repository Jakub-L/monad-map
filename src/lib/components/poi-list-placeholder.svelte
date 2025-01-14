<script lang="ts">
	import IconMapPin from '~icons/ion/location-outline';

	interface Props {
		hideSubtitle?: boolean;
	}

	const { hideSubtitle = false }: Props = $props();
</script>

<div
	id="marker-placeholder"
	class="flex grow flex-col items-center justify-center !bg-red-950/40 p-8 opacity-90"
>
	<IconMapPin class="mb-4 size-10 opacity-70" />
	<span class="font-nova text-lg">No points of interest.</span>
	<span class={['text-sm', hideSubtitle && 'hidden']}>Click on the map to add a marker.</span>
</div>

<style>
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
