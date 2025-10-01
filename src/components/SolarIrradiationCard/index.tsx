import { useEffect, useState, useTransition } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { fetchHistoricalSolarIrradiance } from "./Data";
import { useDateContext } from "../MenuLateral/DateContext";

interface WeatherData {
  date: string;
  solarIrradianceUnit: string;
  hour: string;
  time: string;
  timestamp: number;
  solarIrradianceReference: number;
  solarIrradiancePyranometer?: number; 
  solarIrradiancePhotodetector?: number;
  efficiency?: number;
};

//Estilo
import { StyledWrapper } from "./style";

function SolarIrradiationCard() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<WeatherData[]>([]);
  const { BeginDate, EndDate } = useDateContext();
  
  useEffect(() => {
  const fetchData = async () => {
    const result = await fetchHistoricalSolarIrradiance();
    const fetchedData = result.hourly.time.map((timeStr: string, index: number) => ({
        date: timeStr.split("T")[0],
        solarIrradianceUnit: result.hourly_units.direct_normal_irradiance,
        hour: timeStr.split("T")[1].slice(0,2) + "h",
        time: timeStr.split("T")[0].slice(8,10) + 
              timeStr.split("T")[0].slice(4,8) + 
              timeStr.split("T")[0].slice(0,4) + "-" +
              timeStr.split("T")[1].slice(0,2) + "h",
        // Adicionando os dados que as séries precisam
        solarIrradianceReference: result.hourly.direct_normal_irradiance[index], // Valor de referência (usando o valor real)
        solarIrradiancePyranometer: result.hourly.direct_normal_irradiance[index] * 0.8, // Simulação do piranômetro (80% do valor)
        solarIrradiancePhotodetector: result.hourly.direct_normal_irradiance[index] * 0.6, // Simulação do fotodetector (60% do valor)
        efficiency: Math.min(100, (result.hourly.direct_normal_irradiance[index] * 0.6 / (result.hourly.direct_normal_irradiance[index] * 0.8)) * 100), // Eficiência calculada
        timestamp: new Date(timeStr).getTime()
        }))
        .filter((item: { timestamp: string | number | Date; }) => {
          const itemDate = new Date(item.timestamp);
          const now = new Date();
          return itemDate <= now;
        });
            startTransition(() => {
            setData(fetchedData);
            });
        };
          fetchData();
        }, [BeginDate, EndDate]);
      
  const titleRange =
    data.length > 0
      ? `${data[0].time.slice(0, 10)}`
      : "Carregando...";

  // Tooltip renderer melhorado
  const tooltipRenderer = (params: any) => {
    return {
      title: ` ${params.datum.hour}`,
      heading: ` ${params.datum.date}`,
    };
  };

  const options: AgChartOptions = {
    data: data,
    background: {
      visible: false,
    },
    title: {
      text: `Irradiação Solar - (${titleRange})`,
      fontSize: 24,
      fontFamily: "Lato, sans-serif",
      color: "#000000",
    },
    subtitle: {
      text: "Captada por: Piranômetro, Fotodetector e Valor de Referência",
      fontSize: 16,
      fontFamily: "Lato, sans-serif",
      color: "#000000",
    },
    series: [
        {
        type: "bar",
        xKey: "time",
        yKey: "solarIrradiancePhotodetector",
        yName: "Fotodetector",
        fill: "#DD702C",
        cornerRadius: 10,
        tooltip: {
          renderer: tooltipRenderer,
        },
      },
      {
        type: "bar",
        xKey: "time",
        yKey: "solarIrradiancePyranometer",
        yName: "Piranômetro",
        fill: "#C62E2E",
        cornerRadius: 10,
        tooltip: {
          renderer: tooltipRenderer,
        },
      },
      {
        type: "bar",
        xKey: "time",
        yKey: "solarIrradianceReference",
        yName: "Referência",
        fill: "#c3c62eff",
        cornerRadius: 10,
        tooltip: {
          renderer: tooltipRenderer,
        },
      },
      {
        type: "line",
        xKey: "time",
        yKey: "efficiency", 
        yName: "Eficiência",
        stroke: "black",
        marker: {
          fill: "yellow",
          size: 8,
          stroke: "black",
          strokeWidth: 3,
          shape: "diamond",
        },
        tooltip: {
          renderer: tooltipRenderer,
        },
      }
    ],
    axes: [
      {
        type: "category",
        position: "bottom",
        title: {
          text: "Horário",
          fontSize: 12,
          fontFamily: "Lato, sans-serif",
        },
        label: {
          formatter: ({ value }) => `${value.split("-")[3]}`,
        },
        gridLine: {
          enabled: false,
        },
      },
      {
        type: "number",
        position: "left",
        title: {
          text: data[0]?.solarIrradianceUnit || "W/m²",
          fontFamily: "Lato, sans-serif",
        },
        keys: ["solarIrradiancePyranometer", "solarIrradiancePhotodetector", "solarIrradianceReference"],
        max: 1500,
        gridLine: {
          enabled: false,
        },
      },
      {
        type: "number",
        position: "right",
        title: {
          text: "(%)",
          fontFamily: "Lato, sans-serif",
        },
        keys: ["efficiency"], 
        max: 100,
        gridLine: {
          enabled: false,
        },
      },
    ],
  };

  return (
    <StyledWrapper
      width={"45%"}
      height={"55%"}
      $left={"25%"}
      $top={"21%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <AgCharts options={options} style={{ height: "100%" }} />
    </StyledWrapper>
  );
}

export default SolarIrradiationCard;