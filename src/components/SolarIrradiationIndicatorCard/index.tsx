import { useEffect, useState, useTransition } from "react";
import getData from "../SolarIrradiationCard/Data";
import { fetchHistoricalSolarIrradiance } from "../SolarIrradiationCard/Data";

//Estilo
import { StyledWrapper, Text, CircularProgress } from "./style";
import { useGaugeState } from "@mui/x-charts";

const valueMax: number = 1500;

interface WeatherData {
  solarIrradiancePhotodetector: number;
  solarIrradianceReference: number;
  timestamp: number;
};

function GaugePointer() {
  const { valueAngle, outerRadius, innerRadius, cx, cy } = useGaugeState();
  const [expectedValue, setExpectedValue] = useState<number>(0);

  if (valueAngle === null) {
    return null;
  }

  const start = {
    x: cx + innerRadius * Math.sin((expectedValue * 2 * Math.PI) / valueMax),
    y: cy - innerRadius * Math.cos((expectedValue * 2 * Math.PI) / valueMax),
  };
  const target = {
    x: cx + outerRadius * Math.sin((expectedValue * 2 * Math.PI) / valueMax),
    y: cy - outerRadius * Math.cos((expectedValue * 2 * Math.PI) / valueMax),
  };
  return (
    <g>
      <path
        d={`M ${start.x} ${start.y} L ${target.x} ${target.y}`}
        stroke="black"
        strokeWidth={4}
      />
    </g>
  );
}

function SolarIrradiationIndicatorCard() {
  const [value, setValue] = useState<number>(
    getData()[getData().length - 1].value,
  );
  const [data, setData] = useState<WeatherData[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChangeValue = () => {
    setValue(value);
  };

  useEffect(() => {
    handleChangeValue();
  }, [value]);

  useEffect(() => {
  const fetchData = async () => {
    const result = await fetchHistoricalSolarIrradiance();
    const fetchedData = result.hourly.time.map((timeStr: string) => ({
        solarIrradiancePhotodetector: result[0].hourly.direct_normal_irradiance,
        solarIrradianceReference: result[0].hourly.direct_normal_irradiance[0], // Valor de referência (usando o valor real)
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
        $top={"10.975rem"}
        color={"var(--primaryText)"}
      >
        Wh/m²
      </Text>
      <Text
        width={"12rem"}
        $left={"4rem"}
        $top={"12.975rem"}
        color={"var(--primaryText)"}
        $fontSize={"0.8rem"}
      >
        Valor esperado: {data.length > 0 ? data[data.length - 1].solarIrradianceReference : null} Wh/m²
      </Text>
      <CircularProgress
        value={data.length > 0 ? data[data.length - 1].solarIrradiancePhotodetector : null}
        startAngle={0}
        endAngle={360}
        valueMin={0}
        valueMax={valueMax}
        innerRadius="80%"
        outerRadius="100%"
        cornerRadius="50%"
      >
        <GaugePointer />
      </CircularProgress>
    </StyledWrapper>
  );
}

export default SolarIrradiationIndicatorCard;
