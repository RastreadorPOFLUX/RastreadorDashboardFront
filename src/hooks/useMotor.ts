import { useState, useEffect, useCallback } from 'react';
import { MotorResponse } from '../types/api';
import { motorApi } from '../services/motorApi';


export interface UseMotorData {
  power : MotorResponse | null;
  loading: boolean;
  error: string | null;
  fetchMotorPower: () => Promise<MotorResponse | null>;
}

export const useMotorData = () => {
  const [power, setPower] = useState<MotorResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar ângulos do backend
  const fetchMotorPower = useCallback(async () => {
    setError(null);
    try {
      const data = await motorApi.getCurrentMotorPower();
      setPower(data);
      return data;
    } catch (err) {
      setError('Erro ao buscar dados do motor.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);


  // Buscar ao montar
  useEffect(() => {
    fetchMotorPower();
  }, [fetchMotorPower]);

  // Pollings a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(fetchMotorPower, 5000);
    return () => clearInterval(interval);
  }, [fetchMotorPower]);

  return {
    power,
    loading,
    error,
    fetchMotorPower
  };
};