const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Register error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (user.rows.length === 0)
      return res.status(401).json({ message: "USER DNE! Create One" });

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) return res.status(401).json({ message: "Wrong Password" });

    jwt.sign({ user: user.rows[0] }, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      // send only id, username and token
      res.status(200).json({
        id: user.rows[0].id,
        username: user.rows[0].username,
        token,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Login Error" });
  }
};
