import { createConnection } from '$lib/db/mysql';

export const handle = async ({ event, resolve }) => {
    // Session aus Cookie
    const session = event.cookies.get('session');

    if (!session) {
        event.locals.user = null;
        event.locals.lang = 'en'; // Default Sprache
        return await resolve(event);
    }

    // User aus DB laden
    const db = await createConnection();
    const [users] = await db.execute(
        'SELECT * FROM users WHERE session_token = ?',
        [session]
    );

    if (users.length === 0) {
        event.cookies.set('session', '', { maxAge: -1, path: '/' });
        event.locals.user = null;
        event.locals.lang = 'en';
        return await resolve(event);
    }

    event.locals.user = users[0];
    event.locals.lang = users[0].lang || 'en';

    return await resolve(event);
};
