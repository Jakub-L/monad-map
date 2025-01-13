<script lang="ts">
	// Components
	import IconButton from '$lib/components/base/icon-button.svelte';
	import Input from '$lib/components/base/input.svelte';
	
	// Icons
	import IconCheck from '~icons/ion/checkmark-sharp';
	import IconClose from '~icons/ion/close-sharp';
	import IconEdit from '~icons/ion/edit';
	import IconTrash from '~icons/ion/trash-bin-sharp';
	
	// Utils
	import { MAX_DESCRIPTION, MAX_TITLE } from '$lib/constants';
	
	// Types
	import type { PoI } from '$lib/types';
	
	// Props
	interface Props {
		marker: PoI;
		index: number;
		readOnly?: boolean;
		onUpdateEditTime: () => void;
		onDeleteMarker: (id: string) => void;
	}

	let { marker, index, readOnly, onUpdateEditTime, onDeleteMarker }: Props = $props();

	// State
	let isEditing: boolean = $state(false);
	let editTitle: string = $state('');
	let editDescription: string = $state('');
	let textArea: HTMLTextAreaElement;

	// Handlers
	const onEdit = () => {
		editTitle = marker.title.trim();
		editDescription = marker.description.trim();
		isEditing = true;
	};

	const onCancel = () => {
		isEditing = false;
	};

	const onSave = () => {
		marker.title = editTitle;
		marker.description = editDescription;
		isEditing = false;
		onUpdateEditTime();
	};

	const onDelete = () => {
		onDeleteMarker(marker.id);
	};

	const onKeyDown = (event: KeyboardEvent): void => {
		const modifierKey = event.shiftKey || event.altKey || event.ctrlKey || event.metaKey;
		if ((event.key === 'Enter' || event.key === 'Return') && !modifierKey) onSave();
	};
</script>

<div
	class="truncated-rect-8 flex w-full break-inside-avoid flex-col gap-1 border border-red-500 p-2 print:border-red-900"
>
	<div class="flex items-center gap-2">
		<span class="min-w-6 text-center font-nova text-xl">{index + 1}</span>
		{#if isEditing}
			<Input
				{onKeyDown}
				bind:value={editTitle}
				classOverrides="font-nova"
				maxLength={MAX_TITLE}
				placeholder="Enter location title..."
				title="Point of interest title"
			/>
		{:else}
			<div class="flex min-h-9 grow items-center px-[5px]">
				<h3 class="font-nova">{marker.title || 'No point of interest title'}</h3>
			</div>
		{/if}
		<div class={['mr-2 flex gap-1', readOnly && '!hidden']}>
			{#if isEditing}
				<IconButton label="Save" Icon={IconCheck} onClick={onSave} />
				<IconButton label="Cancel" Icon={IconClose} onClick={onCancel} />
			{:else}
				<IconButton label="Edit" Icon={IconEdit} onClick={onEdit} />
				<IconButton label="Delete" Icon={IconTrash} onClick={onDelete} />
			{/if}
		</div>
	</div>
	{#if isEditing}
		<div class="mr-2 flex flex-col">
			<span class="flex justify-end pr-3 text-xs lowercase">
				{editDescription.length}/{MAX_DESCRIPTION}
			</span>
			<Input
				{onKeyDown}
				classOverrides="mb-2 text-sm"
				isTextarea
				maxLength={MAX_DESCRIPTION}
				placeholder="Enter location description..."
				title="Point of interest description"
				bind:value={editDescription}
			/>
		</div>
	{:else}
		<p
			class="mb-2 mr-2 whitespace-pre-wrap border-t border-red-500/50 px-1 pt-1 text-sm opacity-85 print:border-red-900/50 print:opacity-95"
		>
			{marker.description || 'No point of interest description.'}
		</p>
	{/if}
</div>
