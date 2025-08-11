import { useState, useEffect, useCallback } from 'react';
import { ControlResponse, PidAdjustRequest } from '../types/api';
import { pidApi } from '../services/pidApi';


export interface UsePidData {
  pid: ControlResponse | null;
  loading: boolean;
  error: string | null;
  fetchPid: () => Promise<ControlResponse | null>;
  setPidParameters: ( adjust: PidAdjustRequest) => Promise<void>;
}
export const usePidData = () => {
  const [pid, setPid] = useState<ControlResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar parâmetros PID do backend
  const fetchPid = useCallback(async () => {
    setError(null);
    try {
      const data = await pidApi.getCurrentParameters();
      setPid(data);
      return data;
    } catch (err) {
      setError('Erro ao buscar parâmetros PID.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

    // Função para alterar modo
    const setPidParameters = useCallback(async (adjust: PidAdjustRequest) => {
      setIsLoading(true);
      setError(null);
      try {
        await pidApi.setCurrentParameters(adjust);
        setPid(adjust);
      } catch (err) {
        setError('Erro ao alteraros parâmetros PID');
        console.error('Erro ao alterar parâmetros PID:', err);
        // Recarregar modo atual em caso de erro
        await fetchPid();
      } finally {
        setIsLoading(false);
      }
    }, [fetchPid]);


  useEffect(() => {
    fetchPid();
  }, [fetchPid]);

  // Pollings a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(fetchPid, 5000);
    return () => clearInterval(interval);
  }, [fetchPid]);

  return {
    pid,
    isLoading,
    error,
    fetchPid,
    setPidParameters
  };
};