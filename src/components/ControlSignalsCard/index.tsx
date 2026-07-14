import { AgCharts } from "ag-charts-react";
import { useMemo, useRef } from "react";
import { AgChartInstance, AgChartOptions } from "ag-charts-enterprise";
import { useControlSignalsHistory } from "../../hooks/useControlSignals";
import { useDateContext } from "../MenuLateral/DateContext";
import ChartCard from "../ChartCard";

interface ChartPoint {
  hour: string;
  controle: number;
  erro: number;
  output: number;
}

// Converte YYYY-MM-DD (formato do filtro de datas) para dd/mm/yyyy
const toBrDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
};

function ControlSignalsCard() {
  const { BeginDate, EndDate } = useDateContext();
  const { history, error } = useControlSignalsHistory(BeginDate, EndDate);
  const chartRef = useRef<AgChartInstance<AgChartOptions>>(null);

  const chartData: ChartPoint[] = useMemo(
    () =>
      history.map((record) => {
        const date = new Date(record.timestamp * 1000);
        console.log(date.getMonth());
        return {
          hour: `${date.getHours()}h${date.getMinutes().toString().padStart(2, "0")}`,
          controle: record.p + record.i + record.d,
          erro: record.erro,
          output: record.saida,
        };
      }),
    [history]
  );

  const intervalTime = `${toBrDate(BeginDate)} - ${toBrDate(EndDate)}`;

  const options: AgChartOptions = {
    title: {
      text: "Sinais de Controle - (" + intervalTime + ")",
      fontSize: 20,
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
        xKey: "hour",
        yKey: "controle",
        yName: "Controle",
      },
      {
        type: "line",
        xKey: "hour",
        yKey: "erro",
        yName: "Erro",
      },
      {
        type: "line",
        xKey: "hour",
        yKey: "output",
        yName: "Output",
      },
    ],
    legend: {
      position: "top",
      item: {
        label: {
          fontSize: 10,
        },
        marker: {
          size: 10,
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
          formatter: ({ value }) => `${value}`,
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
