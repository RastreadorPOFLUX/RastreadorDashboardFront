import { useCallback, useEffect, useState } from 'react';
import { AnglesResponse } from '../types/api';
import { anglesApi } from '../services/anglesApi';
import { useLiveData } from '../contexts/LiveDataContext';

export interface UseAnglesData {
  angles: AnglesResponse | null;
  loading: boolean;
  error: string | null;
}

// Dados de ângulos em tempo real via WebSocket (LiveDataProvider), com
// fallback para polling HTTP quando o WebSocket não está disponível.
export const useAnglesData = (): UseAnglesData => {
  const { angles: wsAngles, wsConnected } = useLiveData();
  const [httpAngles, setHttpAngles] = useState<AnglesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAngles = useCallback(async () => {
    try {
      const data = await anglesApi.getCurrentAngles();
      setHttpAngles(data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar ângulos.');
    }
  }, []);

  useEffect(() => {
    if (wsConnected) return;
    fetchAngles();
    const interval = setInterval(fetchAngles, 5000);
    return () => clearInterval(interval);
  }, [wsConnected, fetchAngles]);

  return {
    angles: wsConnected ? wsAngles : httpAngles,
    loading: false,
    error: wsConnected ? null : error,
  };
};
