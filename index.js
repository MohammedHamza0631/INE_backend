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
    origin: "https://ine-frontend.vercel.app",
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

// Register/ Login User
app.use("/api/auth", require("./routes/authRoutes"));

// // Login User
// app.use("/api/auth", require("./routes/authRoutes"));

app.get("/api/courses/search", async (req, res) => {
  try {
    const { term } = req.query;
    const searchTerm = `%${term}%`;
    const courses = await pool.query(
      `SELECT * FROM courses 
       WHERE title ILIKE $1 
       OR EXISTS (
         SELECT 1 
         FROM unnest(tags) AS tag 
         WHERE tag ILIKE $1
       )`,
      [searchTerm]
    );
    res.status(200).json(courses.rows);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all the courses and course by ID
app.use("/api/courses", require("./routes/courseRoutes"));

// get a course based on search term

// Get a lesson
app.use("/api/lessons", require("./routes/lessonRoutes"));

// Get all the enrollments
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
