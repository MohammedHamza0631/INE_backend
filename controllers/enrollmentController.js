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
    console.error("Error enrolling in course:", error);
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
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Check if user is enrolled in a course
exports.isUserEnrolled = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const enrollment = await pool.query(
      "SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2",
      [userId, courseId]
    );
    if (enrollment.rows.length > 0) {
      res.status(200).json({ enrolled: true });
    } else {
      res.status(200).json({ enrolled: false });
    }
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    res.status(500).json({ message: "Server error" });
  }
};
