const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
  },
  category: {
    type: String,
    enum: ['technical', 'behavioral', 'project-based', 'situational'],
  },
  modelAnswer: String,
});

const interviewSchema = new mongoose.Schema(
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
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'mixed'],
      default: 'mixed',
    },
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);