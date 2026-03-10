import React from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  GitCommit, 
  ExternalLink,
  ChevronRight,
  Globe,
  FlaskConical,
  Code2
} from 'lucide-react';
import { Deployment, Environment } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';

interface DeploymentHistoryProps {
  deployments: Deployment[];
}

export const DeploymentHistory: React.FC<DeploymentHistoryProps> = ({ deployments }) => {
  const getEnvIcon = (env: Environment) => {
    switch (env) {
      case 'production': return <Globe size={12} />;
      case 'staging': return <FlaskConical size={12} />;
      case 'development': return <Code2 size={12} />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-black text-lg flex items-center gap-2 text-white uppercase tracking-tighter italic">
          <History size={20} className="text-neon-blue" />
          Deployment History
        </h3>
        <button className="text-[10px] text-slate-500 font-black hover:text-white uppercase tracking-[0.2em] transition-colors">View Full Report</button>
      </div>

      <div className="space-y-4">
        {deployments.map((deployment, index) => (
          <motion.div
            key={deployment.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative"
          >
            <div className="flex items-center justify-between p-4 bg-glass border border-glass-border rounded-xl hover:border-neon-blue/30 transition-all group-hover:bg-neon-blue/5">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  deployment.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                  deployment.status === 'failed' ? 'bg-rose-500/10 text-rose-400' :
                  'bg-amber-500/10 text-amber-400'
                }`}>
                  {deployment.status === 'success' ? <CheckCircle2 size={18} /> : 
                   deployment.status === 'failed' ? <XCircle size={18} /> : 
                   <Clock size={18} className="animate-spin-slow" />}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white tracking-tight">v{deployment.version}</span>
                    <Badge variant={
                      deployment.status === 'success' ? 'success' : 
                      deployment.status === 'failed' ? 'danger' : 
                      'warning'
                    } className="text-[8px] py-0 px-1.5 h-4">
                      {deployment.status}
                    </Badge>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800/50 border border-slate-700/50">
                      <span className="text-slate-500">{getEnvIcon(deployment.environment)}</span>
                      <span className="text-[8px] font-black uppercase tracking-tighter text-slate-500">{deployment.environment}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                      <GitCommit size={10} />
                      {deployment.commitHash}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-slate-800" />
                    <span className="text-[10px] text-slate-500 font-mono">{deployment.timestamp}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-0.5">Duration</span>
                  <span className="text-[10px] font-mono text-slate-400">{deployment.duration}</span>
                </div>
                <button className="p-2 text-slate-600 hover:text-neon-blue transition-colors">
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-6 py-3 border border-dashed border-glass-border rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hover:border-neon-blue/30 hover:text-neon-blue transition-all">
        Load Older Deployments
      </button>
    </Card>
  );
};
