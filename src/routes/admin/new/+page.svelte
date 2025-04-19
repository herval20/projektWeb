<div class="min-h-screen bg-black text-white flex items-center justify-center px-4">
	<div class="w-full max-w-xl space-y-6">
        <a href="/admin" class="inline-flex items-center gap-2 text-pink-400 hover:bg-gray-800 px-3 py-2 rounded-md transition mb-6">
            ← Back to Admin
        </a>
		<h1 class="text-2xl font-bold">Create a new article</h1>

		<form
			method="POST"
			action="?/createArticle"
			enctype="multipart/form-data"
			class="space-y-6"
		>
			<div>
				<label for="photo" class="block mb-1">Photo</label>
				<input
					type="file"
					name="photo"
					class="block w-full px-3 py-2 bg-gray-800 rounded-md text-white"
				/>
			</div>

			<div>
				<label for="description" class="block mb-1">Description</label>
				<textarea
					name="description"
					placeholder="Description"
					class="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
				></textarea>
			</div>

			<div>
				<label for="author" class="block mb-1">Author</label>
				<input
					type="text"
					name="author"
					placeholder="Author"
					class="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
				/>
			</div>

			<button
				type="submit"
				class="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md transition"
			>
				Create Article
			</button>
		</form>
	</div>
</div>