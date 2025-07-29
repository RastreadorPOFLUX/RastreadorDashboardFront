import { useState, useEffect, useCallback } from 'react';
import { AnglesResponse } from '../types/api';
import { anglesApi } from '../services/anglesApi';


export interface UseAnglesData {
  angles: AnglesResponse | null;
  loading: boolean;
  error: string | null;
  fetchAngles: () => Promise<AnglesResponse | null>;
}
export const useAnglesData = () => {
  const [angles, setAngles] = useState<AnglesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar ângulos do backend
  const fetchAngles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await anglesApi.getCurrentAngles();
      setAngles(data);
      return data;
    } catch (err) {
      setError('Erro ao buscar ângulos');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar ao montar
  useEffect(() => {
    fetchAngles();
  }, [fetchAngles]);

  // Polling a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(fetchAngles, 5000);
    return () => clearInterval(interval);
  }, [fetchAngles]);

  return {
    angles,
    loading,
    error,
    fetchAngles,
  };
};