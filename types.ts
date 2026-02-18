
export interface SalesLog {
  content: string;
  timestamp: Date;
}

export interface AuditResponse {
  timeline: string;
  feedback: string;
  strategy: string;
  automation: string;
  rawText: string;
}

export enum AuditStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
