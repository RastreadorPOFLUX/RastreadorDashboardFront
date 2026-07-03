import { useState, useEffect, useCallback } from 'react';
import { SolarDataRecord } from '../types/api';
import { solarDataApi } from '../services/solarDataApi';

// beginDate/endDate vêm do filtro de datas do MenuLateral (useDateContext), no formato YYYY-MM-DD
export const useSolarDataHistory = (beginDate: string, endDate: string, limit = 25500) => {
  const [history, setHistory] = useState<SolarDataRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await solarDataApi.getHistory(beginDate, endDate, limit);
      setHistory(data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar histórico de irradiação solar.');
    } finally {
      setIsLoading(false);
    }
  }, [beginDate, endDate, limit]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, isLoading, error };
};
