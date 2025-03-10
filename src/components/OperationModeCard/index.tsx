//Estilo
import { StyledWrapper, Button, Text } from "./style";

function OperationModeCard() {
  return (
    <StyledWrapper
      width={"31.375rem"}
      height={"13.875rem"}
      left={"21.5625rem"}
      top={"9.4375rem"}
    >
            <Button
              color={"var(--primaryColor)"}
              left={"3.0156rem"}
            >
              <Text color={"var(--white)"}>Auto</Text>
            </Button>
            <Button
              color={"var(--secondaryColor)"}
              left={"12.46875rem"}
            >
              <Text color={"var(--white)"}>Manual</Text>
            </Button>
            <Button
              color={"var(--secondaryColor)"}
              left={"21.921875rem"}
            >
              <Text color={"var(--white)"}>Halt</Text>
            </Button>
    </StyledWrapper>
  );
}

export default OperationModeCard;
