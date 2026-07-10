const express = require('express');
const { uploadResume, getUserResumes } = require('../controllers/resume.controller');
const protect = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getUserResumes);

module.exports = router;