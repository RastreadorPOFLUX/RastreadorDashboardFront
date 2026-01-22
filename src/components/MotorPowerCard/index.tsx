// Hooks
import { useMotorData } from '../../hooks/useMotor';

//Estilo
import { StyledWrapper, GradientLinearProgress, Text } from "./style";
import { Box, Typography } from "@mui/material";


interface Motor {
  power: number; // Potência do motor em porcentagem (0 a 100)
  raw_value?: number; // Valor bruto do PWM (0 a 255)
}

function MotorPowerCard() {
  const { power, loading, error } = useMotorData();
  const progress: number = power ? power.power : 0;

  return (
    <StyledWrapper
      width={"45%"}
      height={"20%"}
      $left={"25%"}
      $top={"78%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Text> Potência do Motor </Text>
      <Box
        sx={{ display: "flex", alignItems: "center" }}
        height={"15%"}
        paddingLeft={"10%"}
        width={"90%"}
      >
        <Box sx={{ width: "100%", mr: 1 }}>
          <GradientLinearProgress variant="determinate" value={progress} />
        </Box>
        <Box sx={{ minWidth: "10%" }}>
          <Typography
            fontFamily={"var(--primaryFont)"}
            variant="body1"
            sx={{ color: "var(--primaryText)" }}
          >
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
    </StyledWrapper>
  );
}

export default MotorPowerCard;
