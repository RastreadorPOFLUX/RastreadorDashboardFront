//Estilo
import { Stream, StyledWrapper } from "./style";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface LandscapeCameraProps {
  streamUrl: string;
}

function CameraCard({ streamUrl = "" }: LandscapeCameraProps) {
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
      width={"65.3125rem"}
      height={"34.025rem"}
      $left={"21.5625rem"}
      $top={"8.4375rem"}
      $backgroundcolor="var(--backgroundCards)"
    >
      <div className="w-full max-w-4xl mx-auto p-4">
        <Stream
          width={"60.4125rem"}
          height={"30.025rem"}
          $left={"21.5625rem"}
          $top={"2rem"}
          ref={videoRef}
          controls
          autoPlay
          muted
          playsInline
          className="w-full rounded-xl shadow-lg"
        />
      </div>
    </StyledWrapper>
  );
}

export default CameraCard;
