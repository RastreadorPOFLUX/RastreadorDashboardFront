import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import { fetchHistoricalCloudiness } from "./Data";

//Estilo
import { StyledWrapper } from "./style";


interface WeatherData {
  date: string;
  cloudiness: number;
}

function CloudinessPluviosityCard() {
  const [data, setData] = useState<WeatherData[]>([]);
  const numberOfRecords: number = 1;

  useEffect(() => {
    const fetchData = async () => {

      const Index = Array.from(Array(numberOfRecords), (e, i) => i);

      const fetchedData = await Promise.all(
        Index.map(async (Index) => {
          const result = await fetchHistoricalCloudiness();
          return {
            date: result[Index].dt,
            cloudiness: result[Index].clouds.all, // Assuming 'clouds' contains cloudiness percentage
          };
        })
      );

      setData(fetchedData);
      
    };
    fetchData();
  }, []);

  
  const [options, setOptions] = useState<AgChartOptions>({
    title: {
      text: "Pluviosidade e Nebulosidade - (" + ")",
    },
    data: data,
    navigator: {
      enabled: true,
    },
    background: {
      visible: false,
    },
    series: [
      {
        type: "bar",
        xKey: "date",
        yKey: "cloudiness",
        yName: "Nebulosidade",
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
