import { nanoid } from 'nanoid';
import { DEFAULT_CENTER, DEFAULT_ZOOM } from '$lib/constants';
import type { MonadMap } from '$lib/types';

export const blankMap = (): MonadMap => {
	return {
		id: nanoid(),
		name: 'Unnamed map',
		lastEdited: Date.now(),
		center: DEFAULT_CENTER,
		zoom: DEFAULT_ZOOM,
		markers: []
	};
};
