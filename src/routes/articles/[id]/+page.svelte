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

            <div>
				<h2>Comments</h2>

				<div>
					{#each data.comments as comment}
						<p>
							<span>{comment.name}: </span>
							{comment.text}
						</p>
					{/each}
				</div>

				<form action="?/comment" method="POST" use:enhance>
					<input type="hidden" name="article_id" value={article.id} />

					<div>
						<label for="name">Your Name</label>
						<input type="text" name="name" required/>
					</div>

					<div>
						<label for="comment">Your Comment</label>
						<textarea name="comment" required></textarea>
					</div>

					<button type="submit">Add Comment</button>
				</form>
			</div>
		</div>
	{/each}