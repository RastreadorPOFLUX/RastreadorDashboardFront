import axios from "axios";
import { lat, long } from "../../constants";

export const fetchLastSolarIrradiance = async () => {

  const currentWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=direct_normal_irradiance_instant&timezone=America%2FSao_Paulo`;
  const response = await axios.get(currentWeatherUrl);
  return response.data;
}