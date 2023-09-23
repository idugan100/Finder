<script>
	import '../app.postcss';
</script>

<nav class="flex gap-6">
	<a href="/">Home</a>
	<a href="/viewer">View</a>
	<div class="ml-auto">
		{#if true}
			<button>Sign out</button>
		{:else}
			<button>Log in</button>
		{/if}
	</div>
</nav>

<slot />
