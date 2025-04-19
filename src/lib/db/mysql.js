import mysql from 'mysql2/promise';

// Import environment variables from .env
import { 
	DB_HOST,      // Database host address
	DB_USER,      // Database username
	DB_PORT,      // Database port number
	DB_PASSWORD,  // Database password
	DB_NAME       // Name of the database
} from '$env/static/private';

// Async function to create a new database connection
export async function createConnection() {
  return mysql.createConnection({
    host: DB_HOST,       // Use the imported host
    user: DB_USER,       // Use the imported user
    port: DB_PORT,       // Use the imported port
    password: DB_PASSWORD, // Use the imported password
    database: DB_NAME    // Use the imported database name
  });
}