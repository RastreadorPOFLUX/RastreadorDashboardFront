import { Link, useLocation } from "react-router";;
import { useDateContext } from './DateContext';

// Estilo
import {
  Wrapper,
  Pages,
  Divider,
  Space,
  Text,
  DateInput,
  Contribuitions,
} from "./style";


function MenuLateral() {

  const {BeginDate, setBeginDate, EndDate, setEndDate} = useDateContext();

  const handleBeginDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if(new Date(event.target.value) <= new Date()){
      setBeginDate(event.target.value);
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(new Date(event.target.value) <= new Date()){
      setEndDate(event.target.value);
    }
  };

  const location = useLocation();

  const getColor = (pathname: string) => {
    let textColors: string[] = [];
    switch (pathname) {
      case "/":
        textColors = [
          "var(--primaryColor)",
          "var(--primaryText)",
          "var(--primaryText)",
        ];
        return textColors;
      case "/electricalInfo":
        textColors = [
          "var(--primaryText)",
          "var(--primaryColor)",
          "var(--primaryText)",
        ];
        return textColors;
      case "/controlInfo":
        textColors = [
          "var(--primaryText)",
          "var(--primaryText)",
          "var(--primaryColor)",
        ];
        return textColors;
      default:
        return "var(--primaryText)";
    }
  };

  return (
    <Wrapper>
      <Link to="/">
        <Pages color={getColor(location.pathname)[0]}>
          Informações Gerais
        </Pages>
      </Link>
      <Divider></Divider>
      <Link to="/electricalInfo">
        <Pages color={getColor(location.pathname)[1]}> Elétrica </Pages>
      </Link>
      <Divider></Divider>
      <Link to="/controlInfo">
        <Pages color={getColor(location.pathname)[2]}> Controlador </Pages>
      </Link>
      <Space></Space>
      <Text> Período de Análise: </Text>
      <Text>
        Início
        <DateInput
          id="begin"
          type="text"
          value={BeginDate}
          onChange={handleBeginDateChange}
        ></DateInput>
        Fim
        <DateInput
          id="end"
          value={EndDate}
          onChange={handleEndDateChange}
        ></DateInput>
      </Text>
      <Space></Space>
      <Contribuitions>
        @Guilherme N. Matera
        <br />
        @Mateus Lima
        <br />
        @Vinicius F. Neves
      </Contribuitions>
    </Wrapper>
  );
}

export default MenuLateral;
