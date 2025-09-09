// dataApi.ts
import axios from "axios";

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

export const dataApi = {
  getCsvData: async (): Promise<Blob> => {
    const response = await api.get('/api/tracking-data', {
      responseType: 'blob',
    });
    return response.data;
  },

  destroyData: async (): Promise<void> => {
    const response = await api.delete('/api/tracking-data');
    if (response.status !== 200) {
      throw new Error('Failed to clear tracking data');
    }
  }
};