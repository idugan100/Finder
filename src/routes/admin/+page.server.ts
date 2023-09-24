import { db } from '$lib/server/server';
import type { log, missing_persons_final } from '$lib/types';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

let result = '';

export const actions: Actions = {
	create: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		// const data = await request.formData();
		const photo_path = data.photo_path;
		const name = data.name;
		const location = data.location;
		const date = data.date;

		(await db)
			.query(
				`INSERT INTO missing_persons (photo_path, name, location_last_seen, date_last_seen) VALUES ("${photo_path}", "${name}", "${location}", "${date}")`
			)
			.then(() => {
				result = 'Person added';
			})
			.catch(() => {
				result = 'Error adding person';
			});
	},
	delete: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) {
			result = 'Error deleting person';
		}
		(await db)
			.query(`DELETE FROM missing_persons WHERE id=${id}`)
			.then(() => {
				result = 'Person deleted';
			})
			.catch(() => {
				result = 'Error deleting person';
			});
	}
} satisfies Actions;

export const load = (async () => {
	var [rows] = await (await db).query('SELECT * FROM log');
	var [rows1] = await (await db).query('SELECT * FROM missing_persons');

	return {
		log: rows as log[],
		missing_persons: rows1 as missing_persons_final[],
		result
	};
}) satisfies PageServerLoad;
