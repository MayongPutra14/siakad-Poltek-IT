// checking: is user Exist in database
const [rows] = await database.execute(
  "SELECT * FROM mahasiswa_account WHERE nim = ?",
  [nim]
);

if (rows.length === 0) {
  return res.status(401).json({ message: "Credential is not valid" });
}

// Comparing password
const user = rows[0];
const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({ message: "Credential is not valid" });
}

// Give the Token
const token = jwt.sign(
  {
    id: user.nim,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  }
);
