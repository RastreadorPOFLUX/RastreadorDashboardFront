import getData from "./Data";

//Estilo
import { Divider, StyledWrapper, Title, Text } from "./style";

function PIDParametersCard() {
  return (
    <div>
      <StyledWrapper
        width={"31.375rem"}
        height={"15.775rem"}
        left={"55.5rem"}
        top={"8.4375rem"}
        backgroundcolor="var(--backgroundCards)"
      >
        <Title color={"var(--primaryText)"}>Parâmetros PID</Title>
      </StyledWrapper>

      <div>
        <StyledWrapper
          width={"4.125rem"}
          height={"2.5375rem"}
          left={"59.46rem"}
          top={"11.876875rem"}
          backgroundcolor="var(--primaryColor)"
        >
          <Text color={"var(--white)"}> Kp</Text>
          <Divider></Divider>
        </StyledWrapper>

        <StyledWrapper
          width={"8.125rem"}
          height={"2.5375rem"}
          left={"74.25rem"}
          top={"11.876875rem"}
          backgroundcolor="var(--backgroundColor)"
        >
          <Text color={"var(--primaryText)"}> {getData().Kp}</Text>
        </StyledWrapper>
      </div>

      <div>
        <StyledWrapper
          width={"4.125rem"}
          height={"2.5375rem"}
          left={"59.46rem"}
          top={"15.876875rem"}
          backgroundcolor="var(--primaryColor)"
        >
          <Text color={"var(--white)"}> Ki</Text>
          <Divider></Divider>
        </StyledWrapper>

        <StyledWrapper
          width={"8.125rem"}
          height={"2.5375rem"}
          left={"74.25rem"}
          top={"15.876875rem"}
          backgroundcolor="var(--backgroundColor)"
        >
          <Text color={"var(--primaryText)"}> {getData().Ki}</Text>
        </StyledWrapper>
      </div>

      <div>
        <StyledWrapper
          width={"4.125rem"}
          height={"2.5375rem"}
          left={"59.46rem"}
          top={"19.876875rem"}
          backgroundcolor="var(--primaryColor)"
        >
          <Text color={"var(--white)"}> Kd</Text>
        </StyledWrapper>

        <StyledWrapper
          width={"8.125rem"}
          height={"2.5375rem"}
          left={"74.25rem"}
          top={"19.876875rem"}
          backgroundcolor="var(--backgroundColor)"
        >
          <Text color={"var(--primaryText)"}> {getData().Kd}</Text>
        </StyledWrapper>
      </div>
    </div>
  );
}

export default PIDParametersCard;
