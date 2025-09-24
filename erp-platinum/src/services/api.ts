// src/services/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5293';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`, // ✅ match your .NET route prefix
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;