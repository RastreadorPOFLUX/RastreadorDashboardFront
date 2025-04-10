//Estilo
import { StyledWrapper, Button, Text } from "./style";

function DataCard() {
  return (
    <StyledWrapper
      width={"31.375rem"}
      height={"6.25rem"}
      left={"55.5rem"}
      top={"16rem"}
    >
      <Button
        width={"10.625rem"}
        height={"2.8125rem"}
        color={"var(--acceptColor)"}
        left={"2.6875rem"}
        top={"1.7375rem"}
      >
        <Text color={"var(--white)"}>Baixar Dados</Text>
      </Button>
      <Button
        width={"10.625rem"}
        height={"2.8125rem"}
        color={"var(--alertColor)"}
        left={"17.875rem"}
        top={"1.7375rem"}
      >
        <Text color={"var(--white)"}>Apagar Dados</Text>
      </Button>
    </StyledWrapper>
  );
}

export default DataCard;
