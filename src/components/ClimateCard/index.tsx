import { useEffect, useState, useTransition } from "react";
import { fetchLocalWeatherConditions } from "./Data";

//Estilo
import { StyledWrapper, Text, TextWrapper, WeatherIcon } from "./style";

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
      width={"35%"}
      height={"15%"}
      $left={"62%"}
      $top={"21%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <TextWrapper>
        <Text width={"60%"} $left={"20%"}>
          {Data?.name},{" "}
          {Data?.main.temp != null ? Math.trunc(Data?.main.temp) : "-"}
          °C
        </Text>
        <Text width={"20%"} $left={"30%"} $top={"4%"}>
          {time}
        </Text>
      </TextWrapper>
      <WeatherIcon>
        {Icon && (
          <img
            src={iconUrl}
            alt="Weather Icon"
            style={{
              width: "clamp(3rem, 6vw, 5rem)",
              height: "clamp(3rem, 6vw, 5rem)",
              objectFit: "contain",
            }}
          />
        )}
      </WeatherIcon>
    </StyledWrapper>
  );
}

export default ClimateCard;
