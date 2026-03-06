import React, { useState } from 'react';
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
  Trash2
} from 'lucide-react';
import { Container, Role } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';

const initialContainers: Container[] = [
  {
    id: 'c-8f2d1',
    name: 'api-gateway-v2',
    image: 'nginx:alpine',
    status: 'running',
    cpu: '0.4%',
    memory: '128MB',
    uptime: '14d 2h',
    ports: ['80:80', '443:443']
  },
  {
    id: 'c-3a9b4',
    name: 'auth-service',
    image: 'node:18-slim',
    status: 'running',
    cpu: '1.2%',
    memory: '256MB',
    uptime: '14d 2h',
    ports: ['3001:3001']
  },
  {
    id: 'c-7e1f0',
    name: 'payment-worker',
    image: 'python:3.9-slim',
    status: 'running',
    cpu: '4.5%',
    memory: '512MB',
    uptime: '3d 12h',
    ports: []
  },
  {
    id: 'c-2d5c8',
    name: 'redis-cache',
    image: 'redis:7-alpine',
    status: 'running',
    cpu: '0.1%',
    memory: '64MB',
    uptime: '45d 6h',
    ports: ['6379:6379']
  },
  {
    id: 'c-1a2b3',
    name: 'legacy-report-gen',
    image: 'node:14',
    status: 'stopped',
    cpu: '0%',
    memory: '0MB',
    uptime: '-',
    ports: []
  },
  {
    id: 'c-9f8e7',
    name: 'db-migration-tool',
    image: 'alpine:latest',
    status: 'error',
    cpu: '0%',
    memory: '0MB',
    uptime: '-',
    ports: []
  }
];

interface ContainersViewProps {
  userRole: Role;
}

export const ContainersView: React.FC<ContainersViewProps> = ({ userRole }) => {
  const [containers, setContainers] = useState<Container[]>(initialContainers);
  const [searchQuery, setSearchQuery] = useState('');

  const isReadOnly = userRole === 'viewer';

  const filteredContainers = containers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.image.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setContainers(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'running' ? 'stopped' : 'running',
          cpu: c.status === 'running' ? '0%' : '0.5%',
          memory: c.status === 'running' ? '0MB' : '128MB'
        };
      }
      return c;
    }));
  };

  const restartContainer = (id: string) => {
    setContainers(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: 'restarting' };
      }
      return c;
    }));
    
    setTimeout(() => {
      setContainers(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, status: 'running' };
        }
        return c;
      }));
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Container Management</h1>
          <p className="text-slate-500 mt-1">Orchestrate and monitor your application services.</p>
        </div>
        <div className="flex items-center gap-3">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 bg-slate-900/40 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Running Instances</p>
              <p className="text-xl font-bold text-white">{containers.filter(c => c.status === 'running').length}</p>
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
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Storage Usage</p>
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
              <Card className="p-5 bg-slate-900/40 border-slate-800 hover:border-slate-700 transition-all group">
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
                      </div>
                      <p className="text-xs text-slate-500 mt-1 font-mono">{container.image}</p>
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
