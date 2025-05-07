// Estilo
import { StyledWrapper} from "./style";

// Dados
import getData from "./Data";

interface Angles{
  sunPosition: number;
  lensAngle: number;
  manualSetpoint: number;
}

const AngleDisplay: React.FC<Angles> = ({
  sunPosition,
  lensAngle,
  manualSetpoint,
}) => {
  const centerX = 200;
  const centerY = 200;

  const layers = [
    { angle: sunPosition, color: "orange", label: "Posição do Sol", radius: 110 },
    { angle: lensAngle, color: "red", label: "Ângulo da Lente", radius: 70 },
    { angle: manualSetpoint, color: "deepskyblue", label: "SetPoint Manual", radius: 30 },
  ];

  const toXY = (angleDeg: number, radius: number) => {
    const angleRad = (Math.PI * angleDeg) / 180;
    const x = centerX + radius * Math.cos(Math.PI - angleRad);
    const y = centerY - radius * Math.sin(angleRad);
    return { x, y };
  };

  const referenceRadius = 150;

  const angleLines = [0, 30, 60, 90, 120, 150, 180].map((deg) => {
    const lineEnd = toXY(deg, referenceRadius);
    const labelPos = toXY(deg, referenceRadius + 15); // coloca o texto mais distante
  
    return (
      <g key={deg}>
        <line
          x1={centerX}
          y1={centerY}
          x2={lineEnd.x}
          y2={lineEnd.y}
          stroke="#ccc"
        />
        <text
          x={labelPos.x}
          y={labelPos.y}
          fontSize={12}
          fill="#555"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {deg}°
        </text>
      </g>
    );
  });

  return (
    <svg width={435} height={260}>
      {/* Semicírculo principal */}
      <path
        d={`M ${centerX - referenceRadius} ${centerY} A ${referenceRadius} ${referenceRadius} 0 0 1 ${centerX + referenceRadius} ${centerY}`}
        fill="none"
        stroke="black"
      />

      {/* Linhas de ângulo */}
      {angleLines}

      {/* Marcadores */}
      {layers.map(({ angle, color, radius }, idx) => {
        const { x, y } = toXY(angle, radius);
        return (
          <g key={idx}>
            <rect x={x - 5} y={y - 5} width={10} height={10} fill={color} />
            <text x={x + 10} y={y + 4} fontSize={10} fill={color}>
            </text>
          </g>
        );
      })}

      {/* Legenda */}
      {layers.map(({ color, label }, i) => (
        <g key={`legend-${i}`} transform={`translate(${40 + i * 120}, 220)`}>
          <rect width={10} height={10} fill={color} />
          <text x={15} y={10} fontSize={12} fill="#000">
            {label}
          </text>
        </g>
      ))}
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
      <AngleDisplay sunPosition={getData().sunPosition} lensAngle={getData().lensAngle} manualSetpoint={getData().manualSetpoint} />
    </StyledWrapper>
  );
}

export default AnglesCard;
