// Tipos para os modos de operação
export type OperationMode = 'auto' | 'manual' | 'halt' | 'presentation';

export type RTCAdjustRequest = {
  rtc: number; // Unix timestamp em segundos
}

export type PidAdjustRequest = {
  kp: number;
  ki: number;
  kd: number;
}

// Interface para requisição de mudança de modo
export interface ModeRequest {
  mode: OperationMode;
  manual_setpoint: number;
  adjust: RTCAdjustRequest;
}

export interface AnglesRequest{
  sun_position?: number; // Posição do sol em graus
  lens_angle: number; // Ângulo atual da lente em graus
  manual_setpoint?: number; // Setpoint manual em graus
}

export interface ControlRequest{
  kp: number; // Ganho proporcional
  ki: number; // Ganho integral
  kd: number; // Ganho derivativo
  p?: number; // Saída proporcional
  i?: number; // Saída integral
  d?: number; // Saída derivativa
  error?: number; // Erro atual do sistema
  output?: number; // Saída total do PID
}

export interface PidRequest{
  adjust: PidAdjustRequest
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