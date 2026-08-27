import axios from 'axios';
import { LS_USER_KEY } from '../../context/auth-context';

export const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status;
    if (status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem(LS_USER_KEY);
      window.location.replace('/login');
    }
    return Promise.reject(error); // siempre, en ambos casos
  }
)

export const login = (user) => http.post('/sessions', user)

