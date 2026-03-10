import React from 'react';
import { motion } from 'motion/react';
import { Workflow, Home, FileCode, Terminal, Database, Settings, X, Menu, LucideIcon, Server, Box, Shield, BarChart3 } from 'lucide-react';
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
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'pipeline', label: 'CI/CD Pipeline', icon: Workflow },
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
    } bg-deep-space/80 backdrop-blur-xl border-r border-glass-border transition-all duration-500 flex flex-col z-50 relative overflow-hidden`}
  >
    {/* Background Glow */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-neon-blue blur-[80px]" />
    </div>

    <div className="p-6 flex items-center gap-3 border-b border-glass-border relative z-10">
      <div className="bg-gradient-to-br from-neon-blue to-neon-purple p-2 rounded-xl text-deep-space shrink-0 shadow-[0_0_20px_var(--neon-accent-glow)]">
        <Workflow size={24} />
      </div>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="font-black text-sm tracking-tighter whitespace-nowrap text-slate-900 dark:text-white uppercase italic">
            Nexus OS
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <div className={`w-1 h-1 rounded-full animate-pulse ${userRole === 'admin' ? 'bg-rose-400' : 'bg-neon-blue'}`} />
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">
              {userRole}
            </span>
          </div>
        </motion.div>
      )}
    </div>

    <nav className="flex-1 py-8 px-3 space-y-3 relative z-10">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setView(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative ${
            currentView === item.id 
              ? 'text-neon-blue' 
              : 'text-slate-500 hover:text-slate-200'
          }`}
        >
          {currentView === item.id && (
            <motion.div 
              layoutId="active-nav"
              className="absolute inset-0 bg-neon-blue/10 border border-neon-blue/20 rounded-xl neon-glow-blue"
            />
          )}
          <item.icon size={20} className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${currentView === item.id ? 'text-neon-blue' : 'group-hover:text-neon-blue'}`} />
          {isOpen && (
            <span className={`font-bold text-xs uppercase tracking-widest transition-all ${currentView === item.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
              {item.label}
            </span>
          )}
        </button>
      ))}
    </nav>

    <div className="p-6 border-t border-glass-border relative z-10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center p-3 rounded-xl bg-glass border border-glass-border hover:border-neon-blue/50 text-slate-500 hover:text-neon-blue transition-all duration-300"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
    </div>
  </aside>
);
