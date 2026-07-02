import { useState, useEffect, useCallback } from 'react';
import { ControlSignalRecord } from '../types/api';
import { controlSignalsApi } from '../services/controlSignalsApi';

export const useControlSignalsHistory = (limit = 100, pollIntervalMs = 10000) => {
  const [history, setHistory] = useState<ControlSignalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await controlSignalsApi.getHistory(limit);
      setHistory(data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar histórico de sinais de controle.');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchHistory, pollIntervalMs]);

  return { history, isLoading, error };
};
