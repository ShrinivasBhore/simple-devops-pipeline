export type View = 'dashboard' | 'guide' | 'logs' | 'database' | 'settings';
export type PipelineStatus = 'idle' | 'running' | 'success' | 'failed';

export interface Commit {
  message: string;
  hash: string;
  time: string;
}

export interface PredictionResult {
  successProbability: number;
  riskLevel: 'low' | 'medium' | 'high';
  factors: string[];
  recommendation: string;
}
