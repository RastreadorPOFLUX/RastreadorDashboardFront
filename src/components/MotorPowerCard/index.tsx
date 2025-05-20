import getData from "./Data";

//Estilo
import { StyledWrapper, GradientLinearProgress, Text } from "./style";
import { Box, Typography } from "@mui/material";

function MotorPowerCard() {
  const progress: number = getData().value;

  return (
    <StyledWrapper
      width={"72%"}
      height={"20%"}
      $left={"21.5625rem"}
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
