import type { LngLat } from 'maplibre-gl';

/** A Point of interest on the map */
export type PoI = {
	/** A unique ID of the PoI */
	id: string;
	/** The LngLat position of the PoI */
	lngLat: LngLat;
	/** The title of the PoI */
	title: string;
	/** The description of the PoI */
	description: string;
};

/** A user-edited map */
export type MonadMap = {
	/** A unique ID of the map */
	id: string;
	/** The name of the map, as displayed and set by the user */
	name: string;
	/** The timestamp when the map was last edited */
	lastEdited: number;
	/** The point-of-interest map */
	markers: PoI[];
	/** The zoom level of the map */
	zoom: number;
	/** The center of the map */
	center: [number, number];
};
