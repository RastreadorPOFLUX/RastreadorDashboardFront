import axios from 'axios';

const numberOfRecords: number = 24;
const apiKey = process.env.WEATHER_API_KEY; // Fetching the API key from environment variables
const historicalWeatherUrl = `https://history.openweathermap.org/data/2.5/history/city?q=Rio de Janeiro,br&type=hour&cnt=${numberOfRecords}&appid=${apiKey}`;

export const fetchHistoricalCloudiness = async () => {
    const response = await axios.get(`${historicalWeatherUrl}`);
    return response.data.list;
}