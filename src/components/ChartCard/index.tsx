import { useEffect, useRef, useState } from "react";
import type { RefObject, ReactNode } from "react";
import type { AgChartInstance, AgChartOptions } from "ag-charts-community";
import jsPDF from "jspdf";
import { StyledWrapper, Toolbar, IconButton } from "./style";

interface ChartCardProps {
  width: string;
  height?: string;
  left: string;
  top: string;
  title: string;
  chartRef: RefObject<AgChartInstance<AgChartOptions> | null>;
  children: ReactNode;
}

function ChartCard({ width, height, left, top, title, chartRef, children }: ChartCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen();
    }
  };

  const handleDownloadPdf = async () => {
    if (!chartRef.current || downloading) return;

    setDownloading(true);
    try {
      const dataUrl = await chartRef.current.getImageDataURL({ fileFormat: "image/png" });
      const image = new Image();
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("Falha ao carregar a imagem do gráfico"));
        image.src = dataUrl;
      });

      const pdf = new jsPDF({
        orientation: image.width >= image.height ? "landscape" : "portrait",
        unit: "px",
        format: [image.width, image.height],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, image.width, image.height);
      pdf.save(`${title}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar o PDF do gráfico. Por favor, tente novamente.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <StyledWrapper
      ref={containerRef}
      width={width}
      height={height}
      $left={left}
      $top={top}
      $backgroundcolor="var(--backgroundCards)"
    >
      <Toolbar>
        <IconButton
          type="button"
          title={isFullscreen ? "Sair da tela cheia" : "Ver em tela cheia"}
          onClick={toggleFullscreen}
        >
          {isFullscreen ? "⤡" : "⤢"}
        </IconButton>
        <IconButton
          type="button"
          title="Baixar gráfico em PDF"
          onClick={handleDownloadPdf}
          disabled={downloading}
        >
          {downloading ? "…" : "⭳"}
        </IconButton>
      </Toolbar>
      {children}
    </StyledWrapper>
  );
}

export default ChartCard;
