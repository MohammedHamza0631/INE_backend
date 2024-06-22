const pool = require("../config/db");

// Enroll in a course
exports.enrollCourse = async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const newEnrollment = await pool.query(
      "INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *",
      [userId, courseId]
    );
    res.status(201).json(newEnrollment.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get enrolled courses for a user
exports.getEnrolledCourses = async (req, res) => {
  const { userId } = req.params;
  try {
    const enrollments = await pool.query(
      "SELECT * FROM enrollments WHERE user_id = $1",
      [userId]
    );
    res.json(enrollments.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
