import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // this is what sends the httpOnly cookie automatically
});

export default api;