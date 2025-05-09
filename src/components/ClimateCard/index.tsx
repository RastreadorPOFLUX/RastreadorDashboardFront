import { useEffect, useState, useTransition } from "react";
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
      Icon: string;
    },
  ];
}

function ClimateCard() {
  const [isPending, startTransition] = useTransition();
  const [Data, setData] = useState<WeatherData>();
  const [Icon, setIcon] = useState<WeatherData>();
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

  useEffect(() => {
    const fetchData = async () => {
      const weatherResult = await fetchLocalWeatherConditions();
      startTransition(() => {
        setData(weatherResult);
        setIcon(weatherResult.weather[0].icon);
      });
    };
    fetchData();
  }, []);

  const iconUrl = Icon
    ? `https://openweathermap.org/img/wn/${Icon}@2x.png`
    : "";

  return (
    <StyledWrapper
      width={"31.375rem"}
      height={"6.25rem"}
      $left={"55.5rem"}
      $top={"8.4375rem"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Text width={"20rem"} $left={"6rem"} $top={"1rem"}>
        {Data?.name},{" "}
        {Data?.main.temp != null ? Math.trunc(Data?.main.temp) : "-"}
        °C
      </Text>
      <Text width={"6.45rem"} $left={"9.25rem"} $top={"3.5rem"}>
        {time}
      </Text>
      <WeatherIcon>
        {Icon && <img src={iconUrl} alt="Weather Icon" />}
      </WeatherIcon>
    </StyledWrapper>
  );
}

export default ClimateCard;
