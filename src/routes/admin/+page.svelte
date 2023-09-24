<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: data;
	onMount(() => {
		console.log(data);
	});
</script>

<br /><br /><br /><br />
<div class="flex justify-center items-center m-auto text-center w-full max-w-xs pt-18">
	<form method="POST" class="2xl bg-white shadow-md rounded-lg px-16 pt-6 pb-10 mb-4">
		<label class="block text-gray-700 text-md font-bold mb-2" for="file">Name:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			type="text"
			name="name"
			placeholder="Name"
		/><br /><br />
		<label class="block text-gray-700 text-md font-bold mb-2" for="file">Location last seen:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			type="text"
			name="location"
			placeholder="Location last seen"
		/><br /><br />
		<label class="block text-gray-700 text-md font-bold mb-2" for="file">Date last seen:</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			type="text"
			name="date"
			placeholder="Date last seen"
		/><br /><br />

		<label class="block text-gray-700 text-md font-bold mb-2" for="file">Upload photo URL:</label
		><br />
		<div class="flex items-center justify-center text-center">
			<input
				class="m-auto text-lg rounded-lg absolute lg bg-[#f1d592] drop-shadow-lg hover:bg-[#e6c984] py-2 px-4 w-72"
				type="text"
				name="photo_path"
				placeholder="Photo URL"
				accept=".jpg, .jpeg, .png"
				required
			/><br /><br />
		</div>
		<div class="flex items-center justify-center text-center pt-10">
			<button
				class="text-xl m-auto rounded-lg absolute lg bg-[#f1d592] drop-shadow-lg hover:bg-[#e6c984] py-2 px-4"
				formaction="?/create">Submit</button
			>
		</div>
	</form>
</div>
<br />

<div class="">
	{#each data.missing_persons as missing_person}
		<div
			class="flex flex-col justify-center items-center 2xl bg-white shadow-md rounded-lg px-12 pt-6 pb-10 mb-4 w-1/3 m-auto gap-2"
		>
			<img class="rounded-lg" src={missing_person.photo_path} alt="" />
			<div>{missing_person.name}</div>
			<div>{missing_person.location_last_seen}</div>
			<div>{missing_person.date_last_seen}</div>
			<form action="?/delete&id={missing_person.id}" method="POST">
				<button
					class="text-xl m-auto rounded-lg lg bg-red-500/80 hover:bg-red-500 py-2 px-4 indent-0"
					type="submit">Delete Missing Person</button
				>
			</form>
		</div>
	{/each}
	<div class="flex justify-center">
		<h1 class="text-5xl font-bold">Logs</h1>
	</div>

	{#each data.log as log}
		{#if log.prc_match > 50}
			<div
				class="flex flex-col justify-center items-center 2xl bg-white shadow-md rounded-lg px-12 pt-6 pb-10 mb-4 w-1/3 m-auto gap-2"
			>
				<img class="rounded-lg" src={log.clip_path} alt="" />
				<div class="text-1xl font-bold">{'Possible match for: ' + log.name}</div>
				<div>{log.prc_match}%</div>
				<div>{log.location}</div>
				<div>{log.time}</div>
			</div>
		{/if}
	{/each}
</div>

{data.result}
