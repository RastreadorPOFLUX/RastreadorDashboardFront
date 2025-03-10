//Estilo
import { useState } from "react";
import { StyledWrapper, Button, Text } from "./style";

function OperationModeCard() {

  const [isActivedAuto, setActivatedAuto] = useState(true);
  const [isActiveManual, setActivatedManual] = useState(false);
  const [isActiveHalt, setActivatedHalt] = useState(false);

  const handleButtonClick1 = () => {
    isActivedAuto == false ? setActivatedAuto(!isActivedAuto): setActivatedAuto(isActivedAuto);
    setActivatedManual(false);
    setActivatedHalt(false);
  };
  const handleButtonClick2 = () => {
    setActivatedAuto(false);
    isActiveManual == false ? setActivatedManual(!isActiveManual): setActivatedManual(isActiveManual);
    setActivatedHalt(false);
    
  };
  const handleButtonClick3 = () => {
    setActivatedAuto(false);
    setActivatedManual(false);
    isActiveHalt == false ? setActivatedHalt(!isActiveHalt): setActivatedHalt(isActiveHalt);
  };


  return (
    <StyledWrapper
      width={"31.375rem"}
      height={"13.875rem"}
      left={"21.5625rem"}
      top={"9.4375rem"}
    >
            <Button onClick={handleButtonClick1}
              color={isActivedAuto ? "var(--primaryColor)": "var(--secondaryColor)"}
              left={"3.0156rem"}
            >
              <Text color={"var(--white)"}>Auto</Text>
            </Button>
            <Button 
              onClick={handleButtonClick2}
              color={isActiveManual ? "var(--primaryColor)": "var(--secondaryColor)"}
              left={"12.46875rem"}
            >
              <Text color={"var(--white)"}>Manual</Text>
            </Button>
            <Button 
              onClick={handleButtonClick3}
              color={isActiveHalt ? "var(--primaryColor)": "var(--secondaryColor)"}
              left={"21.921875rem"}
            >
              <Text color={"var(--white)"}>Halt</Text>
            </Button>
    </StyledWrapper>
  );
}

export default OperationModeCard;
