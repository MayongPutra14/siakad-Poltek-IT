const mahasiswaService = require("../services/mahasiswa.service");

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
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
}

// VIEW KRS ACTIVE
const viewKrsAktif = async(req, res) => {
  try {
    const idMahasiswa = req.session.user?.id_ref; // take id from session login

    if(!idMahasiswa) {
      return res.status(401).json({
        status: 'Fail',
        message: 'Sesi tidak valid atau id_ref tidak ditemukan'
      })
    }
    const krs = await mahasiswaService.getKrsActive(idMahasiswa);
    res.status(200).json({
      status: 'Success',
      data: krs
    })


  } catch (error) {
    console.error("Detail Error:", error);
    return res.status(500).json({
      status: 'Error',
      message: "Terjadi kesalahan server",
    });
  }
}

module.exports = {
    getMyProfile,
    viewKrsAktif
}
