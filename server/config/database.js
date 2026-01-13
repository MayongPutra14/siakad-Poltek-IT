require('dotenv').config(); // using dotenv package.
const mysql = require('mysql2'); // import mysql package.

// Create connection to database.
// const pool = mysql.createPool({
//     host: process.env.DATABASE_HOST ,
//     user: process.env.USERNAME ,
//     password: process.env.PASSWORD ? 'ADA' : 'KOSONG',
//     database: process.env.DATABASE_NAME ,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0 

// })

const pool = mysql.createPool({
  host: "localhost",
  user: "Gilang_Mayong",
  password: "gilang123",
  database: "siakad",
});

module.exports = pool;

// Change pool to be promise for using async/await
const promisePool = pool.promise();

module.exports = promisePool;