import type { Marker } from './types';

export const center = $state<[number, number]>([-122.34062, 47.60556]);
export const zoom = $state<number>(14);

export const markers = $state<Marker[]>([]);
