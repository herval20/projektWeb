import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

// Load function to fetch article and its comments by ID
export async function load({ params }) {
	const { id } = params; // Get article ID from URL

	const connection = await createConnection(); // Connect to database

	// Fetch the article by ID
	const [articles] = await connection.execute(
		'SELECT * FROM articles WHERE id = ?',
		[id]
	);

	// Fetch all comments for the article
	const [comments] = await connection.execute(
		'SELECT * FROM comments WHERE article_id = ?',
		[id]
	);

	// Return article and comments to the page
	return {
		articles,
		comments
	};
}

export const actions = {
	// Action to add a like to an article
	like: async ({ request }) => {
		const formData = await request.formData(); // Get form data
		const id = formData.get('id'); // Get article ID

		const connection = await createConnection(); // Connect to DB

		// Increment vote count for the article
		const [result] = await connection.execute(
			'UPDATE articles SET votes = votes + 1 WHERE id = ?',
			[id]
		);

		// Return success or error
		return result.affectedRows ? { success: true } : { error: 'Error' };
	},

	// Action to insert a comment
	comment: async ({ request }) => {
		const formData = await request.formData(); // Get form data

		const article_id = formData.get('article_id'); // Article ID for the comment
		const name = formData.get('name'); // Name of the commenter
		const comment = formData.get('comment'); // Comment text

		const connection = await createConnection(); // Connect to DB

		// Insert comment into the DB
		await connection.execute(
			'INSERT INTO comments (article_id, name, text) VALUES (?, ?, ?)',
			[article_id, name, comment]
		);
	}
};