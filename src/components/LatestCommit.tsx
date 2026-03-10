import React from 'react';
import { Github, History, RefreshCw } from 'lucide-react';
import { Commit, Role } from '../types';
import { Card } from './Card';

interface LatestCommitProps {
  commit: Commit;
  onSimulateChange: () => void;
  userRole: Role;
}

export const LatestCommit: React.FC<LatestCommitProps> = ({ commit, onSimulateChange, userRole }) => (
  <Card className="p-6 border-neon-blue/10">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-black text-lg flex items-center gap-2 text-white uppercase tracking-tighter italic">
        <Github size={18} className="text-neon-blue" />
        Neural Commit
      </h3>
      <button 
        onClick={onSimulateChange}
        disabled={userRole === 'viewer'}
        className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl transition-all flex items-center gap-2 ${
          userRole === 'viewer' 
            ? 'bg-glass text-slate-600 border border-glass-border cursor-not-allowed' 
            : 'bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue border border-neon-blue/30 neon-glow-blue'
        }`}
      >
        <RefreshCw size={10} />
        Inject Delta
      </button>
    </div>
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-glass border border-glass-border flex items-center justify-center text-neon-blue shrink-0 shadow-inner">
          <History size={18} />
        </div>
        <div>
          <p className="text-xs font-black text-white leading-relaxed tracking-tight">{commit.message}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[9px] text-neon-blue font-bold uppercase tracking-widest">{commit.author}</span>
            <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">• {commit.timestamp}</span>
          </div>
        </div>
      </div>
      <div className="p-3 bg-glass rounded-xl border border-glass-border flex items-center justify-between">
        <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">Hash: {commit.id}</p>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-neon-blue" />
          <div className="w-1 h-1 rounded-full bg-neon-blue/50" />
          <div className="w-1 h-1 rounded-full bg-neon-blue/20" />
        </div>
      </div>
    </div>
  </Card>
);
