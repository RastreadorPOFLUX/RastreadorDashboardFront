import axios from "axios";

const apiKey = process.env.WEATHER_API_KEY;
const reverseGeocodeUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rio de Janeiro,br&appid=${apiKey}&units=metric`;

export const fetchLocalWeatherConditions = async () => {
  const response = await axios.get(`${reverseGeocodeUrl}`);
  return response.data;
};
