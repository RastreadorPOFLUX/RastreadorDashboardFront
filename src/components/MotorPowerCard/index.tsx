import { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js/auto';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


//Estilo
import { StyledWrapper } from "./style";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MotorPowerCard() {

  const [value, setValue] = useState<number>(70); // Initial value of 50
  const max = 100; // Maximum value for the gauge

  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Potência do Motor',
        data: [value], // The current value will be displayed
        backgroundColor: '#3f51b5',
        maxBarThickness: 40,
        borderRadius: 99,
      },
    ],
  };
  

  const options: ChartOptions<'bar'> = ({
    indexAxis: 'y',
    scales: {
      x: {
        grid: {
          display: false, // Hide gridlines for a cleaner look
        },
        max: max,
        beginAtZero: true,
      },
      y:{
        grid: {
          display: false, // Hide gridlines for a cleaner look
        },
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    }
  }
  );

  return (
    <StyledWrapper
      width={"65.3125rem"}
      height={"7.5rem"}
      left={"21.5625rem"}
      top={"34.75rem"}
    >
      <div style={{ width: "60.1875rem", height: "5.1875rem" }}>
        <Bar
          data={data}
          options={options}
        />
      </div>
      
    </StyledWrapper>
  );
}

export default MotorPowerCard;
