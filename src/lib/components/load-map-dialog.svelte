<script lang="ts">
	import { Dialog } from 'bits-ui';

	interface Props {
		open: boolean;
	}

	let { open = $bindable() } = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-10 bg-slate-950/80" />
		<Dialog.Content
			class="truncated-rect fixed left-[50%] top-[50%] z-10 w-full max-w-fit translate-x-[-50%] translate-y-[-50%] border border-red-500 !bg-slate-950 p-2"
		>
			<Dialog.Title class="font-nova">Load a map</Dialog.Title>
			<Dialog.Description></Dialog.Description>
			<Dialog.Close
				class="h-input rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 focus-visible:ring-dark focus-visible:ring-offset-background active:scale-98 inline-flex items-center justify-center px-[50px] text-[15px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
				>Aaa</Dialog.Close
			>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
