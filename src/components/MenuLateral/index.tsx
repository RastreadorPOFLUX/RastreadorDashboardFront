import React, {useState} from "react";

// Estilo
import {Wrapper, Pages, Divider, Space, Text, Contribuitions} from "./style";

function MenuLateral () {
    return (
        <Wrapper>
            <Pages> Informações Gerais </Pages>
            <Divider></Divider>
            <Pages> Elétrica </Pages>
            <Divider></Divider>
            <Pages> Controlador </Pages>
            <Space></Space>
            <Text> Período de Análise: </Text>
            <Text> Início </Text>
            <Text> Fim </Text>
            <Space></Space>
            <Contribuitions>
                @Guilherme N. Matera<br />
                @Mateus Lima<br />
                @Vinicius F. Neves
            </Contribuitions>
        </Wrapper>
    )
}

export default MenuLateral