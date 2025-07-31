import { useState, useEffect, useCallback } from 'react';
import { AnglesResponse } from '../types/api';
import { anglesApi } from '../services/anglesApi';


export interface UseAnglesData {
  angles: AnglesResponse | null;
  lensAngle: AnglesResponse | null;
  loading: boolean;
  error: string | null;
  fetchAngles: () => Promise<AnglesResponse | null>;
  fetchLensAngles: () => Promise<AnglesResponse | null>;
}
export const useAnglesData = () => {
  const [angles, setAngles] = useState<AnglesResponse | null>(null);
  const [lensAngle, setLensAngle] = useState<AnglesResponse | null>(null);
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