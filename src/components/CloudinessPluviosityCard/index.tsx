import { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

//Estilo
import { StyledWrapper } from "./style";


interface WeatherData {
  list:({
      dt: number;
      clouds:{
        all: number;
      };
    })[];
}[]

function CloudinessPluviosityCard() {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null); // Error message
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error message

  const [intervalTime, setIntervalTime] = useState<string | null>(null);
  const [formattedData, setFormattedData] = useState<WeatherData[] | null>(
    null,
  );

  useEffect(() => {
    const numberOfRecords: number = 24;
    const apiKey = process.env.WEATHER_API_KEY; // Fetching the API key from environment variables
    const historicalWeatherUrl = `https://history.openweathermap.org/data/2.5/history/city?q=Rio de Janeiro,br&type=hour&cnt=${numberOfRecords}&appid=${apiKey}`;

    const fetchWeatherData = async () => {
      try {
        setLoading(true); // Setting loading state
        setError(null);
        // Fetching current weather data
        const weatherResponse = await fetch(historicalWeatherUrl);
        console.log(weatherResponse);
        if (!weatherResponse.ok) {
          throw new Error("City not found! Try another one"); // Error if city not found
        }
        const weatherHistoryData: WeatherData = await weatherResponse.json();
        setWeatherData([weatherHistoryData]);
      } catch (error) {
        // Handling any errors that occur during the fetch
        if (error instanceof Error) {
          setError(error.message); // Displaying error message
        }
        setWeatherData(null); // Resetting weather data
      } finally {
        setLoading(false); // Resetting loading state
      }
    };
    fetchWeatherData();
  }, []);      


          
     const [options, setOptions] = useState<AgChartOptions>({
       title: {
         text: "Pluviosidade e Nebulosidade - (" + ")",
       },
       data: weatherData![0].list,
       navigator: {
         enabled: true,
       },
       background: {
         visible: false,
       },
       series: [
         {
           type: "bar",
           xKey: "dt",
           yKey: "clouds.all",
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
