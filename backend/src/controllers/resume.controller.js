const Resume = require('../models/resume.model');
const { extractText } = require('../services/extract.service');
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const resume = await Resume.create({
      userId: req.user._id,
      originalName: req.file.originalname,
      storedName: req.file.filename,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
    });

    res.status(201).json({
      message: 'Resume uploaded successfully',
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

const parseResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id, // ensures users can only parse their own resumes
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.status === 'parsed') {
      return res.status(200).json({
        message: 'Resume already parsed',
        extractedText: resume.extractedText,
      });
    }

    const text = await extractText(resume.filePath, resume.mimeType);

    if (!text || text.trim().length === 0) {
      return res.status(422).json({
        message: 'Could not extract text from this file. It may be a scanned image PDF.',
      });
    }

    resume.extractedText = text.trim();
    resume.status = 'parsed';
    await resume.save();

    res.status(200).json({
      message: 'Resume parsed successfully',
      extractedText: resume.extractedText,
    });
  } catch (err) {
    console.error('Parse error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id })
      .select('-filePath -storedName -extractedText') // don't expose internals
      .sort({ createdAt: -1 });

    res.status(200).json({ resumes });
  } catch (err) {
    console.error('Get resumes error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { uploadResume, parseResume, getUserResumes };