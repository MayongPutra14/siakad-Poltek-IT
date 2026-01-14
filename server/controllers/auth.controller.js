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
        message: 'NIM atau Password salah'
      });
    }

    // Save session before response
    req.session.user = {
      id_ref: akun.id_ref,
      role: akun.role
    }

    return res.status(200).json({
      message: 'Login berhasil',
      user: req.session.user
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
