import { useState, useEffect, useCallback } from 'react';
import { SensorsResponse } from '../types/api';
import { SensorsApi } from '../services/sensorsApi';


export interface UseSensorsData {
  sensors: SensorsResponse | null;
  lensAngle: SensorsResponse | null;
  loading: boolean;
  error: string | null;
  fetchsensors: () => Promise<SensorsResponse | null>;
  fetchLenssensors: () => Promise<SensorsResponse | null>;
}
export const useSensorsData = () => {
  const [sensors, setSensors] = useState<SensorsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar sensores do backend
  const fetchSensors = useCallback(async () => {
    setError(null);
    try {
      const data = await SensorsApi.getCurrentSensors();
      setSensors(data);
      return data;
    } catch (err) {
      setError('Erro ao buscar dados dos sensores');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

    
  useEffect(() => {
    fetchSensors();
  }, [fetchSensors]);

  // Pollings a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(fetchSensors, 5000);
    return () => clearInterval(interval);
  }, [fetchSensors]);


  return {
    sensors,
    loading,
    error,
    fetchSensors
  };
};