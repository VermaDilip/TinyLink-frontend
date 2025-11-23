import api from './api';
import { ENDPOINTS } from '../constants/apiEndpoints';

export const linkApi = {
  getAllLinks: () => api.get(ENDPOINTS.LINKS),
  createLink: (data) => api.post(ENDPOINTS.LINKS, data),
  getLinkStats: (code) => api.get(`${ENDPOINTS.LINKS}/${code}`),
  deleteLink: (code) => api.delete(`${ENDPOINTS.LINKS}/${code}`),
};