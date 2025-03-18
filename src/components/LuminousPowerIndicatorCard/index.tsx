import React, { useState } from "react";
import { AgGauge } from "ag-charts-react";
import "ag-charts-enterprise";
import { AgRadialGaugeOptions } from "ag-charts-enterprise";

//Estilo
import { StyledWrapper, Text } from "./style";

function LuminousPowerIndicatorCard() {
  const [options, setOptions] = useState<AgRadialGaugeOptions>({
    type: "radial-gauge",
    value: 1000,
    scale: {
      min: 0,
      max: 1300,
      fill: "#FFFFFF",
      label: {
        enabled: false,
      },
    },
    targets: [
      {
        value: 1050,
        placement: "outside",
        shape: "triangle",
        fill: "#000000",
      },
    ],
    bar: {
      fill: "#DD702C",
    },
    background: {
      visible: false,
    },
    cornerRadius: 99,
    cornerMode: "container",
    segmentation: {
      enabled: false,
      interval: {
        count: 4,
      },
      spacing: 2,
    },
    startAngle: 0,
    endAngle: 0,
    label: {},
    secondaryLabel: {
      text: "Kwh",
      color: "#000000",
    },
    padding: {
      top: 10,
      right: 30,
    },
  });

  return (
    <StyledWrapper
      width={"16.625rem"}
      height={"16.625rem"}
      left={"63.1875rem"}
      top={"16.875rem"}
    >
      <Text
        width={"9rem"}
        left={"6.275rem"}
        top={"10.975rem"}
        color={"var(--primaryText)"}
      >
        {" "}
        Valor Atual{" "}
      </Text>
      <AgGauge
        options={options}
        style={{ width: "17.1875rem", height: "17.1875rem" }}
      />
    </StyledWrapper>
  );
}

export default LuminousPowerIndicatorCard;
