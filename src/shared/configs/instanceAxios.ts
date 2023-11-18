import axios from 'axios';

export const baseURL = 'http://localhost';

export const instanceApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true,
});

export const instanceApiFormData = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
  },
  withCredentials: true,
});

instanceApi.interceptors.request.use(async (config) => {
  try {
    await axios.get(baseURL + '/sanctum/csrf-cookie', {withCredentials: true});
  }
  finally {
    return config;
  }
})