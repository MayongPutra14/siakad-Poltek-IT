const db = require('../config/db')

async function getMahasiswaProfile(id_mahasiswa) {
    const query =`
        SELECT
            m.id_mahasiswa,
            m.nim,
            m.nik,
            m.nama,
            m.status,
            m.jenis_kelamin,
            m.tanggal_lahir,
            m.agama,
            m.email,
            m.angkatan,
            m.alamat,
            m.id_prodi
        FROM mahasiswa m
        JOIN program_studi p ON m.id_prodi = p.id_prodi
        WHERE m.id_mahasiswa = ?
    `;

    const [rows] = await db.execute(query, [id_mahasiswa]);
    return rows[0]
}

module.exports = {
    getMahasiswaProfile
}