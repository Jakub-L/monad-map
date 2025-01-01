import { browser } from '$app/environment';

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

		$effect(() => {
			localStorage.setItem(this.key, JSON.stringify(this.value));
		});
	}
}

export function localStore<T>(key: string, value: T) {
	return new LocalStore(key, value);
}
