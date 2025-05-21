import React from "react";
import getData from "./Data";
import { Divider, StyledWrapper, Title, Text, Line, Box } from "./style";

const PIDParametersCard = () => {
  const pidData = getData();
  const params = [
    { label: "Kp", value: pidData.Kp },
    { label: "Ki", value: pidData.Ki },
    { label: "Kd", value: pidData.Kd },
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
                <Text color="var(--primaryText)">{param.value}</Text>
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
