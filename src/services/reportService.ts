import { solarDataApi } from './solarDataApi';
import { controlSignalsApi } from './controlSignalsApi';
import { anglesApi } from './anglesApi';
import { sensorsApi } from './sensorsApi';
import { pidApi } from './pidApi';
import { motorApi } from './motorApi';
import {
  AnglesResponse,
  ControlResponse,
  MotorResponse,
  SensorsResponse,
} from '../types/api';

export interface SeriesStats {
  count: number;
  min: number;
  max: number;
  avg: number;
}

export interface FloodingEvent {
  timestamp: number;
  date: string;
  time: string;
}

export interface SummaryReportData {
  solarStats: {
    pyranometer: SeriesStats;
    photodetector: SeriesStats;
    reference: SeriesStats;
  } | null;
  controlStats: {
    erro: SeriesStats;
    saida: SeriesStats;
    p: SeriesStats;
    i: SeriesStats;
    d: SeriesStats;
  } | null;
  temperatureStats: SeriesStats | null;
  floodingEvents: FloodingEvent[] | null;
  warnings: string[];
}

const computeStats = (values: number[]): SeriesStats => {
  if (values.length === 0) {
    return { count: 0, min: 0, max: 0, avg: 0 };
  }
  const sum = values.reduce((acc, value) => acc + value, 0);
  return {
    count: values.length,
    min: Math.min(...values),
    max: Math.max(...values),
    avg: sum / values.length,
  };
};

const statsFromRecords = <T>(records: T[], key: keyof T): SeriesStats =>
  computeStats(records.map((record) => Number(record[key])));

export const reportService = {
  // beginDate/endDate seguem o formato do filtro de datas do MenuLateral (YYYY-MM-DD)
  getSummaryData: async (beginDate: string, endDate: string): Promise<SummaryReportData> => {
    const warnings: string[] = [];

    const [solarResult, controlResult, temperatureResult, floodingResult] =
      await Promise.allSettled([
        solarDataApi.getHistory(beginDate, endDate),
        controlSignalsApi.getHistory(beginDate, endDate),
        sensorsApi.getTemperatureHistory(beginDate, endDate),
        sensorsApi.getFloodingEvents(beginDate, endDate),
      ]);

    let solarStats: SummaryReportData['solarStats'] = null;
    if (solarResult.status === 'fulfilled') {
      const records = solarResult.value;
      solarStats = {
        pyranometer: statsFromRecords(records, 'valor_piranometro'),
        photodetector: statsFromRecords(records, 'valor_fotodetector'),
        reference: statsFromRecords(records, 'referencia'),
      };
    } else {
      warnings.push('Não foi possível obter o histórico de irradiação solar.');
    }

    let controlStats: SummaryReportData['controlStats'] = null;
    if (controlResult.status === 'fulfilled') {
      const records = controlResult.value;
      controlStats = {
        erro: statsFromRecords(records, 'erro'),
        saida: statsFromRecords(records, 'saida'),
        p: statsFromRecords(records, 'p'),
        i: statsFromRecords(records, 'i'),
        d: statsFromRecords(records, 'd'),
      };
    } else {
      warnings.push('Não foi possível obter o histórico de sinais de controle.');
    }

    let temperatureStats: SummaryReportData['temperatureStats'] = null;
    if (temperatureResult.status === 'fulfilled') {
      temperatureStats = statsFromRecords(temperatureResult.value, 'valor_temperatura');
    } else {
      warnings.push('Não foi possível obter o histórico de temperatura.');
    }

    let floodingEvents: SummaryReportData['floodingEvents'] = null;
    if (floodingResult.status === 'fulfilled') {
      floodingEvents = floodingResult.value.map((record) => {
        const date = new Date(record.dt_alagamento * 1000);
        return {
          timestamp: record.dt_alagamento,
          date: date.toLocaleDateString('pt-BR'),
          time: date.toLocaleTimeString('pt-BR'),
        };
      });
    } else {
      warnings.push('Não foi possível obter o histórico de acionamentos do sensor de alagamento.');
    }

    return { solarStats, controlStats, temperatureStats, floodingEvents, warnings };
  },
};
