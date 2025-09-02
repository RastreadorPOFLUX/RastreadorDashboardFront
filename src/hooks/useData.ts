import { useState, useCallback } from 'react';
import { dataApi } from '../services/dataApi';

export interface UseData {
  loading: boolean;
  error: string | null;
  success: boolean;
  downloadCsv: (filename?: string) => Promise<boolean>;
  destroyData: () => Promise<boolean>; // Agora retorna boolean indicando sucesso
}

export const useData = () => {
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingDestroy, setLoadingDestroy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const destroyData = useCallback(async (): Promise<boolean> => {
    setLoadingDestroy(true);
    setError(null);
    setSuccess(false);
    
    try {
      await dataApi.destroyData();
      setSuccess(true);
      return true; // Retorna sucesso
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao apagar dados.';
      setError(errorMessage);
      console.error('Erro ao apagar dados:', err);
      return false; // Retorna falha
    } finally {
      setLoadingDestroy(false);
    }
  }, []);

  const downloadCsv = useCallback(async (filename: string = 'tracking.csv'): Promise<boolean> => {
    setLoadingDownload(true);
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
      
      setSuccess(true);
      return true;
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao baixar dados CSV.';
      setError(errorMessage);
      console.error('Erro no download:', err);
      return false;
    } finally {
      setLoadingDownload(false);
    }
  }, []);

  return {
    loadingDownload,
    loadingDestroy,
    error,
    success,
    downloadCsv,
    destroyData
  };
};