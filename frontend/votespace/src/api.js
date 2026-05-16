import axios from 'axios';
import "dotenv/config"

console.log(process.env.NEXT_PUBLIC_API_URL)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // URL do backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;