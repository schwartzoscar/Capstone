import axios from 'axios';
import { USER_KEY } from "../contexts/AuthContext";
import { getCookie } from "./cookieHelpers";

// TODO: Setup .env file and get URL from there.
const options = {
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-CSRF-TOKEN': getCookie('csrf_access_token')
  }
}

const client = axios.create(options);

client.interceptors.response.use(resp => resp, error => {
  if(error.response?.status === 401) {
    sessionStorage.removeItem(USER_KEY);
    window.location.href = "/";
  }
  return error;
});

export const apiClient = client;
export const noInterceptClient = axios.create(options);
