
<script>
	import { flip } from 'svelte/animate';
	let { data } = $props();
</script>


<h1>Insta Photos</h1>

<main>

	<div>
		{#each data.articles as article (article.id)}
			<div animate:flip>
                <img src={article.image} alt="uploadedImage" />
				<p>{article.votes} ❤️</p>
			</div>
		{/each}
	</div>
</main>