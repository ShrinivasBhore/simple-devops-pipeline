export type View = 'dashboard' | 'guide' | 'logs' | 'database' | 'settings' | 'infrastructure' | 'containers' | 'pipeline' | 'analytics';
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

export interface Backup {
  id: string;
  timestamp: string;
  size: string;
  status: 'completed' | 'failed' | 'in-progress';
  type: 'automated' | 'manual';
  environment: Environment;
}

export interface Deployment {
  id: string;
  version: string;
  commitHash: string;
  timestamp: string;
  status: 'success' | 'failed' | 'in-progress';
  environment: Environment;
  duration: string;
}

export type ThemeMode = 'dark' | 'light';
export type AccentColor = 'blue' | 'purple' | 'emerald' | 'rose' | 'amber';

export interface ThemeConfig {
  mode: ThemeMode;
  accent: AccentColor;
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
}
