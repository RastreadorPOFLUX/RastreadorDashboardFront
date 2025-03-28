import { useState, useEffect } from "react";
import getData from "./Data";

//Estilo
import { StyledWrapper, BorderLinearProgress } from "./style";
import { Box, LinearProgress, Typography } from "@mui/material";



function MotorPowerCard() {

  const progress: number = getData().value;

  return (
    <StyledWrapper
      width={"65.3125rem"}
      height={"7.5rem"}
      left={"21.5625rem"}
      top={"34.75rem"}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}  height={180} paddingLeft={10} width={885}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 35 }} >
        <Typography
        fontFamily={'sans-serif'}
          variant="body1"
          sx={{ color: 'var(--primaryText)' }}
        >{`${Math.round(progress)}%`}
        </Typography>
      </Box>
    </Box>

    </StyledWrapper>
  );
}

export default MotorPowerCard;


