import { useEffect, useState } from "react";
import { AgCharts, AgGauge } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-enterprise";
import getData from "./Data";

//Estilo
import { StyledWrapper } from "./style";


function MotorPowerCard() {

  const [value, setValue] = useState<number>(getData().value); 
  const max = 100; 

  const generateSegments = (value: number, max: number, segments: number) => {
    const stepValue = max / segments;
    const colors = ['#ff4d4d', '#ff7a00', '#ffca00', '#00e676', '#00c853']; // Color gradient
    const data = [];

 
    for (let i = 0; i < segments; i++) {
      const segmentValue = Math.min(stepValue, value - i * stepValue);

      // If value still remains to be filled, add to the gauge
      if (segmentValue > 0) {
        data.push({ category: 'Gauge', segment: segmentValue, fill: colors[i] });
      }
      else {
        // If value is less than the current segment size, fill the rest as zero
        data.push({
          category: 'Gauge',
          segment: 0,
          fill: colors[i],
        });
    }
  };
  return data;
}


const data = generateSegments(value, max, 5);


const options: AgChartOptions = {
  data: data,
  background: {
    visible: false,
  },
    series: data.map((segment, i) => ({
      type: 'bar',
      xKey: "category",
      yKey: "segment",
      direction: "horizontal",
      cornerRadius: 99,
      fill: segment.fill, // Use the generated gradient color
      stacked: true, // Stack the segments
    })),
  title: {
    text: "Potência do Motor",
    fontSize: 20,
  },
  padding: {
    top: 10,
    left: 90,
  },
  axes: [
    {
      type: "number",
      position: "bottom",
      label: {
        formatter: ({ value }) => value+"%",
      },
      min: 0,
      max: 100,
    },
    {
      type: "category",
      position: "left",
      label: {
        formatter: ({ value }) => "",
      },
    }
  ],
  legend: {
    enabled: false
  },
};

  return (
    <StyledWrapper
      width={"65.3125rem"}
      height={"7.5rem"}
      left={"21.5625rem"}
      top={"34.75rem"}
    >
      <AgCharts
        options={options}
        style={{ width: "60.1875rem", height: "8.1875rem" }}
      />
    </StyledWrapper>
  );
}

export default MotorPowerCard;


