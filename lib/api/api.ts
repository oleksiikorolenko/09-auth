import axios from 'axios';



const myKey = process.env.NEXT_PUBLIC_API_URL
;

if (myKey) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${myKey}`;
} else {
  console.warn('NEXT_PUBLIC_NOTEHUB_TOKEN is not defined.');
}

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});