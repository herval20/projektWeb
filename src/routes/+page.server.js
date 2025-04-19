import { createConnection } from '$lib/db/mysql';

export async function load({ locals }) {
	// Connect to the database
	let connection = await createConnection();

	// Fetch top 25 articles sorted by highest votes
	let [rows] = await connection.execute('SELECT * FROM articles ORDER BY votes DESC LIMIT 25');

	// Return articles and the current user
	return {
		articles: rows,
		user: locals.user
	};
}