import React, { useEffect, useState } from "react";
import {
  Divider,
  StyledWrapper,
  Title,
  Text,
  Line,
  Box,
  StyledInput,
} from "./style";

import { usePidData } from "../../hooks/usePid";

const PIDParametersCard = () => {
  const { pid, isLoading, error, setPidParameters } = usePidData();

  const [pidParams, setPidParams] = useState({
    Kp: 0,
    Ki: 0,
    Kd: 0,
  });

  // Atualizar estado local quando dados do backend forem carregados
  useEffect(() => {
    if (pid) {
      setPidParams({
        Kp: pid.kp,
        Ki: pid.ki,
        Kd: pid.kd,
      });
    }
  }, [pid]);

  const handleParamChange = (
    paramName: keyof typeof pidParams,
    Value: string
  ) => {
    const cleaned = Value.replace(",", ".");
    const numericValue = parseFloat(cleaned);

    if (!isNaN(numericValue)) {
      const newParams = { ...pidParams, [paramName]: numericValue };
      setPidParams(newParams);

      // Atualizar backend
      setPidParameters({
        kp: paramName === "Kp" ? numericValue : newParams.Kp,
        ki: paramName === "Ki" ? numericValue : newParams.Ki,
        kd: paramName === "Kd" ? numericValue : newParams.Kd,
      });
    }
  };

  const params = [
    { label: "Kp", value: pidParams.Kp },
    { label: "Ki", value: pidParams.Ki },
    { label: "Kd", value: pidParams.Kd },
  ];

  return (
    <StyledWrapper
      width="35%"
      height="38%"
      $left="62%"
      $top="21%"
      $backgroundcolor="var(--backgroundCards)"
    >
      <Box>
        <Title color="var(--primaryText)">Parâmetros PID</Title>
        {!isLoading &&
          params.map((param, index) => (
            <React.Fragment key={param.label}>
              <Line>
                <StyledWrapper
                  width="15%"
                  height="2rem"
                  $backgroundcolor="var(--primaryColor)"
                >
                  <Text color="var(--white)">{param.label}</Text>
                </StyledWrapper>

                <StyledWrapper
                  width="30%"
                  height="2rem"
                  $backgroundcolor="var(--backgroundColor)"
                >
                  <StyledInput
                    type="text"
                    value={param.value}
                    onKeyDown={(e) => {
                      if (e.key === ",") {
                        e.preventDefault();
                      }
                    }}
                   onChange={(e) => {
                    const cleaned = e.target.value.replace(",", ".");
                    const numericValue = parseFloat(cleaned);
                    if (!isNaN(numericValue)) {
                      setPidParams((prev) => ({
                        ...prev,
                        [param.label]: numericValue,
                      }));
                    }
                  }}
                  onBlur={() => {
                    setPidParameters({
                      kp: pidParams.Kp,
                      ki: pidParams.Ki,
                      kd: pidParams.Kd,
                    });
                  }}
                  />
                </StyledWrapper>
              </Line>
              {index < params.length - 1 && <Divider />}
            </React.Fragment>
          ))}
      </Box>
    </StyledWrapper>
  );
};

export default PIDParametersCard;
