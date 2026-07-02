import axios from 'axios';
import { ControlSignalRecord } from '../types/api';

// Configuração base da API
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviços específicos para o histórico de sinais de controle (tabela dados_controle)
export const controlSignalsApi = {
  // beginDate/endDate seguem o formato do filtro de datas do MenuLateral (YYYY-MM-DD)
  getHistory: async (
    beginDate: string,
    endDate: string,
    limit = 25500,
  ): Promise<ControlSignalRecord[]> => {
    const response = await api.get('/api/control-signals', {
      params: { start_date: beginDate, end_date: endDate, limit },
    });
    return response.data as ControlSignalRecord[];
  },
};
