import axios from "axios";
import { useEffect } from "react";
import { formatDate } from "../MenuLateral";

const apiKey = process.env.WEATHER_API_KEY; 

export const useFunctionThatUsesDate = (beginDate: string, endDate: string) => {
  // Corrigindo fuso horário do Brasil (3h = 10800000ms)
  let begin = Date.parse(beginDate) + 10800000;
  let end = Date.parse(endDate) + 10800000;
  let diaAtual = new Date();
  useEffect(() => {
    if((begin && end <= Date.now()) && end-begin >= 0) { // Verificando se a data de início é menor que a de fim e se ambas as datas não estão no futuro.
      if(formatDate(new Date(end)) == formatDate(diaAtual)){
        // Corrigindo horário de final (h -> ms)
        let now = diaAtual.getHours()
        end += (now*3600000);
      }
      else {
        // Corrigindo horário de final (23h = 82800000ms)
        end += 82800000;
      }
    }  
  }, [beginDate, endDate]); 
  return (Math.trunc(((Date.now()-begin)/3600000)))
};



export const fetchHistoricalCloudiness = async () => {
  let numberOfRecords: number = 24;
  const historicalWeatherUrl = `https://history.openweathermap.org/data/2.5/history/city?q=Rio de Janeiro,br&type=hour&cnt=${numberOfRecords}&appid=${apiKey}`;
  const response = await axios.get(`${historicalWeatherUrl}`);
  return response.data.list;
};
