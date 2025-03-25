import React, { useState } from "react";
import { AgGauge } from "ag-charts-react";
import { AgLinearGaugeOptions } from "ag-charts-enterprise";

//Estilo
import { StyledWrapper } from "./style";

function MotorPowerCard() {
  const [options, setOptions] = useState<AgLinearGaugeOptions>({
    type: "linear-gauge",
    value: 90,
    scale: {
      min: 0,
      max: 100,
      label: {
        formatter({ value }) {
          return `${value.toFixed(0)}%`;
        },
      },
    },
    thickness: 30,
    bar: {
      thickness: 30,
    },
    direction: "horizontal",
    segmentation: {
      enabled: true,
      interval: {
        count: 4,
      },
      spacing: 2,
    },
    cornerRadius: 99,
    cornerMode: "container",
    background: {
      visible: false,
    },
    title: {
      text: "Potência do Motor",
      fontSize: 20,
    },
    padding: {
      top: 10,
      left: 90,
    },
  });

  return (
    <StyledWrapper
      width={"65.3125rem"}
      height={"7.5rem"}
      left={"21.5625rem"}
      top={"34.75rem"}
    >
      <AgGauge
        options={options}
        style={{ width: "60.1875rem", height: "8.1875rem" }}
      />
    </StyledWrapper>
  );
}

export default MotorPowerCard;
