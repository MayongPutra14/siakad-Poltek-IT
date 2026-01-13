const bcrypt = require("bcrypt");

const SAL_ROUNDS = 10;

async function hasPassword(password) {
  return bcrypt.hash(password, SAL_ROUNDS);
}

async function comaprePassword(password, hash) {
  console.log("PASSWORD INPUT:", password);
  console.log("AKUN:", hash);
  console.log("AKUN PASSWORD:", akun?.password);

  return bcrypt.compare(password, hash);
}

module.exports = {
  hasPassword,
  comaprePassword,
};
