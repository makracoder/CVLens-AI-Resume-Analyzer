const express = require('express');
const { uploadResume, getUserResumes } = require('../controllers/resume.controller');
const protect = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

// protect comes first (must be logged in), then upload (multer parses the file)
router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getUserResumes);

module.exports = router;