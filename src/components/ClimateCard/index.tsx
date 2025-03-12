import React, { useEffect, useState } from "react";

//Estilo
import { StyledWrapper, Text, WeatherIcon } from "./style";

const Sun = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
  >
    <path fill="#e6e818" d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0" />
    <path
      fill="#c6d04e"
      fillRule="evenodd"
      d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06m-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75"
      clipRule="evenodd"
    />
  </svg>
);

const Cloud = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
  >
    <path
      fill="#918a8a"
      d="m19.21 12.04l-1.53-.11l-.3-1.5A5.484 5.484 0 0 0 12 6C9.94 6 8.08 7.14 7.12 8.96l-.5.95l-1.07.11A3.99 3.99 0 0 0 2 14c0 2.21 1.79 4 4 4h13c1.65 0 3-1.35 3-3c0-1.55-1.22-2.86-2.79-2.96"
      opacity="0.3"
    />
    <path
      fill="#918a8a"
      d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96M19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.47 5.47 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3"
    />
  </svg>
);

const Rain = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 26 26"
  >
    <path
      fill="#3a2fc9"
      d="M15.5 0c-2.29 0-4.188 1.293-5.344 3.094C9.94 3.064 9.735 3 9.5 3C6.998 3 5 4.735 4.344 7.031C1.946 7.12 0 9.081 0 11.5C0 13.973 2.027 16 4.5 16h16c3.026 0 5.5-2.474 5.5-5.5c0-2.575-1.822-4.662-4.219-5.25C21.183 2.279 18.64 0 15.5 0m0 2a4.47 4.47 0 0 1 4.469 4.125l.093.844l.813.062A3.48 3.48 0 0 1 24 10.5c0 1.944-1.556 3.5-3.5 3.5h-16A2.485 2.485 0 0 1 2 11.5a2.485 2.485 0 0 1 2.875-2.469l1.063.188l.093-1.063A3.48 3.48 0 0 1 9.5 5c.26 0 .53.027.813.094l.78.187l.345-.718A4.49 4.49 0 0 1 15.5 2m5.469 14.844c-.95.492-3.124 1.286-3.688 2.187a1.92 1.92 0 0 0 .594 2.657c.899.565 2.021.227 2.656-.625c.565-.758.437-2.18.438-4.22zm-14 1c-.95.492-3.124 1.286-3.688 2.187a1.92 1.92 0 0 0 .594 2.657c.899.565 2.021.227 2.656-.625c.565-.758.437-2.18.438-4.22zm7 3c-.95.492-3.124 1.286-3.688 2.187a1.92 1.92 0 0 0 .594 2.657c.899.565 2.021.227 2.656-.625c.565-.758.437-2.18.438-4.22z"
    />
  </svg>
);

const RainLightning = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 16 16"
  >
    <path
      fill="#3a2fc9"
      d="M2.658 11.026a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m-7.5 1.5a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316m-7.105-1.25A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724zm6.352-7.249a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973"
    />
  </svg>
);

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather:{
    main: string;
  }
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
  const [city, setCity] = useState<string>(""); // City input value
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
            const reverseGeocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rio de Janeiro,br&appid=${apiKey}&units=metric`; // API URL for reverse geocoding (get location by lat/lon

            try {
              setLoading(true);
              const response = await fetch(reverseGeocodeUrl); // Fetching weather data by geolocation
              if (!response.ok) {
                throw new Error("Unable to fetch location data"); // Error if location data fetch fails
              }
              const data: WeatherData = await response.json(); // Parsing weather data
              setWeatherData(data); // Setting the fetched weather data
              setCity(data.name); // Setting the city based on fetched location
              await fetchWeatherData(data.name); // Fetching weather data for the fetched city
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
          }
        );
      } else {
        // Handling case where geolocation is not supported by the browser
        setError("Geolocation is not supported by this browser.");
        setWeatherData(null);
      }
    };

    getUserLocation(); // Invoking the function to get user location on page load
  }, []); // Empty dependency array to run effect once on component mount


  return (
    <StyledWrapper
      width={"31.375rem"}
      height={"6.25rem"}
      left={"55.5rem"}
      top={"9.4375rem"}
    >
      <Text width={"20rem"} left={"3rem"} top={"1rem"}>
        {weatherData?.name}, {weatherData?.main.temp != null ? Math.trunc(weatherData?.main.temp): '-'}°C
      </Text>
      <Text width={"6.45rem"} left={"9.25rem"} top={"3.5rem"}>
        {time}
      </Text>
      <WeatherIcon>
        <Sun></Sun>
      </WeatherIcon>
    </StyledWrapper>
  );
}

export default ClimateCard;