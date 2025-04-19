<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<a href="/">← Back</a>

	{#each data.articles as article (article.id)}
		<div transition:slide>
            <img src={article.image} alt="uploadedImage" />
			<p>{article.author} - {article.description} - {article.votes}</p>
            <form action="?/like" method="POST" use:enhance>
                <input type="hidden" name="id" value={article.id} />
                <button type="submit" aria-label="Like">
                <img src="https://mrg7lubbiiexsyqp.public.blob.vercel-storage.com/projektPhotos/like-kYOU8svw09AFPoplrkMjE2NsWWFQY5.png" alt="like">
                </button>
            </form>
		</div>
	{/each}