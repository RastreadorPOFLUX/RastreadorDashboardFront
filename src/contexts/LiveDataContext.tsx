import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { AnglesResponse, ControlResponse, SensorsResponse } from "../types/api";

// Definindo os tipos para o contexto
interface LiveDataState {
  isConnected: boolean;
  // Indica se o transporte WebSocket está ativo. Quando false, os hooks de
  // leitura (useAngles, usePid, useSensors) devem recorrer ao fallback HTTP.
  wsConnected: boolean;
  angles: AnglesResponse | null;
  pid: ControlResponse | null;
  sensors: SensorsResponse | null;
}

// Criando o contexto com os tipos definidos
const LiveDataContext = createContext<LiveDataState | undefined>(undefined);

// Hook para consumir o contexto
export const useLiveData = (): LiveDataState => {
  const context = useContext(LiveDataContext);
  if (!context) {
    throw new Error("useLiveData must be used within a LiveDataProvider");
  }
  return context;
};

const WS_URL = "ws://localhost:8000/ws/live";
const RECONNECT_DELAY_MS = 3000;
const CONNECT_TIMEOUT_MS = 3000;

// Componente que mantém uma única conexão WebSocket com o backend para os
// dados em tempo real (conexão do rastreador, ângulos, PID e sensores).
// Deve ser montado uma única vez na raiz da aplicação para que a conexão
// persista entre as trocas de página (rotas).
interface LiveDataProviderProps {
  children: ReactNode;
}

export const LiveDataProvider: React.FC<LiveDataProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [angles, setAngles] = useState<AnglesResponse | null>(null);
  const [pid, setPid] = useState<ControlResponse | null>(null);
  const [sensors, setSensors] = useState<SensorsResponse | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const connectTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isUnmountedRef = useRef(false);

  useEffect(() => {
    isUnmountedRef.current = false;

    const connect = () => {
      const socket = new WebSocket(WS_URL);
      socketRef.current = socket;

      // Se o WebSocket não abrir a tempo, assume-se indisponível e libera o fallback HTTP
      connectTimeoutRef.current = setTimeout(() => {
        if (socket.readyState !== WebSocket.OPEN) {
          socket.close();
        }
      }, CONNECT_TIMEOUT_MS);

      socket.onopen = () => {
        if (connectTimeoutRef.current) clearTimeout(connectTimeoutRef.current);
        setWsConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setIsConnected(data.is_online === true);
          if (data.angles) setAngles(data.angles);
          if (data.pid) setPid(data.pid);
          if (data.sensors) setSensors(data.sensors);
        } catch (error) {
          console.error("Erro ao processar mensagem do WebSocket:", error);
        }
      };

      socket.onclose = () => {
        if (connectTimeoutRef.current) clearTimeout(connectTimeoutRef.current);
        setIsConnected(false);
        setWsConnected(false);
        // Tenta reconectar automaticamente enquanto o provider estiver montado
        if (!isUnmountedRef.current) {
          reconnectTimeoutRef.current = setTimeout(connect, RECONNECT_DELAY_MS);
        }
      };

      socket.onerror = () => {
        socket.close();
      };
    };

    connect();

    return () => {
      isUnmountedRef.current = true;
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (connectTimeoutRef.current) clearTimeout(connectTimeoutRef.current);
      socketRef.current?.close();
    };
  }, []);

  return (
    <LiveDataContext.Provider value={{ isConnected, wsConnected, angles, pid, sensors }}>
      {children}
    </LiveDataContext.Provider>
  );
};
