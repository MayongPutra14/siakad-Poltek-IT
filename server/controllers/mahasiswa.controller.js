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

module.exports = {
    getMyProfile
}
