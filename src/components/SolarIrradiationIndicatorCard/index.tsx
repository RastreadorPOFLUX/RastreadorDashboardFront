import { useEffect, useState, useTransition } from "react";
import { fetchLastSolarIrradiance } from "../SolarIrradiationIndicatorCard/Data";

//Estilo
import { StyledWrapper, Text, CircularProgress } from "./style";
import { useGaugeState } from "@mui/x-charts";

const valueMax: number = 1500;

interface WeatherData {
  solarIrradianceReference: number;
  solarIrradiancePhotodetector: number;
  solarIrradiancePyranometer: number;
  timestamp: number;
};

// Componente único que renderiza múltiplos ponteiros
function DualGaugePointer({ 
  expectedValue1, 
  expectedValue2, 
  color1, 
  color2 
}: { 
  expectedValue1: number;
  expectedValue2: number;
  color1: string;
  color2: string;
}) {
  const { outerRadius, innerRadius, cx, cy } = useGaugeState();

  // Calcular ângulos para ambos os valores
  const targetAngle1 = (expectedValue1 * 360) / valueMax;
  const targetAngle2 = (expectedValue2 * 360) / valueMax;

  // Primeiro ponteiro (Pyranometer)
  const start1 = {
    x: cx + innerRadius * Math.sin((targetAngle1 * Math.PI) / 180),
    y: cy - innerRadius * Math.cos((targetAngle1 * Math.PI) / 180),
  };
  const target1 = {
    x: cx + outerRadius * Math.sin((targetAngle1 * Math.PI) / 180),
    y: cy - outerRadius * Math.cos((targetAngle1 * Math.PI) / 180),
  };

  // Segundo ponteiro (Reference) - com offset para não sobrepor completamente
  const start2 = {
    x: cx + innerRadius * Math.sin((targetAngle2 * Math.PI) / 180),
    y: cy - innerRadius * Math.cos((targetAngle2 * Math.PI) / 180),
  };
  const target2 = {
    x: cx + outerRadius * Math.sin((targetAngle2 * Math.PI) / 180),
    y: cy - outerRadius * Math.cos((targetAngle2 * Math.PI) / 180),
  };
  
  return (
    <g>
      {/* Primeiro ponteiro (Pyranometer) */}
      <path
        d={`M ${start1.x} ${start1.y} L ${target1.x} ${target1.y}`}
        stroke={color1}
        strokeWidth={4}
      />
      {/* Segundo ponteiro (Reference) */}
      <path
        d={`M ${start2.x} ${start2.y} L ${target2.x} ${target2.y}`}
        stroke={color2}
        strokeWidth={4}
      />
    </g>
  );
}

function SolarIrradiationIndicatorCard() {
  const [data, setData] = useState<WeatherData[]>([]);
  const [isPending, startTransition] = useTransition();
  const [expectedValue, setExpectedValue] = useState<WeatherData | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const fetchData = async () => {
    try {
      const result = await fetchLastSolarIrradiance();
      const now = new Date();
      const currentHour = now.getHours();
      
      const fetchedData = result.hourly.time
        .map((timeStr: string, index: number) => ({
          solarIrradianceReference: result.hourly.direct_normal_irradiance_instant[index],
          solarIrradiancePhotodetector: result.hourly.direct_normal_irradiance_instant[index] * 0.6,
          solarIrradiancePyranometer: result.hourly.direct_normal_irradiance_instant[index] * 0.8,
          timestamp: new Date(timeStr).getTime()
        }))
        .filter((item: { timestamp: number }) => {
          const itemDate = new Date(item.timestamp);
          const itemHour = itemDate.getHours();
          return itemHour === currentHour;
        });

      startTransition(() => {
        setData(fetchedData);
        if (fetchedData.length > 0) {
          setExpectedValue(fetchedData[fetchedData.length - 1]);
        } else {
          setExpectedValue(null);
        }
        setLastUpdate(new Date().toLocaleTimeString());
        console.log("Dados atualizados:", new Date().toLocaleTimeString(), fetchedData);
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <StyledWrapper
      width={"20rem"}
      height={"20rem"}
      $left={"74%"}
      $top={"25%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Text
        width={"17rem"}
        $left={"2rem"}
        $top={"9.975rem"}
        color={"var(--primaryText)"}
      >
        Wh/m²
      </Text>
      <Text
        width={"12rem"}
        $left={"4rem"}
        $top={"11.975rem"}
        color={"var(--primaryText)"}
        $fontSize={"0.8rem"}
      >
        Piranômetro: {data.length > 0 ? data[data.length - 1].solarIrradiancePyranometer : 0} Wh/m²
      </Text>
      <Text
        width={"12rem"}
        $left={"4rem"}
        $top={"12.975rem"}
        color={"var(--primaryText)"}
        $fontSize={"0.8rem"}
      >
        Referência: {data.length > 0 ? data[data.length - 1].solarIrradianceReference : 0} Wh/m²
      </Text>
      <Text
        width={"12rem"}
        $left={"4rem"}
        $top={"14rem"}
        color={"var(--secondaryText)"}
        $fontSize={"0.6rem"}
      >
      </Text>
      
      <CircularProgress
        value={data.length > 0 ? data[data.length - 1].solarIrradiancePhotodetector : 0}
        startAngle={0}
        endAngle={360}
        valueMin={0}
        valueMax={valueMax}
        innerRadius="80%"
        outerRadius="100%"
      >
        <DualGaugePointer 
          expectedValue1={expectedValue ? expectedValue.solarIrradiancePyranometer : 0}
          expectedValue2={expectedValue ? expectedValue.solarIrradianceReference : 0}
          color1="#C62E2E"
          color2="#c3c62e"
        />
      </CircularProgress>
    </StyledWrapper>
  );
}

export default SolarIrradiationIndicatorCard;