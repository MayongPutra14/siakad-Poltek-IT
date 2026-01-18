const db = require("../config/db");

// GET student profile
async function getMahasiswaProfile(idMahasiswa) {
  if(!idMahasiswa) {
    console.error(`Error: getMahasiswaProfile menerima ID Undifine`)
    return null
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
            m.id_prodi
        FROM mahasiswa m
        JOIN program_studi p ON m.id_prodi = p.id_prodi
        WHERE m.id_mahasiswa = ?
    `;

  // const query = `
  //   SELECT m.* FROM mahasiswa m
  //   JOIN program_studi p ON m.id_prodi = p.id_prodi
  //   WHERE m.id_mahasiswa =  ?
        // ini merupakan query saat debugging
  // `
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

/*
// GET KRS active
// const getKrsActive = async (idMahasiswa) => {
//   if (!idMahasiswa) throw new Error("ID Mahasiswa tidak valid");
//   const query = `
//         SELECT
//             mk.id_mk,
//             mk.nama_mk,
//             mk.sks,
//             d.nama_dosen,
//             s.tahun_ajaran,
//             s.semester,
//             kh.nilai_huruf,
//             kh.nilai_angka
//         FROM krs k
//         JOIN mata_kuliah mk ON k.id_mk = mk.id_mk
//         JOIN dosen d ON mk.id_dosen = d.id_dosen
//         JOIN semester s ON k.id_semester = s.id_semester
//         LEFT JOIN khs kh ON k.id_krs = kh.id_krs 
//         WHERE k.id_mahasiswa = ? AND s.is_active = true
//     `;
//   const [rows] = await db.execute(query, [idMahasiswa]);
//   return rows;
// }; 
*/





/* GET KHS by semester
const getKhsBySemester = async (idMahasiswa, idSemester) => {
  //validartion Input for security
  if (!idMahasiswa || !idSemester) throw new Error("Parameter tidak lengkap.");

  const query = `
        SELECT
            mk.kode_mk, 
            mk.nama_mk, 
            mk.sks, 
            kh.nilai_huruf, 
            kh.nilai_angka,
            s.tahun_ajaran,
            s.semester
        FROM krs k
        JOIN mata_kuliah mk ON k.id_mk = mk.id_mk
        JOIN semester s ON k.id_semester = s.id_semester
        JOIN khs kh ON k.id_krs = kh.id_krs 
        WHERE k.id_mahasiswa = ? AND k.id_semester = ?
    `;

  // use inner join to display subjects tha already have score.
  const [rows] = await db.execute(query, [idMahasiswa, idSemester]);

  // --- Logic of calculating IPS ---
  let totalSks = 0;
  let totalBobot = 0;

  rows.forEach((item) => {
    const sks = parseFloat(item.sks);
    const nilai = parseFloat(item.nilai_angka) || 0; // fallback if nilai_angka is empty or null

    totalSks += sks;
    totalBobot += nilai * sks;
  });

  const ips = totalSks > 0 ? (totalBobot / totalSks).toFixed(2) : 0;

  // return object list and summary
  return {
    semester_info:
      rows.length > 0
        ? {
            tahun: rows[0].tahun_ajaran,
            semester: rows[0].semester,
          }
        : null,
    daftar_nilai: rows,
    summary: {
      total_sks: totalSks,
      ips: parseFloat(ips),
    },
  };
};
*/

module.exports = {
  getMahasiswaProfile,
  getAllKhsHistory,
  getAllKrsHistory,
};
