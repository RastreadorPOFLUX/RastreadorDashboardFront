import React, { useState } from "react";

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

const Calendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="var(--primaryText)"
      d="M7 2h1a1 1 0 0 1 1 1v1h5V3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3V3a1 1 0 0 1 1-1m8 2h1V3h-1zM8 4V3H7v1zM6 5a2 2 0 0 0-2 2v1h15V7a2 2 0 0 0-2-2zM4 18a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V9H4zm8-5h5v5h-5zm1 1v3h3v-3z"
    />
  </svg>
);

function MenuLateral() {
  return (
    <Wrapper>
      <Pages> Informações Gerais </Pages>
      <Divider></Divider>
      <Pages> Elétrica </Pages>
      <Divider></Divider>
      <Pages> Controlador </Pages>
      <Space></Space>
      <Text> Período de Análise: </Text>
      <Text>
        Início
        <DateInput></DateInput>
        Fim
        <DateInput></DateInput>
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
