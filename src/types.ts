export type View = 'dashboard' | 'guide' | 'logs' | 'database' | 'settings' | 'infrastructure';
export type PipelineStatus = 'idle' | 'running' | 'success' | 'failed';

export interface Commit {
  id: string;
  message: string;
  author: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
}

export interface Prediction {
  risk: 'Low' | 'Medium' | 'High';
  confidence: number;
  impact: string;
  recommendation: string;
}
