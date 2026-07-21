import { useMemo, useRef } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartInstance, AgChartOptions } from "ag-charts-community";
import { useDateContext } from "../MenuLateral/DateContext";
import { useSolarDataHistory } from "../../hooks/useSolarData";
import ChartCard from "../ChartCard";
import toBrDate from "../../helper/toBrdate";

interface SolarData {
  date: string;
  hour: string;
  time: string;
  timestamp: number;
  solarIrradianceReference: number;
  solarIrradiancePyranometer: number;
  solarIrradiancePhotodetector: number;
  efficiency: number;
}


function SolarIrradiationCard() {
  const { BeginDate, EndDate } = useDateContext();
  const { history, error } = useSolarDataHistory(BeginDate, EndDate);
  const chartRef = useRef<AgChartInstance<AgChartOptions>>(null);

  const data: SolarData[] = useMemo(
    () =>
      history.map((record) => {
        const date = new Date(record.timestamp * 1000);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hourStr = String(date.getHours()).padStart(2, "0");

        return {
          date: `${year}-${month}-${day}`,
          hour: `${hourStr}h`,
          time: `${day}-${month}-${year}-${hourStr}h`,
          timestamp: record.timestamp * 1000,
          solarIrradianceReference: record.referencia,
          solarIrradiancePyranometer: record.valor_piranometro,
          solarIrradiancePhotodetector: record.valor_fotodetector,
          efficiency:
            record.valor_piranometro > 0
              ? Math.min(100, (record.valor_fotodetector / record.valor_piranometro) * 100)
              : 0,
        };
      }),
    [history]
  );

  const intervalTime = `${toBrDate(BeginDate)} - ${toBrDate(EndDate)}`;

  // Tooltip renderer melhorado
  const tooltipRenderer = (params: any) => {
    return {
      title: ` ${params.datum.hour}`,
      heading: ` ${toBrDate(params.datum.date)}`,
    };
  };

  const options: AgChartOptions = {
    data: data,
    background: {
      visible: false,
    },
    title: {
      text: `Irradiação Solar - (${intervalTime})`,
      fontSize: 22,
      fontFamily: "Lato, sans-serif",
      color: "#000000",
    },
    subtitle: {
      text: "Captada por: Piranômetro, Fotodetector e Valor de Referência",
      fontSize: 14,
      fontFamily: "Lato, sans-serif",
      color: "#000000",
    },
    series: [
      {
        type: "bar",
        xKey: "time",
        yKey: "solarIrradiancePhotodetector",
        yName: "Fotodetector",
        fill: "#DD702C",
        cornerRadius: 9,
        tooltip: {
          renderer: tooltipRenderer,
        },
      },
      {
        type: "bar",
        xKey: "time",
        yKey: "solarIrradiancePyranometer",
        yName: "Piranômetro",
        fill: "#C62E2E",
        cornerRadius: 9,
        tooltip: {
          renderer: tooltipRenderer,
        },
      },
      {
        type: "bar",
        xKey: "time",
        yKey: "solarIrradianceReference",
        yName: "Referência",
        fill: "#c3c62eff",
        cornerRadius: 9,
        tooltip: {
          renderer: tooltipRenderer,
        },
      },
      {
        type: "line",
        xKey: "time",
        yKey: "efficiency",
        yName: "Eficiência",
        stroke: "black",
        marker: {
          fill: "yellow",
          size: 7,
          stroke: "black",
          strokeWidth: 3,
          shape: "diamond",
        },
        tooltip: {
          renderer: tooltipRenderer,
        },
      }
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Horário",
          fontSize: 11,
          fontFamily: "Lato, sans-serif",
        },
        label: {
          formatter: ({ value }) => `${value.split("-")[3]}`,
        },
        gridLine: {
          enabled: false,
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "W/m²",
          fontFamily: "Lato, sans-serif",
        },
        keys: ["solarIrradiancePyranometer", "solarIrradiancePhotodetector", "solarIrradianceReference"],
        max: 2000,
        gridLine: {
          enabled: false,
        },
      },
      {
        type: "number",
        position: "right",
        title: {
          text: "(%)",
          fontFamily: "Lato, sans-serif",
        },
        keys: ["efficiency"],
        max: 100,
        gridLine: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <ChartCard
      width={"45%"}
      height={"55%"}
      left={"25%"}
      top={"21%"}
      title="irradiacao_solar"
      chartRef={chartRef}
    >
      {error && (
        <span style={{ color: "red", fontSize: "0.75rem" }}>{error}</span>
      )}
      <AgCharts ref={chartRef} options={options} style={{ height: "100%" }} />
    </ChartCard>
  );
}

export default SolarIrradiationCard;
