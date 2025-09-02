// Estilo
import { StyledWrapper, Button, Text, ButtonWrapper } from "./style";
import { useData } from '../../hooks/useData';

function DataCard() {
  const { loading, error, success, downloadCsv } = useData();

  const handleDownload = async () => {
    const downloadSuccess = await downloadCsv('rastreador_solar_data.csv');
    
    if (downloadSuccess) {
      alert('Dados baixados com sucesso!');
    } else {
      alert('Erro ao baixar dados. Por favor, tente novamente.');
    }
  };

  return (
    <StyledWrapper
      width={"35%"}
      height={"14%"}
      $left={"62%"}
      $top={"38.5%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <ButtonWrapper>
        <Button 
          color={"var(--acceptColor)"}
          onClick={handleDownload}
        >
          <Text color={"var(--white)"}>
            {loading ? 'Baixando...' : 'Baixar Dados'}
          </Text>
        </Button>
        <Button color={"var(--alertColor)"}>
          <Text color={"var(--white)"}>Apagar Dados</Text>
        </Button>
      </ButtonWrapper>
    </StyledWrapper>
  );
}

export default DataCard;