import { useCallback, useState } from 'react';
import { reportService } from '../services/reportService';
import { buildSummaryReportPdf } from '../utils/summaryReportPdf';

export const useSummaryReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = useCallback(async (beginDate: string, endDate: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const data = await reportService.getSummaryData(beginDate, endDate);
      const pdf = buildSummaryReportPdf(data, beginDate, endDate);
      pdf.save(`relatorio_resumo_${beginDate}_a_${endDate}.pdf`);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao gerar relatório.';
      setError(message);
      console.error('Erro ao gerar relatório resumo:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, generateReport };
};
