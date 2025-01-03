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
			class="dialog-content fixed left-[50%] top-[50%] max-w-fit z-10 w-full translate-x-[-50%] translate-y-[-50%] border border-red-500 bg-slate-950 p-2"
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

<style>
	:global(.dialog-content) {
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
		background:
			linear-gradient(
					135deg,
					transparent calc(100% - (2rem / sqrt(2)) - 1px),
					#ef4444 calc(100% - (2rem / sqrt(2)) - 1px)
				)
				bottom right,
			#020617; /* slate-950 */
		background-origin: border-box;
	}
</style>
