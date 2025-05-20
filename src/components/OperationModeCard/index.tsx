//Estilo
import { useState } from "react";
import { StyledWrapper, Button, Text, Title, SecondRow } from "./style";

function OperationModeCard() {
  const [isActivedAuto, setActivatedAuto] = useState(true);
  const [isActiveManual, setActivatedManual] = useState(false);
  const [isActiveHalt, setActivatedHalt] = useState(false);

  const handleClickButtonAuto = () => {
    isActivedAuto == false
      ? setActivatedAuto(!isActivedAuto)
      : setActivatedAuto(isActivedAuto);
    setActivatedManual(false);
    setActivatedHalt(false);
  };
  const handleClickButtonManual = () => {
    setActivatedAuto(false);
    isActiveManual == false
      ? setActivatedManual(!isActiveManual)
      : setActivatedManual(isActiveManual);
    setActivatedHalt(false);
  };
  const handleClickButtonHalt = () => {
    setActivatedAuto(false);
    setActivatedManual(false);
    isActiveHalt == false
      ? setActivatedHalt(!isActiveHalt)
      : setActivatedHalt(isActiveHalt);
  };

  return (
    <StyledWrapper
      width={"35%"}
      height={"32%"}
      $left={"25%"}
      $top={"8.4375rem"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Title color={"var(--primaryText)"}> Modos de Operação</Title>
      <SecondRow>
        <Button
          onClick={handleClickButtonAuto}
          color={
            isActivedAuto ? "var(--primaryColor)" : "var(--secondaryColor)"
          }
        >
          <Text color={"var(--white)"}>Auto</Text>
        </Button>
        <Button
          onClick={handleClickButtonManual}
          color={
            isActiveManual ? "var(--primaryColor)" : "var(--secondaryColor)"
          }
        >
          <Text color={"var(--white)"}>Manual</Text>
        </Button>
        <Button
          onClick={handleClickButtonHalt}
          color={isActiveHalt ? "var(--primaryColor)" : "var(--secondaryColor)"}
        >
          <Text color={"var(--white)"}>Halt</Text>
        </Button>
      </SecondRow>
    </StyledWrapper>
  );
}

export default OperationModeCard;
