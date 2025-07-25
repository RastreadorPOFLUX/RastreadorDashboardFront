import axios from 'axios';
import { SystemStatusResponse } from '../types/api';

// Configuração base da API
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Serviços específicos para checar o status de conexão
export async function checkConnectionApi() {
        const response = await api.get('/api/system-status');
        return response.data;
    };