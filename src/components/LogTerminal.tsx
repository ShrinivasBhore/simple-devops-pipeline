import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { LogEntry } from '../types';

interface LogTerminalProps {
  logs: LogEntry[];
}

export const LogTerminal: React.FC<LogTerminalProps> = ({ logs }) => (
  <div className="bg-[#0d1117] rounded-xl border border-slate-800 p-4 font-mono text-xs h-[300px] overflow-y-auto custom-scrollbar">
    {logs.map((log, i) => {
      let color = 'text-slate-400';
      if (log.level === 'error') color = 'text-rose-400';
      if (log.level === 'success') color = 'text-emerald-400';
      if (log.level === 'warn') color = 'text-amber-400';
      if (log.service === 'ai') color = 'text-violet-400';
      
      return (
        <div key={log.id} className={`mb-1.5 flex gap-3 ${color}`}>
          <span className="opacity-30 select-none">{i + 1}</span>
          <span className="opacity-50">[{log.timestamp}]</span>
          <span className="opacity-70 font-bold">[{log.service.toUpperCase()}]</span>
          <span className="break-all">{log.message}</span>
        </div>
      );
    })}
    <div className="animate-pulse inline-block w-2 h-4 bg-slate-700 ml-10 mt-1" />
  </div>
);
