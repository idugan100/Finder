import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

import { FACE_KEY, FACE_SECRET } from '$env/static/private';
import fs from 'fs/promises';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import { db } from '$lib/server/server';

let status: number = 0;
export const actions: Actions = {
	processImage: async ({ request, fetch }) => {
		const data = await request.formData();
		var input = data.get('clip') as string;
		const location = data.get('location') as string;

		const binaryString = input.replace(/^data:image\/\w+;base64,/, '');
		console.log(binaryString);
		const buffer = Buffer.from(binaryString, 'base64');
		console.log(buffer);
		await fs.writeFile('/Users/jamesmontebell/Github/Finder/static/image.jpeg', buffer);

		var data1 = fs.readFile('/Users/jamesmontebell/Github/Finder/src/routes/viewer/man.jpeg');

		if (data.get('clip')) {
			status = 200;
			//make file
			let input = data.get('clip') as string;
			let filename_string = Math.random() + '.jpeg';
			const binaryString = input.replace(/^data:image\/\w+;base64,/, '');
			const buffer = Buffer.from(binaryString, 'base64');
			await fs.writeFile('/Users/jamesmontebell/Github/Finder/static/' + filename_string, buffer);
			//upload to google cloud
			const gc = new Storage({
				keyFilename: '/Users/jamesmontebell/Github/Finder/screech-1687741414735-3966f7cd4f7b.json',
				projectId: 'screech-1687741414735'
			});
			async function uploadFile() {
				try {
					await gc
						.bucket('hackumbc1')
						.upload('/Users/jamesmontebell/Github/Finder/static/' + filename_string); // Replace with the path to your local file
					console.log(`File uploaded to bucket.`);
				} catch (err) {
					console.error('Error uploading file:', err);
				}
			}

			await uploadFile();
			//for each missing person
			var [rows1] = await (await db).query('SELECT * FROM missing_persons');
			console.log(rows1);
			for (const row of rows1 as any[]) {
				// Access individual properties of each row using row.propertyName
				// Do something with the data here
				console.log(row);
				try {
					const apiUrl =
						'https://api-us.faceplusplus.com/facepp/v3/compare?api_key=' +
						FACE_KEY +
						'&api_secret=' +
						FACE_SECRET +
						'&image_url1=' +
						row.photo_path +
						'&image_url2=https://storage.googleapis.com/hackumbc1/' +
						filename_string;

					const response = await fetch(apiUrl, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json' // Set the content type to JSON
						}
					});

					if (response.ok) {
						const responseData = await response.json();
						console.log(responseData);
						(await db).query(
							`INSERT INTO log (clip_path, prc_match, location, person_id) VALUES ("${
								'https://storage.googleapis.com/hackumbc1/' + filename_string
							}","${responseData.confidence}", "${location}","${row.id}" )`
						);
						//
					} else {
						console.error('Error:', response.statusText);
					}
				} catch (error) {
					console.error('Error:', error);
				}
			}
		} else {
			status = 400;
		}
		return {
			response: status
		};
	}
};

console.log(status);

export const load = (async () => {
	return {
		response: status
	};
}) as PageServerLoad;
