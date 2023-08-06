import axios from 'axios';
import { PRODUCTION } from '../config/constants';

const dtleadsAPI = axios.create({
  baseURL: PRODUCTION
    ? 'https://api.danieltimothyleads.com'
    : 'https://localhost:7227'
});

dtleadsAPI.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default dtleadsAPI;
