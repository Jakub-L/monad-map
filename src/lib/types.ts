import type { LngLat } from 'maplibre-gl';

export type PoI = {
	id: string;
	lngLat: LngLat;
	title: string;
	description: string;
};
