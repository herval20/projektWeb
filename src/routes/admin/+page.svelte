<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	import { slide } from 'svelte/transition';

	let { data, form } = $props();
</script>

<header>
	<h1>ADMIN DASHBOARD</h1>
    <form action="/logout?/logout" method="POST">

        <a href="/admin/new">Create a new article</a>

        <button type="submit">Log out</button>
        </form>
</header>

{#if form && !form.success}
	<Warning message={form.message} />
{/if}


	{#each data.articles as article (article.id)}
		<div class="box" transition:slide>
            <img src={article.image} alt="uploadedImage" />
			<p>{article.id} - {article.author} - {article.description} - {article.votes}</p>
            <form action="?/deleteArticle" method="POST" use:enhance>
				<input type="hidden" name="id" value={article.id} />
				<button type="submit">Delete</button>
			</form>
		</div>
	{/each}