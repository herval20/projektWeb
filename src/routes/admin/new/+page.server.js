import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { put } from '@vercel/blob';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

// Server-side load function
export async function load({ locals }) {
	// Only allow admin users; redirect others to login
	if (!locals.user || locals.user.role !== 'admin') {
		redirect(302, '/login');
	}
}

// Server-side form actions
export const actions = {
	// Action for creating a new article
	createArticle: async ({ request }) => {
		const formData = await request.formData();       // Parse submitted form data
		const photo = formData.get('photo');             // Get the uploaded photo

		// Upload the photo to Vercel Blob
		const { url } = await put('projektPhotos/' + photo.name, photo, {
			addRandomSuffix: true,                     // Avoid name conflicts
			access: 'public',                          // Make the file publicly accessible
			token: BLOB_READ_WRITE_TOKEN               // Auth token
		});

		// Connect to the database
		const connection = await createConnection();

		// Insert the article into the database
		const [result] = await connection.execute(
			'INSERT INTO articles (image, description, author) VALUES (?,?,?)',
			[url, formData.get('description'), formData.get('author')]
		);

		// If insert successful, redirect to admin page
		if (result.affectedRows) {
			redirect(303, '/admin');
		}
	}
};