import axios from 'axios';

export const axiosIns = axios.create({
  baseURL: 'https://prismatic-malabi-92ff54.netlify.app/.netlify/functions/api'
});
