const db = require("../config/db");

async function getMahasiswaProfile(id_mahasiswa) {
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

  const [rows] = await db.execute(query, [id_mahasiswa]);
  return rows[0];
}

// Get KRS active
const getKrsActive = async (idMahasiswa) => {
  if (!idMahasiswa) throw new Error("ID Mahasiswa tidak valid");
  const query = `
        SELECT
            mk.id_mk,
            mk.nama_mk,
            mk.sks,
            d.nama_dosen,
            s.tahun_ajaran,
            s.semester,
            kh.nilai_huruf,
            kh.nilai_angka
        FROM krs k
        JOIN mata_kuliah mk ON k.id_mk = mk.id_mk
        JOIN dosen d ON mk.id_dosen = d.id_dosen
        JOIN semester s ON k.id_semester = s.id_semester
        LEFT JOIN khs kh ON k.id_krs = kh.id_krs 
        WHERE k.id_mahasiswa = ? AND s.is_active = true
    `;
  const [rows] = await db.execute(query, [idMahasiswa]);
  return rows;
};

// Get KHS by semester
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
    `;

  const [rows] = await db.execute(query, [idMahasiswa]);
  return rows;
};

module.exports = {
  getMahasiswaProfile,
  getKrsActive,
  getKhsBySemester,
  getAllKhsHistory,
};
