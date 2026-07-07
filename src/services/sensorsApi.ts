import axios from 'axios';
import { SensorsResponse } from '../types/api';

// Configuração base da API
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviços específicos para sensores (usado como fallback quando o WebSocket não está disponível)
export const sensorsApi = {
  getCurrentSensors: async (): Promise<SensorsResponse> => {
    const response = await api.get('/api/sensorsData');
    return response.data as SensorsResponse;
  },
};
