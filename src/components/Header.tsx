import React from 'react';
import { Clock, Search, Shield, ChevronDown, RefreshCw } from 'lucide-react';
import { View, User, Role } from '../types';

interface HeaderProps {
  view: View;
  version: string;
  user: User;
  onRoleChange: (role: Role) => void;
}

export const Header: React.FC<HeaderProps> = ({ view, version, user, onRoleChange }) => {
  const [isRoleMenuOpen, setIsRoleMenuOpen] = React.useState(false);

  const roles: Role[] = ['admin', 'developer', 'viewer'];

  return (
    <header className="h-16 bg-deep-space/50 backdrop-blur-md border-b border-glass-border flex items-center justify-between px-8 shrink-0 relative z-40">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <h2 className="text-[10px] font-black text-neon-blue uppercase tracking-[0.3em] mb-0.5">Current Module</h2>
          <span className="text-sm font-bold text-white uppercase tracking-widest">{view}</span>
        </div>
        <div className="h-8 w-px bg-glass-border"></div>
        <div className="hidden lg:flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-neon-blue" />
            <span>Uptime: 99.99%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={12} className="text-neon-purple" />
            <span>Encrypted Session</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden xl:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input 
            type="text" 
            placeholder="Search neural network..." 
            className="pl-10 pr-4 py-2 bg-glass border border-glass-border rounded-xl text-[10px] font-bold text-slate-300 focus:ring-1 focus:ring-neon-blue/50 focus:border-neon-blue/50 transition-all w-64 uppercase tracking-widest placeholder:text-slate-700"
          />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-glass border border-glass-border rounded-xl hover:border-neon-blue/50 transition-all neon-glow-blue"
          >
            <Shield size={14} className={user.role === 'admin' ? 'text-rose-400' : user.role === 'developer' ? 'text-neon-purple' : 'text-neon-blue'} />
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{user.role}</span>
            <ChevronDown size={12} className="text-slate-500" />
          </button>
          
          {isRoleMenuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-deep-space/95 backdrop-blur-2xl border border-glass-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden">
              <div className="p-3 border-b border-glass-border bg-glass">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Authorization Level</p>
              </div>
              <div className="p-1">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      onRoleChange(role);
                      setIsRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-xl ${
                      user.role === role 
                        ? 'bg-neon-blue/10 text-neon-blue' 
                        : 'text-slate-400 hover:bg-glass hover:text-white'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 px-4 py-1.5 bg-glass border border-glass-border rounded-xl">
          <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_10px_#39ff14]" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">v{version}</span>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-neon-blue/5 border border-neon-blue/20 rounded-xl">
          <RefreshCw size={10} className="text-neon-blue animate-spin-slow" />
          <span className="text-[8px] font-black text-neon-blue uppercase tracking-widest">API Optimized</span>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-glass-border">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">{user.name}</span>
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Authorized User</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple p-[1px] shadow-lg shadow-neon-blue/10">
            <div className="w-full h-full rounded-[14px] bg-deep-space flex items-center justify-center text-white font-black text-xs overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                user.name.split(' ').map(n => n[0]).join('')
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
