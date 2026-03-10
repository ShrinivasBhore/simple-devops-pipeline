import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Box, 
  Play, 
  Square, 
  RotateCcw, 
  MoreVertical, 
  Cpu, 
  Database, 
  Activity, 
  Terminal,
  Search,
  Plus,
  Filter,
  ExternalLink,
  Trash2,
  Heart,
  AlertCircle,
  CheckCircle2,
  Globe,
  FlaskConical,
  Code2,
  RefreshCw
} from 'lucide-react';
import { Container, Role, LogLevel, Environment } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';

const initialContainers: Container[] = [
  {
    id: 'c-8f2d1',
    name: 'api-gateway-v2',
    image: 'nginx:alpine',
    status: 'running',
    health: 'healthy',
    cpu: '0.4%',
    memory: '128MB',
    uptime: '14d 2h',
    ports: ['80:80', '443:443'],
    environment: 'production'
  },
  {
    id: 'c-3a9b4',
    name: 'auth-service',
    image: 'node:18-slim',
    status: 'running',
    health: 'healthy',
    cpu: '1.2%',
    memory: '256MB',
    uptime: '14d 2h',
    ports: ['3001:3001'],
    environment: 'production'
  },
  {
    id: 'c-7e1f0',
    name: 'payment-worker',
    image: 'python:3.9-slim',
    status: 'running',
    health: 'unhealthy',
    cpu: '4.5%',
    memory: '512MB',
    uptime: '3d 12h',
    ports: [],
    environment: 'production'
  },
  {
    id: 'c-2d5c8',
    name: 'redis-cache',
    image: 'redis:7-alpine',
    status: 'running',
    health: 'healthy',
    cpu: '0.1%',
    memory: '64MB',
    uptime: '45d 6h',
    ports: ['6379:6379'],
    environment: 'production'
  },
  {
    id: 'c-dev-1',
    name: 'debug-proxy',
    image: 'mitmproxy/mitmproxy',
    status: 'running',
    health: 'healthy',
    cpu: '0.8%',
    memory: '96MB',
    uptime: '2h 15m',
    ports: ['8080:8080'],
    environment: 'development'
  },
  {
    id: 'c-stg-1',
    name: 'staging-api',
    image: 'node:18-slim',
    status: 'running',
    health: 'starting',
    cpu: '0.5%',
    memory: '128MB',
    uptime: '15m',
    ports: ['3000:3000'],
    environment: 'staging'
  }
];

interface ContainersViewProps {
  userRole: Role;
  onLog: (message: string, service: string, level: LogLevel) => void;
}

