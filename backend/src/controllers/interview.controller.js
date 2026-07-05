const Resume = require('../models/resume.model');
const Interview = require('../models/interview.model');
const { generateInterviewQuestions } = require('../services/ai.service');

const generateQuestions = async (req, res) => {
  try {
    const { resumeId, jobDescription, difficulty = 'mixed' } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: 'resumeId is required' });
    }

    const validDifficulties = ['easy', 'medium', 'hard', 'mixed'];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: 'difficulty must be easy, medium, hard, or mixed' });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.status === 'uploaded') {
      return res.status(400).json({
        message: 'Resume must be parsed first. Hit /parse first.',
      });
    }

    const aiResult = await generateInterviewQuestions(
      resume.extractedText,
      jobDescription,
      difficulty
    );

    const interview = await Interview.create({
      userId: req.user._id,
      resumeId,
      jobDescription: jobDescription || null,
      difficulty,
      questions: aiResult.questions,
    });

    res.status(201).json({
      message: 'Interview questions generated',
      interview,
    });
  } catch (err) {
    console.error('Interview generation error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      resumeId: req.params.resumeId,
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    if (!interviews.length) {
      return res.status(404).json({ message: 'No interview sessions found for this resume' });
    }

    res.status(200).json({ interviews });
  } catch (err) {
    console.error('Get interviews error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { generateQuestions, getInterviews };