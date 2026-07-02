import { useState, useEffect, useCallback } from 'react';
import { ControlSignalRecord } from '../types/api';
import { controlSignalsApi } from '../services/controlSignalsApi';

// beginDate/endDate vêm do filtro de datas do MenuLateral (useDateContext), no formato YYYY-MM-DD
export const useControlSignalsHistory = (beginDate: string, endDate: string, limit = 25500) => {
  const [history, setHistory] = useState<ControlSignalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await controlSignalsApi.getHistory(beginDate, endDate, limit);
      setHistory(data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar histórico de sinais de controle.');
    } finally {
      setIsLoading(false);
    }
  }, [beginDate, endDate, limit]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, isLoading, error };
};
