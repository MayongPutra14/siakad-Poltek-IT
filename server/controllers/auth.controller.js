require('dotenv').config()
const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");

// LOGIN STUDENT
async function loginMahasiswa(req, res) {
  try {
    // Di dalam loginMahasiswa
    const { nim, password } = req.body;

    const akun = await authService.findMahasiswaAccountByNim(nim);

    if (!akun) {
      return res.status(401).json({
        message: "Akun tidak ditemukan atau bukan mahasiswa",
      });
    }

    const isMatch = await bcrypt.compare(password, akun.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        message: "NIM atau Password salah",
      });
    }

    // Save session before response
    req.session.user = {
      id_ref: akun.id_ref,
      role: akun.role,
    };

    return res.status(200).json({
      message: "Login berhasil",
      user: req.session.user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
}

// LOGOUT STUDENT
const logoutMahasiswa = (req, res) => {
  // 1. Destroy session in server side
  req.session.destroy((error) => {
    if (error) {
      console.error(`Gagal menghancurkan session: ${error}`);
      return res.status(500).json({
        succes: "FAILED",
        message: "Gagal logout, silahkan coba lagi.",
      });
    }

    // 2. Clear cookie session in client side
    res.clearCookie(process.env.SESSION_NAME);

    // 3. send response success
    return res.status(200).json({
      succes: "SUCCESS",
      message: "Berhasil logout, Sampai jumpa kembali",
    });
  });
};

module.exports = {
  loginMahasiswa,
  logoutMahasiswa,
};
