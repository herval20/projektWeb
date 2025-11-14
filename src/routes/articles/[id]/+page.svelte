<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	let { data } = $props();
  </script>
  
  <div class="bg-black min-h-screen text-white px-4 py-6">
	<a href="/" class="inline-flex items-center gap-2 text-pink-400 hover:bg-gray-800 px-3 py-2 rounded-md transition mb-6">
	  ← {$t('back_home')}
	</a>
  
	<div class="max-w-3xl mx-auto space-y-10">
	  {#each data.articles as article (article.id)}
		<div transition:slide class="bg-gray-900 rounded-xl p-6 shadow-lg space-y-4">
		  <img src={article.image} alt="uploadedImage" class="rounded-md w-full object-cover max-h-80" />
  
		  <p class="text-gray-300">
			<span class="font-semibold">{article.author}</span> – {article.description} – ❤️ {article.votes}
		  </p>
  
		  <form action="?/like" method="POST" use:enhance class="mt-2">
			<input type="hidden" name="id" value={article.id} />
			<button type="submit" aria-label="Like" class="hover:scale-110 transition">
			  <img
				src="https://mrg7lubbiiexsyqp.public.blob.vercel-storage.com/projektPhotos/like-kYOU8svw09AFPoplrkMjE2NsWWFQY5.png"
				alt="like"
				class="w-13 h-13 object-contain"
			  />
			</button>
		  </form>
  
		  <div class="bg-gray-800 p-4 rounded-md">
			<h2 class="text-lg font-semibold mb-2">{$t('comments')}</h2>
  
			<div class="space-y-1 text-sm">
			  {#each data.comments as comment}
				<p><span class="text-pink-400 font-medium">{comment.name}:</span> {comment.text}</p>
			  {/each}
			</div>
  
			<form action="?/comment" method="POST" use:enhance class="mt-4 space-y-3">
			  <input type="hidden" name="article_id" value={article.id} />
  
			  <div>
				<label for="name" class="block text-sm mb-1">{$t('your_name')}</label>
				<input
				  type="text"
				  name="name"
				  required
				  class="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
				/>
			  </div>
  
			  <div>
				<label for="comment" class="block text-sm mb-1">{$t('your_comment')}</label>
				<textarea
				  name="comment"
				  required
				  class="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
				></textarea>
			  </div>
  
			  <button
				type="submit"
				class="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition"
			  >
				{$t('add_comment')}
			  </button>
			</form>
		  </div>
		</div>
	  {/each}
	</div>
  </div>
  