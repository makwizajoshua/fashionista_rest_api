import pg from 'pg';
const { Pool } = pg;
// Set up db connection
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PWD,
//     port: process.env.DB_PORT,
// });

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "Lightwave12345",
    port: 5436,
});

// Test the connection
pool.query('SELECT 1', (err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the process with a non-zero exit code
    } else {
        console.log('Database connection established');
    }
});

export default pool;