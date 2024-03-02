import axios from 'axios';
import { TOKEN_KEY, USER_KEY } from "../contexts/AuthContext";

const headers = {'Content-Type': 'application/json', Accept: 'application/json'};

const token = sessionStorage.getItem(TOKEN_KEY);
if(token) headers['Authorization'] = `Bearer ${token}`;

// TODO: Setup .env file and get URL from there.
const client = axios.create({baseURL: 'http://localhost:5000', withCredentials: true, headers});

client.interceptors.response.use(resp => resp, error => {
  if(error.response?.status === 401) {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    window.location.href = "/";
  }
  return error;
});

export const apiClient = client;
