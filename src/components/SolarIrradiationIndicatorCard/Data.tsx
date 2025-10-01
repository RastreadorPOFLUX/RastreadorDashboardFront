import axios from "axios";

export const fetchLastSolarIrradiance = async () => {
  const lat: number = -22.51;
  const long: number = -43.22;
  const date: string = new Date().toISOString().split('T')[0];

  const historicalWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=direct_normal_irradiance_instant&timezone=America%2FSao_Paulo&start_date=${date}&end_date=${date}`;
  const response = await axios.get(historicalWeatherUrl);
  return response.data;
}