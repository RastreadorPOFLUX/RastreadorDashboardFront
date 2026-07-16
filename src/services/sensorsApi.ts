import axios from 'axios';
import { FloodingRecord, SensorsResponse, TemperatureRecord } from '../types/api';

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

  // beginDate/endDate seguem o formato do filtro de datas do MenuLateral (YYYY-MM-DD)
  getTemperatureHistory: async (
    beginDate: string,
    endDate: string,
    limit = 25500,
  ): Promise<TemperatureRecord[]> => {
    const response = await api.get('/api/temperature-data/history', {
      params: { start_date: beginDate, end_date: endDate, limit },
    });
    return response.data as TemperatureRecord[];
  },

  getFloodingEvents: async (
    beginDate: string,
    endDate: string,
    limit = 25500,
  ): Promise<FloodingRecord[]> => {
    const response = await api.get('/api/flooding-events/history', {
      params: { start_date: beginDate, end_date: endDate, limit },
    });
    return response.data as FloodingRecord[];
  },
};
