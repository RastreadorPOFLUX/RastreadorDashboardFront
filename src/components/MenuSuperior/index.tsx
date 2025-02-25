import React, { useState } from "react";

// Estilo
import {
  Title,
  Image,
  Wrapper,
  DateDisplay,
  TrackerConnectionIcon,
  ConnectionText,
} from "./style";

// Imagens
import lifLogo from "./../../assets/lif-logo.svg";

const Online = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="var(--primaryText)"
      d="M12 21q-1.05 0-1.775-.725T9.5 18.5t.725-1.775T12 16t1.775.725t.725 1.775t-.725 1.775T12 21m-5.65-5.65l-2.1-2.15q1.475-1.475 3.463-2.337T12 10t4.288.875t3.462 2.375l-2.1 2.1q-1.1-1.1-2.55-1.725T12 13t-3.1.625t-2.55 1.725M2.1 11.1L0 9q2.3-2.35 5.375-3.675T12 4t6.625 1.325T24 9l-2.1 2.1q-1.925-1.925-4.462-3.012T12 7T6.563 8.088T2.1 11.1"
    />
  </svg>
);

const Offline = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="var(--primaryText)"
      d="m19.75 22.6l-9.4-9.45q-1.175.275-2.187.825T6.35 15.35l-2.1-2.15q.8-.8 1.725-1.4t1.975-1.05L5.7 8.5q-1.025.525-1.913 1.163T2.1 11.1L0 8.95q.8-.8 1.663-1.437T3.5 6.3L1.4 4.2l1.4-1.4l18.4 18.4zM12 21q-1.05 0-1.775-.737T9.5 18.5q0-1.05.725-1.775T12 16t1.775.725t.725 1.775q0 1.025-.725 1.763T12 21m5.9-5.95l-.725-.725l-.725-.725l-3.6-3.6q2.025.2 3.787 1.025T19.75 13.2zm4-3.95q-1.925-1.925-4.462-3.012T12 7q-.525 0-1.012.038T10 7.15L7.45 4.6q1.1-.3 2.238-.45T12 4q3.55 0 6.625 1.325T24 8.95z"
    />
  </svg>
);

function MenuSuperior() {
  // Lógica para ícone de conexão de internet
  const [isOn, setIsOn] = useState(false);

  const toggleIcon = () => {
    setIsOn(!isOn);
  };

  // Lógica de Data
  const date = new Date();
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agusto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let year = date.getFullYear();
  let day = date.getDate();
  let month = months[date.getMonth()];

  return (
    <Wrapper>
      <Image src={lifLogo} />
      <Title>Rastreador POF LUX</Title>
      <DateDisplay>
        {year}, {day} de {month}
      </DateDisplay>
      <TrackerConnectionIcon onClick={toggleIcon}>
        {isOn ? (
          <div className="Online">
            <Online />
            <ConnectionText> ON </ConnectionText>
          </div>
        ) : (
          <div className="Offline">
            <Offline />
            <ConnectionText> OFF </ConnectionText>
          </div>
        )}
      </TrackerConnectionIcon>
    </Wrapper>
  );
}

export default MenuSuperior;
