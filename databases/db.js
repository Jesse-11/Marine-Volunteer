const mysql = require('mysql2');
const util = require('util');

// Database configuration
const pool = mysql.createPool({
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'WDC_db'
});

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;
