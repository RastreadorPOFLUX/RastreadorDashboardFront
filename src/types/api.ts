// Tipos para os modos de operação
export type OperationMode = 'auto' | 'manual' | 'halt' | 'presentation';

export type RTCAdjustRequest = {
  rtc: number; // Unix timestamp em segundos
}

// Interface para requisição de mudança de modo
export interface ModeRequest {
  mode: OperationMode;
  manual_setpoint: number;
  adjust: RTCAdjustRequest;
}

// Interface para resposta do status do sistema
export interface SystemStatusResponse {
  mode: OperationMode;
  esp_clock: number;
  rtc_day: number;
  rtc_month: number;
  rtc_year: number;
  rtc_hour: number;
  rtc_minute: number;
  rtc_second: number;
  is_online: boolean;
}

// Interface para resposta padrão da API
export interface ApiResponse<T> {
  data: T;
  status: number;
}