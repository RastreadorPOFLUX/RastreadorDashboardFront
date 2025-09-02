import axios from 'axios';
import { ControlRequest, PidAdjustRequest, PidRequest } from '../types/api';

// Configuração base da API
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviços específicos para controlador PID
export const pidApi = {
// Obter parâmetros do atuais do controlador PID
  getCurrentParameters: async (): Promise<ControlRequest> => {
    const response = await api.get('/api/pid');
    return response.data as ControlRequest;
  },

  setCurrentParameters: async (adjust: PidAdjustRequest): Promise<void> => {
      const request: PidRequest = {adjust};
      await api.patch('/api/adjustPid', request);
  }
};