import { nanoid } from 'nanoid';
import { DEFAULT_CENTER, DEFAULT_ZOOM, FIT_BOUNDS_PADDING } from '$lib/constants';
import type { MonadMap, PoI } from '$lib/types';
import type { Map, LngLatBoundsLike } from 'svelte-maplibre';

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

/**
 * Normalizes a filename string to use only lowercase alphanumeric characters and hyphens.
 * @param {string} name - The filename to normalize.
 * @param {string} [fallback=""] - The fallback filename to use if the name is empty.
 * @returns {string} The normalized filename.
 */
export const normalizeFilename = (name: string, fallback: string = ''): string => {
	return (name || fallback)
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, '')
		.trim()
		.replace(/\s+/g, '-');
};

/**
 * Hides selected layers on the map.
 * @param {Map} map - The map to add the source to.
 * @param {string[]} layers - The IDs of the layers to hide.
 */
export const hideLayers = (map: Map, layers: string[]) => {
	for (const layer of layers) {
		map.setLayoutProperty(layer, 'visibility', 'none');
	}
};

/**
 * Shows selected layers on the map.
 * @param {Map} map - The map to add the source to.
 * @param {string[]} layers - The IDs of the layers to show.
 */
export const showLayers = (map: Map, layers: string[]) => {
	for (const layer of layers) {
		map.setLayoutProperty(layer, 'visibility', 'visible');
	}
};

/**
 * Add a data source to the map for the markers.
 *
 * @param {Map} map - The map to add the source to.
 * @param {PoI[]} markers - The markers to add to the map.
 */
export const addMarkerSource = (map: Map, markers: PoI[]) => {
	map.addSource('markers', {
		type: 'geojson',
		data: {
			type: 'FeatureCollection',
			features: [
				...markers.map(
					({ lngLat }, i) =>
						({
							type: 'Feature',
							geometry: {
								type: 'Point',
								coordinates: [lngLat.lng, lngLat.lat]
							},
							properties: {
								index: i + 1
							}
						}) as any
				)
			]
		}
	});
};

/**
 * Draw the markers on the map.
 *
 * @param {Map} map - The map to draw the markers on.
 */
export const drawMarkers = (map: Map) => {
	map.addLayer({
		id: 'markers-circles',
		type: 'circle',
		source: 'markers',
		paint: {
			'circle-radius': 16,
			'circle-color': 'rgba(2, 6, 23)',
			'circle-stroke-width': 2,
			'circle-stroke-color': 'rgb(239, 68, 68)'
		}
	});

	map.addLayer({
		id: 'markers-labels',
		type: 'symbol',
		source: 'markers',
		layout: {
			'text-field': '{index}',
			'text-font': ['nova-square'],
			'text-size': 12,
			'text-justify': 'center'
		},
		paint: { 'text-color': 'white' }
	});
};

/**
 * Clear the markers from the map.
 *
 * @param {Map} map - The map to clear the markers from.
 */
export const clearMarkers = (map: Map) => {
	map.removeLayer('markers-labels');
	map.removeLayer('markers-circles');
	map.removeSource('markers');
};
