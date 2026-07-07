// hooks/useCheckConnection.ts
import { useLiveData } from "../contexts/LiveDataContext";

export default function useCheckConnection() {
  const { isConnected } = useLiveData();
  return { isConnected };
}
