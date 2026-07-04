const Resume = require('../models/resume.model');
const Analysis = require('../models/analysis.model');
const { analyzeResume } = require('../services/ai.service');

const runAnalysis = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: 'resumeId is required' });
    }

    // fetch resume and confirm ownership
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.status !== 'parsed') {
      return res.status(400).json({
        message: 'Resume must be parsed before analysis. Hit /parse first.',
      });
    }

    // call Gemini
    const aiResult = await analyzeResume(resume.extractedText, jobDescription);

    // save to DB
    const analysis = await Analysis.create({
      userId: req.user._id,
      resumeId,
      jobDescription: jobDescription || null,
      ...aiResult,
    });

    // flip resume status
    resume.status = 'analysed';
    await resume.save();

    res.status(201).json({
      message: 'Analysis complete',
      analysis,
    });
  } catch (err) {
    console.error('Analysis error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      resumeId: req.params.resumeId,
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    if (!analysis) {
      return res.status(404).json({ message: 'No analysis found for this resume' });
    }

    res.status(200).json({ analysis });
  } catch (err) {
    console.error('Get analysis error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { runAnalysis, getAnalysis };