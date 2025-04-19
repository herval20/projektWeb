import { createConnection } from "$lib/db/mysql";
import { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } from '$env/static/private';

// Function to check basic authentication
async function authenticate(request) {
	const authHeader = request.headers.get('authorization');

	// If no auth header, respond with 401 Unauthorized
	if (!authHeader){
		return new Response(null, {
			status: 401,
			headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' }
		});
	}

	// Decode base64 credentials and extract username/password
	const base64Credentials = authHeader.split(' ')[1];
	const credentials = atob(base64Credentials);
	const [username, password] = credentials.split(':');

	// If credentials don't match, deny access
	if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD){
		return new Response(JSON.stringify({ message: 'Access denied' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return null; // Authentication successful
}

// Handle GET request to fetch article by ID
export async function GET({ params }) {
	const { id } = params;

	try {
		const connection = await createConnection(); // Connect to DB
		const [rows] = await connection.execute('SELECT * FROM articles WHERE id = ?', [id]);

		// If article not found, return 404
		if (rows.length === 0) {
			return new Response(JSON.stringify({ error: 'Article not found' }), {
				status: 404,
				headers: { 'content-type': 'application/json' }
			});
		}

		// Return article data
		return new Response(JSON.stringify(rows[0]), {
			status: 200,
			headers: { 'content-type': 'application/json' }
		});
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Database connection failed' }), {
			status: 500,
			headers: { 'content-type': 'application/json' }
		});
	}
}

// Handle PUT request to update article
export async function PUT({ params, request }) {
	const auth = await authenticate(request); // Authenticate user
	if (auth) return auth;

	const connection = await createConnection();
	const { id } = params;
	const data = await request.json(); // Get new article data

	// Update article with new data
	await connection.execute(
		`UPDATE articles SET image = ?, description = ?, author = ?, votes = ? WHERE id = ?`,
		[data.image, data.description, data.author, data.votes, id]
	);

	await connection.end(); // Close DB connection

	// Return updated data
	return new Response(JSON.stringify(data), {
		status: 200,
		headers: { 'content-type': 'application/json' }
	});
}

// Handle DELETE request to delete article
export async function DELETE({ params, request }) {
	const auth = await authenticate(request); // Authenticate user
	if (auth) return auth;

	const { id } = params;

	try {
		const connection = await createConnection(); // Connect to DB

		// Try to delete the article
		const [result] = await connection.execute('DELETE FROM articles WHERE id = ?', [id]);

		// If no article was deleted, return 404
		if (result.affectedRows === 0) {
			return new Response(JSON.stringify({ error: 'Article not found' }), {
				status: 404,
				headers: { 'content-type': 'application/json' }
			});
		}

		// Return no content status
		return new Response(null, { status: 204 });
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: 'Database connection failed' }), {
			status: 500,
			headers: { 'content-type': 'application/json' }
		});
	}
}