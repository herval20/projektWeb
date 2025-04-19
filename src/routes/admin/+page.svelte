<script>
	import { enhance } from '$app/forms';
	import Warning from '$lib/components/Warning.svelte';
	import { slide } from 'svelte/transition';

	let { data, form } = $props();
</script>

<div class="bg-black min-h-screen text-white px-6 py-8">
	<header class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
		<h1 class="text-3xl font-bold">ADMIN DASHBOARD</h1>

		<form action="/logout?/logout" method="POST" class="flex flex-col md:flex-row gap-3">
			<a href="/" class="inline-flex items-center gap-2 text-pink-400 hover:bg-gray-800 px-3 py-2 rounded-md transition mb-6">
                ← Back to Home
            </a>
            <a href="/admin/new" class="inline-flex items-center gap-2 text-pink-400 hover:bg-gray-800 px-3 py-2 rounded-md transition mb-6">
                Create a new article
            </a>
            <button type="submit" class="inline-flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md transition mb-6">
                Log out
            </button>
		</form>
	</header>

	{#if form && !form.success}
		<Warning message={form.message} />
	{/if}

	<div class="space-y-8">
		{#each data.articles as article (article.id)}
			<div transition:slide class="bg-gray-900 rounded-xl p-6 shadow-md space-y-4">
				<img src={article.image} alt="uploadedImage" class="w-full max-h-80 object-contain rounded-md" />
				<p class="text-gray-300">ID: {article.id} - Author: {article.author} - Description: {article.description} - ❤️ {article.votes}</p>

				<form action="?/deleteArticle" method="POST" use:enhance>
					<input type="hidden" name="id" value={article.id} />
					<button type="submit" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md">Delete</button>
				</form>
			</div>
		{/each}
	</div>
</div>
