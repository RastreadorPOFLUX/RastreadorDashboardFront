// Estilo
import { StyledWrapper } from "./style";

// Dados
import getData from "./Data";

interface Angles {
  sunPosition: number;
  lensAngle: number;
  manualSetpoint: number;
}


const sunIcon = (x:number, y:number) => (
  <svg x={x - 12} y={y - 12} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 128 128">
  <path fill="#fcc11a" d="M37.41 41.95c-9.71 12.48-9.54 34.65 2.87 45.64c14.09 12.47 33.92 12.34 46.39.87c14.95-13.76 14.09-36.66.87-49.63c-13.29-13.04-37.04-13.72-50.13 3.12"/><path fill="#fee269" d="M53 37.67c-3.84-1.7-8.04 2.93-9.87 6.09c-1.83 3.17-3.53 9.38.37 10.97c3.9 1.58 6.7-1.1 9.51-5.73c2.79-4.63 4.38-9.38-.01-11.33"/><path fill="#ffa722" d="M63 20.27c-.93 1.74-.62 3.08 1.23 3.52s13.36 2.31 14.33 2.37c1.41.09 1.93-.97 1.76-2.2c-.18-1.23-2.99-18.46-3.25-20.04S75.14.76 73.55 2.87S63.7 18.96 63 20.27m29.8 11.96c-1.81.56-1.76 1.67-.79 3.08s7.65 11.6 8.26 12.31c.62.7 1.67.88 2.55-.18c.88-1.05 11.86-16.45 12.66-17.41c1.32-1.58.53-3.25-1.49-2.73c-1.54.41-20.05 4.58-21.19 4.93m13.8 29.63c-1.3-.74-2.99-.53-3.43 1.14s-2.37 13.8-2.55 14.86s.62 2.11 1.93 1.85s19.45-2.95 20.66-3.25c2.11-.53 2.81-2.64.62-4.22c-1.42-1.03-16-9.68-17.23-10.38M92.09 90.6c1.4-.75 2.64-.18 2.99 1.41c.35 1.58 4.22 17.76 4.84 20.75c.31 1.5-1.41 2.73-2.81 1.85c-1.41-.88-16.69-11.53-17.67-12.4c-1.41-1.23-.43-2.51.26-3.16c1.4-1.33 11.07-7.74 12.39-8.45m-42.55 8.88c-1.77-.17-2.29 1.41-2.02 2.81c.26 1.41 2.9 19.24 3.08 20.57c.26 1.93 2.29 2.73 3.6.79s10.35-16.4 11.08-17.76c1.32-2.46.35-2.99-.97-3.6c-1.31-.61-12.92-2.63-14.77-2.81M24.23 79c1.23-2.02 2.81-1.49 3.96.44c.78 1.32 7.38 10.2 8 11.16c.62.97.88 2.81-1.05 3.25c-1.95.45-17.68 4.58-20.14 5.02s-3.87-1.49-2.29-3.6c.92-1.24 10.82-15.12 11.52-16.27m-3.34-15.3c2.25 1 3.31.64 3.78-.97c.62-2.11 2.46-11.78 2.55-13.98c.06-1.43-.53-2.81-2.73-2.46S6.47 48.85 4.45 49.55c-2.35.82-2.18 3.4-.62 4.22c1.85.97 15.47 9.23 17.06 9.93m27.34-36.92c1.27-1.01.88-2.46-.26-3.25s-15.26-11-17.05-12.4c-1.58-1.23-3.52-.79-2.99 2.02c.38 2.02 4.88 19.7 5.19 20.92c.35 1.41 1.41 2.11 2.64 1.23c1.21-.87 11.15-7.46 12.47-8.52"/>
  </svg>
);

const lensIcon = (x:number, y:number) => (
  <svg x={x - 12} y={y - 12} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="#2abed7" d="m10.272 17.438l-4.37 2.504a10.1 10.1 0 0 1-2.728-3.207A10 10 0 0 1 2 12.697l4.856 2.781h.06zm5.581-1.238v5.038a10.1 10.1 0 0 1-8.312-.277l4.787-2.732h.09zm6.087-2.938a10 10 0 0 1-1.419 3.998a10.05 10.05 0 0 1-2.95 3.057v-9.54zm.06-1.94L17.144 8.57l-.209-.09l-3.207-1.87l4.37-2.503a10 10 0 0 1 2.727 3.19A10 10 0 0 1 22 11.322m-5.571-8.273l-4.786 2.77h-.08L8.147 7.8V2.762a10.13 10.13 0 0 1 8.282.257zm-10 .663v9.54l-4.37-2.494a10 10 0 0 1 1.423-3.993a10.1 10.1 0 0 1 2.947-3.053m9.424 6.096v4.423L12 16.448l-3.853-2.217V9.808L12 7.59z"/>
  </svg>
);

const setPointIcon = (x:number, y:number) => (
  <svg  x={x - 12} y={y - 12} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
	<path fill="#d52d2a" d="M102 480H64V57.37l4.69-4.68C72.14 49.23 92.78 32 160 32c37.21 0 78.83 14.71 115.55 27.68C305.12 70.13 333.05 80 352 80c42.83 0 72.72-14.25 73-14.4l23-11.14v259.43l-8.84 4.42C437.71 319 403.19 336 352 336c-24.14 0-54.38-7.14-86.39-14.71C229.63 312.79 192.43 304 160 304c-36.87 0-49.74 5.58-58 9.11Z" />
</svg>
);


const AngleDisplay: React.FC<Angles> = ({
  sunPosition,
  lensAngle,
  manualSetpoint,
}) => {
  const centerX = 200;
  const centerY = 200;

  const toXY = (angleDeg: number, radius: number) => {
    const angleRad = (Math.PI * angleDeg) / 180;
    const x = centerX + radius * Math.cos(Math.PI - angleRad);
    const y = centerY - radius * Math.sin(angleRad);
    return { x, y };
  };

  const layers = [
    { angle: sunPosition, color: "orange", label: "Posição do Sol", radius: 130, icon: function(x:number=0, y:number=0) { return sunIcon(x,y)} },
    { angle: lensAngle,  color: "deepskyblue" , label: "Ângulo da Lente", radius: 90, icon: function(x:number=0, y:number=0) { return lensIcon(x,y)} },
    { angle: manualSetpoint,color: "red", label: "SetPoint Manual", radius: 50, icon: function(x:number=0, y:number=0) { return setPointIcon(x,y)}  },
  ];

  
  const referenceRadius = 150;

  const angleLines = [0, 30, 60, 90, 120, 150, 180].map((deg) => {
    const lineEnd = toXY(deg, referenceRadius);
    const labelPos = toXY(deg, referenceRadius + 15); 
  
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
      {layers.map(({ angle, color, radius, icon}, idx) => {
        const { x, y } = toXY(angle, radius);
        return (
          <g key={idx}>   
             {icon(x,y)}
            <text x={x + 12} y={y + 4} fontSize={10} fill={color}>
              {angle + "\u00B0"}
            </text>
          </g>
        );
      })}

      {/* Legenda */}
      {layers.map(({icon, label }, i) => (
        <g key={`legend-${i}`} transform={`translate(${40 + i * 120}, 220)`}>
            {icon(0,5)}
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
