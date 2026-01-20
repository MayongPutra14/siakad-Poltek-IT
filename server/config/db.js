require('dotenv').config();
const mysql = require('mysql2/promise');



const pool = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USERNAME,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME,
    port:process.env.DATABASE_PORT,
    dateStrings: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Berhasil terhubung ke MySQL Railway!");
    connection.release();
  } catch (error) {
    console.error("❌ Gagal terhubung ke Database:");
    console.error(`Pesan Error: ${error.message}`);
    // Opsional: Hentikan aplikasi jika database wajib ada
    // process.exit(1); 
  }
}

checkConnection();



module.exports = pool