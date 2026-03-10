import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Terminal, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Bug,
  ChevronDown,
  Clock,
  Database,
  Server,
  Workflow,
  Box
} from 'lucide-react';
import { LogEntry, LogLevel } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';

interface LogsViewProps {
  logs: LogEntry[];
  onClearLogs: () => void;
}

export const LogsView: React.FC<LogsViewProps> = ({ logs, onClearLogs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<LogLevel | 'all'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const services = useMemo(() => {
    const s = new Set(logs.map(l => l.service));
    return ['all', ...Array.from(s)];
  }, [logs]);

  const levels: (LogLevel | 'all')[] = ['all', 'info', 'success', 'warn', 'error', 'debug'];

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           log.service.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesService = selectedService === 'all' || log.service === selectedService;
      const matchesLevel = selectedLevel === 'all' || log.level === selectedLevel;
      return matchesSearch && matchesService && matchesLevel;
    }).reverse(); // Show newest first
  }, [logs, searchQuery, selectedService, selectedLevel]);

  const getLevelIcon = (level: LogLevel) => {
    switch (level) {
      case 'info': return <Info size={14} className="text-sky-400" />;
      case 'success': return <CheckCircle2 size={14} className="text-emerald-400" />;
      case 'warn': return <AlertCircle size={14} className="text-amber-400" />;
      case 'error': return <AlertCircle size={14} className="text-rose-400" />;
      case 'debug': return <Bug size={14} className="text-slate-500" />;
    }
  };

  const getServiceIcon = (service: string) => {
    const s = service.toLowerCase();
    if (s.includes('pipeline') || s.includes('workflow')) return <Workflow size={14} />;
    if (s.includes('database') || s.includes('mongo')) return <Database size={14} />;
    if (s.includes('infrastructure') || s.includes('node')) return <Server size={14} />;
    if (s.includes('container') || s.includes('docker')) return <Box size={14} />;
    return <Activity size={14} />;
  };

  const exportLogs = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `devops-logs-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Centralized Observability</h1>
          <p className="text-slate-500 mt-1">Unified log stream from all infrastructure services and pipelines.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={exportLogs}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all border border-slate-700"
          >
            <Download size={16} />
            Export JSON
          </button>
          <button 
            onClick={onClearLogs}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold transition-all border border-rose-500/20"
          >
            <Trash2 size={16} />
            Clear Stream
          </button>
        </div>
      </div>

      <Card className="p-4 bg-[#0d1117] border-slate-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search logs by message or service..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 focus:ring-2 focus:ring-violet-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select 
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 focus:ring-2 focus:ring-violet-500 transition-all cursor-pointer min-w-[140px]"
              >
                {services.map(s => (
                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
            </div>
            <div className="relative">
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as LogLevel | 'all')}
                className="appearance-none pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 focus:ring-2 focus:ring-violet-500 transition-all cursor-pointer min-w-[120px]"
              >
                {levels.map(l => (
                  <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-[#0d1117] border-slate-800 overflow-hidden flex flex-col h-[600px]">
        <div className="bg-slate-900/50 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-violet-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Log Stream</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Connected</span>
            </div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{filteredLogs.length} Entries</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-0 font-mono text-[13px] leading-relaxed">
          {filteredLogs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
              <div className="p-4 bg-slate-900 rounded-full">
                <Search size={32} />
              </div>
              <p>No logs found matching your criteria.</p>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-slate-900 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800 z-10">
                <tr>
                  <th className="px-6 py-3 text-left w-48">Timestamp</th>
                  <th className="px-4 py-3 text-left w-32">Service</th>
                  <th className="px-4 py-3 text-left w-24">Level</th>
                  <th className="px-6 py-3 text-left">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                <AnimatePresence initial={false}>
                  {filteredLogs.map((log) => (
                    <motion.tr 
                      key={log.id}
                      initial={{ opacity: 0, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                      animate={{ opacity: 1, backgroundColor: 'transparent' }}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-6 py-3 text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock size={12} className="opacity-50" />
                          {log.timestamp}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-slate-400">
                          <span className="opacity-50">{getServiceIcon(log.service)}</span>
                          <span className="font-bold text-[11px] uppercase tracking-tight">{log.service}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {getLevelIcon(log.level)}
                          <span className={`text-[10px] font-bold uppercase ${
                            log.level === 'error' ? 'text-rose-400' :
                            log.level === 'warn' ? 'text-amber-400' :
                            log.level === 'success' ? 'text-emerald-400' :
                            log.level === 'info' ? 'text-sky-400' : 'text-slate-500'
                          }`}>
                            {log.level}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-slate-300">
                        <span className="group-hover:text-white transition-colors">{log.message}</span>
                        {log.metadata && (
                          <span className="ml-2 text-[10px] text-slate-600 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                            {JSON.stringify(log.metadata)}
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
};
