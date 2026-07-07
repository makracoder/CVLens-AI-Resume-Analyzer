import api from './axios';

export const runAnalysis = async (resumeId, jobDescription = null) => {
  const res = await api.post('/analysis/run', { resumeId, jobDescription });
  return res.data;
};

export const getAnalysis = async (resumeId) => {
  const res = await api.get(`/analysis/${resumeId}`);
  return res.data;
};