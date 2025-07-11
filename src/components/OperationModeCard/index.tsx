//Estilo
import { useState } from "react";
import {
  StyledWrapper,
  Button,
  Text,
  Row,
  StyledInput,
  StyledSubmitButton,
} from "./style";

function OperationModeCard() {
  const [isActivedAuto, setActivatedAuto] = useState(true);
  const [isActiveManual, setActivatedManual] = useState(false);
  const [manualSetpoint, setManualSetpoint] = useState("0");
  const [isActiveHalt, setActivatedHalt] = useState(false);
  const [isActivePresentation, setActivatedPresentation] = useState(false);

  const handleClickButtonAuto = () => {
    isActivedAuto == false
      ? setActivatedAuto(!isActivedAuto)
      : setActivatedAuto(isActivedAuto);
    setActivatedManual(false);
    setActivatedHalt(false);
    setActivatedPresentation(false);
  };
  const handleClickButtonManual = () => {
    setActivatedAuto(false);
    isActiveManual == false
      ? setActivatedManual(!isActiveManual)
      : setActivatedManual(isActiveManual);
    setActivatedHalt(false);
    setActivatedPresentation(false);
  };
  const handleSetpointChange = (e: any) => {
    setManualSetpoint(e.target.value);
  };

  const minAngleValue: number = -45;
  const maxAngleValue: number = 45;

  const handleSubmitSetpoint = () => {
    const value = parseFloat(manualSetpoint);
    if (!isNaN(value) && value >= minAngleValue && value <= maxAngleValue) {
      // Aqui você pode fazer algo com o valor, como enviar para um backend
      console.log("Setpoint manual definido:", value);
    } else {
      alert("Por favor, insira um valor entre -45 e 45 graus.");
    }
  };
  const handleClickButtonHalt = () => {
    setActivatedAuto(false);
    setActivatedManual(false);
    isActiveHalt == false
      ? setActivatedHalt(!isActiveHalt)
      : setActivatedHalt(isActiveHalt);
    setActivatedPresentation(false);
  };
  const handleClickButtonPresentation = () => {
    setActivatedAuto(false);
    setActivatedManual(false);
    setActivatedHalt(false);
    isActivePresentation == false
      ? setActivatedPresentation(!isActivePresentation)
      : setActivatedPresentation(isActivePresentation);
  };

  return (
    <StyledWrapper
      width={"35%"}
      height={"31.5%"}
      $left={"25%"}
      $top={"21%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Row>
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
      </Row>
      <Row>
        <Button
          onClick={handleClickButtonHalt}
          color={isActiveHalt ? "var(--primaryColor)" : "var(--secondaryColor)"}
        >
          <Text color={"var(--white)"}>Halt</Text>
        </Button>

        <Button
          onClick={handleClickButtonPresentation}
          color={
            isActivePresentation
              ? "var(--primaryColor)"
              : "var(--secondaryColor)"
          }
        >
          <Text color={"var(--white)"}>Presentation</Text>
        </Button>
      </Row>

      {isActiveManual && (
        <Row>
          <Text color={"var(--primaryText)"}>Manual SetPoint:</Text>
          <StyledInput
            type="number"
            min={-45}
            max={45}
            step={5}
            value={manualSetpoint}
            onChange={handleSetpointChange}
          />
          <StyledSubmitButton onClick={handleSubmitSetpoint}>
            Confirmar
          </StyledSubmitButton>
        </Row>
      )}
    </StyledWrapper>
  );
}

export default OperationModeCard;
