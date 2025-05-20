//Estilo
import { Stream, StyledWrapper } from "./style";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface LandscapeCameraProps {
  streamUrl: string;
}

function CameraCard({ streamUrl }: LandscapeCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(streamUrl);
        hls.attachMedia(videoRef.current);

        return () => {
          hls.destroy();
        };
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = streamUrl;
      }
    }
  }, [streamUrl]);

  return (
    <StyledWrapper
      width={"70%"}
      height={"77%"}
      $left={"21.5625rem"}
      $top={"8.4375rem"}
      $backgroundcolor="var(--backgroundCards)"
    >
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
