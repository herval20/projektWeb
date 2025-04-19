<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<a href="/">← Back</a>

	{#each data.articles as article (article.id)}
		<div class="box" transition:slide>
            <img src={article.image} alt="uploadedImage" />
			<p>{article.author} - {article.description} - {article.votes}</p>
		</div>
	{/each}