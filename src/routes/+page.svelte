<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="flex justify-center m-auto">
	<div class="text-3xl">
		<img class="w-full object-contain min-h-0 h-44" src="./FinderLogo.png" alt="oops" />
	</div>
</div>
<br />
<button
	class="flex justify-center m-auto rounded-lg text-center 6xl bg-[#f1d592] drop-shadow-lg hover:bg-[#e6c984] py-2 px-4"
	><a class="flex m-auto text-2xl text-center" href="/viewer">Start Camera</a></button
>
<br /><br /><br />
<div class="flex justify-center m-auto"><div class="text-3xl">Admin Panel</div></div>
<br />

<div class="flex justify-center items-center m-auto text-center w-full max-w-xs">
	<form method="POST" class=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		<div class=" mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				id="username"
				type="text"
				placeholder="Username"
			/>
		</div>
		<div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				id="password"
				type="password"
				placeholder="Password"
			/>
		</div>
		<div class="flex items-center justify-center text-center">
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				formaction="?/login"
			>
				Sign In
			</button>
		</div>
	</form>
</div>

{data.response}
