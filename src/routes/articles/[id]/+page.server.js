import { createConnection } from '$lib/db/mysql';
import { redirect } from '@sveltejs/kit';

export async function load({params}) {

    const { id } = params;


    let connection = await createConnection();
    let [rows] = await connection.execute('SELECT * FROM articles where id = ?', [id]);
    const [comments] = await connection.execute('SELECT * FROM comments WHERE article_id = ?', [id]);

    return {
        articles: rows,
        comments: comments
    };
}

export const actions = {
    like: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id');

		const connection = await createConnection();

		const [result] = await connection.execute(
			'UPDATE articles SET votes = votes + 1 WHERE id = ?',
			[id]
		);

		if (result.affectedRows) {
			return { success: true };
		} else {
			return { error: 'Error' };
		}
	},

    comment: async ({ request }) => {
		const formData = await request.formData();

        
		const article_id = formData.get('article_id');
		const name = formData.get('name');
		const comment = formData.get('comment');

		const connection = await createConnection();

		const [result] = await connection.execute(
			'INSERT INTO comments (article_id, name, text) VALUES (?, ?, ?)',
			[article_id, name, comment]
		);
	}
};