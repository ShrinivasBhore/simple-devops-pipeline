import React from 'react';
import { motion } from 'motion/react';
import { Workflow, CheckCircle2, Circle, Clock, Shield, Zap, Box, Globe, Terminal, Activity, RefreshCw } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

interface PipelineStep {
  id: number;
  name: string;
  description: string;
  icon: any;
  status: 'pending' | 'running' | 'success' | 'failed';
  duration?: string;
}

const steps: PipelineStep[] = [
  { id: 1, name: 'Static Analysis', description: 'Linting and code quality checks', icon: Terminal, status: 'success', duration: '12s' },
  { id: 2, name: 'Security Scan', description: 'SAST and dependency vulnerability check', icon: Shield, status: 'success', duration: '45s' },
  { id: 3, name: 'Automated Testing', description: 'Unit, integration, and E2E tests', icon: Activity, status: 'success', duration: '2m 15s' },
  { id: 4, name: 'Production Build', description: 'Optimized artifact generation', icon: Box, status: 'success', duration: '1m 40s' },
  { id: 5, name: 'Containerization', description: 'Docker image tagging and registry push', icon: Zap, status: 'success', duration: '30s' },
  { id: 6, name: 'Canary Rollout', description: '5% traffic migration to new cluster', icon: Globe, status: 'success', duration: '5m' },
  { id: 7, name: 'Full Deployment', description: '100% traffic shift and cluster sync', icon: Workflow, status: 'pending' },
  { id: 8, name: 'Health Verification', description: 'Post-deployment automated smoke tests', icon: CheckCircle2, status: 'pending' },
];

export const PipelineView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-2">Neural CI/CD Pipeline</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Automated Workflow Configuration v4.0.2</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success" className="px-4 py-2">System Optimal</Badge>
          <div className="h-10 w-px bg-glass-border hidden md:block" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-neon-blue uppercase tracking-widest">Last Successful Run</span>
            <span className="text-xs font-bold text-white">12 minutes ago</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden border-neon-blue/10">
            <div className="p-6 border-b border-glass-border bg-glass flex items-center justify-between">
              <h3 className="font-black text-sm text-white uppercase tracking-widest flex items-center gap-2">
                <Workflow size={18} className="text-neon-blue" />
                Workflow Execution Steps
              </h3>
              <span className="text-[10px] font-mono text-slate-500">8 STEPS CONFIGURED</span>
            </div>
            <div className="p-6 space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  {index !== steps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-glass-border" />
                  )}
                  <div className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    step.status === 'success' 
                      ? 'bg-neon-blue/5 border-neon-blue/20' 
                      : step.status === 'running'
                      ? 'bg-neon-purple/10 border-neon-purple/30 animate-pulse'
                      : 'bg-glass border-glass-border'
                  }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                      step.status === 'success' 
                        ? 'bg-neon-blue/20 text-neon-blue' 
                        : 'bg-deep-space text-slate-600'
                    }`}>
                      <step.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-xs font-black uppercase tracking-widest ${
                          step.status === 'success' ? 'text-white' : 'text-slate-500'
                        }`}>
                          {step.name}
                        </h4>
                        {step.duration && (
                          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                            <Clock size={10} />
                            {step.duration}
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{step.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {step.status === 'success' ? (
                        <CheckCircle2 size={18} className="text-neon-green" />
                      ) : step.status === 'running' ? (
                        <RefreshCw size={18} className="text-neon-purple animate-spin" />
                      ) : (
                        <Circle size={18} className="text-slate-800" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 border-neon-purple/20">
            <h3 className="font-black text-sm text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Shield size={18} className="text-neon-purple" />
              Pipeline Security
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-glass rounded-2xl border border-glass-border">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">SAST Enforcement</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Strict Mode</span>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
              <div className="p-4 bg-glass rounded-2xl border border-glass-border">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Artifact Signing</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">KMS Integration</span>
                  <Badge variant="success">Verified</Badge>
                </div>
              </div>
              <div className="p-4 bg-glass rounded-2xl border border-glass-border">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Deployment Gate</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">AI Approval</span>
                  <Badge variant="success">Enabled</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border-none neon-glow-blue">
            <h3 className="font-black text-sm text-white uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap size={18} className="text-neon-blue" />
              Automation Stats
            </h3>
            <div className="space-y-6 mt-6">
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  <span>Build Success Rate</span>
                  <span className="text-white">99.2%</span>
                </div>
                <div className="h-1 bg-deep-space rounded-full overflow-hidden">
                  <div className="h-full bg-neon-blue w-[99.2%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
                  <span>Test Coverage</span>
                  <span className="text-white">94.2%</span>
                </div>
                <div className="h-1 bg-deep-space rounded-full overflow-hidden">
                  <div className="h-full bg-neon-purple w-[94.2%]" />
                </div>
              </div>
              <div className="pt-4 border-t border-glass-border">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                  Neural Pipeline v4.0 utilizes distributed build clusters to reduce average cycle time by <span className="text-neon-green">34%</span>.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
