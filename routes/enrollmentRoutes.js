const express = require("express");
const { enrollCourse, getEnrolledCourses, isUserEnrolled } = require("../controllers/enrollmentController");
const router = express.Router();

router.post("/", enrollCourse);
router.get("/:userId", getEnrolledCourses);
router.get("/status/:userId/:courseId", isUserEnrolled);

module.exports = router;
