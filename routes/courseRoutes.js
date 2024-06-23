const express = require("express");
const { getAllCourses } = require("../controllers/courseController");
const { getCourseById } = require("../controllers/courseController");
// const { searchCourses } = require("../controllers/courseController");
const router = express.Router();

router.get("/", getAllCourses);
// router.get("/search", searchCourses);
router.get("/:id", getCourseById);

module.exports = router;
