import { browser } from '$app/environment';

import type { MonadMap, PoI } from '$lib/types';

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
