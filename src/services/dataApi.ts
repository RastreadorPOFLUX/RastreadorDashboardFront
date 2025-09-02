// dataApi.ts
import axios from "axios";

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const dataApi = {
  getCsvData: async (): Promise<Blob> => {
    const response = await api.get('/api/tracking-data', {
      responseType: 'blob',
    });
    return response.data;
  },
};