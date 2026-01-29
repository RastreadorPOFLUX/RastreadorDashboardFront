import React, { useEffect, useState } from "react";
import {
  Divider,
  StyledWrapper,
  Title,
  Text,
  Line,
  Box,
  StyledInput,
  AdjustButton,
  ColumnsContainer,
  Column,
  ParamsSection,
  BracketColumn,
  StyledBracket,
} from "./style";

import { usePidData } from "../../hooks/usePid";

const PIDParametersCard = () => {
  const { pid, isLoading, error, setPidParameters } = usePidData();
  const [isAdjusting, setIsAdjusting] = useState(false);

  const [pidParams, setPidParams] = useState({
    Kp: 0,
    Ki: 0,
    Kd: 0,
    p: 0,
    i: 0,
    d: 0,
    error: 0,
    output: 0,
  });

  // Atualizar estado local quando dados do backend forem carregados
  useEffect(() => {
    if (pid) {
      setPidParams({
        Kp: pid.kp,
        Ki: pid.ki,
        Kd: pid.kd,
        p: pid.p,
        i: pid.i,
        d: pid.d,
        error: pid.error,
        output: pid.output,
      });
    }
  }, [pid]);

  // Função para ajustar os parâmetros PID
  const handleAdjust = async () => {
    setIsAdjusting(true);
    try {
      await setPidParameters({
        kp: pidParams.Kp,
        ki: pidParams.Ki,
        kd: pidParams.Kd
      });
    } catch (err) {
      console.error('Erro ao ajustar parâmetros:', err);
    } finally {
      setIsAdjusting(false);
    }
  };

  // Parâmetros editáveis (ganhos do controlador)
  const editableParams = [
    { label: "Kp", value: pidParams.Kp },
    { label: "Ki", value: pidParams.Ki },
    { label: "Kd", value: pidParams.Kd },
  ];

  // Valores calculados (somente leitura)
  const readOnlyParams = [
    { label: "P", value: pidParams.p },
    { label: "I", value: pidParams.i },
    { label: "D", value: pidParams.d },
    { label: "Erro", value: pidParams.error },
    { label: "Saída", value: pidParams.output },
  ];

  return (
    <StyledWrapper
      width="27%"
      height="77%"
      $left="68%"
      $top="21%"
      $backgroundcolor="var(--backgroundCards)"
    >
      <Box>
        <Title color="var(--primaryText)">Parâmetros PID</Title>
        {!isLoading && (
          <>
            {/* Parâmetros editáveis com botão em colunas */}
            <ColumnsContainer>
              <Column>
                <ParamsSection>
                  {editableParams.map((param, index) => (
                    <React.Fragment key={param.label}>
                      <Line>
                        <StyledWrapper
                          width="25%"
                          height="2rem"
                          $backgroundcolor="var(--primaryColor)"
                        >
                          <Text color="var(--white)">{param.label}</Text>
                        </StyledWrapper>

                        <StyledWrapper
                          width="50%"
                          height="2rem"
                          $backgroundcolor="var(--backgroundColor)"
                        >
                          <StyledInput
                            type="text"
                            value={param.value.toFixed(2)}
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
                          />
                        </StyledWrapper>
                      </Line>
                      {index < editableParams.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </ParamsSection>
              </Column>

              <BracketColumn>
                <StyledBracket />
              </BracketColumn>

              <Column className="button-column">
                <AdjustButton
                  onClick={handleAdjust}
                  disabled={isAdjusting || isLoading}
                >
                  {isAdjusting ? "Ajustando..." : "Ajustar"}
                </AdjustButton>
              </Column>
            </ColumnsContainer>

            <Divider />

            {/* Valores calculados (somente leitura) */}
            {readOnlyParams.map((param, index) => (
              <React.Fragment key={param.label}>
                <Line>
                  <StyledWrapper
                    width="15%"
                    height="2rem"
                    $backgroundcolor="var(--secondaryColor)"
                  >
                    <Text color="var(--white)">{param.label}</Text>
                  </StyledWrapper>

                  <StyledWrapper
                    width="30%"
                    height="2rem"
                    $backgroundcolor="var(--backgroundColor)"
                  >
                    <Text color="var(--primaryText)">{param.value.toFixed(2)}</Text>
                  </StyledWrapper>
                </Line>
                {index < readOnlyParams.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </>
        )}
      </Box>
    </StyledWrapper>
  );
};

export default PIDParametersCard;
