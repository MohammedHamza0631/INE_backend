const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./config/db");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const env = require("dotenv");
const app = express();

env.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Set-Cookie, Authorization",
  })
);

// Start the DB Connection
pool.connect((err) => {
  if (err) {
    console.error("DB Connection Error:", err.stack);
    return;
  }
  console.log("Connected to DB");
});

app.get("/healthz", (req, res) => {
  res.status(200).json("Systems up & running");
});

// Register User
app.use("/api/auth", require("./routes/authRoutes"));

// Login User
app.use("/api/auth", require("./routes/authRoutes"));

// Get all the courses
app.use("/api/courses", require("./routes/courseRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
