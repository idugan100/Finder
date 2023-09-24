<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: data;
</script>

<form method="POST">
	<label for="file">Upload picture</label>
	<input
		type="file"
		name="photo_path"
		placeholder="Photo path"
		accept=".jpg, .jpeg, .png"
		required
	/>
	<input type="text" name="name" placeholder="Name" />
	<input type="text" name="location" placeholder="Location last seen" />
	<input type="text" name="date" placeholder="Date last seen" />
	<button formaction="?/create">Submit</button>
</form>

{#each data.missing_persons as missing_person}
	{missing_person.photo_path}
	{missing_person.name}
	{missing_person.location_last_seen}
	{missing_person.date_last_seen}
	<form action="?/delete&id={missing_person.id}" method="POST">
		<button class="border-2 p-1" type="submit">Delete Missing Person</button>
	</form>
{/each}
{data.result}
