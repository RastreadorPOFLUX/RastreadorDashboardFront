import { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import getData from "./Data";

//Estilo
import { StyledWrapper } from "./style";

function SolarIrradiationCard() {
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
      text: "Irradiação Solar - (" + intervalTime + ")",
      fontSize: 24,
      fontFamily: "Lato, sans-serif",
      color: "#000000",
    },
    subtitle: {
      text: "Captada pelo Piranômetro e Fotodetector",
      fontSize: 16,
      fontFamily: "Lato, sans-serif",
      color: "#000000",
    },
    data: getData(),
    background: {
      visible: false,
    },
    series: [
      {
        type: "bar",
        xKey: "hour",
        yKey: "expected",
        yName: "Piranômetro",
        fill: "#DD702C",
        cornerRadius: 10,
      },
      {
        type: "bar",
        xKey: "hour",
        yKey: "value",
        yName: "Fotodetector",
        fill: "#C62E2E",
        cornerRadius: 10,
      },
      {
        type: "line",
        xKey: "hour",
        yKey: "eficiency",
        yName: "Eficiência",
        stroke: "black",
        marker: {
          fill: "yellow",
          size: 10,
          stroke: "black",
          strokeWidth: 3,
          shape: "diamond",
        },
      },
    ],
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
        gridLine: {
          enabled: false,
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "Kwh/m²",
          fontFamily: "Lato, sans-serif",
        },
        keys: ["value", "expected"],
        max: 1500,
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
        keys: ["eficiency"],
        max: 100,
        gridLine: {
          enabled: false,
        },
      },
    ],
  });

  return (
    <StyledWrapper
      width={"45%"}
      height={"55%"}
      $left={"21.5625rem"}
      $top={"8.4375rem"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <AgCharts options={options} style={{ height: "100%" }} />
    </StyledWrapper>
  );
}

export default SolarIrradiationCard;
