import { browser } from '$app/environment';

import type { MonadMap } from '$lib/types';
import type { Map } from 'svelte-maplibre';

class LocalStore<T> {
	public value: T = $state<T>() as T;
	public key: string = '';

	constructor(key: string, value: T) {
		this.key = key;
		this.value = value;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) this.value = JSON.parse(item);
		}

		$effect.root(() => {
			$effect(() => {
				localStorage.setItem(this.key, JSON.stringify(this.value));
			});
			return () => {};
		});
	}
}

function localStore<T>(key: string, value: T) {
	return new LocalStore(key, value);
}

export const selectedMapId = localStore<string>('monad/selectedMapId', '1');
export const maps = localStore<Record<string, MonadMap>>('monad/maps', {
	'1': {
		id: '1',
		name: 'Campaign map for Seattle',
		lastEdited: Date.now(),
		markers: [],
		zoom: 14,
		center: [-122.34062, 47.60556]
	}
});
export const mapRef: { val: Map | undefined } = $state({ val: undefined });

export const textLayers = [
	{ id: 'water_name', name: 'Bodies of water' },
	{ id: 'place_country_major', name: 'Major countries' },
	{ id: 'place_country_minor', name: 'Minor countries' },
	{ id: 'place_country_other', name: 'Other countries' },
	{ id: 'place_state', name: 'States, territories and provinces' },
	{ id: 'place_city_large', name: 'Major cities' },
	{ id: 'place_city', name: 'Cities' },
	{ id: 'place_town', name: 'Towns' },
	{ id: 'place_village', name: 'Villages' },
	{ id: 'place_suburb', name: 'Suburbs and subdivisions' },
	{ id: 'highway_name_motorway', name: 'Highways and motorways' },
	{ id: 'highway_name_other', name: 'Roads and streets' },
	{ id: 'place_other', name: 'Other labels' }
];

export const textLayersState = localStore<Record<string, boolean>>(
	'monad/textLayersState',
	textLayers.reduce((acc, layer) => ({ ...acc, [layer.id]: true }), {})
);
