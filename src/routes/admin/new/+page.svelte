<div>
	<h1>Create a new article</h1>

	<form method="POST" action="?/createArticle" enctype="multipart/form-data">
        <label for="photo">Photo</label>
        <input type="file" name="photo" /> 

		<label for="description">Description</label>
		<textarea placeholder="Description" name="description"></textarea>

        <label for="author">Author</label>
		<input type="text" placeholder="Author" name="author" />

		<button type="submit">Create Article</button>
	</form>
</div>