import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { OperationMode, RTCAdjustRequest } from "../types/api";
import { operationModeApi } from "../services/operationModeApi";

interface OperationModeState {
  currentMode: OperationMode;
  failSafe: boolean;
  isLoading: boolean;
  isOnline: boolean;
  error: string | null;
  setMode: (mode: OperationMode, manual_setpoint: number, adjust: RTCAdjustRequest) => Promise<void>;
}

const OperationModeContext = createContext<OperationModeState | undefined>(undefined);

// Hook para consumir o contexto
export const useOperationMode = (): OperationModeState => {
  const context = useContext(OperationModeContext);
  if (!context) {
    throw new Error("useOperationMode must be used within an OperationModeProvider");
  }
  return context;
};

// Mantém o modo de operação atual e a conexão com o backend num único lugar,
// montado uma vez na raiz da aplicação (ver App.tsx). Isso evita que trocar
// de página dispare novas chamadas de API ou perca o modo exibido — o estado
// vive fora das páginas e sobrevive à navegação entre rotas.
interface OperationModeProviderProps {
  children: ReactNode;
}

export const OperationModeProvider: React.FC<OperationModeProviderProps> = ({ children }) => {
  const [currentMode, setCurrentMode] = useState<OperationMode>("auto");
  const [failSafe, setFailSafe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentMode = useCallback(async () => {
    try {
      const { mode, fail_safe } = await operationModeApi.getCurrentMode();
      setCurrentMode(mode);
      setFailSafe(fail_safe);
      setIsOnline(true);
      setError(null);
    } catch (err) {
      setIsOnline(false);
      setError("Erro ao conectar com o backend");
      console.error("Erro ao buscar modo atual:", err);
    }
  }, []);

  const setMode = useCallback(
    async (mode: OperationMode, manual_setpoint: number, adjust: RTCAdjustRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        await operationModeApi.setMode(mode, manual_setpoint, adjust);
        setIsOnline(true);
        // O ESP pode rejeitar a troca (ex: failSafe ativo), então resincroniza
        // com o modo real em vez de assumir que o pedido foi aceito.
        await fetchCurrentMode();
      } catch (err) {
        setError("Erro ao alterar modo de operação");
        console.error("Erro ao alterar modo:", err);
        await fetchCurrentMode();
      } finally {
        setIsLoading(false);
      }
    },
    [fetchCurrentMode]
  );

  // Verificação de conectividade e leitura do modo atual ao carregar o app.
  // Roda uma única vez (o provider vive na raiz), não a cada troca de página.
  useEffect(() => {
    const checkConnection = async () => {
      const online = await operationModeApi.checkHealth();
      setIsOnline(online);
      if (online) {
        await fetchCurrentMode();
      }
    };
    checkConnection();
  }, [fetchCurrentMode]);

  // Polling a cada 5 segundos para sincronizar com o backend
  useEffect(() => {
    const interval = setInterval(fetchCurrentMode, 5000);
    return () => clearInterval(interval);
  }, [fetchCurrentMode]);

  return (
    <OperationModeContext.Provider
      value={{ currentMode, failSafe, isLoading, isOnline, error, setMode }}
    >
      {children}
    </OperationModeContext.Provider>
  );
};
