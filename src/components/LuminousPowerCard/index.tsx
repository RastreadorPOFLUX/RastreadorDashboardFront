import { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import getData from "./Data";

//Estilo
import { StyledWrapper } from "./style";

function LuminousPowerCard() {
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

  const Average = 1300;

  const [options, setOptions] = useState<AgChartOptions>({
    title: {
      text: "Potência Luminosa - (" + intervalTime + ")",
    },
    subtitle: {
      text: "Captada pelo Piranômetro",
    },
    data: getData(),
    navigator: {
      enabled: true,
    },
    background: {
      visible: false,
    },
    series: [
      {
        type: "bar",
        xKey: "hour",
        yKey: "value",
        yName: "Potência Luminosa",
        fill: "#DD702C",
        cornerRadius: 10,
      },
    ],
    zoom: {
      enabled: true,
      scrollingStep: 0.4,
    },
  });

  return (
    <StyledWrapper
      width={"31.375rem"}
      height={"23.9375rem"}
      left={"21.5625rem"}
      top={"9.4375rem"}
    >
      <AgCharts options={options} style={{ height: 385 }} />
    </StyledWrapper>
  );
}

export default LuminousPowerCard;