export const ContainersView: React.FC<ContainersViewProps> = ({ userRole, onLog }) => {
  const [containers, setContainers] = useState<Container[]>(initialContainers);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEnv, setActiveEnv] = useState<Environment | 'all'>('all');

  const isReadOnly = userRole === 'viewer';

  const filteredContainers = containers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.image.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnv = activeEnv === 'all' || c.environment === activeEnv;
    return matchesSearch && matchesEnv;
  });

  // Simulate periodic health checks
  useEffect(() => {
    const interval = setInterval(() => {
      setContainers(prev => prev.map(c => {
        if (c.status === 'running' && Math.random() > 0.95) {
          const newHealth = c.health === 'healthy' ? 'unhealthy' : 'healthy';
          if (newHealth === 'unhealthy') {
            onLog(`Container ${c.name} health check failed!`, 'monitoring', 'error');
          } else {
            onLog(`Container ${c.name} health check recovered.`, 'monitoring', 'success');
          }
          return { ...c, health: newHealth };
        }
        return c;
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, [onLog]);

  const toggleStatus = (id: string) => {
    const container = containers.find(c => c.id === id);
    if (!container) return;

    const newStatus = container.status === 'running' ? 'stopped' : 'running';
    onLog(`${newStatus === 'running' ? 'Starting' : 'Stopping'} container: ${container.name}`, 'orchestrator', newStatus === 'running' ? 'info' : 'warn');

    setContainers(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus,
          health: newStatus === 'running' ? 'starting' : 'healthy',
          cpu: newStatus === 'running' ? '0.5%' : '0%',
          memory: newStatus === 'running' ? '128MB' : '0MB'
        };
      }
      return c;
    }));

    if (newStatus === 'running') {
      setTimeout(() => {
        setContainers(prev => prev.map(c => {
          if (c.id === id) return { ...c, health: 'healthy' };
          return c;
        }));
      }, 3000);
    }
  };

  const restartContainer = (id: string) => {
    const container = containers.find(c => c.id === id);
    if (!container) return;

    onLog(`Restarting container: ${container.name}`, 'orchestrator', 'info');
    setContainers(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: 'restarting', health: 'starting' };
      }
      return c;
    }));
    
    setTimeout(() => {
      onLog(`Container ${container.name} successfully restarted.`, 'orchestrator', 'success');
      setContainers(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, status: 'running', health: 'healthy' };
        }
        return c;
      }));
    }, 2000);
  };

  const getEnvIcon = (env: Environment) => {
    switch (env) {
      case 'production': return <Globe size={14} />;
      case 'staging': return <FlaskConical size={14} />;
      case 'development': return <Code2 size={14} />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Container Management</h1>
          <p className="text-slate-500 mt-1">Orchestrate and monitor your application services across environments.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-800">
            {(['all', 'development', 'staging', 'production'] as const).map((env) => (
              <button
                key={env}
                onClick={() => setActiveEnv(env)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeEnv === env 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {env}
              </button>
            ))}
          </div>
          <button 
            disabled={isReadOnly}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
              isReadOnly 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-500/20'
            }`}
          >
            <Plus size={16} />
            Deploy Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 bg-slate-900/40 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Running</p>
              <p className="text-xl font-bold text-white">{containers.filter(c => c.status === 'running').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-slate-900/40 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400">
              <Heart size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Unhealthy</p>
              <p className="text-xl font-bold text-white">{containers.filter(c => c.health === 'unhealthy').length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-slate-900/40 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
              <Box size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Images</p>
              <p className="text-xl font-bold text-white">12 Active</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-slate-900/40 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <Database size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Storage</p>
              <p className="text-xl font-bold text-white">4.2 GB</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text"
            placeholder="Search containers, images..."
            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2 pl-10 pr-4 text-sm text-slate-300 focus:outline-none focus:border-violet-500/50 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold border border-slate-700">
          <Filter size={14} />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredContainers.map((container) => (
            <motion.div
              key={container.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className={`p-5 bg-slate-900/40 border-slate-800 hover:border-slate-700 transition-all group ${
                container.health === 'unhealthy' ? 'border-rose-500/30 bg-rose-500/5' : ''
              }`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      container.status === 'running' ? 'bg-emerald-500/10 text-emerald-400' : 
                      container.status === 'error' ? 'bg-rose-500/10 text-rose-400' : 
                      'bg-slate-800 text-slate-500'
                    }`}>
                      <Box size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white group-hover:text-violet-400 transition-colors">{container.name}</h3>
                        <Badge variant={
                          container.status === 'running' ? 'success' : 
                          container.status === 'error' ? 'danger' : 
                          'default'
                        } className="text-[10px] py-0 px-2 h-5">
                          {container.status}
                        </Badge>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                          <span className="text-slate-400">{getEnvIcon(container.environment)}</span>
                          <span className="text-[8px] font-black uppercase tracking-tighter text-slate-400">{container.environment}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-slate-500 font-mono">{container.image}</p>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${
                          container.health === 'healthy' ? 'text-emerald-500' :
                          container.health === 'unhealthy' ? 'text-rose-500' :
                          'text-amber-500'
                        }`}>
                          {container.health === 'healthy' ? <CheckCircle2 size={12} /> : 
                           container.health === 'unhealthy' ? <AlertCircle size={12} /> : 
                           <RefreshCw size={12} className="animate-spin" />}
                          {container.health}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                        <Cpu size={10} /> CPU
                      </p>
                      <p className="text-xs font-mono text-slate-300">{container.cpu}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                        <Activity size={10} /> Memory
                      </p>
                      <p className="text-xs font-mono text-slate-300">{container.memory}</p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Uptime</p>
                      <p className="text-xs font-mono text-slate-300">{container.uptime}</p>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Ports</p>
                      <div className="flex gap-1">
                        {container.ports.length > 0 ? container.ports.map(p => (
                          <span key={p} className="text-[10px] bg-slate-800 px-1.5 rounded text-slate-400">{p}</span>
                        )) : <span className="text-[10px] text-slate-600">None</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => !isReadOnly && toggleStatus(container.id)}
                      disabled={isReadOnly}
                      className={`p-2 rounded-lg transition-colors ${
                        isReadOnly ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' :
                        container.status === 'running' 
                        ? 'bg-slate-800 text-slate-400 hover:bg-rose-500/10 hover:text-rose-400' 
                        : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                      }`}
                      title={isReadOnly ? 'Permission Denied' : container.status === 'running' ? 'Stop' : 'Start'}
                    >
                      {container.status === 'running' ? <Square size={16} /> : <Play size={16} />}
                    </button>
                    <button 
                      onClick={() => !isReadOnly && restartContainer(container.id)}
                      disabled={isReadOnly}
                      className={`p-2 rounded-lg transition-colors ${
                        isReadOnly ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' :
                        'bg-slate-800 text-slate-400 hover:bg-violet-500/10 hover:text-violet-400'
                      }`}
                      title={isReadOnly ? 'Permission Denied' : "Restart"}
                    >
                      <RotateCcw size={16} className={container.status === 'restarting' ? 'animate-spin' : ''} />
                    </button>
                    <button className="p-2 bg-slate-800 text-slate-400 hover:bg-slate-700 rounded-lg transition-colors">
                      <Terminal size={16} />
                    </button>
                    <div className="w-px h-4 bg-slate-800 mx-1" />
                    <button 
                      disabled={isReadOnly}
                      className={`p-2 transition-colors ${isReadOnly ? 'text-slate-700 cursor-not-allowed' : 'text-slate-500 hover:text-rose-400'}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
