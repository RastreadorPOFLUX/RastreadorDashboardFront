import { AgCharts } from "ag-charts-react";
import { useMemo, useRef } from "react";
import { AgChartInstance, AgChartOptions } from "ag-charts-enterprise";
import { useControlSignalsHistory } from "../../hooks/useControlSignals";
import { useDateContext } from "../MenuLateral/DateContext";
import ChartCard from "../ChartCard";
import toBrDate from "../../helper/toBrdate";

interface ChartPoint {
  date: string;
  hour: string;
  time: string;
  controle: number;
  erro: number;
  output: number;
}


function ControlSignalsCard() {
  const { BeginDate, EndDate } = useDateContext();
  const { history, error } = useControlSignalsHistory(BeginDate, EndDate);
  const chartRef = useRef<AgChartInstance<AgChartOptions>>(null);

  const chartData: ChartPoint[] = useMemo(
    () =>
      history.map((record) => {
        const date = new Date(record.timestamp * 1000);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hourStr = String(date.getHours()).padStart(2, "0");
        const minuteStr = String(date.getMinutes()).padStart(2, "0");

        return {
          date: `${year}-${month}-${day}`,
          hour: `${hourStr}h${minuteStr}`,
          time: `${day}-${month}-${year}-${hourStr}h${minuteStr}`,
          controle: record.p + record.i + record.d,
          erro: record.erro,
          output: record.saida,
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
    title: {
      text: "Sinais de Controle - (" + intervalTime + ")",
      fontSize: 18,
      fontFamily: "Lato, sans-serif",
      color: "#000000",
    },
    data: chartData,
    background: {
      visible: false,
    },
    series: [
      {
        type: "line",
        xKey: "time",
        yKey: "controle",
        yName: "Controle",
        tooltip: {
          renderer: tooltipRenderer,
        },
      },
      {
        type: "line",
        xKey: "time",
        yKey: "erro",
        yName: "Erro",
        tooltip: {
          renderer: tooltipRenderer,
        },
      },
      {
        type: "line",
        xKey: "time",
        yKey: "output",
        yName: "Output",
        tooltip: {
          renderer: tooltipRenderer,
        },
      },
    ],
    legend: {
      position: "top",
      item: {
        label: {
          fontSize: 9,
        },
        marker: {
          size: 9,
          shape: "circle",
        },
      },
    },
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Horário",
          fontFamily: "Lato, sans-serif",
        },
        label: {
          formatter: ({ value }) => `${value.split("-")[3]}`,
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "",
          fontFamily: "Lato, sans-serif",
        },
      },
    ],
  };

  return (
    <ChartCard
      width={"40%"}
      height={"36%"}
      left={"25%"}
      top={"62%"}
      title="sinais_de_controle"
      chartRef={chartRef}
    >
      {error && (
        <span style={{ color: "red", fontSize: "0.75rem" }}>{error}</span>
      )}
      <AgCharts ref={chartRef} options={options} style={{ height: "100%" }} />
    </ChartCard>
  );
}

export default ControlSignalsCard;
