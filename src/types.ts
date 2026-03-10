export type View = 'dashboard' | 'guide' | 'logs' | 'database' | 'settings' | 'infrastructure' | 'containers' | 'pipeline';
export type PipelineStatus = 'idle' | 'running' | 'success' | 'failed';
export type Environment = 'development' | 'staging' | 'production';

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

export type LogLevel = 'info' | 'warn' | 'error' | 'success' | 'debug';

export interface LogEntry {
  id: string;
  timestamp: string;
  service: string;
  level: LogLevel;
  message: string;
  metadata?: Record<string, any>;
}

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
  health: 'healthy' | 'unhealthy' | 'starting';
  cpu: string;
  memory: string;
  uptime: string;
  ports: string[];
  environment: Environment;
}
