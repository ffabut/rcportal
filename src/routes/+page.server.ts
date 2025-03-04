// +page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const res = await fetch('https://www.researchcatalogue.net/portal/search-result?resulttype=research&format=json&limit=2500&page=0');
		if (!res.ok) {
			throw new Error(`Failed to fetch (status: ${res.status})`);
		}
		
		const data = await res.json();
        console.log("DATA:", data)
		// Assuming data.items is the array you need:
		return {
			items: data ?? []
		};
	} catch (err) {
		return {
			items: [],
			error: (err as Error).message
		};
	}
};
