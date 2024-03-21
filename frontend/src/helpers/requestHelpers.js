import axios from 'axios';
import { USER_KEY } from "../contexts/AuthContext";
import { getCookie } from "./cookieHelpers";

const options = {
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {'Content-Type': 'application/json', Accept: 'application/json'}
}

const client = axios.create(options);
const nrClient = axios.create(options);

const setCSRFHeader = config => {
  config.headers['X-CSRF-TOKEN'] = getCookie('csrf_access_token');
  return config;
}

client.interceptors.request.use(setCSRFHeader, error => Promise.reject(error));
nrClient.interceptors.request.use(setCSRFHeader, error => Promise.reject(error));

client.interceptors.response.use(resp => resp, error => {
  if(error.response?.status === 401) {
    sessionStorage.removeItem(USER_KEY);
    window.location.href = "/";
  }
  return error;
});

export const apiClient = client;
export const noRedirectClient = nrClient;
