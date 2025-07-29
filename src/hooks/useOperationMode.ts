import { useState, useEffect, useCallback } from 'react';
import { OperationMode, RTCAdjustRequest } from '../types/api';
import { operationModeApi } from '../services/operationModeApi';

interface UseOperationModeReturn {
  currentMode: OperationMode;
  isLoading: boolean;
  isOnline: boolean;
  error: string | null;
  setMode: (mode: OperationMode, manual_setpoint: number, adjust: RTCAdjustRequest) => Promise<void>;
}

export const useOperationMode = (): UseOperationModeReturn => {
  const [currentMode, setCurrentMode] = useState<OperationMode>('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Função para obter modo atual
  const fetchCurrentMode = useCallback(async () => {
    try {
      const mode = await operationModeApi.getCurrentMode();
      setCurrentMode(mode);
      setIsOnline(true);
      setError(null);
    } catch (err) {
      setIsOnline(false);
      setError('Erro ao conectar com o backend');
      console.error('Erro ao buscar modo atual:', err);
    }
  }, []);

  // Função para alterar modo
  const setMode = useCallback(async (mode: OperationMode, manual_setpoint: number, adjust: RTCAdjustRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await operationModeApi.setMode(mode, manual_setpoint, adjust);
      setCurrentMode(mode);
      setIsOnline(true);
    } catch (err) {
      setError('Erro ao alterar modo de operação');
      console.error('Erro ao alterar modo:', err);
      // Recarregar modo atual em caso de erro
      await fetchCurrentMode();
    } finally {
      setIsLoading(false);
    }
  }, [fetchCurrentMode]);

  // Verificar conectividade inicial
  useEffect(() => {
    const checkConnection = async () => {
      const online = await operationModeApi.checkHealth();
      setIsOnline(online);
      
      if (online) {
        await fetchCurrentMode();
      }
    };

    checkConnection();
  }, [fetchCurrentMode]);

  // Polling a cada 5 segundos para sincronizar com backend
  useEffect(() => {
    const interval = setInterval(fetchCurrentMode, 5000);
    return () => clearInterval(interval);
  }, [fetchCurrentMode]);

  return {
    currentMode,
    isLoading,
    isOnline,
    error,
    setMode
  };
};