// Hooks
import { useMotorDataWS } from "../../hooks/useMotor";



//Estilo
import { StyledWrapper, GradientLinearProgress, Text } from "./style";
import { Box, Typography } from "@mui/material";


function MotorPowerCard() {
  const { power, loading, error } = useMotorDataWS();
  const progress: number = power ? power.power : 0;

  return (
    <StyledWrapper
      width={"72%"}
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
