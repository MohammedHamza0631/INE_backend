const express = require('express');
const { getLessonById } = require('../controllers/courseController');
const router = express.Router();

router.get('/:id', getLessonById)

module.exports = router;