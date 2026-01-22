
//Estilo
import { StyledWrapper, Text, TemperatureValue } from "./style";


function TemperatureCard() {
  const value = 30;

  return (
    <StyledWrapper
      width={"35%"}
      height={"14%"}
      $left={"62%"}
      $top={"38.5%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Text width={"80%"} $left={"10%"}>
        Temperatura do Rastreador: <TemperatureValue $temperature={value}>{value} °C</TemperatureValue>
      </Text>

    </StyledWrapper>
  );
}

export default TemperatureCard;
