<script lang="ts">
	import type { Component } from 'svelte';
	import type { PoI } from '$lib/types';

	import { MAX_DESCRIPTION, MAX_TITLE } from '$lib/constants';

	// Icons
	import IconCheck from '~icons/ion/checkmark-sharp';
	import IconClose from '~icons/ion/close-sharp';
	import IconEdit from '~icons/ion/edit';
	import IconTrash from '~icons/ion/trash-bin-sharp';

	// Props
	interface Props {
		marker: PoI;
		index: number;
		onUpdateEditTime: () => void;
		onDeleteMarker: (id: string) => void;
	}

	let { marker, index, onUpdateEditTime, onDeleteMarker }: Props = $props();

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

{#snippet iconButton(label: string, Icon: Component, fn?: () => void)}
	<button
		class="flex min-h-8 min-w-8 items-center justify-center rounded-full p-0.5 hover:bg-red-700/30 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-1 focus-visible:outline-red-400 active:bg-red-700/60"
		onclick={fn}
		aria-label={label}
		title={label}
	>
		<Icon class="h-5 w-5"></Icon>
	</button>
{/snippet}

<div class="truncated-rect-8 flex w-full flex-col gap-1 border border-red-500 p-2">
	<div class="flex items-center gap-2">
		<span class="min-w-6 text-center font-nova text-xl">{index + 1}</span>
		{#if isEditing}
			<input
				class="h-9 grow rounded-r-full border border-red-500 bg-red-950/40 p-1 font-nova hover:bg-red-700/30 focus:outline focus:outline-4 focus:-outline-offset-1 focus:outline-red-400 focus-visible:bg-red-950/80"
				name="title"
				onkeydown={onKeyDown}
				maxlength={MAX_TITLE}
				placeholder="Enter location title..."
				bind:value={editTitle}
			/>
		{:else}
			<div class="flex h-9 grow items-center px-[5px]">
				<h3 class="font-nova">{marker.title || 'No point of interest title'}</h3>
			</div>
		{/if}
		<div class="mr-2 flex gap-1">
			{#if isEditing}
				{@render iconButton('Save', IconCheck, onSave)}
				{@render iconButton('Cancel', IconClose, onCancel)}
			{:else}
				{@render iconButton('Edit', IconEdit, onEdit)}
				{@render iconButton('Delete', IconTrash, onDelete)}
			{/if}
		</div>
	</div>
	{#if isEditing}
		<div class="mr-2 flex flex-col">
			<span class="flex justify-end pr-3 text-xs lowercase">
				{editDescription.length}/{MAX_DESCRIPTION}
			</span>
			<textarea
				placeholder="Enter location description..."
				name="description"
				class="mb-2 rounded-r-[1.25rem] border border-red-500 bg-red-950/40 p-1 text-left text-sm placeholder:text-red-50/90 hover:bg-red-700/30 focus:outline focus:outline-4 focus:-outline-offset-1 focus:outline-red-400 focus-visible:bg-red-950/80"
				rows={4}
				maxlength={MAX_DESCRIPTION}
				bind:value={editDescription}
				onkeydown={onKeyDown}
			></textarea>
		</div>
	{:else}
		<p
			class="mb-2 mr-2 whitespace-pre-wrap border-t border-red-500/50 px-1 pt-1 text-sm opacity-85"
		>
			{marker.description || 'No point of interest description.'}
		</p>
	{/if}
</div>

<style>
	textarea {
		field-sizing: content;
	}
</style>
