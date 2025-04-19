import { login } from '$lib/db/auth';
import { redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, cookies }) => {
		// Get form data from the request
		const formData = await request.formData();
		const email = formData.get('email'); // Get email from form
		const password = formData.get('password'); // Get password from form

		// Try to log in and get session token
		const token = await login(email, password);

		// If login is successful
		if (token) {
			// Set session cookie for 7 days
			cookies.set('session', token, {
				maxAge: 60 * 60 * 24 * 7, // 7 days
				path: '/',
				httpOnly: true,
				sameSite: 'strict'
			});
			// Redirect to admin page
			redirect(302, '/admin');
		} else {
			// If login fails, return error
			return {
				success: false,
				message: 'Login failed'
			};
		}
	}
};