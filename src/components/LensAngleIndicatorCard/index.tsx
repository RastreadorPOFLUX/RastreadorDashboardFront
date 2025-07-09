//Estilo
import { useState, useEffect } from "react";
import { CircularProgress, StyledWrapper, Text } from "./style";
import getData from "./Data";

const valueMax: number = 270;

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
      width={"14rem"}
      height={"14rem"}
      $left={"27%"}
      $top={"62%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Text color={"var(--primaryText)"}>Ângulo da Lente Azimutal</Text>

      <CircularProgress
        value={value + 90}
        startAngle={0}
        endAngle={360}
        valueMin={90}
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
