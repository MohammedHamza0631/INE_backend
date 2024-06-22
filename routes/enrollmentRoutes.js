const express = require("express");
const {
  enrollCourse,
  getEnrolledCourses,
} = require("../controllers/enrollmentController");
const router = express.Router();

router.post("/", enrollCourse);
router.get("/:userId", getEnrolledCourses);

module.exports = router;
