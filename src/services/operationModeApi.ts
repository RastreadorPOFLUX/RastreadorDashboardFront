import axios from 'axios';
import { OperationMode, ModeRequest, RTCAdjustRequest, SystemStatusResponse } from '../types/api';

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
export const operationModeApi = {

    // Obter modo atual do sistema
  getCurrentMode: async (): Promise<OperationMode> => {
    const response = await api.get<SystemStatusResponse>('/api/system-status');
    return response.data.mode;
  },

  // Alterar modo de operação
  setMode: async (mode: OperationMode, manual_setpoint: number, adjust: RTCAdjustRequest): Promise<void> => {
    const request: ModeRequest = { mode, manual_setpoint, adjust};
    await api.patch('/api/mode', request);
  },

    // Verificar se API está online
  checkHealth: async (): Promise<boolean> => {
    try {
      await api.get('/api/health');
      return true;
    } catch {
      return false;
    }
  }

};