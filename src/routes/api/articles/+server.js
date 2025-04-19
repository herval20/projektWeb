import { createConnection } from "$lib/db/mysql";
import { BASIC_AUTH_USER, BASIC_AUTH_PASSWORD } from '$env/static/private';

// Function to authenticate using Basic Auth
async function authenticate(request) {
	const authHeader = request.headers.get('authorization'); // Get the authorization header

    // If no auth header, respond with 401 Unauthorized
	if (!authHeader) {
		return new Response(null, {
			status: 401,
			headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' } // Prompt for Basic Auth login
		});
	}

    // Decode base64 credentials and extract username/password
	const base64Credentials = authHeader.split(' ')[1]; // Split to get base64 part
	const credentials = atob(base64Credentials); // Decode base64 credentials
	const [username, password] = credentials.split(':'); // Split to get username and password

    // If credentials don't match, deny access
	if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
		return new Response(JSON.stringify({ message: 'Access denied' }), { // Return access denied message
			status: 401,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	return null; // Auth success if no issues
}

// GET: Return all articles
export async function GET() {
	try {
		const connection = await createConnection(); // Connect to the database
		const [rows] = await connection.execute('SELECT * FROM articles'); // Get all articles

		return new Response(JSON.stringify(rows), { // Send the articles back as JSON
			status: 200,
			headers: { 'content-type': 'application/json' }
		});
	} catch (err) {
		console.error(err); // Log error to the console
		return new Response(JSON.stringify({ error: 'Database connection failed' }), { // Return error message if DB connection fails
			status: 500,
			headers: { 'content-type': 'application/json' }
		});
	}
}

// POST: Create a new article
export async function POST({ request }) {
	const auth = await authenticate(request); // Authenticate the request
	if (auth) return auth; // If authentication fails, return response

	const connection = await createConnection(); // Create DB connection
	const data = await request.json(); // Get data from the POST request

	// Insert new article into the database
	await connection.execute(
		'INSERT INTO articles (image, description, author, votes) VALUES (?, ?, ?, ?)',
		[data.image, data.description, data.author, data.votes]
	);

	await connection.end(); // Close DB connection

	return new Response(JSON.stringify(data), { // Send the created article data back
		status: 201,
		headers: { 'content-type': 'application/json' }
	});
}
