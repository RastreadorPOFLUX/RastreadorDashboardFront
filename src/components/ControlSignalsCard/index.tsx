//Estilo
import { AgCharts } from "ag-charts-react";
import { useState } from "react";
import getData from "./Data";
import { StyledWrapper } from "./style";
import { AgChartOptions } from "ag-charts-enterprise";

function ControlSignalsCard() {
  const intervalTime =
    getData()[0].day +
    "/" +
    getData()[0].month +
    "/" +
    getData()[0].year +
    " - " +
    getData()[getData().length - 1].day +
    "/" +
    getData()[getData().length - 1].month +
    "/" +
    getData()[getData().length - 1].year;

  const [options, setOptions] = useState<AgChartOptions>({
    title: {
      text: "Sinais de Controle - (" + intervalTime + ")",
      fontSize: 20,
      fontFamily: "Lato, sans-serif",
      color: "#000000",
    },
    data: getData(),
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
  });

  return (
    <StyledWrapper
      width={"50%"}
      height={"36%"}
      $left={"47%"}
      $top={"62%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <AgCharts options={options} style={{ height: "100%" }} />
    </StyledWrapper>
  );
}

export default ControlSignalsCard;
