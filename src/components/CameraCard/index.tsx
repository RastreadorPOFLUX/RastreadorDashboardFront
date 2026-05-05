//Estilo
import { Stream, StyledWrapper, StatusBadge, OfflineOverlay } from "./style";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface LandscapeCameraProps {
  streamUrl: string;
}

interface CameraStatus {
  streaming: boolean;
  manifest_ready: boolean;
  stream_url: string | null;
}

function CameraCard({ streamUrl }: LandscapeCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<CameraStatus | null>(null);

  // Polling do status da câmera a cada 5 segundos
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/camera/status");
        if (res.ok) {
          const data: CameraStatus = await res.json();
          setStatus(data);
        }
      } catch {
        setStatus(null);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // Inicializar HLS quando o manifest estiver pronto
  useEffect(() => {
    if (!status?.manifest_ready || !videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls({ lowLatencyMode: true });
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = streamUrl;
    }
  }, [streamUrl, status?.manifest_ready]);

  const isLive = status?.streaming && status?.manifest_ready;

  return (
    <StyledWrapper
      width={"70%"}
      height={"77%"}
      $left={"25%"}
      $top={"21%"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <StatusBadge $live={isLive ?? false}>
        {isLive ? "● AO VIVO" : "● OFFLINE"}
      </StatusBadge>

      {!isLive && (
        <OfflineOverlay>
          {status === null
            ? "Conectando ao servidor..."
            : "Câmera offline. Verifique o DVR e o FFmpeg."}
        </OfflineOverlay>
      )}

      <Stream
        width={"100%"}
        height={"100%"}
        ref={videoRef}
        controls
        autoPlay
        muted
        playsInline
        className="w-full rounded-xl shadow-lg"
      />
    </StyledWrapper>
  );
}

export default CameraCard;
