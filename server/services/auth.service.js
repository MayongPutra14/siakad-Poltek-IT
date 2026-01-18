const db = require('../config/db.js');

async function findMahasiswaAccountByNim(nim) {

    if(!nim) {
        console.error("DEBUG: findMahasiswaAccountByNim menerima nim UNDEFINED", nim)
        return null;
    }
    const query = `
    SELECT id_ref, password_hash, role
    FROM accounts
    WHERE nim = ?
    LIMIT 1
    `;

    // const query = `SELECT * FROM accounts WHERE nim = ? AND role = 'mahasiswa'`; // ini meruoakan hasil debugging
    const [rows] = await db.execute(query, [nim])
    if(rows.length === 0) {
        return null;
    }

    const account = rows[0];

    if(account.role !== 'mahasiswa'){
        return null;
    }
    // return rows[0]; // ini saat debugging juga
    return account
}

module.exports = {
    findMahasiswaAccountByNim,
}