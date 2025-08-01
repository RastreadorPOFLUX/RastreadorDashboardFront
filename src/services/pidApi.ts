import axios from 'axios';
import { PIDRequest } from '../types/api';

// Configuração base da API
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviços específicos para modos de operação
export const pidApi = {
// Obter parâmetros do atuais do controlador PID
  getCurrentParameters: async (): Promise<PIDRequest> => {
    const response = await api.get('/api/pid');
    return response.data as PIDRequest;
  }
};