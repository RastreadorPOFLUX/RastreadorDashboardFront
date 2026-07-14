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
  angles: AnglesResponse | null;
  sensors: SensorsResponse | null;
  pid: ControlResponse | null;
  motor: MotorResponse | null;
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

    const [solarResult, controlResult, anglesResult, sensorsResult, pidResult, motorResult] =
      await Promise.allSettled([
        solarDataApi.getHistory(beginDate, endDate),
        controlSignalsApi.getHistory(beginDate, endDate),
        anglesApi.getCurrentAngles(),
        sensorsApi.getCurrentSensors(),
        pidApi.getCurrentParameters(),
        motorApi.getCurrentMotorPower(),
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

    const angles = anglesResult.status === 'fulfilled' ? anglesResult.value : null;
    if (anglesResult.status === 'rejected') {
      warnings.push('Não foi possível obter os ângulos atuais.');
    }

    const sensors = sensorsResult.status === 'fulfilled' ? sensorsResult.value : null;
    if (sensorsResult.status === 'rejected') {
      warnings.push('Não foi possível obter os dados dos sensores.');
    }

    const pid = pidResult.status === 'fulfilled' ? pidResult.value : null;
    if (pidResult.status === 'rejected') {
      warnings.push('Não foi possível obter os parâmetros do PID.');
    }

    const motor = motorResult.status === 'fulfilled' ? motorResult.value : null;
    if (motorResult.status === 'rejected') {
      warnings.push('Não foi possível obter os dados do motor.');
    }

    return { solarStats, controlStats, angles, sensors, pid, motor, warnings };
  },
};
