import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import fs from 'fs/promises';

let status: number = 0;
export const actions: Actions = {
	processImage: async ({ request, fetch }) => {
		const data = await request.formData();
		var input = data.get('clip') as string;

		const binaryString = input.replace(/^data:image\/\w+;base64,/, '');
		console.log(binaryString);
		const buffer = Buffer.from(binaryString, 'base64');
		console.log(buffer);
		await fs.writeFile('/Users/jamesmontebell/Github/Finder/static/image.jpeg', buffer);

		var data1 = fs.readFile('/Users/jamesmontebell/Github/Finder/src/routes/viewer/man.jpeg');

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
