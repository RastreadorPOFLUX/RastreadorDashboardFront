import { useState, useEffect, useTransition } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import { fetchHistoricalCloudiness } from "./Data";
import { useDateContext } from "./../MenuLateral/DateContext";

//Estilo
import { StyledWrapper } from "./style";

interface WeatherData {
  date: string;
  cloudiness: number;
  hour: string;
  time: string;
}

function CloudinessCard() {
  const [isPending, startTransition] = useTransition();
  const [Data, setData] = useState<WeatherData[]>([]);
  const { BeginDate, EndDate } = useDateContext();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchHistoricalCloudiness();
      const fetchedData = result.hourly.time.map((timeStr: string, index: string | number) => ({
        date: timeStr.split("T")[0],
        cloudiness: result.hourly.cloud_cover[index],
        hour: timeStr.split("T")[1].slice(0, 2) + "h",
        time: timeStr.split("T")[0].slice(8, 10) +
          timeStr.split("T")[0].slice(4, 8) +
          timeStr.split("T")[0].slice(0, 4) + "-" +
          timeStr.split("T")[1].slice(0, 2) + "h",
        timestamp: new Date(timeStr).getTime()
      }))
        .filter((item: { timestamp: string | number | Date; }) => {
          const itemDate = new Date(item.timestamp);
          const now = new Date();
          return itemDate <= now;
        });
      startTransition(() => {
        setData(fetchedData);
      });
    };
    fetchData();
  }, [BeginDate, EndDate]);

  let titleRange = "";
  if (Data.length > 0) {
    titleRange = `${Data[0].time.slice(0, 10).replaceAll("-", "/")} - ${Data[Data.length - 1].time.slice(0, 10).replaceAll("-", "/")}`;
  }

  const options: AgChartOptions = {
    data: Data,
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
            return {
              title: ` ${params.datum.hour}`,
              heading: ` ${params.datum.date}`,
            };
          },
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
          text: "(%)",
          fontFamily: "Lato, sans-serif",
        },
        max: 100,
        gridLine: {
          enabled: false,
        },
      },
    ],
    title: {
      text: `Nebulosidade - (${titleRange})`,
      fontSize: 24,
      fontFamily: "Lato, sans-serif",
      color: "#000000",
    },
  };

  return (
    <StyledWrapper
      width={"72%"}
      height={"43%"}
      $left={"25%"}
      $top={"55%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <AgCharts options={options} style={{ height: "100%" }} />
    </StyledWrapper>
  );
}

export default CloudinessCard;
