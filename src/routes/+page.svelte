<!-- +page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';

	// SvelteKit will inject `data`, which includes `items` and possibly `error`.
	export let data: PageData;

	// Destructure so we don’t have to keep writing `data.items`
	const { items = [], error } = data;
</script>

<h1>Faculty of Fine Arts</h1>

{#if error}
	<p style="color: red;">Failed to load data: {error}</p>
{:else if items.length > 0}
	<ul>
		{#each items as item}
			<li>
				<strong>{item.title}</strong><br/>
				<em>{item.keywords}</em>
			</li>
		{/each}
	</ul>
{:else}
	<p>No items found.</p>
{/if}

<style>
	/* Add any styling you need here */
</style>
