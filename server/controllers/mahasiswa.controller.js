const mahasiswaService = require("../services/mahasiswa.service");

// 1. get profile
async function getMyProfile(req, res) {
  try {
    // get id from session, not url
    const id_mhs = req.session.user.id_ref;
    const profile = await mahasiswaService.getMahasiswaProfile(id_mhs);

    if (!profile) {
      return res.status(404).json({
        message: "Profile tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Data profile berhasil diambil",
      data: profile,
    });
  } catch (error) {
    console.error(`Detail Error Profile: ${error}`);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
}

// 2. Get All KRS & KRS ACTIVE
const getAllKrs = async (req, res) => {
  try {
    const idMahasiswa = req.session.user?.id_ref; // take id from session login

    if (!idMahasiswa) {
      return res.status(401).json({
        status: "Fail",
        message: "Sesi tidak valid",
      });
    }
    // GET KRS HISTORY
    // const krs = await mahasiswaService.getKrsActive(idMahasiswa);
    const krs = await mahasiswaService.getAllKrsHistory(idMahasiswa);

    const krsAktif = krs.filter((item) => item.status_semester === 1);
    const riwayatKrs = krs.filter((item) => item.status_semester === 0);

    res.status(200).json({
      status: "Success",
      message: "Data KRS berhasil diambil",
      data: {
        total_matakuliah: krs.length,
        aktif: krsAktif,
        riwayat: riwayatKrs,
      },
    });
  } catch (error) {
    console.error("Detail Error KRS:", error);
    return res.status(500).json({
      status: "Error",
      message: "Terjadi kesalahan server",
    });
  }
};

// 3. GET ALL KHS & LATTEST KHS
const getAllKhs = async (req, res) => {
  try {
    const idMahasiswa = req.session.user.id_ref;
    // const idSemester = req.query.semester; // get ?semester = x

    if (!idMahasiswa) {
      return res.status(401).json({
        status: "Failed",
        message: "Sesi tidak valid",
      });
    }

    const khs = await mahasiswaService.getAllKhsHistory(idMahasiswa);

    // const khsAktif = khs.filter(item => item.status_semester)

    res.status(200).json({
      status: "Success",
      message: "Data KHS berhasil diambil",
      // semester_id: idSemester,
      // data: khs.daftar_nilai,
      data: khs,
      // sumary: khs.summary,
    });
  } catch (error) {
    console.error(`Detail Error KHS: ${error}`);
    res.status(500).json({
      status: "Error",
      message: "Terjadi Kesalahan Server",
    });
  }
};

// 4. GET Dashboard Summary
const getDashboardSummary = async (req, res) => {
  try {
    const idMahasiswa = req.session.user?.id_ref;
    // 1. take profile and history pararel
    const [profile, akademikHistory] = await Promise.all([
      mahasiswaService.getMahasiswaProfile(idMahasiswa),
      mahasiswaService.getAllKhsHistory(idMahasiswa),
    ]);

    res.status(200).json({
      status: "Success",
      data: {
        nama: profile.nama,
        nim: profile.nim,
        ipk: akademikHistory.ipk,
        sks_total: akademikHistory.total_sks,
        status_akademik: profile.status,
      },
    });
  } catch (error) {
    console.error(`Detail Error Dashboard: ${error}`);
    res.status(500).json({
      success: "False",
      message: "Terjadi kesalahan server",
    });
  }
};


/* GET KHS By Semester

const viewKhsBySemester = async (req, res) => {
  try {
    const idMahasiswa = req.session.user.id_ref;
    const idSemester = req.query.semester; // get ?semester = x

    if (!idSemester) {
      return res.status(401).json({
        status: "Failed",
        message: "Sesi tidak valid",
      });
    }

    const khs = await mahasiswaService.getKhsBySemester(idMahasiswa, idSemester);

    // const khsAktif = khs.filter(item => item.status_semester)

    res.status(200).json({
      status: "Success",
      message: "Data KHS berhasil diambil",
      semester_id: idSemester,
      data: khs.daftar_nilai,
      // data: khs,
      sumary: khs.summary,
    });
  } catch (error) {
    console.error(`Detail Error KHS: ${error}`);
    res.status(500).json({
      status: "Error",
      message: "Terjadi Kesalahan Server",
    });
  }
};
*/



module.exports = {
  getMyProfile,
  getDashboardSummary,
  getAllKrs,
  getAllKhs,
};
