import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  Download, 
  RotateCcw, 
  Shield, 
  Clock, 
  HardDrive, 
  Activity, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  FileJson,
  Archive
} from 'lucide-react';
import { Backup, Role, LogLevel, Environment } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';

const initialBackups: Backup[] = [
  {
    id: 'b-9a2e1',
    timestamp: '2026-03-10 10:00:00',
    size: '1.2 GB',
    status: 'completed',
    type: 'automated',
    environment: 'production'
  },
  {
    id: 'b-8f3c4',
    timestamp: '2026-03-10 06:00:00',
    size: '1.18 GB',
    status: 'completed',
    type: 'automated',
    environment: 'production'
  },
  {
    id: 'b-7d5b0',
    timestamp: '2026-03-10 02:00:00',
    size: '1.15 GB',
    status: 'completed',
    type: 'automated',
    environment: 'production'
  },
  {
    id: 'b-manual-1',
    timestamp: '2026-03-09 15:30:00',
    size: '850 MB',
    status: 'completed',
    type: 'manual',
    environment: 'staging'
  },
  {
    id: 'b-fail-1',
    timestamp: '2026-03-09 12:00:00',
    size: '0 KB',
    status: 'failed',
    type: 'automated',
    environment: 'production'
  }
];

interface DatabaseViewProps {
  userRole: Role;
  activeEnvironment: Environment;
  onLog: (message: string, service: string, level: LogLevel) => void;
}

export const DatabaseView: React.FC<DatabaseViewProps> = ({ userRole, activeEnvironment, onLog }) => {
  const [backups, setBackups] = useState<Backup[]>(initialBackups);
  const [searchQuery, setSearchQuery] = useState('');
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const isReadOnly = userRole === 'viewer';

  const filteredBackups = backups.filter(b => {
    const matchesSearch = b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEnv = b.environment === activeEnvironment;
    return matchesSearch && matchesEnv;
  });

  const createBackup = () => {
    if (isReadOnly) return;
    
    setIsBackingUp(true);
    onLog(`Initiating manual database backup for ${activeEnvironment}...`, 'database', 'info');
    
    const newBackup: Backup = {
      id: `b-man-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substr(0, 19),
      size: 'Calculating...',
      status: 'in-progress',
      type: 'manual',
      environment: activeEnvironment
    };

    setBackups(prev => [newBackup, ...prev]);

    setTimeout(() => {
      setBackups(prev => prev.map(b => 
        b.id === newBackup.id ? { ...b, status: 'completed', size: '1.22 GB' } : b
      ));
      setIsBackingUp(false);
      onLog(`Database backup ${newBackup.id} completed successfully.`, 'database', 'success');
    }, 3000);
  };

  const restoreBackup = (id: string) => {
    if (isReadOnly) return;
    
    setRestoringId(id);
    onLog(`Initiating database restore from snapshot ${id}...`, 'database', 'warn');
    
    setTimeout(() => {
      setRestoringId(null);
      onLog(`Database successfully restored to state: ${id}`, 'database', 'success');
    }, 4000);
  };

  const deleteBackup = (id: string) => {
    if (isReadOnly) return;
    setBackups(prev => prev.filter(b => b.id !== id));
    onLog(`Deleted backup snapshot: ${id}`, 'database', 'info');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Database Management</h1>
          <p className="text-slate-500 mt-1">Automated snapshots, point-in-time recovery, and cluster health.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={createBackup}
            disabled={isReadOnly || isBackingUp}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
              isReadOnly || isBackingUp
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
            }`}
          >
            {isBackingUp ? <RefreshCw size={16} className="animate-spin" /> : <Plus size={16} />}
            Create Snapshot
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
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cluster Status</p>
              <p className="text-xl font-bold text-white">Healthy</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-slate-900/40 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
              <Archive size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Backups</p>
              <p className="text-xl font-bold text-white">{backups.filter(b => b.environment === activeEnvironment).length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-slate-900/40 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
              <HardDrive size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Storage Used</p>
              <p className="text-xl font-bold text-white">14.8 GB</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-slate-900/40 border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Retention</p>
              <p className="text-xl font-bold text-white">30 Days</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text"
            placeholder="Search snapshots by ID or type..."
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
          {filteredBackups.length > 0 ? filteredBackups.map((backup) => (
            <motion.div
              key={backup.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className={`p-5 bg-slate-900/40 border-slate-800 hover:border-slate-700 transition-all group ${
                backup.status === 'failed' ? 'border-rose-500/30 bg-rose-500/5' : ''
              }`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      backup.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                      backup.status === 'failed' ? 'bg-rose-500/10 text-rose-400' : 
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      <FileJson size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white group-hover:text-violet-400 transition-colors">{backup.id}</h3>
                        <Badge variant={
                          backup.status === 'completed' ? 'success' : 
                          backup.status === 'failed' ? 'danger' : 
                          'warning'
                        } className="text-[10px] py-0 px-2 h-5">
                          {backup.status}
                        </Badge>
                        <Badge variant="default" className="text-[10px] py-0 px-2 h-5 bg-slate-800 text-slate-400 border-slate-700">
                          {backup.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <Clock size={12} /> {backup.timestamp}
                        </p>
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <p className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <HardDrive size={12} /> {backup.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {backup.status === 'completed' && (
                      <button 
                        onClick={() => restoreBackup(backup.id)}
                        disabled={isReadOnly || restoringId !== null}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                          isReadOnly || restoringId !== null
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                            : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border border-amber-500/20'
                        }`}
                      >
                        {restoringId === backup.id ? <RefreshCw size={14} className="animate-spin" /> : <RotateCcw size={14} />}
                        Restore
                      </button>
                    )}
                    <button className="p-2 bg-slate-800 text-slate-400 hover:bg-slate-700 rounded-lg transition-colors" title="Download Snapshot">
                      <Download size={16} />
                    </button>
                    <div className="w-px h-4 bg-slate-800 mx-1" />
                    <button 
                      onClick={() => deleteBackup(backup.id)}
                      disabled={isReadOnly}
                      className={`p-2 transition-colors ${isReadOnly ? 'text-slate-700 cursor-not-allowed' : 'text-slate-500 hover:text-rose-400'}`}
                      title="Delete Snapshot"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )) : (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
              <Database size={48} className="text-slate-700 mb-4" />
              <p className="text-slate-500 font-medium">No snapshots found for {activeEnvironment}</p>
              <button 
                onClick={createBackup}
                className="mt-4 text-violet-400 text-xs font-bold hover:underline"
              >
                Create your first snapshot
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      <Card className="p-6 bg-glass border-neon-blue/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-neon-blue/10 rounded-lg text-neon-blue">
            <Shield size={20} />
          </div>
          <h3 className="font-black text-lg text-white uppercase tracking-tighter italic">Backup Policy & Security</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest">Automated Schedule</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">Snapshots are taken every 4 hours automatically. Retention period is set to 30 days for production environments.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest">Encryption</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">All backups are encrypted at rest using AES-256 and stored in geographically redundant cloud storage buckets.</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-black text-slate-300 uppercase tracking-widest">Integrity Checks</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed">Neural integrity checks are performed after each backup to ensure zero-corruption snapshots.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
