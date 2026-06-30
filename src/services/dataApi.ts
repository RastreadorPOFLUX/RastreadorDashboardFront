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
      timeout: 120_000,
    });
    return response.data;
  },

  destroyData: async (): Promise<void> => {
    const response = await api.delete('/api/tracking-data', {
      timeout: 90_000, // ESP32 pode demorar apagando flash
    });
    if (response.status !== 200) {
      throw new Error('Failed to clear tracking data');
    }
  }
};