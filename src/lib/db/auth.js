import { createConnection } from '$lib/db/mysql';
import bcrypt from 'bcrypt';
import crypto from 'crypto'; // <-- import crypto

// Hash password function
async function hashPassword(password) {
    return await bcrypt.hash(password, 12);
}

// Login function
export async function login(email, password) {
    const connection = await createConnection();

    try {
        // Find user by email
        const [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return null;

        // Check password
        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) return null;

        // Create session token
        const token = crypto.randomUUID();
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        // Save token in DB
        const [result] = await connection.execute(
            'UPDATE users SET session_token = ?, session_expiration = ? WHERE id = ?',
            [token, expires, user.id]
        );

        if (result.affectedRows === 0) return null;

        return token;
    } finally {
        connection.end();
    }
}

// Register function
export async function register(email, username, password) {
    const connection = await createConnection();

    try {
        const hashedPassword = await hashPassword(password);

        // Check if email exists
        let [users] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length > 0) return { token: null, message: 'Email already in use' };

        // Check if username exists
        [users] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length > 0) return { token: null, message: 'Username already in use' };

        // Insert user
        const [result] = await connection.execute(
            'INSERT INTO users (email, username, password_hash, role) VALUES (?, ?, ?, ?)',
            [email, username, hashedPassword, 'user']
        );

        // Create session token
        const token = crypto.randomUUID();
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        // Save token
        await connection.execute(
            'UPDATE users SET session_token = ?, session_expiration = ? WHERE id = ?',
            [token, expires, result.insertId]
        );

        return { token, message: 'User created' };
    } finally {
        connection.end();
    }
}
