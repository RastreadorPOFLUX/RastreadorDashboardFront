import axios from "axios";
import { MotorResponse } from "../types/api";

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
export const motorApi = {

// Obter ângulos atuais do sistema
  getCurrentMotorPower: async (): Promise<MotorResponse> => {
    const response = await api.get('/api/motor');
    return response.data as MotorResponse;
  },

};