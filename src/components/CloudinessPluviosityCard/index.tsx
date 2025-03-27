import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import { fetchHistoricalCloudiness } from "./Data";

//Estilo
import { StyledWrapper } from "./style";

interface WeatherData {
  date: string;
  cloudiness: number;
  hour: string;
  time: string;
}

function CloudinessPluviosityCard() {
  const [Data, setData] = useState<WeatherData[]>([]);
  const [Title, setTitle] = useState<string>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchHistoricalCloudiness();
      const fetchedData = result.map((dt: string, index: number) => ({
        date: new Date(result[index].dt * 1000).toLocaleDateString(),
        cloudiness: result[index].clouds.all,
        hour: new Date(result[index].dt * 1000).getHours() + "h",
        time:
          new Date(result[index].dt * 1000).toLocaleDateString() +
          "-" +
          new Date(result[index].dt * 1000).getHours() +
          "h",
      }));
      setData(fetchedData);
      setTitle(
        fetchedData[0].date + "-" + fetchedData[fetchedData.length - 1].date,
      );
    };
    fetchData();
  }, []);

  const options: AgChartOptions = {
    data: Data,
    navigator: {
      enabled: true,
    },
    background: {
      visible: false,
    },
    series: [
      {
        type: "bar",
        xKey: "time",
        yKey: "cloudiness",
        yName: "Nebulosidade",
        fill: "#DD702C",
        cornerRadius: 10,
        tooltip: {
          renderer: (params: { datum: WeatherData }) => {
            // Customize the tooltip content
            return {
              title: ` ${params.datum.hour}`, // Title for the tooltip
              heading: ` ${params.datum.date}`,
            };
          },
        },
      },
    ],
    zoom: {
      enabled: true,
      scrollingStep: 0.4,
    },
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Horário",
        },
        label: {
          formatter: ({ value }) => `${value.split("-")[1]}`,
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: "(%)",
        },
        max: 100,
      },
    ],
    title: {
      text: "Pluviosidade e Nebulosidade - (" + Title + ")",
    },
  };

  return (
    <StyledWrapper
      width={"65.3125rem"}
      height={"17.5625rem"}
      left={"21.5625rem"}
      top={"24.5625rem"}
    >
      <AgCharts options={options} style={{ height: 285 }} />
    </StyledWrapper>
  );
}

export default CloudinessPluviosityCard;
