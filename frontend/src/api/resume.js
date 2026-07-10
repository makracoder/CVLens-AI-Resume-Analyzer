import api from './axios';

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  const res = await api.post('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const getUserResumes = async () => {
  const res = await api.get('/resume');
  return res.data;
};