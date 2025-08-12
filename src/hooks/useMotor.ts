import { useEffect, useState, useRef } from "react";
import { motorApi } from "../services/motorApi"; // função HTTP já existente

interface MotorData {
  power: number;
  raw_value: number;
}

export function useMotorDataWS() {
  const [motor, setMotor] = useState<MotorData>({ power: 0, raw_value: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fallbackInterval = useRef<NodeJS.Timeout | null>(null);

  // Função de fallback HTTP
  const fetchFallbackData = async () => {
    try {
      const data = await motorApi.getCurrentMotorPower();
      if (data) {
        setMotor({
          power: data.power ?? 0,
          raw_value: data.raw_value ?? 0,
        });
      }
    } catch (err) {
      console.error("Erro ao buscar dados do motor (HTTP fallback):", err);
    }
  };

  useEffect(() => {
    let ws: WebSocket | null = null;

    const startWebSocket = () => {
      ws = new WebSocket("ws://localhost:8000/ws/live");

      ws.onopen = () => {
        console.info("WebSocket conectado para dados do motor.");
        setLoading(false);

        // Se estava usando fallback, para
        if (fallbackInterval.current) {
          clearInterval(fallbackInterval.current);
          fallbackInterval.current = null;
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.motor) {
            setMotor({
              power: data.motor.power ?? 0,
              raw_value: data.motor.raw_value ?? 0,
            });
          }
        } catch (err) {
          console.error("Erro ao processar dados do WebSocket:", err);
          setError("Erro ao processar dados do servidor.");
        }
      };

      ws.onerror = () => {
        console.warn("Erro na conexão WebSocket. Ativando fallback HTTP.");
        setError("Erro na conexão WebSocket.");
        if (!fallbackInterval.current) {
          fetchFallbackData();
          fallbackInterval.current = setInterval(fetchFallbackData, 2000);
        }
      };

      ws.onclose = () => {
        console.warn("Conexão WebSocket fechada. Ativando fallback HTTP.");
        if (!fallbackInterval.current) {
          fetchFallbackData();
          fallbackInterval.current = setInterval(fetchFallbackData, 2000);
        }
      };
    };

    startWebSocket();

    return () => {
      if (ws) ws.close();
      if (fallbackInterval.current) {
        clearInterval(fallbackInterval.current);
      }
    };
  }, []);

  return { power: motor, loading, error };
}