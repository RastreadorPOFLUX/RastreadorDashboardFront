import { Link, useLocation } from "react-router";
import { formatDate, useDateContext } from "./DateContext";

// Estilo
import {
  Wrapper,
  Pages,
  Divider,
  Text,
  DateInput,
  Contribuitions,
} from "./style";

function MenuLateral() {
  const { BeginDate, setBeginDate, EndDate, setEndDate } = useDateContext();

  const handleBeginDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (
      new Date(event.target.value) <= new Date() &&
      new Date(event.target.value) <= new Date(EndDate)
    ) {
      setBeginDate(event.target.value);
      //Valor em milisegundos de 1 semana e correção de fuso horário
      if (
        new Date(EndDate).getTime() +
          93600000 -
          new Date(event.target.value).getTime() +
          10800000 >
        612000000
      ) {
        let date = new Date(new Date(event.target.value).getTime() + 612000000);
        setEndDate(formatDate(date));
      }
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      new Date(event.target.value) <= new Date() &&
      new Date(event.target.value) >= new Date(BeginDate)
    ) {
      setEndDate(event.target.value);

      if (
        new Date(event.target.value).getTime() +
          93600000 -
          new Date(BeginDate).getTime() +
          10800000 >
        612000000
      ) {
        let date = new Date(new Date(event.target.value).getTime() - 507600000);
        setBeginDate(formatDate(date));
      }
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
          "var(--primaryText)",
        ];
        return textColors;
      case "/electricalInfo":
        textColors = [
          "var(--primaryText)",
          "var(--primaryColor)",
          "var(--primaryText)",
          "var(--primaryText)",
        ];
        return textColors;
      case "/controlInfo":
        textColors = [
          "var(--primaryText)",
          "var(--primaryText)",
          "var(--primaryColor)",
          "var(--primaryText)",
        ];
        return textColors;
      case "/cameraDisplay":
        textColors = [
          "var(--primaryText)",
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
        <Pages color={getColor(location.pathname)[0]}>Informações Gerais</Pages>
      </Link>
      <Divider></Divider>
      <Link to="/electricalInfo">
        <Pages color={getColor(location.pathname)[1]}> Elétrica </Pages>
      </Link>
      <Divider></Divider>
      <Link to="/controlInfo">
        <Pages color={getColor(location.pathname)[2]}> Controlador </Pages>
      </Link>
      <Divider></Divider>
      <Link to="/cameraDisplay">
        <Pages color={getColor(location.pathname)[3]}> Câmera </Pages>
      </Link>
      <Text>
        Início
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
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
        </div>
      </Text>
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
