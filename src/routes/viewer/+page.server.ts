import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

let status: number = 0;

export const actions: Actions = {
	processImage: async ({ request }) => {
		const data = await request.formData();
		if (data.get('clip')) {
			status = 200;
		} else {
			status = 400;
		}
		return {
			response: status
		};
	}
} satisfies Actions;
console.log(status);
export const load = (async () => {
	return {
		response: status
	};
}) satisfies PageServerLoad;
