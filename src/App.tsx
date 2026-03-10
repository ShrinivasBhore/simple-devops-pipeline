import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Zap, 
  Container, 
  Database, 
  Workflow, 
  Terminal, 
  Plus, 
  RefreshCw, 
  Github,
  Server,
  BarChart3,
  FolderTree,
  Settings,
  Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './components/Card';
import { Badge } from './components/Badge';
import { MonitoringWidget } from './components/MonitoringWidget';
import { LogTerminal } from './components/LogTerminal';
import { AIGuardrail } from './components/AIGuardrail';
import { LatestCommit } from './components/LatestCommit';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CodeBlock } from './components/CodeBlock';
import { PerformanceChart } from './components/PerformanceChart';
import { InfrastructureView } from './components/InfrastructureView';
import { ContainersView } from './components/ContainersView';
import { PipelineView } from './components/PipelineView';
import { LogsView } from './components/LogsView';
import { DatabaseView } from './components/DatabaseView';
import { DeploymentHistory } from './components/DeploymentHistory';
import { AnalyticsView } from './components/AnalyticsView';
import { useNotifications } from './NotificationContext';
import { View, Commit, Prediction, User, Role, LogEntry, LogLevel, Environment, Deployment } from './types';

export default function App() {
  const { addNotification } = useNotifications();
  const [view, setView] = useState<View>('dashboard');
  const [user, setUser] = useState<User>({
    name: 'Shrinivas Bhore',
    email: 'shrinivasbhore6@gmail.com',
    role: 'admin'
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [deploymentCount, setDeploymentCount] = useState(1420);
  const [containerStatus, setContainerStatus] = useState<'running' | 'stopped'>('running');
  const [dbStatus, setDbStatus] = useState<'connected' | 'error'>('connected');
  const [pipelineStatus, setPipelineStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [version, setVersion] = useState('4.0.1');
  const [environment, setEnvironment] = useState<Environment>('production');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [cpuUsage, setCpuUsage] = useState(42);
  const [memUsage, setMemUsage] = useState(68);
  const [netUsage, setNetUsage] = useState(12);
  const [diskUsage, setDiskUsage] = useState(34);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [latestCommit, setLatestCommit] = useState<Commit>({
    id: '7f2a1b',
    message: 'feat: optimize database indexing for faster queries',
    author: 'shrinivasbhore6',
    timestamp: '2 mins ago',
    status: 'success'
  });

  useEffect(() => {
    // Initial system alerts
    const timer = setTimeout(() => {
      addNotification('System Warning', 'CPU usage on Node-04 exceeded 85% threshold.', 'warning');
      addNotification('Container Failure', 'Service "auth-api-v2" exited unexpectedly on cluster-alpha.', 'error');
    }, 3000);
    return () => clearTimeout(timer);
  }, [addNotification]);

  const [deployments] = useState<Deployment[]>([
    {
      id: 'dep-401',
      version: '4.0.1',
      commitHash: '7f2a1b',
      timestamp: '2026-03-10 10:45',
      status: 'success',
      environment: 'production',
      duration: '4m 12s'
    },
    {
      id: 'dep-400',
      version: '4.0.0',
      commitHash: 'a1b2c3',
      timestamp: '2026-03-09 18:20',
      status: 'success',
      environment: 'production',
      duration: '5m 05s'
    },
    {
      id: 'dep-399',
      version: '3.9.9',
      commitHash: 'd4e5f6',
      timestamp: '2026-03-09 14:10',
      status: 'failed',
      environment: 'production',
      duration: '2m 30s'
    },
    {
      id: 'dep-stg-1',
      version: '4.0.2-rc1',
      commitHash: 'e7f8g9',
      timestamp: '2026-03-10 11:30',
      status: 'in-progress',
      environment: 'staging',
      duration: 'Running'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 10 - 5))));
      setMemUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2))));
      setNetUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 20 - 10))));
      setDiskUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 2 - 1))));
      
      setPerformanceData(prev => {
        const newData = [...prev, { time: new Date().toLocaleTimeString(), cpu: cpuUsage, memory: memUsage }];
        return newData.slice(-20);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [cpuUsage, memUsage]);

  useEffect(() => {
    addLog('System initialized. Monitoring all services.', 'system', 'success');
    addLog('Connected to MongoDB cluster at mongodb://database:27017', 'database', 'info');
    addLog('Infrastructure nodes synchronized.', 'infrastructure', 'info');
    addLog('Security guard active. Monitoring for anomalies.', 'security', 'info');
    addLog('API Rate Limiting enabled. Global threshold: 100 req/15m.', 'security', 'success');
  }, []);

  const addLog = (message: string, service: string = 'system', level: LogLevel = 'info', metadata?: any) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      service,
      level,
      message,
      metadata
    };
    setLogs(prev => [...prev, newLog].slice(-100));
  };

  const triggerPipeline = () => {
    if (pipelineStatus === 'running') return;
    
    if (user.role === 'viewer') {
      addLog('Permission Denied: Viewers cannot trigger deployments.', 'security', 'error');
      return;
    }
    
    setPipelineStatus('running');
    addLog('Initializing Neural CI/CD Pipeline v4.0...', 'pipeline', 'info');
    addLog('Validating configuration manifest...', 'pipeline', 'info');
    
    setTimeout(() => {
      addLog('Step 1/8: Static Analysis & Linting...', 'pipeline', 'info');
      setTimeout(() => {
        addLog('Linting complete. 0 errors, 4 warnings (ignored).', 'pipeline', 'success');
        addLog('Step 2/8: Security Vulnerability Scan (SAST)...', 'security', 'info');
        setTimeout(() => {
          addLog('Security scan complete. No high-severity vulnerabilities found.', 'security', 'success');
          addLog('Step 3/8: Unit & Integration Testing...', 'pipeline', 'info');
          setTimeout(() => {
            addLog('All 142 tests passed (coverage: 94.2%).', 'pipeline', 'success');
            addLog('Step 4/8: Building Optimized Production Artifacts...', 'pipeline', 'info');
            setTimeout(() => {
              addLog('Build successful. Artifact size: 142MB.', 'pipeline', 'success');
              addLog('Step 5/8: Containerizing & Tagging Images...', 'orchestrator', 'info');
              setTimeout(() => {
                addLog('Images pushed to Nexus Registry: v' + version + '-stable', 'orchestrator', 'success');
                addLog('Step 6/8: Initializing Canary Deployment (5% traffic)...', 'network', 'info');
                setTimeout(() => {
                  addLog('Canary health checks: [OK]', 'network', 'success');
                  addLog('Step 7/8: Full Rollout & Traffic Migration...', 'orchestrator', 'info');
                  addLog('Scaling up new clusters...', 'orchestrator', 'info');
                  addLog('Draining legacy connections...', 'orchestrator', 'warn');
                  
                  setTimeout(() => {
                    addLog('Step 8/8: Post-Deployment Health Verification...', 'system', 'info');
                    addLog('Latency: 42ms | Error Rate: 0.01%', 'system', 'success');
                    
                    setPipelineStatus('success');
                    setDeploymentCount(prev => prev + 1);
                    addLog('Neural Deployment Successful. Cluster synchronized.', 'pipeline', 'success');
                    
                    const vParts = version.split('.');
                    const newV = `${vParts[0]}.${vParts[1]}.${parseInt(vParts[2]) + 1}`;
                    setVersion(newV);
                    
                    setTimeout(() => setPipelineStatus('idle'), 3000);
                  }, 1500);
                }, 1500);
              }, 1000);
            }, 1200);
          }, 1500);
        }, 1200);
      }, 1000);
    }, 800);
  };

  const simulateChange = () => {
    if (user.role === 'viewer') {
      addLog('Permission Denied: Viewers cannot simulate changes.', 'security', 'error');
      return;
    }
    setIsAnalyzing(true);
    addLog('Detecting code changes...', 'ai', 'info');
    
    setTimeout(() => {
      setLatestCommit({
        id: Math.random().toString(36).substring(7),
        message: 'fix: resolve memory leak in worker threads',
        author: 'shrinivasbhore6',
        timestamp: 'Just now',
        status: 'pending'
      });
      
      setPrediction({
        risk: 'Low',
        confidence: 94,
        impact: 'System performance expected to improve by 15% post-deployment.',
        recommendation: 'Safe to proceed with automated rollout.'
      });
      
      setIsAnalyzing(false);
      addLog('AI Analysis complete. No critical risks detected.', 'ai', 'success');
    }, 2000);
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-violet-500/10 text-violet-400 rounded-lg">
                    <Zap size={20} />
                  </div>
                  <Badge variant="success">+12%</Badge>
                </div>
                <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Total Deployments</h3>
                <p className="text-3xl font-bold text-white">{deploymentCount}</p>
              </Card>
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <Container size={20} />
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Docker Status</h3>
                <p className="text-3xl font-bold text-white">{containerStatus === 'running' ? 'Running' : 'Stopped'}</p>
              </Card>
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                    <Database size={20} />
                  </div>
                  <Badge variant={dbStatus === 'connected' ? 'success' : 'danger'}>
                    {dbStatus === 'connected' ? 'Stable' : 'Error'}
                  </Badge>
                </div>
                <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">Database</h3>
                <p className="text-3xl font-bold text-white">{dbStatus === 'connected' ? 'Connected' : 'Offline'}</p>
              </Card>
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                    <Workflow size={20} />
                  </div>
                  <Badge variant={pipelineStatus === 'running' ? 'warning' : pipelineStatus === 'success' ? 'success' : 'default'}>
                    {pipelineStatus === 'running' ? 'In Progress' : pipelineStatus === 'success' ? 'Success' : 'Idle'}
                  </Badge>
                </div>
                <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-1">CI/CD Pipeline</h3>
                <p className="text-3xl font-bold text-white">v{version}</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                      <Activity size={20} className="text-violet-400" />
                      System Monitoring
                    </h3>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-[10px] font-bold bg-slate-800 text-white rounded-lg">Real-time</button>
                      <button className="px-3 py-1 text-[10px] font-bold text-slate-500">History</button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <MonitoringWidget label="CPU Usage" value={cpuUsage} icon="cpu" color="text-violet-500" />
                      <MonitoringWidget label="Memory Usage" value={memUsage} icon="memory" color="text-emerald-500" />
                      <MonitoringWidget label="Cluster Health" value={98.4} icon="health" color="text-rose-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <MonitoringWidget label="Network Load" value={netUsage} icon="network" color="text-sky-500" />
                      <MonitoringWidget label="Disk I/O" value={diskUsage} icon="disk" color="text-amber-500" />
                    </div>
                    <div className="pt-4 border-t border-slate-800/50">
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-4">Performance History (20m)</p>
                      <PerformanceChart data={performanceData} />
                    </div>
                  </div>
                </Card>

                <AIGuardrail prediction={prediction} isAnalyzing={isAnalyzing} userRole={user.role} />

                <Card className="p-6 border-neon-blue/10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black text-lg flex items-center gap-2 text-white uppercase tracking-tighter italic">
                      <Terminal size={20} className="text-neon-blue" />
                      Neural Log Stream
                    </h3>
                    <button className="text-[10px] text-neon-blue font-black hover:underline uppercase tracking-[0.2em]">Access Archive</button>
                  </div>
                  <LogTerminal logs={logs} />
                  {pipelineStatus === 'running' && (
                    <div className="flex items-center gap-2 text-neon-blue animate-pulse mt-4 bg-neon-blue/5 p-2 rounded-lg border border-neon-blue/20">
                      <RefreshCw size={12} className="animate-spin" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Syncing with remote clusters...</span>
                    </div>
                  )}
                </Card>
              </div>

              <div className="space-y-8">
                <Card className="p-6 relative overflow-hidden group border-none bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 neon-glow-blue">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-neon-blue/20 blur-3xl group-hover:bg-neon-blue/40 transition-all duration-500" />
                  <h3 className="font-black mb-4 flex items-center gap-2 text-white uppercase tracking-tighter italic">
                    <Workflow size={18} className="text-neon-blue" />
                    Neural Deployment
                  </h3>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6 leading-relaxed">Execute autonomous CI/CD pipeline with AI-driven risk mitigation.</p>
                  <button 
                    onClick={() => triggerPipeline()}
                    disabled={pipelineStatus === 'running' || user.role === 'viewer'}
                    className={`w-full py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 relative z-10 ${
                      pipelineStatus === 'running' 
                        ? 'bg-neon-blue/20 text-neon-blue cursor-not-allowed border border-neon-blue/30' 
                        : user.role === 'viewer'
                        ? 'bg-glass text-slate-600 cursor-not-allowed border border-glass-border'
                        : 'bg-neon-blue text-deep-space hover:shadow-[0_0_30px_rgba(0,242,255,0.5)] hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {pipelineStatus === 'running' ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <Plus size={16} />
                    )}
                    {pipelineStatus === 'running' ? 'Synchronizing...' : 'Initialize Build'}
                  </button>
                </Card>

                <LatestCommit commit={latestCommit} onSimulateChange={simulateChange} userRole={user.role} />

                <DeploymentHistory deployments={deployments} />

                <Card className="p-6 border-neon-purple/20">
                  <h3 className="font-black mb-6 flex items-center gap-2 text-white uppercase tracking-tighter italic">
                    <BarChart3 size={18} className="text-neon-purple" />
                    System Metrics
                  </h3>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Success Rate</span>
                      <span className="text-neon-green font-mono font-bold text-sm shadow-[0_0_10px_rgba(57,255,20,0.2)]">98.4%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Avg. Build Time</span>
                      <span className="text-white font-mono font-bold text-sm">2m 45s</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Deployments/Day</span>
                      <span className="text-white font-mono font-bold text-sm">14</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                    <Workflow size={18} className="text-slate-400" />
                    Recent Deployments
                  </h3>
                  <div className="space-y-4">
                    {[
                      { env: 'Production', time: '2h ago', status: 'success' },
                      { env: 'Staging', time: '5h ago', status: 'success' },
                      { env: 'Production', time: '1d ago', status: 'failed' }
                    ].map((dep, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${dep.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          <span className="text-xs font-medium text-slate-300">{dep.env}</span>
                        </div>
                        <span className="text-[10px] text-slate-500">{dep.time}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        );
      case 'analytics':
        return <AnalyticsView />;
      case 'infrastructure':
        return (
          <InfrastructureView 
            cpuUsage={cpuUsage}
            memUsage={memUsage}
            netUsage={netUsage}
            diskUsage={diskUsage}
            performanceData={performanceData}
            userRole={user.role}
            onLog={addLog}
          />
        );
      case 'containers':
        return (
          <motion.div
            key="containers"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ContainersView userRole={user.role} onLog={addLog} />
          </motion.div>
        );
      case 'pipeline':
        return <PipelineView />;
      case 'logs':
        return (
          <motion.div 
            key="logs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <LogsView logs={logs} onClearLogs={() => setLogs([])} />
          </motion.div>
        );
      case 'database':
        return (
          <motion.div 
            key="database"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <DatabaseView 
              userRole={user.role} 
              activeEnvironment={environment}
              onLog={addLog} 
            />
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center h-[60vh] text-slate-500 flex-col gap-4"
          >
            <Settings size={48} className="text-slate-700" />
            <p className="text-lg font-medium">System Settings</p>
            <p className="text-sm">Global configuration and access control management.</p>
          </motion.div>
        );
      case 'guide':
        return (
          <motion.div 
            key="guide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-4xl mx-auto space-y-12 pb-20"
          >
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-neon-blue/10 rounded-lg text-neon-blue">
                  <Workflow size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white uppercase tracking-tighter italic">Neural CI/CD v4.0</h2>
              </div>
              <Card className="p-8">
                <div className="space-y-6">
                  <p className="text-slate-400 leading-relaxed">
                    The Nexus DevOps Platform v4.0 introduces a revolutionary neural-driven CI/CD pipeline. 
                    This system utilizes distributed build clusters and AI-driven risk assessment to ensure 
                    maximum deployment reliability.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-glass border border-glass-border rounded-xl">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">Advanced Monitoring</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">Real-time telemetry with neon-visualized performance metrics.</p>
                    </div>
                    <div className="p-4 bg-glass border border-glass-border rounded-xl">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">Neural Guardrails</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">AI-powered impact analysis and automated deployment gates.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                  <Server size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">2. Backend API Integration</h2>
              </div>
              <Card className="p-8">
                <p className="text-slate-500 mb-6">The dashboard fetches real-time data from these Express.js endpoints:</p>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-violet-400 mb-1">GET /api/status</h4>
                    <p className="text-sm text-slate-400">Returns Docker container and system health metrics.</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-violet-400 mb-1">GET /api/deployments</h4>
                    <p className="text-sm text-slate-400">Fetches deployment history and current version info.</p>
                  </div>
                  <CodeBlock 
                    filename="backend/server.js"
                    language="javascript"
                    code={`const express = require('express');
const app = express();

app.get('/api/status', (req, res) => {
  res.json({
    container: 'running',
    cpu: process.cpuUsage(),
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

app.listen(3000, () => console.log('Backend API running on port 3000'));`}
                  />
                </div>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                  <Box size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">3. Container Orchestration (v2.5)</h2>
              </div>
              <Card className="p-8">
                <p className="text-slate-500 mb-6">We use Docker Compose and custom orchestration logic to manage container lifecycles and service health.</p>
                <CodeBlock 
                  filename="devops/orchestration.js"
                  language="javascript"
                  code={`// Automated service health check & recovery
async function checkServiceHealth(serviceName) {
  const container = await docker.getContainer(serviceName);
  const stats = await container.stats({ stream: false });
  
  if (stats.cpu_stats.cpu_usage.total_usage > THRESHOLD) {
    console.log(\`⚠️ High CPU detected on \${serviceName}. Scaling up...\`);
    await scaleService(serviceName, 2);
  }
}

// Rolling update orchestration
async function deployRollingUpdate(serviceName, newImage) {
  console.log(\`🚀 Starting rolling update for \${serviceName}...\`);
  // Implementation of zero-downtime deployment
}`}
                />
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                  <Workflow size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">4. Automated CI/CD Workflow</h2>
              </div>
              <Card className="p-8">
                <CodeBlock 
                  filename=".github/workflows/ci-cd.yml"
                  language="yaml"
                  code={`name: CI/CD Pipeline v2.0

on:
  push:
    branches: [ "main" ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker Images
        run: docker-compose -f devops/docker-compose.yml build
        
      - name: Run Tests
        run: npm test --prefix backend
        
      - name: Push to Registry
        run: |
          echo \${{ secrets.DOCKER_PASSWORD }} | docker login -u \${{ secrets.DOCKER_USER }} --password-stdin
          docker-compose -f devops/docker-compose.yml push`}
                />
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                  <Github size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">5. Professional Commit History</h2>
              </div>
              <Card className="p-8">
                <div className="space-y-4">
                  {[
                    { msg: 'refactor: redesign project architecture', desc: 'Migrated to a full-stack directory structure with separate frontend/backend folders.' },
                    { msg: 'feat: implement professional DevOps dashboard UI', desc: 'Added modern dashboard with monitoring widgets and real-time logs.' },
                    { msg: 'feat: add backend APIs for system monitoring', desc: 'Created Express endpoints for status, deployments, and logs.' },
                    { msg: 'feat: integrate MongoDB database support', desc: 'Added Mongoose models and database connection logic.' },
                    { msg: 'feat: add Docker containerization', desc: 'Configured Dockerfile and docker-compose for multi-service orchestration.' },
                    { msg: 'ci: configure automated CI/CD pipeline', desc: 'Set up GitHub Actions to build and test on every push.' },
                    { msg: 'release: v2.0 professional DevOps dashboard', desc: 'Final release for portfolio and project submission.' }
                  ].map((commit, i) => (
                    <div key={i} className="flex gap-4 border-l-2 border-slate-800 pl-6 pb-6 last:pb-0 relative">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 bg-[#0a0c10] border-2 border-violet-600 rounded-full" />
                      <div>
                        <h4 className="font-bold text-white text-sm">{commit.msg}</h4>
                        <p className="text-xs text-slate-500 mt-1">{commit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0c10] font-sans text-slate-300 overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        currentView={view} 
        setView={setView} 
        userRole={user.role}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          view={view} 
          version={version} 
          user={user} 
          environment={environment}
          onRoleChange={(role) => setUser({ ...user, role })}
          onEnvironmentChange={setEnvironment}
        />

        <main className="flex-1 overflow-y-auto p-8 bg-[#0a0c10]">
          <AnimatePresence mode="wait">
            {renderView()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
