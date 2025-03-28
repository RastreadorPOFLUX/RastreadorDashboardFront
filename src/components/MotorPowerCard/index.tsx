import getData from "./Data";

//Estilo
import { StyledWrapper, BorderLinearProgress } from "./style";



function MotorPowerCard() {

  return (
    <StyledWrapper
      width={"65.3125rem"}
      height={"7.5rem"}
      left={"21.5625rem"}
      top={"34.75rem"}
    >
      <BorderLinearProgress variant="determinate" value={getData().value} />

    </StyledWrapper>
  );
}

export default MotorPowerCard;


