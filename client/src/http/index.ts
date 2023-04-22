import axios from "axios";

// Declare API_URL from .env file.
export const API_URL = process.env.API_URL;

// Create default axios request. 
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

// Declare interceptor for eazy work with tokens. 
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api