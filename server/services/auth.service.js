const db = require('../config/db.js');

async function findMahasiswaAccountByNim(nim) {
    const query = `
    SELECT id_ref, password_hash, role
    FROM accounts
    WHERE username = ?
    LIMIT 1
    `;

    const [rows] = await db.execute(query, [nim])
    if(rows.length === 0) {
        return null;
    }

    const account = rows[0];

    if(account.role !== 'mahasiswa'){
        return null;
    }

    return account
}

module.exports = {
    findMahasiswaAccountByNim,
}