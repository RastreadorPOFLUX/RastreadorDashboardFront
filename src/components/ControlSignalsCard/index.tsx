import { AgCharts } from "ag-charts-react";
import { useMemo } from "react";
import { StyledWrapper } from "./style";
import { AgChartOptions } from "ag-charts-enterprise";
import { useControlSignalsHistory } from "../../hooks/useControlSignals";
import { useDateContext } from "../MenuLateral/DateContext";

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
    <StyledWrapper
      width={"40%"}
      height={"36%"}
      $left={"25%"}
      $top={"62%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      {error && (
        <span style={{ color: "red", fontSize: "0.75rem" }}>{error}</span>
      )}
      <AgCharts options={options} style={{ height: "100%" }} />
    </StyledWrapper>
  );
}

export default ControlSignalsCard;
