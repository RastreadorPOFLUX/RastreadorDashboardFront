import React, {useState} from "react";

// Estilo
import {Wrapper, Pages, Divider} from "./style";

function MenuLateral () {
    return (
        <Wrapper>
            <Pages> Informações Gerais </Pages>
            <Divider></Divider>
            <Pages> Elétrica </Pages>
            <Divider></Divider>
            <Pages> Controlador </Pages>
        </Wrapper>
    )
}

export default MenuLateral