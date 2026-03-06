import React from 'react';
import { Clock, Search } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  view: View;
  version: string;
}

export const Header: React.FC<HeaderProps> = ({ view, version }) => (
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
);
