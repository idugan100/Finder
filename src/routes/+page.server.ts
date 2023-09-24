import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/server';
import type { admin_users } from '$lib/types';
import { onMount } from 'svelte';

let loginResult = '';

export const actions: Actions = {
	login: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const username = data.username;
		const password = data.password;

		(await db)
			.query(
				`SELECT * FROM admin_users WHERE username = "${username}" and password = "${password}"`
			)
			.then(() => {
				loginResult = 'Logged in';
			})
			.catch(() => {
				loginResult = 'Error logging in';
			});
	}
} satisfies Actions;

export const load = (async () => {
	var [rows] = await (await db).query('SELECT * FROM admin_users');

	if (loginResult == 'Logged in') {
		throw redirect(303, '/admin');
	}

	return {
		admin_users: rows as admin_users[],
		response: loginResult
	};
}) satisfies PageServerLoad;
