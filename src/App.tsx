/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Github, 
  Container, 
  Workflow, 
  Code2, 
  Layout, 
  CheckCircle2, 
  ArrowRight, 
  Server, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Layers, 
  FileCode, 
  FolderTree,
  ExternalLink,
  ChevronRight,
  Info,
  AlertCircle,
  Database,
  Settings,
  Home,
  Cpu,
  HardDrive,
  RefreshCw,
  Clock,
  Search,
  Menu,
  X,
  Plus,
  BarChart3,
  History,
  BrainCircuit,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeDeploymentRisk, PredictionResult } from './services/predictionService';

// --- Types ---

type PipelineStatus = 'idle' | 'running' | 'success' | 'failed';
type View = 'dashboard' | 'guide' | 'logs' | 'database' | 'settings';

// --- Components ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 shadow-xl overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' }) => {
  const variants = {
    default: 'bg-slate-800 text-slate-400',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    info: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${variants[variant]}`}>
      {children}
    </span>
  );
};

const CodeBlock = ({ code, language, filename }: { code: string, language: string, filename?: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 group">
      {filename && (
        <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 rounded-t-lg border-b border-slate-700 flex justify-between items-center">
          <span className="font-mono">{filename}</span>
          <button 
            onClick={copyToClipboard}
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            {copied ? <CheckCircle2 size={12} /> : <Terminal size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <pre className={`bg-slate-900 text-slate-100 p-4 overflow-x-auto font-mono text-sm ${filename ? 'rounded-b-lg' : 'rounded-lg'}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [pipelineStatus, setPipelineStatus] = useState<PipelineStatus>('idle');
  const [deploymentCount, setDeploymentCount] = useState(124);
  const [version, setVersion] = useState('2.0.1');
  const [dbStatus, setDbStatus] = useState<'connected' | 'disconnected'>('connected');
  const [containerStatus, setContainerStatus] = useState<'running' | 'stopped'>('running');
  const [logs, setLogs] = useState<string[]>([
    "[2026-03-06 14:05:01] INFO: Cluster initialization sequence started",
    "[2026-03-06 14:05:05] INFO: Node-01: Health check passed (99.9% uptime)",
    "[2026-03-06 14:06:10] INFO: Database synchronization complete",
    "[2026-03-06 14:07:01] INFO: Dashboard v2.0.1 ready for operations"
  ]);
  const [cpuUsage, setCpuUsage] = useState(8);
  const [memUsage, setMemUsage] = useState(42);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [latestCommit, setLatestCommit] = useState({
    message: "feat: redesign project architecture",
    hash: "7d8e9f0a1b2c3d4e5f6g7h8i9j0k",
    time: "2 hours ago"
  });

  // Simulate monitoring updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 15) + 5);
      setMemUsage(Math.floor(Math.random() * 5) + 40);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const simulateChange = () => {
    const messages = [
      "fix: resolve memory leak in worker thread",
      "feat: add oauth2 authentication provider",
      "refactor: optimize database query performance",
      "docs: update deployment instructions",
      "chore: bump dependencies"
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const randomHash = Math.random().toString(16).substring(2, 15) + Math.random().toString(16).substring(2, 15);
    
    setLatestCommit({
      message: randomMsg,
      hash: randomHash,
      time: "Just now"
    });

    // Automatically trigger pipeline after a "change"
    triggerPipeline(randomMsg);
  };

  const triggerPipeline = async (commitMsg?: string) => {
    if (pipelineStatus === 'running') return;
    
    const currentCommit = commitMsg || latestCommit.message;
    
    // Step 1: AI Risk Analysis
    setIsAnalyzing(true);
    setLogs(prev => [...prev, `[${new Date().toISOString().replace('T', ' ').split('.')[0]}] AI: Starting pre-deployment risk analysis for "${currentCommit}"...`]);
    
    const result = await analyzeDeploymentRisk({
      commitMessage: currentCommit,
      changedFiles: Math.floor(Math.random() * 20) + 1,
      testCoverage: Math.floor(Math.random() * 10) + 90,
      lastDeploymentStatus: "success"
    });
    
    setPrediction(result);
    setIsAnalyzing(false);
    
    if (result.riskLevel === 'high') {
      setLogs(prev => [...prev, `[AI] CRITICAL: High risk detected. Manual approval required.`]);
      setPipelineStatus('failed');
      return;
    }

    setLogs(prev => [...prev, `[AI] Success Probability: ${result.successProbability}% | Risk: ${result.riskLevel.toUpperCase()}`]);
    setLogs(prev => [...prev, `[AI] Recommendation: ${result.recommendation}`]);

    setPipelineStatus('running');
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    const newLogs = [
      `[${timestamp}] SYSTEM: Webhook received - Commit 7d8e9f0 detected`,
      "[GIT] Pulling latest changes from branch 'main'...",
      "[CI] Initializing build environment (Ubuntu 22.04 LTS)...",
      "[DOCKER] Building multi-stage image: devops-webapp:latest"
    ];
    setLogs(prev => [...prev, ...newLogs]);

    await new Promise(r => setTimeout(r, 2000));
    setLogs(prev => [...prev, "[DOCKER] Layer 1/12: FROM node:20-alpine", "[DOCKER] Layer 5/12: RUN npm install --production", "[DOCKER] Image optimized: 45.2MB"]);
    
    await new Promise(r => setTimeout(r, 2000));
    setLogs(prev => [...prev, "[CD] Rolling update started: Replacing 3 pods...", "[CD] Traffic shifting: 25% -> 50% -> 100%"]);
    
    await new Promise(r => setTimeout(r, 1500));
    setPipelineStatus('success');
    setDeploymentCount(prev => prev + 1);
    
    // Automatic version update logic
    const versionParts = version.split('.');
    const nextPatch = parseInt(versionParts[2]) + 1;
    const nextVersion = `${versionParts[0]}.${versionParts[1]}.${nextPatch}`;
    setVersion(nextVersion);
    
    setLogs(prev => [...prev, `[SYSTEM] Deployment SUCCESS. Version ${nextVersion} is now live.`]);
    
    setTimeout(() => setPipelineStatus('idle'), 5000);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'guide', label: 'Project Guide', icon: FileCode },
    { id: 'logs', label: 'System Logs', icon: Terminal },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#0a0c10] font-sans text-slate-300 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#0d1117] border-r border-slate-800 transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-violet-600 p-2 rounded-xl text-white shrink-0 shadow-lg shadow-violet-900/40">
            <Workflow size={24} />
          </div>
          {isSidebarOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-lg tracking-tight whitespace-nowrap text-white"
            >
              DevOps v2.0
            </motion.span>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                view === item.id 
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/40' 
                  : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-800 text-slate-500 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#0d1117] border-b border-slate-800 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">{view}</h2>
            <div className="h-4 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock size={14} />
              <span>System Uptime: 99.99%</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 focus:ring-2 focus:ring-violet-500 transition-all w-64"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase">Live v{version}</span>
            </div>
            <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-violet-900/20">
              SB
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#0a0c10]">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                {/* Stats Grid */}
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
                  {/* Monitoring Section */}
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-2 text-slate-500">
                              <Cpu size={16} /> CPU Usage
                            </span>
                            <span className="text-white">{cpuUsage}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${cpuUsage}%` }}
                              className={`h-full rounded-full ${cpuUsage > 80 ? 'bg-rose-500' : 'bg-violet-500'}`}
                            />
                          </div>
                          <p className="text-[10px] text-slate-600">Load average: 0.45, 0.52, 0.48</p>
                        </div>
                        <div className="space-y-4">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                            <span className="flex items-center gap-2 text-slate-500">
                              <HardDrive size={16} /> Memory Usage
                            </span>
                            <span className="text-white">{memUsage}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${memUsage}%` }}
                              className="h-full bg-emerald-500 rounded-full"
                            />
                          </div>
                          <p className="text-[10px] text-slate-600">Available: 4.2GB / 8GB</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                          <BrainCircuit size={20} className="text-violet-400" />
                          AI Deployment Guardrail
                        </h3>
                        {prediction && (
                          <Badge variant={prediction.riskLevel === 'low' ? 'success' : prediction.riskLevel === 'medium' ? 'warning' : 'danger'}>
                            {prediction.riskLevel} Risk
                          </Badge>
                        )}
                      </div>

                      {!prediction && !isAnalyzing ? (
                        <div className="text-center py-8">
                          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                            <ShieldCheck size={24} />
                          </div>
                          <p className="text-xs text-slate-500 mb-4">No analysis data available. Trigger a deployment to run AI risk assessment.</p>
                        </div>
                      ) : isAnalyzing ? (
                        <div className="space-y-4 py-4">
                          <div className="flex items-center gap-3 text-violet-400 animate-pulse">
                            <RefreshCw size={16} className="animate-spin" />
                            <span className="text-xs font-bold uppercase tracking-wider">AI is analyzing commit patterns...</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="h-full bg-violet-500"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex justify-between items-end">
                              <span className="text-[10px] font-bold text-slate-500 uppercase">Success Probability</span>
                              <span className="text-2xl font-bold text-white">{prediction?.successProbability}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${prediction?.successProbability}%` }}
                                className={`h-full ${prediction?.successProbability! > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                              />
                            </div>
                            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                              <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
                                <Info size={12} /> AI Recommendation
                              </p>
                              <p className="text-xs text-slate-300 leading-relaxed italic">"{prediction?.recommendation}"</p>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">Risk Factors</span>
                            {prediction?.factors.map((factor, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/30 p-2 rounded-lg border border-slate-800/50">
                                {prediction.riskLevel === 'low' ? (
                                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                ) : (
                                  <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                                )}
                                <span>{factor}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                          <Terminal size={20} className="text-violet-400" />
                          Deployment Logs
                        </h3>
                        <button className="text-[10px] text-violet-400 font-bold hover:underline uppercase tracking-wider">View All</button>
                      </div>
                      <div className="bg-[#0d1117] rounded-xl p-4 font-mono text-[11px] text-slate-400 h-64 overflow-y-auto border border-slate-800">
                        {logs.map((log, i) => (
                          <div key={i} className="mb-1.5 flex gap-3">
                            <span className="text-slate-700 shrink-0 select-none">[{i + 1}]</span>
                            <span className={
                              log.includes('ERROR') ? 'text-rose-400' : 
                              log.includes('SYSTEM') ? 'text-violet-400 font-bold' : 
                              log.includes('DOCKER') ? 'text-blue-400' : 
                              log.includes('CD') ? 'text-emerald-400' : ''
                            }>
                              {log}
                            </span>
                          </div>
                        ))}
                        {pipelineStatus === 'running' && (
                          <div className="flex items-center gap-2 text-violet-400 animate-pulse mt-2">
                            <RefreshCw size={12} className="animate-spin" />
                            <span>Pipeline executing...</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Sidebar Widgets */}
                  <div className="space-y-8">
                    <Card className="p-6 bg-violet-600 text-white shadow-xl shadow-violet-900/20 border-none">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Workflow size={18} />
                        Quick Actions
                      </h3>
                      <p className="text-violet-100 text-xs mb-6 leading-relaxed">Trigger a manual CI/CD pipeline build and deployment.</p>
                      <button 
                        onClick={triggerPipeline}
                        disabled={pipelineStatus === 'running'}
                        className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                          pipelineStatus === 'running' 
                            ? 'bg-violet-500/50 cursor-not-allowed' 
                            : 'bg-white text-violet-600 hover:bg-violet-50 shadow-lg'
                        }`}
                      >
                        {pipelineStatus === 'running' ? (
                          <RefreshCw size={18} className="animate-spin" />
                        ) : (
                          <Plus size={18} />
                        )}
                        {pipelineStatus === 'running' ? 'Deploying...' : 'New Deployment'}
                      </button>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                          <Github size={18} className="text-slate-400" />
                          Latest Commit
                        </h3>
                        <button 
                          onClick={simulateChange}
                          className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded border border-slate-700 transition-colors flex items-center gap-1"
                        >
                          <RefreshCw size={10} />
                          Push Change
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                            <History size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{latestCommit.message}</p>
                            <p className="text-[10px] text-slate-500">shrinivasbhore committed {latestCommit.time}</p>
                          </div>
                        </div>
                        <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
                          <p className="text-[10px] text-slate-500 font-mono truncate">SHA: {latestCommit.hash}</p>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-6">
                      <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
                        <BarChart3 size={18} className="text-slate-400" />
                        Project Health
                      </h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Uptime</span>
                          <span className="font-bold text-emerald-400">99.9%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Error Rate</span>
                          <span className="font-bold text-white">0.02%</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Response Time</span>
                          <span className="font-bold text-white">124ms</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {view === 'guide' && (
              <motion.div 
                key="guide"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto space-y-12 pb-20"
              >
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-extrabold text-white mb-4">DevOps Project Guide v{version}</h1>
                  <p className="text-lg text-slate-500">A professional-grade blueprint for building a full-stack automated pipeline.</p>
                </div>

                {/* 1. Folder Structure */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                      <FolderTree size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">1. Professional Folder Structure</h2>
                  </div>
                  <Card className="p-8">
                    <p className="text-slate-500 mb-6">A clean separation of concerns is vital for scalability and CI/CD automation:</p>
                    <CodeBlock 
                      language="text"
                      code={`devops-ci-cd-webapp/
├── frontend/           # Static UI files (HTML, CSS, JS)
│   ├── index.html      # Landing page
│   ├── dashboard.html  # Main dashboard UI
│   ├── style.css       # Global styles
│   └── script.js       # Frontend API logic
├── backend/            # Node.js Express server
│   ├── server.js       # Main entry point
│   ├── routes/         # API route handlers
│   └── models/         # Database schemas
├── database/           # Database configuration
│   └── db.js           # MongoDB connection logic
├── devops/             # Infrastructure as Code
│   ├── Dockerfile      # Container instructions
│   ├── docker-compose.yml # Multi-container setup
│   └── ci-cd.yml       # GitHub Actions workflow
├── docs/               # Technical documentation
│   └── architecture.md # System design deep-dive
└── README.md           # Project setup & guide`}
                    />
                  </Card>
                </section>

                {/* 2. Backend APIs */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                      <Server size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">2. Backend API Integration</h2>
                  </div>
                  <Card className="p-8">
                    <p className="text-slate-600 mb-6">The dashboard fetches real-time data from these Express.js endpoints:</p>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <h4 className="font-bold text-indigo-600 mb-1">GET /api/status</h4>
                        <p className="text-sm text-slate-600">Returns Docker container and system health metrics.</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <h4 className="font-bold text-indigo-600 mb-1">GET /api/deployments</h4>
                        <p className="text-sm text-slate-600">Fetches deployment history and current version info.</p>
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

                {/* 3. Docker Setup */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                      <Container size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">3. Containerization (v2.0)</h2>
                  </div>
                  <Card className="p-8">
                    <p className="text-slate-600 mb-6">We use Docker Compose to orchestrate the Frontend, Backend, and MongoDB database.</p>
                    <CodeBlock 
                      filename="devops/docker-compose.yml"
                      language="yaml"
                      code={`version: '3.8'
services:
  frontend:
    build: ./frontend
    ports: ["80:80"]
    depends_on: ["backend"]
  
  backend:
    build: ./backend
    ports: ["3000:3000"]
    environment:
      - MONGO_URI=mongodb://database:27017/devops_db
    depends_on: ["database"]

  database:
    image: mongo:latest
    ports: ["27017:27017"]
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:`}
                    />
                  </Card>
                </section>

                {/* 4. CI/CD Pipeline */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                      <Workflow size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">4. Automated CI/CD Workflow</h2>
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

                {/* 5. Commit History */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                      <Github size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">5. Professional Commit History</h2>
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
                        <div key={i} className="flex gap-4 border-l-2 border-slate-100 pl-6 pb-6 last:pb-0 relative">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full" />
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{commit.msg}</h4>
                            <p className="text-xs text-slate-500 mt-1">{commit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </section>
              </motion.div>
            )}

            {view === 'logs' && (
              <motion.div 
                key="logs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <Card className="p-0">
                  <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Full System Logs</h3>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-sm font-bold">Download CSV</button>
                      <button className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-sm font-bold">Clear Logs</button>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-950 text-emerald-500 font-mono text-sm h-[600px] overflow-y-auto">
                    {logs.map((log, i) => (
                      <div key={i} className="mb-2 flex gap-4">
                        <span className="text-slate-700 select-none">{i + 1}</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    <div className="animate-pulse">_</div>
                  </div>
                </Card>
              </motion.div>
            )}

            {view === 'database' && (
              <motion.div 
                key="database"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-6">
                    <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">DB Engine</h4>
                    <p className="text-xl font-bold text-white">MongoDB 6.0</p>
                  </Card>
                  <Card className="p-6">
                    <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">Collections</h4>
                    <p className="text-xl font-bold text-white">12 Active</p>
                  </Card>
                  <Card className="p-6">
                    <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">Storage</h4>
                    <p className="text-xl font-bold text-white">256 MB / 5 GB</p>
                  </Card>
                </div>
                <Card className="p-8 text-center">
                  <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                    <Database size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Database Connection Stable</h3>
                  <p className="text-slate-500 mb-8">All systems are communicating with the MongoDB cluster successfully.</p>
                  <div className="max-w-md mx-auto p-4 bg-slate-900 rounded-xl border border-slate-800 text-left font-mono text-[10px]">
                    <p className="text-slate-600 mb-2">// Connection String</p>
                    <p className="text-slate-400">mongodb+srv://admin:********@cluster0.devops.mongodb.net/prod_db</p>
                  </div>
                </Card>
              </motion.div>
            )}

            {view === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-2xl mx-auto space-y-8"
              >
                <Card className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-white">Project Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div>
                        <h4 className="font-bold text-white">Auto-Deployment</h4>
                        <p className="text-[10px] text-slate-500">Automatically deploy on every successful CI build.</p>
                      </div>
                      <div className="w-10 h-5 bg-violet-600 rounded-full relative">
                        <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div>
                        <h4 className="font-bold text-white">Email Notifications</h4>
                        <p className="text-[10px] text-slate-500">Receive alerts when a pipeline fails.</p>
                      </div>
                      <div className="w-10 h-5 bg-slate-800 rounded-full relative">
                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
                      </div>
                    </div>
                    <div className="pt-4">
                      <button className="w-full py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-900/20">
                        Save Configuration
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
