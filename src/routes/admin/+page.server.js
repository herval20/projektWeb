import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

// Load function
export async function load({ locals }) {
	// Redirect if user is not an admin
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}

	// Create DB connection and fetch all articles
	let connection = await createConnection();
	let [rows] = await connection.execute('SELECT * FROM articles');

	// Return articles to the page
	return {
		articles: rows
	};
}

// Define form actions
export const actions = {
	// Delete article action
	deleteArticle: async ({ request }) => {
		const formData = await request.formData();          // Get submitted form data
		const id = formData.get('id');                      // Get article ID to delete
		const connection = await createConnection();        // Connect to DB
		try {
			// Try deleting the article
			const [result] = await connection.execute(
				'DELETE FROM articles WHERE id = ?', [id]
			);
		} catch (e) {
			// If error, log and return failure
			console.error(e);
			return {
				success: false,
				message: 'Deletion not possible!'
			};
		}
	}
};