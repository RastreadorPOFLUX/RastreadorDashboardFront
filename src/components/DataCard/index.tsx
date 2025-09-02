// Estilo
import { StyledWrapper, Button, Text, ButtonWrapper } from "./style";
import { useData } from '../../hooks/useData';

function DataCard() {
  const { loadingDownload, loadingDestroy, error, success, downloadCsv, destroyData } = useData();

  const handleDownload = async () => {
    const downloadSuccess = await downloadCsv('rastreador_solar_data.csv');
    
    if (downloadSuccess) {
      alert('Dados baixados com sucesso!');
    } else {
      alert('Erro ao baixar dados. Por favor, tente novamente.');
    }
  };

  const handleDestroy = async () => {
    // Confirmar antes de apagar os dados
    if (!window.confirm('Tem certeza que deseja apagar todos os dados de tracking?')) {
      return;
    }
    
    const destroySuccess = await destroyData();
    
    if (destroySuccess) {
      alert('Dados apagados com sucesso!');
    } else {
      alert('Erro ao apagar dados. Por favor, tente novamente.');
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
            {loadingDownload ? 'Baixando...' : 'Baixar Dados'}
          </Text>
        </Button>
        <Button 
        color={"var(--alertColor)"}
        onClick={handleDestroy}>
          <Text color={"var(--white)"}>{loadingDestroy ? 'Apagando...' : 'Apagar Dados'}</Text>
        </Button>
      </ButtonWrapper>
    </StyledWrapper>
  );
}

export default DataCard;