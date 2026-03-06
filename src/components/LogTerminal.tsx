import React from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

interface LogTerminalProps {
  logs: string[];
}

export const LogTerminal: React.FC<LogTerminalProps> = ({ logs }) => (
  <div className="bg-[#0d1117] rounded-xl border border-slate-800 p-4 font-mono text-xs h-[300px] overflow-y-auto custom-scrollbar">
    {logs.map((log, i) => {
      let color = 'text-slate-400';
      if (log.includes('ERROR') || log.includes('CRITICAL')) color = 'text-rose-400';
      if (log.includes('SUCCESS') || log.includes('Success')) color = 'text-emerald-400';
      if (log.includes('AI:')) color = 'text-violet-400';
      if (log.includes('WARNING')) color = 'text-amber-400';
      
      return (
        <div key={i} className={`mb-1.5 flex gap-3 ${color}`}>
          <span className="opacity-30 select-none">{i + 1}</span>
          <span className="break-all">{log}</span>
        </div>
      );
    })}
    <div className="animate-pulse inline-block w-2 h-4 bg-slate-700 ml-10 mt-1" />
  </div>
);
