import { useState, useEffect, useCallback } from 'react';
import { MotorResponse } from '../types/api';
import { motorApi } from '../services/motorApi';

// WebSocket do backend FastAPI para dados em tempo real
const WS_BACKEND_URL = 'ws://localhost:8000/ws/live';

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
  const [wsActive, setWsActive] = useState(true);

  // Buscar dados do motor via HTTP
  const fetchMotorPower = useCallback(async () => {
    setError(null);
    try {
      const data = await motorApi.getCurrentMotorPower();
      setPower(data);
      setWsActive(false); // Se cair aqui, WebSocket falhou
      return data;
    } catch (err) {
      setError('Erro ao buscar dados do motor.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);


  // WebSocket para dados do motor em tempo real
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
          if (data.motor) {
            setPower(data.motor);
          }
        } catch (e) {}
      };
      ws.onerror = () => {
        wsErrored = true;
        setWsActive(false);
        setError('WebSocket falhou, usando HTTP como fallback.');
        fetchMotorPower();
      };
      ws.onclose = () => {
        if (!wsErrored) {
          setWsActive(false);
          setError('WebSocket fechado, usando HTTP como fallback.');
          fetchMotorPower();
        }
      };
      wsTimeout = setTimeout(() => {
        if (ws && ws.readyState !== 1) {
          ws.close();
          setWsActive(false);
          setError('WebSocket timeout, usando HTTP como fallback.');
          fetchMotorPower();
        }
      }, 3000);
    } catch {
      setWsActive(false);
      setError('WebSocket erro, usando HTTP como fallback.');
      fetchMotorPower();
    }
    return () => {
      if (ws) ws.close();
      if (wsTimeout) clearTimeout(wsTimeout);
    };
  }, [fetchMotorPower]);

  // Polling HTTP só se WebSocket não estiver ativo
  useEffect(() => {
    if (!wsActive) {
      const interval = setInterval(fetchMotorPower, 5000);
      return () => clearInterval(interval);
    }
  }, [wsActive, fetchMotorPower]);

  return {
    power,
    loading,
    error,
    fetchMotorPower
  };
};