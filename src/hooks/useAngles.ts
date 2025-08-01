import { useState, useEffect, useCallback } from 'react';
import { AnglesRequest } from '../types/api';
import { anglesApi } from '../services/anglesApi';


export interface UseAnglesData {
  angles: AnglesRequest | null;
  lensAngle: AnglesRequest | null;
  loading: boolean;
  error: string | null;
  fetchAngles: () => Promise<AnglesRequest | null>;
  fetchLensAngles: () => Promise<AnglesRequest | null>;
}
export const useAnglesData = () => {
  const [angles, setAngles] = useState<AnglesRequest | null>(null);
  const [lensAngle, setLensAngle] = useState<AnglesRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar ângulos do backend
  const fetchAngles = useCallback(async () => {
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

    const fetchLensAngle = useCallback(async () => {
    setError(null);
    try {
      const data = await anglesApi.getCurrentLensAngle();
      setLensAngle(data);
      return data;
    } catch (err) {
      setError('Erro ao buscar ângulo da lente');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar ao montar
  useEffect(() => {
    fetchAngles();
    fetchLensAngle();
  }, [fetchAngles]);

  // Pollings a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(fetchAngles, 5000);
    return () => clearInterval(interval);
  }, [fetchAngles]);

    useEffect(() => {
    const interval = setInterval(fetchLensAngle, 5000);
    return () => clearInterval(interval);
  }, [fetchLensAngle]);

  return {
    angles,
    loading,
    error,
    fetchAngles,
    fetchLensAngle
  };
};