import React, { useState } from "react";
import getData from "./Data";
import {
  Divider,
  StyledWrapper,
  Title,
  Text,
  Line,
  Box,
  StyledInput,
} from "./style";

const PIDParametersCard = () => {
  const pidData = getData();

  const [pidParams, setPidParams] = useState({
    Kp: pidData.Kp,
    Ki: pidData.Ki,
    Kd: pidData.Kd,
  });

  const handleParamChange = (
    paramName: keyof typeof pidParams,
    Value: string,
  ) => {
    const cleaned = Value.replace(",", ".");
    const numericValue = parseFloat(cleaned);

    if (!isNaN(numericValue)) {
      const newParams = { ...pidParams, [paramName]: numericValue };
      setPidParams(newParams);

      // Enviar valor imediatamente (substitua por chamada de API se necessário)
      console.log(`Novo valor de ${paramName}:`, numericValue);
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
        {params.map((param, index) => (
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
                  defaultValue={param.value}
                  onKeyDown={(e) => {
                    // Bloqueia digitação de vírgula
                    if (e.key === ",") {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) =>
                    handleParamChange(
                      param.label as "Kp" | "Ki" | "Kd",
                      e.target.value,
                    )
                  }
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
