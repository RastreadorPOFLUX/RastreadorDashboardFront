//Estilo
import { useEffect, useRef, useState } from "react";
import {
  StyledWrapper,
  Button,
  Text,
  Row,
  StyledInput,
  StyledSubmitButton,
} from "./style";
import { useOperationMode } from '../../hooks/useOperationMode';


function OperationModeCard() {

  const [manualSetpoint, setManualSetpoint] = useState(()=>{
    return localStorage.getItem("manual_setpoint") ? Number(localStorage.getItem("manual_setpoint")) : 0;
  });

  const [isActivedAuto, setActivatedAuto] = useState(true);
  const [isActiveManual, setActivatedManual] = useState(false);
  const [isActiveHalt, setActivatedHalt] = useState(false);
  const [isActivePresentation, setActivatedPresentation] = useState(false);

  const { isLoading, isOnline, setMode } = useOperationMode();

  const minAngleValue: number = -40;
  const maxAngleValue: number = 40;

  const hasInitialized = useRef(false);


  const handleClickButtonAuto = () => {
    isActivedAuto == false
      ? setActivatedAuto(!isActivedAuto)
      : setActivatedAuto(isActivedAuto);
    setActivatedManual(false);
    setActivatedHalt(false);
    setActivatedPresentation(false);
    setMode('auto', manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
    localStorage.setItem("operation_mode", "auto");
  };


  const handleClickButtonManual = () => {
    setActivatedAuto(false);
    isActiveManual == false
      ? setActivatedManual(!isActiveManual)
      : setActivatedManual(isActiveManual);
    setActivatedHalt(false);
    setActivatedPresentation(false);
    setMode('manual', manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
    localStorage.setItem("operation_mode", "manual");
  };

  const handleSetpointChange = (e: any) => {
    setManualSetpoint(e.target.value);
  };


  const handleSubmitSetpoint = () => {
    if (!isNaN(manualSetpoint) && manualSetpoint >= minAngleValue && manualSetpoint <= maxAngleValue) {
      setMode('manual', manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
      console.log("Setpoint manual definido:", manualSetpoint);
    } else {
      alert("Por favor, insira um valor entre -40 e 40 graus.");
    }
  };
  const handleClickButtonHalt = () => {
    setActivatedAuto(false);
    setActivatedManual(false);
    isActiveHalt == false
      ? setActivatedHalt(!isActiveHalt)
      : setActivatedHalt(isActiveHalt);
    setActivatedPresentation(false);
    setMode('halt', manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
    localStorage.setItem("operation_mode", "halt");
  };
  const handleClickButtonPresentation = () => {
    setActivatedAuto(false);
    setActivatedManual(false);
    setActivatedHalt(false);
    isActivePresentation == false
      ? setActivatedPresentation(!isActivePresentation)
      : setActivatedPresentation(isActivePresentation);
    setMode('presentation', manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
    localStorage.setItem("operation_mode", "presentation");
  };



  useEffect(() => {
    localStorage.setItem("manual_setpoint", manualSetpoint.toString());
  }, [manualSetpoint]);


useEffect(() => {
  if (!hasInitialized.current && !isLoading && isOnline) {
    hasInitialized.current = true;

    const savedMode = localStorage.getItem("operation_mode");

    switch (savedMode) {
      case "manual":
        setActivatedAuto(false);
        setActivatedManual(true);
        setActivatedHalt(false);
        setActivatedPresentation(false);
        setMode("manual", manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
        break;
      case "halt":
        setActivatedAuto(false);
        setActivatedManual(false);
        setActivatedHalt(true);
        setActivatedPresentation(false);
        setMode("halt", manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
        break;
      case "presentation":
        setActivatedAuto(false);
        setActivatedManual(false);
        setActivatedHalt(false);
        setActivatedPresentation(true);
        setMode("presentation", manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
        break;
      default:
        // default to auto
        setActivatedAuto(true);
        setActivatedManual(false);
        setActivatedHalt(false);
        setActivatedPresentation(false);
        setMode("auto", manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
    }
  }
}, [isLoading, isOnline]);

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
            min={-40}
            max={40}
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
