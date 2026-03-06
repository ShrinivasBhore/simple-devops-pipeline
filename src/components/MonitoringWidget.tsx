import React from 'react';
import { motion } from 'motion/react';
import { Cpu, HardDrive } from 'lucide-react';

interface MonitoringWidgetProps {
  label: string;
  value: number;
  icon: 'cpu' | 'memory';
  color: string;
}

export const MonitoringWidget: React.FC<MonitoringWidgetProps> = ({ label, value, icon, color }) => (
  <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-800/50">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className={`p-1.5 rounded-lg bg-slate-800 ${color}`}>
          {icon === 'cpu' ? <Cpu size={14} /> : <HardDrive size={14} />}
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-sm font-mono font-bold text-white">{value}%</span>
    </div>
    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        className={`h-full ${color.replace('text-', 'bg-')}`}
      />
    </div>
  </div>
);
