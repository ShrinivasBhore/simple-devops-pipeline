export type View = 'dashboard' | 'guide' | 'logs' | 'database' | 'settings' | 'infrastructure' | 'containers';
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

export type Role = 'admin' | 'developer' | 'viewer';

export interface User {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Container {
  id: string;
  name: string;
  image: string;
  status: 'running' | 'stopped' | 'restarting' | 'error';
  cpu: string;
  memory: string;
  uptime: string;
  ports: string[];
}
