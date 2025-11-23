import axios from 'axios';
import { API_BASE } from '../constants/apiEndpoints';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;