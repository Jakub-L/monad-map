import type { LngLat } from 'maplibre-gl';

export type PoI = {
	id: string;
	lngLat: LngLat;
	title: string;
	description: string;
};

export type MonadMap = {
	id: string;
	name: string;
	markers: PoI[];
	zoom: number;
	center: [number, number];
};
