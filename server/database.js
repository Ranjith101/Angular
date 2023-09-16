// database.js
const sql = require('mssql');

// Configuration for connecting to the SQL database
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Use SSL encryption
        trustServerCertificate: true, // Trust self-signed certificate
    },
};


// Create a connection pool
const pool = new sql.ConnectionPool(dbConfig);

pool.connect(err => {
    if (err) {
        console.error('Error connecting to SQL database:', err);
        return;
    }
    console.log('Connected to SQL database');
});

module.exports = pool;
