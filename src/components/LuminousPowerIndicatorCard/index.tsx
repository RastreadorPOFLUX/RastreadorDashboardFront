import { useSpring, animated } from '@react-spring/web';
import React, { useEffect, useState } from 'react';

//Estilo
import { StyledWrapper, Text, CircularProgress} from "./style";

function LuminousPowerIndicatorCard() {
  const [value, setValue] = useState<number>(1000);

    // Function to change the gauge value
  const handleChangeValue = () => {
    setValue(value); // example change
  };

   useEffect(() => {
    handleChangeValue()
    }, [value]);

  return (
    <StyledWrapper
      width={"16.625rem"}
      height={"16.625rem"}
      left={"63.1875rem"}
      top={"16.875rem"}
    >
      <Text
        width={"9rem"}
        left={"5.975rem"}
        top={"10.975rem"}
        color={"var(--primaryText)"}
      >
        Valor Atual
      </Text>
        <CircularProgress 
          value={value}
          startAngle={0}
          endAngle={360}
          valueMin={0} 
          valueMax={1500}
          innerRadius="80%"
          outerRadius="100%"
          cornerRadius= "50%"
        />
    </StyledWrapper>
  );
}

export default LuminousPowerIndicatorCard;
