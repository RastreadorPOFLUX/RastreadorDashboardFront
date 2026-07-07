import { useCallback, useEffect, useState } from 'react';
import { ControlResponse, PidAdjustRequest } from '../types/api';
import { pidApi } from '../services/pidApi';
import { useLiveData } from '../contexts/LiveDataContext';

export interface UsePidData {
  pid: ControlResponse | null;
  isLoading: boolean;
  error: string | null;
  setPidParameters: (adjust: PidAdjustRequest) => Promise<void>;
}

// Leitura dos parâmetros PID em tempo real via WebSocket (LiveDataProvider),
// com fallback para polling HTTP quando o WebSocket não está disponível.
// O ajuste dos ganhos continua via HTTP (comando, não leitura em tempo real).
export const usePidData = (): UsePidData => {
  const { pid: wsPid, wsConnected } = useLiveData();
  const [httpPid, setHttpPid] = useState<ControlResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPid = useCallback(async () => {
    try {
      const data = await pidApi.getCurrentParameters();
      setHttpPid(data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar parâmetros PID.');
    }
  }, []);

  useEffect(() => {
    if (wsConnected) return;
    fetchPid();
    const interval = setInterval(fetchPid, 5000);
    return () => clearInterval(interval);
  }, [wsConnected, fetchPid]);

  const setPidParameters = useCallback(async (adjust: PidAdjustRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await pidApi.setCurrentParameters(adjust);
      if (!wsConnected) await fetchPid();
    } catch (err) {
      setError('Erro ao alterar os parâmetros PID');
      console.error('Erro ao alterar parâmetros PID:', err);
    } finally {
      setIsLoading(false);
    }
  }, [wsConnected, fetchPid]);

  return {
    pid: wsConnected ? wsPid : httpPid,
    isLoading,
    error: wsConnected ? null : error,
    setPidParameters
  };
};
