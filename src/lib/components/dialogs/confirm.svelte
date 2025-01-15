<script lang="ts">
	import { AlertDialog } from 'bits-ui';

	interface Props {
		open: boolean;
		title?: string;
		description?: string;
		actionText: string;
		onAction: () => void;
	}

	let {
		open = $bindable(),
		title,
		description = 'This action cannot be undone.',
		actionText,
		onAction
	}: Props = $props();
</script>

<AlertDialog.Root bind:open>
	<AlertDialog.Portal>
		<AlertDialog.Overlay class="fixed inset-0 z-10 bg-slate-950/80" />
		<AlertDialog.Content
			class="truncated-rect-8 fixed left-[50%] top-[50%] z-10 flex w-full max-w-fit translate-x-[-50%] translate-y-[-50%] flex-col gap-4 border border-red-500 !bg-slate-950 px-6 py-4"
		>
			<AlertDialog.Title class="font-nova text-xl">{title}</AlertDialog.Title>
			<AlertDialog.Description>{description}</AlertDialog.Description>
			<div class="flex w-full gap-4 pr-4">
				<AlertDialog.Cancel
					class="h-10 w-full rounded-full border border-red-500/60 bg-red-950/20 px-2 py-1 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-700/60"
				>
					Cancel
				</AlertDialog.Cancel>
				<AlertDialog.Action
					class="h-10 w-full rounded-full border border-red-500 bg-red-950/40 px-2 py-1 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:scale-95 active:bg-red-700/60"
					onclick={onAction}
				>
					{actionText}
				</AlertDialog.Action>
			</div>
		</AlertDialog.Content>
	</AlertDialog.Portal>
</AlertDialog.Root>
