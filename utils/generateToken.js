const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}

module.exports = generateToken;