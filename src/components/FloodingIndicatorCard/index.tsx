
//Estilo
import { StyledWrapper, Text, ToggleContainer, ToggleSwitch, ToggleSlider, StatusText } from "./style";

interface FloodingIndicatorCardProps {
  value?: number; // 0 = desligado, 1 = ligado
}

function FloodingIndicatorCard({ value = 0 }: FloodingIndicatorCardProps) {
  const isOff = value === 0;

  return (
    <StyledWrapper
      width={"25%"}
      height={"20%"}
      $left={"72.5%"}
      $top={"78%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Text> Sensor de Alagamento </Text>

      <ToggleContainer>
        <ToggleSwitch $isOff={isOff}>
          <ToggleSlider $isOff={isOff} />
        </ToggleSwitch>
        <StatusText $isOff={isOff}>
          {isOff ? 'OFF' : 'ON'}
        </StatusText>
      </ToggleContainer>
    </StyledWrapper>
  );
}

export default FloodingIndicatorCard;

