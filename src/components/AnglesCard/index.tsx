//Estilo
import { StyledWrapper} from "./style";

interface Angles{
  sunPosition: number;
  lensAngle: number;
  manualSetpoint: number;
}

const AngleDisplay : React.FC<Angles> =  ({ sunPosition, lensAngle, manualSetpoint }) => {
  const radius = 150;
  const centerX = 200;
  const centerY = 200;

  const toXY = (angleDeg: number) => {
    const angleRad = (Math.PI * angleDeg) / 180;
    const x = centerX + radius * Math.cos(Math.PI - angleRad);
    const y = centerY - radius * Math.sin(angleRad);
    return { x, y };
  };

  const markers = [
    { angle: sunPosition, color: "orange", label: "Sun Position" },
    { angle: lensAngle, color: "red", label: "Lens Angle" },
    { angle: manualSetpoint, color: "deepskyblue", label: "Manual Setpoint" },
  ];

  const angleLines = [0, 30, 60, 90, 120, 150, 180].map((deg) => {
    const { x, y } = toXY(deg);
    return <line key={deg} x1={centerX} y1={centerY} x2={x} y2={y} stroke="#ccc" />;
  });

  return (
    <svg width={435} height={220}>
      {/* Semicircle */}
      <path
        d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
        fill="none"
        stroke="black"
      />

      {/* Angle lines */}
      {angleLines}

      {/* Markers */}
      {markers.map(({ angle, color, label }, idx) => {
        const { x, y } = toXY(angle);
        return (
          <g key={idx}>
            <rect x={x - 5} y={y - 5} width={10} height={10} fill={color} />
            <text x={x + 8} y={y} fontSize={10} fill={color}>
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};


function AnglesCard() {
  return (
    <StyledWrapper
      width={"32.625rem"}
      height={"15.775rem"}
      $left={"21.5625rem"}
      $top={"8.4375rem"}
      $backgroundcolor="var(--backgroundCards)"
    >
      
      <AngleDisplay sunPosition={90} lensAngle={0} manualSetpoint={180} />
    </StyledWrapper>
  );
}

export default AnglesCard;
