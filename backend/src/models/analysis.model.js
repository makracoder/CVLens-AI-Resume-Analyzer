const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      required: true,
    },
    jobDescription: {
      type: String,
      default: null,
    },
    atsScore: Number,
    overallFeedback: String,
    strengths: [String],
    weaknesses: [String],
    missingKeywords: [String],
    suggestions: [String],
    matchPercentage: Number,
    experienceLevel: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Analysis', analysisSchema);