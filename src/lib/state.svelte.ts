import { browser } from '$app/environment';

import type { PoI } from '$lib/types';

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

export const markers = localStore<PoI[]>('monad/markers', []);
export const zoom = localStore<number>('monad/zoom', 14);
export const center = localStore<[number, number]>('monad/center', [-122.34062, 47.60556]);
