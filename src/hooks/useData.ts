import { useState, useCallback } from 'react';
import { dataApi } from '../services/dataApi';

export interface UseData {
  loading: boolean;
  error: string | null;
  success: boolean; // Novo estado para sucesso
  downloadCsv: (filename?: string) => Promise<boolean>; // Agora retorna boolean indicando sucesso
}

export const useData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false); // Novo estado

  const downloadCsv = useCallback(async (filename: string = 'tracking.csv'): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const blob = await dataApi.getCsvData();
      
      if (blob.size === 0) {
        throw new Error('O arquivo CSV está vazio');
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
      
      setSuccess(true); // Marca como sucesso
      return true; // Retorna sucesso
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao baixar dados CSV.';
      setError(errorMessage);
      console.error('Erro no download:', err);
      return false; // Retorna falha
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    success, // Exporta o estado de sucesso
    downloadCsv
  };
};