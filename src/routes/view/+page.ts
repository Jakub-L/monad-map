import type { MonadMap } from '$lib/types';

export type PageData = {
	map: MonadMap;
};

export const load = ({ url }: any): PageData => {
	return { map: JSON.parse(atob(url.searchParams.get('map'))) };
};
