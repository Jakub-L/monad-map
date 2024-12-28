import type { LngLat } from 'maplibre-gl';

export type Marker = {
	id: string;
	lngLat: LngLat;
	title: string;
	description: string;
};
