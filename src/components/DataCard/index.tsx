//Estilo
import { StyledWrapper, Button, Text, ButtonWrapper } from "./style";

function DataCard() {
  return (
    <StyledWrapper
      width={"35%"}
      height={"14%"}
      $left={"62%"}
      $top={"38.5%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <ButtonWrapper>
        <Button color={"var(--acceptColor)"}>
          <Text color={"var(--white)"}>Baixar Dados</Text>
        </Button>
        <Button color={"var(--alertColor)"}>
          <Text color={"var(--white)"}>Apagar Dados</Text>
        </Button>
      </ButtonWrapper>
    </StyledWrapper>
  );
}

export default DataCard;
