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

// WebSocket do backend FastAPI para dados em tempo real
const WS_BACKEND_URL = "ws://localhost:8000/ws/live";

function OperationModeCard() {
  const [isActivedAuto, setActivatedAuto] = useState(() => {
    const savedMode = localStorage.getItem("operation_mode");
    return savedMode === null || savedMode === "auto";
  });
  const [isActiveManual, setActivatedManual] = useState(() => {
    const savedMode = localStorage.getItem("operation_mode");
    return savedMode === "manual";
  });
  const [manualSetpoint, setManualSetpoint] = useState(() => {
    const savedManualSetpoint = localStorage.getItem("manual_setpoint");
    return savedManualSetpoint !== null ? Number(savedManualSetpoint) : 0;
  });
  const [isActiveHalt, setActivatedHalt] = useState(() => {
    const savedMode = localStorage.getItem("operation_mode");
    return savedMode === "halt";
  });
  const [isActivePresentation, setActivatedPresentation] = useState(() => {
    const savedMode = localStorage.getItem("operation_mode");
    return savedMode === "presentation";
  });

  const { isLoading, isOnline, setMode } = useOperationMode();

  const handleClickButtonAuto = () => {
    isActivedAuto == false
      ? setActivatedAuto(!isActivedAuto)
      : setActivatedAuto(isActivedAuto);
    setActivatedManual(false);
    setActivatedHalt(false);
    setActivatedPresentation(false);
    const savedManualSetpoint = Number(localStorage.getItem("manual_setpoint")) || 0;
    setManualSetpoint(savedManualSetpoint);
    setMode('auto', 0, { rtc: Math.floor(Date.now() / 1000) });
    localStorage.setItem("operation_mode", "auto");
  };
  const handleClickButtonManual = () => {
    setActivatedAuto(false);
    isActiveManual == false
      ? setActivatedManual(!isActiveManual)
      : setActivatedManual(isActiveManual);
    setActivatedHalt(false);
    setActivatedPresentation(false);
    const savedManualSetpoint = Number(localStorage.getItem("manual_setpoint")) || 0;
    setManualSetpoint(savedManualSetpoint);
    setMode('manual', savedManualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
    localStorage.setItem("operation_mode", "manual");
  };

  const handleSetpointChange = (e: any) => {
    setManualSetpoint(e.target.value);
  };

  const minAngleValue: number = -40;
  const maxAngleValue: number = 40;

  const handleSubmitSetpoint = () => {
    if (!isNaN(manualSetpoint) && manualSetpoint >= minAngleValue && manualSetpoint <= maxAngleValue) {
      localStorage.setItem("manual_setpoint", manualSetpoint.toString());
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
    const savedManualSetpoint = Number(localStorage.getItem("manual_setpoint")) || 0;
    setManualSetpoint(savedManualSetpoint);
    setMode('halt', 0, { rtc: Math.floor(Date.now() / 1000) });
    localStorage.setItem("operation_mode", "halt");
  };
  const handleClickButtonPresentation = () => {
    setActivatedAuto(false);
    setActivatedManual(false);
    setActivatedHalt(false);
    isActivePresentation == false
      ? setActivatedPresentation(!isActivePresentation)
      : setActivatedPresentation(isActivePresentation);
    const savedManualSetpoint = Number(localStorage.getItem("manual_setpoint")) || 0;
    setManualSetpoint(savedManualSetpoint);
    setMode('presentation', 0, { rtc: Math.floor(Date.now() / 1000) });
    localStorage.setItem("operation_mode", "presentation");
  };

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && !isLoading && isOnline) {
      hasInitialized.current = true;

      const savedMode = localStorage.getItem("operation_mode") || "auto";

      setMode(savedMode as 'auto' | 'manual' | 'halt' | 'presentation', manualSetpoint, { rtc: Math.floor(Date.now() / 1000) });
    }
  }, [isLoading, isOnline]);

  // --- WebSocket para modo de operação em tempo real ---
  useEffect(() => {
    const ws = new WebSocket(WS_BACKEND_URL);
    ws.onopen = () => {
      console.log("WebSocket conectado ao backend para modo de operação");
    };
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.system_status && data.system_status.mode) {
          setActivatedAuto(data.system_status.mode === "auto");
          setActivatedManual(data.system_status.mode === "manual");
          setActivatedHalt(data.system_status.mode === "halt");
          setActivatedPresentation(data.system_status.mode === "presentation");
          localStorage.setItem("operation_mode", data.system_status.mode);
        }
        if (data.system_status && data.system_status.manual_setpoint !== undefined) {
          setManualSetpoint(data.system_status.manual_setpoint);
          localStorage.setItem("manual_setpoint", String(data.system_status.manual_setpoint));
        }
      } catch (e) {
        // Ignora mensagens não JSON
      }
    };
    ws.onerror = (err) => {
      console.error("Erro no WebSocket do backend:", err);
    };
    return () => {
      ws.close();
    };
  }, []);

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