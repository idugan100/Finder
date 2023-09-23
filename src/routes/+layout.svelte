<script>
	import '../app.postcss';
</script>

<nav class="flex gap-6 bg-[#f1d592] h-30">
	<a class="text-xl hover:bg-[#e6c984] rounded pl-5" href="/">Home</a>
	<a class="text-xl hover:bg-[#e6c984] rounded"href="/viewer">View</a>
	<div class="ml-auto ">
		{#if true}
			<button class="text-xl hover:hover:bg-[#e6c984] rounded pr-5">Sign out</button>
		{:else}
			<button class="text-xl hover:hover:bg-[#e6c984] rounded pr-5">Log in</button>
		{/if}
	</div>
</nav>



<slot />
