import axios from 'axios';
import { SERVER_URL } from './config';

export const axiosInstance = axios.create({ baseURL: SERVER_URL });
