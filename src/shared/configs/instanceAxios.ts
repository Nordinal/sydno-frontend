import axios from 'axios';

export const API = 'http://45.10.245.87/api'

export const instanceApi= axios.create({
    baseURL: API,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    withCredentials: true
  });