import { useState, useEffect, useCallback } from 'react';
import { ControlResponse, PidAdjustRequest } from '../types/api';
import { pidApi } from '../services/pidApi';

// WebSocket do backend FastAPI para dados em tempo real
const WS_BACKEND_URL = 'ws://localhost:8000/ws/live';

export interface UsePidData {
  pid: ControlResponse | null;
  loading: boolean;
  error: string | null;
  fetchPid: () => Promise<ControlResponse | null>;
  setPidParameters: ( adjust: PidAdjustRequest) => Promise<void>;
}
export const usePidData = () => {
  const [pid, setPid] = useState<ControlResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wsActive, setWsActive] = useState(true);

  // Buscar parâmetros PID do backend via HTTP
  const fetchPid = useCallback(async () => {
    setError(null);
    try {
      const data = await pidApi.getCurrentParameters();
      setPid(data);
      setWsActive(false); // Se cair aqui, WebSocket falhou
      return data;
    } catch (err) {
      setError('Erro ao buscar parâmetros PID.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Função para alterar modo
  const setPidParameters = useCallback(async (adjust: PidAdjustRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await pidApi.setCurrentParameters(adjust);
      await fetchPid();
    } catch (err) {
      setError('Erro ao alteraros parâmetros PID');
      console.error('Erro ao alterar parâmetros PID:', err);
      // Recarregar modo atual em caso de erro
      await fetchPid();
    } finally {
      setIsLoading(false);
    }
  }, [fetchPid]);

  // WebSocket para dados do controlador PID em tempo real
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
          if (data.pid) {
            setPid(data.pid);
          }
        } catch (e) {}
      };
      ws.onerror = () => {
        wsErrored = true;
        setWsActive(false);
        setError('WebSocket falhou, usando HTTP como fallback.');
        fetchPid();
      };
      ws.onclose = () => {
        if (!wsErrored) {
          setWsActive(false);
          setError('WebSocket fechado, usando HTTP como fallback.');
          fetchPid();
        }
      };
      // Timeout para fallback caso o WebSocket não conecte
      wsTimeout = setTimeout(() => {
        if (ws && ws.readyState !== 1) {
          ws.close();
          setWsActive(false);
          setError('WebSocket timeout, usando HTTP como fallback.');
          fetchPid();
        }
      }, 3000);
    } catch {
      setWsActive(false);
      setError('WebSocket erro, usando HTTP como fallback.');
      fetchPid();
    }
    return () => {
      if (ws) ws.close();
      if (wsTimeout) clearTimeout(wsTimeout);
    };
  }, [fetchPid]);

  // Polling HTTP só se WebSocket não estiver ativo
  useEffect(() => {
    if (!wsActive) {
      const interval = setInterval(fetchPid, 5000);
      return () => clearInterval(interval);
    }
  }, [wsActive, fetchPid]);

  return {
    pid,
    isLoading,
    error,
    fetchPid,
    setPidParameters
  };
};