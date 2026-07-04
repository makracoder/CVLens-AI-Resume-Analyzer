const express = require('express');
const { runAnalysis, getAnalysis } = require('../controllers/analysis.controller');
const protect = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/run', protect, runAnalysis);
router.get('/:resumeId', protect, getAnalysis);

module.exports = router;