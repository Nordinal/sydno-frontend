import axios from 'axios';

export const BaseUrl = 'http://localhost';

export const instanceApi= axios.create({
    baseURL: BaseUrl,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true,
  });