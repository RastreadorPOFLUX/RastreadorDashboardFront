import React, { useEffect, useState } from "react";

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

  // State variables to store city name, weather data, forecast data, loading state, and errors
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // Current weather data
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error message

  // Function to fetch weather and forecast data from OpenWeather API
  const fetchWeatherData = async (cityName: string) => {
    const apiKey = process.env.WEATHER_API_KEY; // Fetching the API key from environment variables
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`; // API URL for current weather

    try {
      setLoading(true); // Setting loading state
      setError(null); // Resetting error state

      // Fetching current weather data
      const weatherResponse = await fetch(currentWeatherUrl);
      if (!weatherResponse.ok) {
        throw new Error("City not found! Try another one"); // Error if city not found
      }
      const weatherData: WeatherData = await weatherResponse.json(); // Parsing weather data
      setWeatherData(weatherData); // Setting the fetched weather data
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

  // useEffect to fetch the user's location and display the weather for the current location
  useEffect(() => {
    const getUserLocation = async () => {
      if (navigator.geolocation) {
        // Checking if geolocation is available
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            //const { latitude, longitude } = position.coords; // Getting user's device location
            const apiKey = process.env.WEATHER_API_KEY;
            const reverseGeocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rio de Janeiro,br&appid=${apiKey}&units=metric`; // API URL for reverse geocoding (get location by cityname)
            try {
              setLoading(true);
              const response = await fetch(reverseGeocodeUrl); // Fetching weather data by geolocation
              if (!response.ok) {
                throw new Error("Unable to fetch location data"); // Error if location data fetch fails
              }
              const data: WeatherData = await response.json(); // Parsing weather data
              setWeatherData(data); // Setting the fetched weather data
            } catch (error) {
              // Handling any errors that occur during the fetch
              if (error instanceof Error) {
                setError(error.message); // Displaying error message
              }
              setWeatherData(null); // Resetting weather data
            } finally {
              setLoading(false); // Resetting loading state
            }
          },
          () => {
            // Handling geolocation errors (e.g., if user denies location access)
            setError("Unable to retrieve your location");
            setWeatherData(null);
          },
        );
      } else {
        // Handling case where geolocation is not supported by the browser
        setError("Geolocation is not supported by this browser.");
        setWeatherData(null);
      }
    };

    getUserLocation(); // Invoking the function to get user location on page load
  }, []); // Empty dependency array to run effect once on component mount

  const iconCode = weatherData?.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <StyledWrapper
      width={"31.375rem"}
      height={"6.25rem"}
      left={"55.5rem"}
      top={"9.4375rem"}
    >
      <Text width={"20rem"} left={"6rem"} top={"1rem"}>
        {weatherData?.name},{" "}
        {weatherData?.main.temp != null
          ? Math.trunc(weatherData?.main.temp)
          : "-"}
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
