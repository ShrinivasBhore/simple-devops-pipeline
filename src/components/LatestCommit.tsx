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
  <Card className="p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-bold text-lg flex items-center gap-2 text-white">
        <Github size={18} className="text-slate-400" />
        Latest Commit
      </h3>
      <button 
        onClick={onSimulateChange}
        disabled={userRole === 'viewer'}
        className={`text-[10px] px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
          userRole === 'viewer' 
            ? 'bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed' 
            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
        }`}
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
          <p className="text-xs font-bold text-white leading-tight">{commit.message}</p>
          <p className="text-[10px] text-slate-500 mt-1">{commit.author} committed {commit.timestamp}</p>
        </div>
      </div>
      <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-800">
        <p className="text-[10px] text-slate-500 font-mono truncate">SHA: {commit.id}</p>
      </div>
    </div>
  </Card>
);
