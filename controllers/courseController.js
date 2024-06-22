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

// Get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const courseWithLessons = await pool.query(
      `SELECT c.id AS course_id, c.title AS course_title, c.cover, c.summary, c.tags,
              l.id AS lesson_id, l.title AS lesson_title, l.video_id, l.text_content
       FROM courses c
       LEFT JOIN lessons l ON c.id = l.course_id
       WHERE c.id = $1
       ORDER BY c.id, l.id`,
      [id]
    );

    if (courseWithLessons.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    const course = {
      id: courseWithLessons.rows[0].course_id,
      title: courseWithLessons.rows[0].course_title,
      cover: courseWithLessons.rows[0].cover,
      summary: courseWithLessons.rows[0].summary,
      tags: courseWithLessons.rows[0].tags,
      lessons: courseWithLessons.rows
        .map((row) => ({
          id: row.lesson_id,
          title: row.lesson_title,
          video_id: row.video_id,
          text_content: row.text_content,
        }))
        .filter((lesson) => lesson.id !== null), // Filter out any null lessons
    };

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a lesson by ID
exports.getLessonById = async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await pool.query("SELECT * FROM lessons WHERE id = $1", [
      id,
    ]);

    if (lesson.rows.length === 0) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json(lesson.rows[0]);
  } catch (error) {
    console.error("Error fetching lesson:", error);
    res.status(500).json({ message: "Server error" });
  }
};
