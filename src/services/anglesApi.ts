import axios from 'axios';
import { AnglesResponse } from '../types/api';

// Configuração base da API
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviços específicos para ângulos
export const anglesApi = {

// Obter ângulos atuais do sistema
  getCurrentAngles: async (): Promise<AnglesResponse> => {
    const response = await api.get('/api/angles');
    return response.data as AnglesResponse;
  },

  // Obter ângulos atuais do sistema
  getCurrentLensAngle: async (): Promise<AnglesResponse> => {
    const response = await api.get('/api/angles');
    return response.data.lens_angle as AnglesResponse;
  }
};