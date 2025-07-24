// hooks/useCheckConnection.ts
import { useEffect, useState } from "react";
import { checkConnectionApi } from "../services/checkConnectionApi";

export default function useCheckConnection() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await checkConnectionApi();
        setIsConnected(data.is_online === true); // pega o campo 'is_online' da resposta
      } catch (error: any) {
          if (error.response?.status === 503) {
            console.warn("ESP ainda não registrado no backend.");
        } else {
            console.error("Erro ao verificar conexão com ESP:", error);
  }
        setIsConnected(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // verifica a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  return { isConnected };
}