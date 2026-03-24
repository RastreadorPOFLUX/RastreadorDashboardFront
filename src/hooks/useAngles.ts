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

// WebSocket do backend FastAPI para dados em tempo real
const WS_BACKEND_URL = 'ws://localhost:8000/ws/live';

export const useAnglesData = () => {
  const [angles, setAngles] = useState<AnglesResponse | null>(null);
  const [lensAngle, setLensAngle] = useState<AnglesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wsActive, setWsActive] = useState(true);

  // Buscar ângulos do backend
  const fetchAngles = useCallback(async () => {
    setError(null);
    try {
      const data = await anglesApi.getCurrentAngles();
      setAngles(data);
      setWsActive(false); // Se cair aqui, WebSocket falhou
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

  // --- WebSocket para dados de ângulos em tempo real ---
  useEffect(() => {
    let ws: WebSocket | null = null;
    let wsTimeout: NodeJS.Timeout;
    let wsErrored = false;
    try {
      ws = new WebSocket(WS_BACKEND_URL);
      ws.onopen = () => {
        setWsActive(true);
        wsErrored = false;
      };
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.angles) {
            setAngles({
              sun_position: data.angles.sunPosition,
              lens_angle: data.angles.lensAngle,
              manual_setpoint: data.angles.manualSetpoint,
            });
          }
        } catch (e) {}
      };
      ws.onerror = () => {
        wsErrored = true;
        setWsActive(false);
        setError('WebSocket falhou, usando HTTP como fallback.');
        fetchAngles();
      };
      ws.onclose = () => {
        if (!wsErrored) {
          setWsActive(false);
          setError('WebSocket fechado, usando HTTP como fallback.');
          fetchAngles();
        }
      };
      // Timeout para fallback caso o WebSocket não conecte
      wsTimeout = setTimeout(() => {
        if (ws && ws.readyState !== 1) {
          ws.close();
          setWsActive(false);
          setError('WebSocket timeout, usando HTTP como fallback.');
          fetchAngles();
        }
      }, 3000);
    } catch {
      setWsActive(false);
      setError('WebSocket erro, usando HTTP como fallback.');
      fetchAngles();
    }
    return () => {
      if (ws) ws.close();
      if (wsTimeout) clearTimeout(wsTimeout);
    };
  }, [fetchAngles]);

  // Polling HTTP só se WebSocket não estiver ativo
  useEffect(() => {
    if (!wsActive) {
      const interval = setInterval(fetchAngles, 5000);
      return () => clearInterval(interval);
    }
  }, [wsActive, fetchAngles]);

  return {
    angles,
    loading,
    error,
    fetchAngles,
    fetchLensAngle
  };
};