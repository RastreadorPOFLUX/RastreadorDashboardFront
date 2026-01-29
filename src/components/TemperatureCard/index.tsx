
//Estilo
import { StyledWrapper, Text, TextWrapper, TemperatureValue } from "./style";


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
      <TextWrapper>
        <Text width="100%">
          Temperatura do Rastreador: <TemperatureValue $temperature={value}>{value} °C</TemperatureValue>
        </Text>
      </TextWrapper>

    </StyledWrapper>
  );
}

export default TemperatureCard;
