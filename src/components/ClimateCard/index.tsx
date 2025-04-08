import { useEffect, useState } from "react";
import { fetchLocalWeatherConditions } from "./Data";

//Estilo
import { StyledWrapper, Text, WeatherIcon } from "./style";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: [
    {
      main: string;
      icon: string;
    },
  ];
}

function ClimateCard() {
  const [time, setTime] = useState(new Date().toLocaleTimeString("pt-BR"));

  useEffect(() => {
    const Time = () => {
      const event = new Date();
      setTime(event.toLocaleTimeString("pt-BR"));
    };
    const intervalId = setInterval(Time, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [Data, setData] = useState<WeatherData>();
  const [Icon, setIcon] = useState<WeatherData>();

  // useEffect to fetch the user's location and display the weather for the current location
  useEffect(() => {
    const fetchData = async () => {
      const weatherResult = await fetchLocalWeatherConditions();
      const iconCode = weatherResult.weather[0].icon;
      setData(weatherResult);
      setIcon(iconCode);
    };
    fetchData();
  }, []);

  const iconUrl = `https://openweathermap.org/img/wn/${Icon}@2x.png`;

  return (
    <StyledWrapper
      width={"31.375rem"}
      height={"6.25rem"}
      left={"55.5rem"}
      top={"9.4375rem"}
    >
      <Text width={"20rem"} left={"6rem"} top={"1rem"}>
        {Data?.name},{" "}
        {Data?.main.temp != null ? Math.trunc(Data?.main.temp) : "-"}
        °C
      </Text>
      <Text width={"6.45rem"} left={"9.25rem"} top={"3.5rem"}>
        {time}
      </Text>
      <WeatherIcon>
        <img src={iconUrl} alt="Weather Icon" />
      </WeatherIcon>
    </StyledWrapper>
  );
}

export default ClimateCard;
