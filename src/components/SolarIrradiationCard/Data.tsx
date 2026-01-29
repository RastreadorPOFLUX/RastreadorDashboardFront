import axios from "axios";
import { lat, long } from "../../constants";

export const fetchHistoricalSolarIrradiance = async () => {

  let beginDate = (document.getElementById("begin") as HTMLInputElement).value;
  let endDate = (document.getElementById("end") as HTMLInputElement).value;

  const historicalWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=direct_normal_irradiance&timezone=America%2FSao_Paulo&start_date=${beginDate}&end_date=${endDate}`;
  const response = await axios.get(historicalWeatherUrl);
  return response.data;
}
