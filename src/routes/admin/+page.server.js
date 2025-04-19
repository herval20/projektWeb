import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({locals}) {


	if(!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login')
	}
	

	let connection = await createConnection();
	let [rows] = await connection.execute('SELECT * FROM articles');

	return {
		articles: rows
	};
}

