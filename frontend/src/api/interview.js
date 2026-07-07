import api from './axios';

export const generateQuestions = async (resumeId, jobDescription = null, difficulty = 'mixed') => {
  const res = await api.post('/interview/generate', { resumeId, jobDescription, difficulty });
  return res.data;
};

export const getInterviews = async (resumeId) => {
  const res = await api.get(`/interview/${resumeId}`);
  return res.data;
};