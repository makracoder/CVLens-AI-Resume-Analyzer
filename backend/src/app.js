const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const analysisRoutes = require('./routes/analysis.routes');
const interviewRoutes = require('./routes/interview.routes');

const app = express();

// ✅ Middleware first — always, before any routes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ✅ Then routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const authRoutes = require('./routes/auth.routes');
const resumeRoutes = require('./routes/resume.routes');

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/interview', interviewRoutes);

module.exports = app;