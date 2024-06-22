const pool = require('../config/db');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await pool.query('SELECT * FROM courses');
    res.json(courses.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Other course-related functions (add, update, delete) can be implemented similarly
