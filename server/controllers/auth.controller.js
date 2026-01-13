const bcrypt = require('bcrypt');
const authService = require('../services/auth.service');

async function loginMahasiswa(req, res) {
  try {
    const { nim, password } = req.body;

    const akun = await authService.findMahasiswaAccountByNim(nim);

    if (!akun) {
      return res.status(401).json({
        message: 'Akun tidak ditemukan atau bukan mahasiswa'
      });
    }

    const isMatch = await bcrypt.compare(password, akun.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Password salah'
      });
    }

    return res.status(200).json({
      message: 'Login berhasil'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Terjadi kesalahan server'
    });
  }
}

module.exports = {
  loginMahasiswa
};
