<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	import { slide } from 'svelte/transition';

	let { data, form } = $props();
</script>

<header>
	<h1>ADMIN DASHBOARD</h1>

</header>

{#if form && !form.success}
	<Warning message={form.message} />
{/if}


	{#each data.articles as article (article.id)}
		<div class="box" transition:slide>
            <img src={article.image} alt="uploadedImage" />
			<p>{article.id} - {article.author} - {article.description} - {article.votes}</p>
		</div>
	{/each}