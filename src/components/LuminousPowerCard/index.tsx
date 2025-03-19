import { useState } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

//Estilo
import { StyledWrapper } from "./style";

function getData() {
  const x = 10;
  return [
    {
      dateTime:"1-1-2025-15:00:00",
      hour: "15h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1300,
    },
    {
      dateTime:"1-1-2025-16:00:00",
      hour: "16h",
      day: 1,
      month: 1,
      year: 2025,
      value: 100,
    },
    {
      dateTime:"1-1-2025-17:00:00",
      hour: "17h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1100,
    },
    {
    dateTime:"1-1-2025-18:00:00",
    hour: "18h",
    day: 1,
    month: 1,
    year: 2025,
    value: 1250,
    },
    {
      dateTime:"1-1-2025-19:00:00",
      hour: "19h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1300,
    },
    {
      dateTime:"1-1-2025-20:00:00",
      hour: "20h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1000,
    },
    {
      dateTime:"1-1-2025-21:00:00",
      hour: "21h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1100,
    },
    {
    dateTime:"1-1-2025-22:00:00",
    hour: "22h",
    day: 1,
    month: 1,
    year: 2025,
    value: 1250,
    },
    {
      dateTime:"1-1-2025-23:00:00",
      hour: "23h",
      day: 1,
      month: 1,
      year: 2025,
      value: 1300,
    }
  ];
}

const intervalTime =  getData()[0].day + "/" + getData()[0].month + "/" + getData()[0].year + " - " +
getData()[getData().length-1].day + "/" + getData()[getData().length-1].month + "/" + getData()[getData().length-1].year;

function LuminousPowerCard() {

  const Average = 1300;

  const [options, setOptions] = useState<AgChartOptions>({
    title: {
      text: "Potência Luminosa - (" + intervalTime + ")"
    },
    subtitle: {
      text: "Captada pelo Piranômetro",
    },
    data: getData(),
    navigator: {
      enabled: true,
    },
    background:{
      visible: false
    }, 
    series: [
      {
        type: "bar",
        xKey: "hour",
        yKey: "value",
        yName: "Potência Luminosa", 
        fill: "#DD702C",
        cornerRadius: 10
      }
    ],
    zoom: {
      enabled: true,
      scrollingStep: 0.4,
  }
  });

  return (
    <StyledWrapper
      width={"31.375rem"}
      height={"23.9375rem"}
      left={"21.5625rem"}
      top={"9.4375rem"}
    >
      <AgCharts options={options} style={{height: 385}}/>
    </StyledWrapper>
  );
}

export default LuminousPowerCard;
