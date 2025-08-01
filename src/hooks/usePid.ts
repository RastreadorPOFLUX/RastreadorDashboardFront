import { useState, useEffect, useCallback } from 'react';
import { PIDRequest } from '../types/api';
import { pidApi } from '../services/pidApi';


export interface UsePidData {
  pid: PIDRequest | null;
  loading: boolean;
  error: string | null;
  fetchPid: () => Promise<PIDRequest | null>;
}
export const usePidData = () => {
  const [pid, setPid] = useState<PIDRequest | null>(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    }
  }, []);


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
    loading,
    error,
    fetchPid
  };
};