<script>
	import { flip } from 'svelte/animate';
	let { data } = $props();
</script>

<main class="bg-gray-900 min-h-screen px-4 sm:px-6 lg:px-12 py-8 text-white flex flex-col items-center">
	<h1 class="text-3xl font-bold text-center mb-8">Insta Photos</h1>

	<div class="flex flex-col gap-8 w-full max-w-md">
		{#each data.articles as article (article.id)}
			<div
				animate:flip
				class="bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
			>
				<a href={`articles/${article.id}`} class="block">
					<img src={article.image} alt="uploadedImage" class="w-full h-64 object-cover" />
				</a>
				<div class="p-4 text-center text-lg font-semibold text-pink-400">
					{article.votes} ❤️
				</div>
			</div>
		{/each}
	</div>
</main>
