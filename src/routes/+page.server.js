import { createConnection } from '$lib/db/mysql';

export async function load({locals}) {
	let connection = await createConnection();
	let [rows] = await connection.execute('SELECT * FROM articles ORDER BY votes DESC LIMIT 25');

	return {
		articles: rows,
		user: locals.user
	};
}