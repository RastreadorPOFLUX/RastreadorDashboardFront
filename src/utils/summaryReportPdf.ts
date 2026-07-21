import jsPDF from 'jspdf';
import { SeriesStats, SummaryReportData } from '../services/reportService';
import toBrDate from './../helper/toBrdate';

const MARGIN_X = 40;
const LINE_HEIGHT = 18;

const formatNumber = (value: number, decimals = 2) =>
  value.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

class ReportWriter {
  readonly doc: jsPDF;
  private y = 50;
  private readonly pageWidth: number;
  private readonly pageHeight: number;

  constructor() {
    this.doc = new jsPDF({ unit: 'pt', format: 'a4' });
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
  }

  private ensureSpace(extra: number) {
    if (this.y + extra > this.pageHeight - MARGIN_X) {
      this.doc.addPage();
      this.y = 50;
    }
  }

  title(text: string) {
    this.ensureSpace(30);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(18);
    this.doc.text(text, MARGIN_X, this.y);
    this.y += 26;
  }

  subtitle(text: string) {
    this.ensureSpace(18);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(90);
    this.doc.text(text, MARGIN_X, this.y);
    this.doc.setTextColor(0);
    this.y += 16;
  }

  sectionTitle(text: string) {
    this.ensureSpace(28);
    this.y += 10;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(13);
    this.doc.text(text, MARGIN_X, this.y);
    this.y += 6;
    this.doc.setDrawColor(200);
    this.doc.line(MARGIN_X, this.y, this.pageWidth - MARGIN_X, this.y);
    this.y += 16;
  }

  keyValueRow(label: string, value: string) {
    this.ensureSpace(LINE_HEIGHT);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10.5);
    this.doc.text(label, MARGIN_X, this.y);
    this.doc.text(value, this.pageWidth - MARGIN_X, this.y, { align: 'right' });
    this.y += LINE_HEIGHT;
  }

  statsTable(rows: { label: string; unit: string; stats: SeriesStats }[]) {
    const col1 = MARGIN_X;
    const col3 = this.pageWidth - MARGIN_X - 200;
    const col4 = this.pageWidth - MARGIN_X - 100;
    const col5 = this.pageWidth - MARGIN_X;

    this.ensureSpace(LINE_HEIGHT + 14);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10);
    this.doc.text('Variável', col1, this.y);
    this.doc.text('Mín.', col3, this.y, { align: 'right' });
    this.doc.text('Média', col4, this.y, { align: 'right' });
    this.doc.text('Máx.', col5, this.y, { align: 'right' });
    this.y += 14;
    this.doc.setDrawColor(230);
    this.doc.line(col1, this.y - 10, col5, this.y - 10);

    this.doc.setFont('helvetica', 'normal');
    rows.forEach(({ label, unit, stats }) => {
      this.ensureSpace(LINE_HEIGHT);
      this.doc.text(unit ? `${label} (${unit})` : label, col1, this.y);
      this.doc.text(formatNumber(stats.min), col3, this.y, { align: 'right' });
      this.doc.text(formatNumber(stats.avg), col4, this.y, { align: 'right' });
      this.doc.text(formatNumber(stats.max), col5, this.y, { align: 'right' });
      this.y += LINE_HEIGHT;
    });
  }

  private gridRow(values: string[], colX: number[], usableWidth: number, rowHeight: number, bold: boolean) {
    const top = this.y;
    this.doc.setFont('helvetica', bold ? 'bold' : 'normal');
    this.doc.setFontSize(10);
    this.doc.setDrawColor(160);
    if (bold) {
      this.doc.setFillColor(235, 235, 235);
      this.doc.rect(MARGIN_X, top, usableWidth, rowHeight, 'FD');
    } else {
      this.doc.rect(MARGIN_X, top, usableWidth, rowHeight, 'S');
    }
    values.forEach((value, index) => {
      const x = colX[index];
      if (index > 0) {
        this.doc.line(x, top, x, top + rowHeight);
      }
      this.doc.text(value, x + 6, top + rowHeight - 7);
    });
    this.y += rowHeight;
  }

  dataTable(headers: string[], rows: string[][]) {
    const usableWidth = this.pageWidth - MARGIN_X * 2;
    const colWidth = usableWidth / headers.length;
    const colX = headers.map((_, index) => MARGIN_X + colWidth * index);
    const rowHeight = LINE_HEIGHT + 6;

    this.ensureSpace(rowHeight);
    this.gridRow(headers, colX, usableWidth, rowHeight, true);

    rows.forEach((row) => {
      this.ensureSpace(rowHeight);
      this.gridRow(row, colX, usableWidth, rowHeight, false);
    });

    this.y += 8;
  }

  paragraph(text: string) {
    this.ensureSpace(LINE_HEIGHT);
    this.doc.setFont('helvetica', 'italic');
    this.doc.setFontSize(9.5);
    this.doc.setTextColor(150, 60, 60);
    const lines = this.doc.splitTextToSize(text, this.pageWidth - MARGIN_X * 2) as string[];
    this.doc.text(lines, MARGIN_X, this.y);
    this.y += lines.length * 12;
    this.doc.setTextColor(0);
  }
}

export function buildSummaryReportPdf(
  data: SummaryReportData,
  beginDate: string,
  endDate: string,
): jsPDF {
  const writer = new ReportWriter();

  writer.title('Relatório Resumo do Sistema');
  writer.subtitle(`Período dos dados históricos: ${toBrDate(beginDate)} a ${toBrDate(endDate)}`);
  writer.subtitle(`Gerado em: ${new Date().toLocaleString('pt-BR')}`);

  if (data.solarStats) {
    writer.sectionTitle('Irradiação Solar (histórico do período)');
    writer.statsTable([
      { label: 'Piranômetro', unit: 'W/m²', stats: data.solarStats.pyranometer },
      { label: 'Fotodetector', unit: 'W/m²', stats: data.solarStats.photodetector },
      { label: 'Referência', unit: 'W/m²', stats: data.solarStats.reference },
    ]);
    writer.keyValueRow('Registros no período', `${data.solarStats.pyranometer.count}`);
  }

  if (data.controlStats) {
    writer.sectionTitle('Sinais de Controle (histórico do período)');
    writer.statsTable([
      { label: 'Erro', unit: '', stats: data.controlStats.erro },
      { label: 'Saída', unit: '', stats: data.controlStats.saida },
      { label: 'P', unit: '', stats: data.controlStats.p },
      { label: 'I', unit: '', stats: data.controlStats.i },
      { label: 'D', unit: '', stats: data.controlStats.d },
    ]);
    writer.keyValueRow('Registros no período', `${data.controlStats.erro.count}`);
  }

  if (data.temperatureStats) {
    writer.sectionTitle('Temperatura (histórico do período)');
    writer.statsTable([
      { label: 'Temperatura', unit: '°C', stats: data.temperatureStats },
    ]);
    writer.keyValueRow('Registros no período', `${data.temperatureStats.count}`);
  }

  if (data.floodingEvents) {
    writer.sectionTitle('Alagamento - Acionamentos Detectados');
    if (data.floodingEvents.length > 0) {
      writer.dataTable(
        ['Data', 'Hora'],
        data.floodingEvents.map((event) => [event.date, event.time]),
      );
    }
    writer.keyValueRow('Registros no período', `${data.floodingEvents.length}`);
  }

  

  if (data.warnings.length > 0) {
    writer.sectionTitle('Avisos');
    data.warnings.forEach((warning) => writer.paragraph(`• ${warning}`));
  }

  return writer.doc;
}
