<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: data;
</script>

// crud on missing_persons // display log w/ filter
<br><br><br><br>
<div class="flex justify-center items-center m-auto text-center w-full max-w-xs pt-18">
	<form method="POST" class="2xl bg-white shadow-md rounded px-12 pt-6 pb-10 mb-4">
		<label class="block text-gray-700 text-md font-bold mb-2"for="file">Name:</label>
		<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"type="text" name="name" placeholder="Name" /><br><br>
		<label class="block text-gray-700 text-md font-bold mb-2"for="file">Location last seen:</label>
		<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"type="text" name="location" placeholder="Location last seen" /><br><br>
		<label class="block text-gray-700 text-md font-bold mb-2"for="file">Date last seen:</label>
		<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="date" placeholder="Date last seen" /><br><br>
		
		<label class="block text-gray-700 text-md font-bold mb-2"for="file">Upload picture</label><br>
		<div class="flex items-center justify-center text-center">
		<input class=" m-auto text-lg rounded-lg absolute lg bg-[#f1d592] drop-shadow-lg hover:bg-[#e6c984] py-2 px-4 w-72" type="file"name="photo_path"
		placeholder="Photo path"
		accept=".jpg, .jpeg, .png"
		required/><br><br>
		</div>
	</form>

	</div>
	<br><div class="flex items-center justify-center text-center">
		<button class="text-xl m-auto rounded-lg absolute lg bg-[#f1d592] drop-shadow-lg hover:bg-[#e6c984] py-2 px-4"formaction="?/create">Submit</button>
	</div>	


<{#each data.missing_persons as missing_person}
	{missing_person.photo_path}
	{missing_person.name}
	{missing_person.location_last_seen}
	{missing_person.date_last_seen}
	<form action="?/delete&id={missing_person.id}" method="POST">
		<button class="border-2 p-1" type="submit">Delete Missing Person</button>
	</form>
{/each}
{data.result}
