import { useCallback, useEffect, useState } from 'react';
import { SensorsResponse } from '../types/api';
import { sensorsApi } from '../services/sensorsApi';
import { useLiveData } from '../contexts/LiveDataContext';

export interface UseSensorsData {
  sensors: SensorsResponse | null;
  loading: boolean;
  error: string | null;
}

// Dados dos sensores (piranômetro, fotodetector, temperatura, alagamento) em
// tempo real via WebSocket (LiveDataProvider), com fallback para polling
// HTTP quando o WebSocket não está disponível.
export const useSensorsData = (): UseSensorsData => {
  const { sensors: wsSensors, wsConnected } = useLiveData();
  const [httpSensors, setHttpSensors] = useState<SensorsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSensors = useCallback(async () => {
    try {
      const data = await sensorsApi.getCurrentSensors();
      setHttpSensors(data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar dados dos sensores.');
    }
  }, []);

  useEffect(() => {
    if (wsConnected) return;
    fetchSensors();
    const interval = setInterval(fetchSensors, 5000);
    return () => clearInterval(interval);
  }, [wsConnected, fetchSensors]);

  return {
    sensors: wsConnected ? wsSensors : httpSensors,
    loading: false,
    error: wsConnected ? null : error,
  };
};
