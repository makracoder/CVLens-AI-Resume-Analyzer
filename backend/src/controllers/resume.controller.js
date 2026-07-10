const Resume = require('../models/resume.model');
const { extractText } = require('../services/extract.service');

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // extract text immediately from buffer while file is in memory
    const extractedText = await extractText(req.file.buffer, req.file.mimetype);

    if (!extractedText || extractedText.trim().length === 0) {
      return res.status(422).json({
        message: 'Could not extract text. File may be a scanned image PDF.',
      });
    }

    const resume = await Resume.create({
      userId: req.user._id,
      originalName: req.file.originalname,
      storedName: req.file.originalname,
      filePath: 'memory', // no longer stored on disk
      mimeType: req.file.mimetype,
      extractedText: extractedText.trim(),
      status: 'parsed', // skip the separate parse step
    });

    res.status(201).json({
      message: 'Resume uploaded and parsed successfully',
      resume: {
        id: resume._id,
        originalName: resume.originalName,
        mimeType: resume.mimeType,
        status: resume.status,
        uploadedAt: resume.createdAt,
      },
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .select('-filePath -storedName -extractedText')
      .sort({ createdAt: -1 });

    res.status(200).json({ resumes });
  } catch (err) {
    console.error('Get resumes error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { uploadResume, getUserResumes };