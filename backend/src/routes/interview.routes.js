const express = require('express');
const { generateQuestions, getInterviews } = require('../controllers/interview.controller');
const protect = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/generate', protect, generateQuestions);
router.get('/:resumeId', protect, getInterviews);

module.exports = router;