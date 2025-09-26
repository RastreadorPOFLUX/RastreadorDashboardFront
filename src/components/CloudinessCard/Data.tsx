import axios from "axios";

export const fetchHistoricalCloudiness = async () => {

  const lat: number = -22.51;
  const long: number = -43.22;
  let beginDate = (document.getElementById("begin") as HTMLInputElement).value;
  let endDate = (document.getElementById("end") as HTMLInputElement).value;

  const historicalWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=cloud_cover&timezone=America%2FSao_Paulo&start_date=${beginDate}&end_date=${endDate}`;
  const response = await axios.get(historicalWeatherUrl);
  return response.data;
};
