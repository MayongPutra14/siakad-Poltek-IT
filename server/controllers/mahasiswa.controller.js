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
      status: "Success",
      message: "Data profile berhasil diambil",
      data: profile,
    });
  } catch (error) {
    console.error(`Detail Error Profile: ${error}`);
    return res.status(500).json({
      status: "Error",
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
        message: "Sesi tidak ditemukan, silahkan login kembali",
      });
    }
    // GET KRS HISTORY
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

    res.status(200).json({
      status: "Success",
      message: "Data KHS berhasil diambil",
      data: khs,
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
const getGlobalData = async (req, res) => {
  try {
    const idMahasiswa = req.session.user?.id_ref;

    if(!idMahasiswa) {
      return res.status(401).json({
        status: "Error",
        message: "Session tidak ditemukan, silahkan login kembali"
      })
    }

    // 1. take profile and history pararel
    const [profile, akademikHistory] = await Promise.all([
      mahasiswaService.getMahasiswaProfile(idMahasiswa),
      mahasiswaService.getAllKhsHistory(idMahasiswa),
    ]);

    if(!profile) {
      return res.status(404).json({
        status: "Error",
        message: "Data profile mahasiswa tidak ditemukan"
      })
    }

    res.status(200).json({
      status: "Success",
      message: "Data mahasiswa berhasil di ambil",
      data: {
        nama: profile.nama,
        nim: profile.nim,
        ipk: akademikHistory?.ipk || 0,
        program_studi: profile.nama_prodi,
        sks_total: akademikHistory?.total_sks || 0,
        status_akademik: profile.status,
      },
    });
  } catch (error) {
    console.error(`Detail Error Dashboard: ${error}`);
    res.status(500).json({
      status: "Error",
      message: "Terjadi kesalahan server",
    });
  }
};

// GET DASHBOARD SUMMARY
const getDashboardSummary = async (req, res) => {
  try {
    const idMahasiswa = req.session.user?.id_ref;

    if (!idMahasiswa) {
      return res.status(4001).json({
        status: "Error",
        message: "Sesion tidak ditemukan, silahkan login kembali",
      });
    }

    // GET THE DATA
    const dashboardData =
      await mahasiswaService.getDashboardSummary(idMahasiswa);

    if (!dashboardData) {
      return res.status(404).json({
        status: "Error",
        message: "Data dashboard tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Data dashboard berhasil diambil",
      data: {
        nama: dashboardData.nama,
        nim: dashboardData.nim,
        program_studi: dashboardData.nama_prodi,
        status_akademik: dashboardData.status,
        ip_semester: dashboardData.ip_semester || 0,
        ipk: dashboardData.ipk || 0,
        total_sks: dashboardData.total_sks || 0,
        jumlah_matkul_aktif: dashboardData.jumlah_matkul_aktif || 0,
      },
    });
  } catch (error) {
    console.error(`Detail error menu dashboard: ${error}`)
    res.status(500).json({
      status: "Error",
      message: "Terjadi kesalaha server"
    })
  }
};

module.exports = {
  getMyProfile,
  getDashboardSummary,
  getGlobalData,
  getAllKrs,
  getAllKhs,
};
