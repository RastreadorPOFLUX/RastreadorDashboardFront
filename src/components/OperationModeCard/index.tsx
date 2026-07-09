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
import { useOperationMode } from "../../contexts/OperationModeContext";

const minAngleValue = -40;
const maxAngleValue = 40;

function OperationModeCard() {
  const [manualSetpoint, setManualSetpoint] = useState(() => {
    const savedManualSetpoint = localStorage.getItem("manual_setpoint");
    return savedManualSetpoint !== null ? Number(savedManualSetpoint) : 0;
  });

  const { currentMode, failSafe, setMode } = useOperationMode();

  const handleClickButtonAuto = () => {
    setMode("auto", 0, { rtc: Math.floor(Date.now() / 1000) });
  };
  const handleClickButtonManual = () => {
    setMode("manual", manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
  };
  const handleClickButtonHalt = () => {
    setMode("halt", 0, { rtc: Math.floor(Date.now() / 1000) });
  };
  const handleClickButtonPresentation = () => {
    setMode("presentation", 0, { rtc: Math.floor(Date.now() / 1000) });
  };

  const handleSetpointChange = (e: any) => {
    setManualSetpoint(e.target.value);
  };

  const handleSubmitSetpoint = () => {
    if (!isNaN(manualSetpoint) && manualSetpoint >= minAngleValue && manualSetpoint <= maxAngleValue) {
      localStorage.setItem("manual_setpoint", manualSetpoint.toString());
      setMode("manual", manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
    } else {
      alert("Por favor, insira um valor entre -40 e 40 graus.");
    }
  };

  return (
    <StyledWrapper
      width={"35%"}
      height={"15%"}
      $left={"25%"}
      $top={"21%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Row>
        <Button
          onClick={handleClickButtonAuto}
          disabled={failSafe}
          color={currentMode === "auto" ? "var(--primaryColor)" : "var(--secondaryColor)"}
        >
          <Text color={"var(--white)"}>Auto</Text>
        </Button>

        <Button
          onClick={handleClickButtonManual}
          disabled={failSafe}
          color={currentMode === "manual" ? "var(--primaryColor)" : "var(--secondaryColor)"}
        >
          <Text color={"var(--white)"}>Manual</Text>
        </Button>

        <Button
          onClick={handleClickButtonHalt}
          color={currentMode === "halt" ? "var(--primaryColor)" : "var(--secondaryColor)"}
        >
          <Text color={"var(--white)"}>Halt</Text>
        </Button>

        <Button
          onClick={handleClickButtonPresentation}
          disabled={failSafe}
          color={currentMode === "presentation" ? "var(--primaryColor)" : "var(--secondaryColor)"}
        >
          <Text color={"var(--white)"}>Presentation</Text>
        </Button>
      </Row>

      {failSafe && (
        <Row>
          <Text color={"var(--primaryText)"}>
            FailSafe ativo — apenas Halt disponível
          </Text>
        </Row>
      )}

      {currentMode === "manual" && (
        <Row>
          <Text color={"var(--primaryText)"}>Manual SetPoint:</Text>
          <StyledInput
            type="number"
            min={minAngleValue}
            max={maxAngleValue}
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
