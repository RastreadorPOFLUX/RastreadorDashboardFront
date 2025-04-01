import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

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
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const todayFormatted = formatDate(today);
  const yesterdayFormatted = formatDate(yesterday);

  const [BeginDate, setBeginDate] = useState(yesterdayFormatted);
  const [EndDate, setEndDate] = useState(todayFormatted);

  const handleBeginDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBeginDate(event.target.value);
  };
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
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
          {" "}
          Informações Gerais{" "}
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
