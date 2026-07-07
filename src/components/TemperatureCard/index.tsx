
//Estilo
import { StyledWrapper, Text, TextWrapper, TemperatureValue } from "./style";

// Hooks
import { useSensorsData } from "../../hooks/useSensors";

function TemperatureCard() {
  const { sensors } = useSensorsData();
  const value = sensors?.temperature ?? 0;

  return (
    <StyledWrapper
      width={"35%"}
      height={"14%"}
      $left={"62%"}
      $top={"38.5%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <TextWrapper>
        <Text width="100%">
          Temperatura do Rastreador: <TemperatureValue $temperature={value}>{value} °C</TemperatureValue>
        </Text>
      </TextWrapper>

    </StyledWrapper>
  );
}

export default TemperatureCard;
