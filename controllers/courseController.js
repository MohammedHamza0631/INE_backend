const pool = require("../config/db");

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await pool.query("SELECT * FROM courses");
    // console.log("Courses from DB:", courses.rows); // Log the courses from DB
    res.status(200).json(courses.rows);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};
