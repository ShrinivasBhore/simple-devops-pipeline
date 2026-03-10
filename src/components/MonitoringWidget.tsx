import React from 'react';
import { motion } from 'motion/react';
import { Cpu, HardDrive, Globe, Database, Heart } from 'lucide-react';

interface MonitoringWidgetProps {
  label: string;
  value: number;
  icon: 'cpu' | 'memory' | 'network' | 'disk' | 'health';
  color: string;
}

export const MonitoringWidget: React.FC<MonitoringWidgetProps> = ({ label, value, icon, color }) => {
  const Icon = {
    cpu: Cpu,
    memory: HardDrive,
    network: Globe,
    disk: Database,
    health: Heart,
  }[icon];

  const neonColor = color.includes('emerald') ? 'bg-neon-green' : 
                   color.includes('violet') ? 'bg-neon-purple' : 
                   'bg-neon-blue';

  return (
    <div className="bg-glass p-4 rounded-xl border border-glass-border relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl bg-deep-space border border-glass-border ${color} shadow-inner`}>
            <Icon size={16} />
          </div>
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{label}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-mono font-black text-white tracking-tighter">{value.toFixed(1)}%</span>
          <div className="w-8 h-0.5 bg-glass-border mt-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              className={`h-full ${neonColor}`}
            />
          </div>
        </div>
      </div>
      
      <div className="h-1 bg-deep-space rounded-full overflow-hidden border border-glass-border/50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${neonColor} shadow-[0_0_10px_rgba(0,242,255,0.3)]`}
        />
      </div>
    </div>
  );
};
