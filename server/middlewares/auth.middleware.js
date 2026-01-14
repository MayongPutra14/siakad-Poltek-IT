const isAuthenticatedMahasiswa = (req, res, next) => {
  // 1. Checking Session
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      message: "Akses ditolak. Silakan login terlebih dahulu.",
    });
  }

  // 2. Checking Role
  if (req.session.user.role !== "mahasiswa") {
    return res.status(403).json({
      message: "Akses terlarang. Anda tidak diizinkan.",
    });
  }
  // next if session and role are true
  next();
};

module.exports = {
    isAuthenticatedMahasiswa
}
