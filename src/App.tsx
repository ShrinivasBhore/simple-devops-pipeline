import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Container, 
  Workflow, 
  Zap, 
  Database,
  Plus,
  RefreshCw,
  Activity,
  BarChart3,
  FolderTree,
  Server,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeDeploymentRisk } from './services/predictionService';
import { View, PipelineStatus, PredictionResult, Commit } from './types';
import { Card, Badge } from './components/UI';
import { MonitoringWidget } from './components/MonitoringWidget';
import { LogTerminal } from './components/LogTerminal';
import { AIGuardrail } from './components/AIGuardrail';
import { LatestCommit } from './components/LatestCommit';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CodeBlock } from './components/CodeBlock';

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
  const [latestCommit, setLatestCommit] = useState<Commit>({
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

    triggerPipeline(randomMsg);
  };

  const triggerPipeline = async (commitMsg?: string) => {
    if (pipelineStatus === 'running') return;
    
    const currentCommit = commitMsg || latestCommit.message;
    
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
      `[${timestamp}] SYSTEM: Webhook received - Commit ${currentCommit.substring(0, 7)} detected`,
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
    
    const versionParts = version.split('.');
    const nextPatch = parseInt(versionParts[2]) + 1;
    const nextVersion = `${versionParts[0]}.${versionParts[1]}.${nextPatch}`;
    setVersion(nextVersion);
    
    setLogs(prev => [...prev, `[SYSTEM] Deployment SUCCESS. Version ${nextVersion} is now live.`]);
    
    setTimeout(() => setPipelineStatus('idle'), 5000);
  };

  return (
    <div className="flex h-screen bg-[#0a0c10] font-sans text-slate-300 overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        currentView={view} 
        setView={setView} 
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header view={view} version={version} />

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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <MonitoringWidget label="CPU Usage" value={cpuUsage} icon="cpu" color="text-violet-500" />
                        <MonitoringWidget label="Memory Usage" value={memUsage} icon="memory" color="text-emerald-500" />
                      </div>
                    </Card>

                    <AIGuardrail prediction={prediction} isAnalyzing={isAnalyzing} />

                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2 text-white">
                          <Terminal size={20} className="text-violet-400" />
                          Deployment Logs
                        </h3>
                        <button className="text-[10px] text-violet-400 font-bold hover:underline uppercase tracking-wider">View All</button>
                      </div>
                      <LogTerminal logs={logs} />
                      {pipelineStatus === 'running' && (
                        <div className="flex items-center gap-2 text-violet-400 animate-pulse mt-2">
                          <RefreshCw size={12} className="animate-spin" />
                          <span>Pipeline executing...</span>
                        </div>
                      )}
                    </Card>
                  </div>

                  <div className="space-y-8">
                    <Card className="p-6 bg-violet-600 text-white shadow-xl shadow-violet-900/20 border-none">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Workflow size={18} />
                        Quick Actions
                      </h3>
                      <p className="text-violet-100 text-xs mb-6 leading-relaxed">Trigger a manual CI/CD pipeline build and deployment.</p>
                      <button 
                        onClick={() => triggerPipeline()}
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

                    <LatestCommit commit={latestCommit} onSimulateChange={simulateChange} />

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
                      <Container size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">3. Containerization (v2.0)</h2>
                  </div>
                  <Card className="p-8">
                    <p className="text-slate-500 mb-6">We use Docker Compose to orchestrate the Frontend, Backend, and MongoDB database.</p>
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
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
