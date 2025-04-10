import { useEffect, useState } from "react";
import getData from "./../LuminousPowerCard/Data";

//Estilo
import { StyledWrapper, Text, CircularProgress } from "./style";
import { useGaugeState } from "@mui/x-charts";

const valueMax: number = 1500;

function GaugePointer() {
  const { valueAngle, outerRadius, innerRadius, cx, cy } = useGaugeState();
  const [expectedValue, setExpectedValue] = useState<number>(
    getData()[getData().length - 1].expected,
  );

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

function LuminousPowerIndicatorCard() {
  const [value, setValue] = useState<number>(
    getData()[getData().length - 1].value,
  );

  const handleChangeValue = () => {
    setValue(value);
  };

  useEffect(() => {
    handleChangeValue();
  }, [value]);

  return (
    <StyledWrapper
      width={"20rem"}
      height={"20rem"}
      left={"65.1875rem"}
      top={"10.875rem"}
    >
      <Text
        width={"17rem"}
        left={"9.25rem"}
        top={"10.975rem"}
        color={"var(--primaryText)"}
      >
        Kwh
      </Text>
      <Text
        width={"12rem"}
        left={"4.15rem"}
        top={"12.975rem"}
        color={"var(--primaryText)"}
      >
        Valor esperado: {getData()[getData().length - 1].expected} Kwh
      </Text>
      <CircularProgress
        value={value}
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

export default LuminousPowerIndicatorCard;
