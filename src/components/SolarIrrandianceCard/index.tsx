import { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import getData from "./Data";

//Estilo
import { StyledWrapper } from "./style";

function SolarIrrandianceCard() {
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
      text: "Captada pelo Piranômetro",
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
        yKey: "value",
        yName: "Irradiação Solar",
        fill: "#DD702C",
        cornerRadius: 10,
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
        max: 1500,
        gridLine: {
          enabled: false,
        },
      },
    ],
  });

  return (
    <StyledWrapper
      width={"38.375rem"}
      height={"24.9375rem"}
      $left={"21.5625rem"}
      $top={"8.4375rem"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <AgCharts options={options} style={{ height: 385 }} />
    </StyledWrapper>
  );
}

export default SolarIrrandianceCard;
