//Estilo
import { CircularProgress, StyledWrapper, Text } from "./style";
import { useAnglesData } from '../../hooks/useAngles';



const valueMax: number = 45;

function LensAngleIndicatorCard() {
  const { angles } = useAnglesData();
  
  // Busca o valor do ângulo da lente do hook
  const value = angles?.lens_angle ?? 0;

  return (
    <StyledWrapper
      width={"14rem"}
      height={"14rem"}
      $left={"27%"}
      $top={"62%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Text color={"var(--primaryText)"}>Ângulo de Azimute da Lente</Text>
      <CircularProgress
        value={Math.ceil(value)}
        startAngle={0}
        endAngle={360}
        valueMin={-valueMax}
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
