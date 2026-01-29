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

export interface AnglesResponse {
  sun_position?: number; // Posição do sol em graus
  lens_angle: number; // Ângulo atual da lente em graus
  manual_setpoint?: number; // Setpoint manual em graus
}

export interface SensorsResponse {
  pyranometer_power: number;
  photodetector_power: number;
}

export interface ControlResponse {
  kp: number; // Ganho proporcional
  ki: number; // Ganho integral
  kd: number; // Ganho derivativo
  p: number; // Saída proporcional
  i: number; // Saída integral
  d: number; // Saída derivativa
  error: number; // Erro atual do sistema
  output: number; // Saída total do PID
}

export interface PidResponse {
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

export interface MotorResponse {
  power: number; // Potência do motor em porcentagem (0 a 100)
  raw_value: number; // Valor bruto do PWM (0 a 255)
}

// Interface para resposta padrão da API
export interface ApiResponse<T> {
  data: T;
  status: number;
}