const db = require("../config/db");

// GET student profile
async function getMahasiswaProfile(idMahasiswa) {
  if (!idMahasiswa) {
    console.error(`Error: getMahasiswaProfile menerima ID Undifine`);
    return null;
  }
  const query = `
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

          p.id_prodi,
          p.kode_prodi,
          p.nama_prodi,
          p.ketua_prodi

        FROM mahasiswa AS m
        INNER JOIN program_studi AS p
            ON m.id_prodi = p.id_prodi
        WHERE m.id_mahasiswa = ?; 
    `;
  const [rows] = await db.execute(query, [idMahasiswa]);
  return rows[0];
}

// GET KRS History
const getAllKrsHistory = async (idMahasiswa) => {
  if (!idMahasiswa) throw new Error("ID mahasiswa tidak valid");

  const query = `
    SELECT
      mk.id_mk,
      mk.nama_mk,
      mk.sks,
      d.nama_dosen,
      s.tahun_ajaran,
      s.semester,
      s.is_active as status_semester,
      kh.nilai_huruf,
      kh.nilai_angka
    FROM krs k
    JOIN mata_kuliah mk ON k.id_mk = mk.id_mk
    JOIN dosen d ON mk.id_dosen = d.id_dosen
    JOIN semester s ON k.id_semester = s.id_semester
    LEFT JOIN khs kh ON k.id_krs = kh.id_krs
    WHERE k.id_mahasiswa = ?
    ORDER BY s.is_active DESC, s.tahun_ajaran DESC, s.semester DESC
  `;

  const [rows] = await db.execute(query, [idMahasiswa]);
  return rows;
};
// GET all khs history
const getAllKhsHistory = async (idMahasiswa) => {
  if (!idMahasiswa) throw new Error("Id Mahasiswa tidak valid");

  const query = `
        SELECT
            s.tahun_ajaran,
            s.semester,
            mk.kode_mk,
            mk.nama_mk,
            mk.sks,
            kh.nilai_angka,
            kh.nilai_huruf
        FROM krs k
        JOIN semester s ON k.id_semester = s.id_semester
        JOIN mata_kuliah mk ON k.id_mk = mk.id_mk
        JOIN khs kh ON k.id_krs = kh.id_krs
        WHERE k.id_mahasiswa = ?
        ORDER BY s.tahun_ajaran DESC, s.semester DESC
    `;

  const [rows] = await db.execute(query, [idMahasiswa]);

  //  --- logic for calculating IPK (Kumulatif) ---
  let kumulatifSks = 0;
  let kumulatifBobot = 0;

  rows.forEach((item) => {
    const sks = parseFloat(item.sks);
    const nilai = parseFloat(item.nilai_angka) || 0;

    kumulatifSks += sks;
    kumulatifBobot += nilai * sks;
  });

  // calculating ipk round 2 decimal
  const ipk = kumulatifSks > 0 ? (kumulatifBobot / kumulatifSks).toFixed(2) : 0;

  return {
    ipk: parseFloat(ipk),
    total_sks: kumulatifSks,
    riwayat: rows,
  };
};

module.exports = {
  getMahasiswaProfile,
  getAllKhsHistory,
  getAllKrsHistory,
};
