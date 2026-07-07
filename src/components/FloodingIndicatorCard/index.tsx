
//Estilo
import { StyledWrapper, Text, ToggleContainer, ToggleSwitch, ToggleSlider, StatusText } from "./style";

// Hooks
import { useSensorsData } from "../../hooks/useSensors";

function FloodingIndicatorCard() {
  const { sensors } = useSensorsData();
  const isOff = !sensors?.flooding;

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

