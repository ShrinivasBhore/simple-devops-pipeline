import React from 'react';
import { motion } from 'motion/react';
import { Workflow, Home, FileCode, Terminal, Database, Settings, X, Menu, LucideIcon, Server, Box, Shield } from 'lucide-react';
import { View, Role } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentView: View;
  setView: (view: View) => void;
  userRole: Role;
}

const navItems: { id: View; label: string; icon: LucideIcon }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'infrastructure', label: 'Infrastructure', icon: Server },
  { id: 'containers', label: 'Containers', icon: Box },
  { id: 'guide', label: 'Project Guide', icon: FileCode },
  { id: 'logs', label: 'System Logs', icon: Terminal },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, currentView, setView, userRole }) => (
  <aside 
    className={`${
      isOpen ? 'w-64' : 'w-20'
    } bg-[#0d1117] border-r border-slate-800 transition-all duration-300 flex flex-col z-50`}
  >
    <div className="p-6 flex items-center gap-3 border-b border-slate-800">
      <div className="bg-violet-600 p-2 rounded-xl text-white shrink-0 shadow-lg shadow-violet-900/40">
        <Workflow size={24} />
      </div>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col"
        >
          <span className="font-bold text-sm tracking-tight whitespace-nowrap text-white">
            DevOps v2.5
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <Shield size={10} className={userRole === 'admin' ? 'text-rose-400' : userRole === 'developer' ? 'text-violet-400' : 'text-slate-500'} />
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
              {userRole}
            </span>
          </div>
        </motion.div>
      )}
    </div>

    <nav className="flex-1 py-6 px-3 space-y-2">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            currentView === item.id 
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/40' 
              : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
          }`}
        >
          <item.icon size={20} className="shrink-0" />
          {isOpen && <span className="font-medium">{item.label}</span>}
        </button>
      ))}
    </nav>

    <div className="p-4 border-t border-slate-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-800 text-slate-500 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </div>
  </aside>
);
