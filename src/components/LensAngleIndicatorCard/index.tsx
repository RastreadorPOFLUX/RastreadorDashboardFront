//Estilo
import { useState, useEffect } from "react";
import { CircularProgress, StyledWrapper, Text } from "./style";
import getData from "./Data";

const valueMax: number = 180;

function LensAngleIndicatorCard() {
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
      width={"17.5rem"}
      height={"17.5rem"}
      $left={"21.7625rem"}
      $top={"25.3375rem"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Text
        width={"17rem"}
        $left={"4.2rem"}
        $top={"4.775rem"}
        color={"var(--primaryText)"}
      >
        Ângulo da Lente
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
        text={({ value }) => `${value + "°"}`}
      ></CircularProgress>
    </StyledWrapper>
  );
}

export default LensAngleIndicatorCard;
