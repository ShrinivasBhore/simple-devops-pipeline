import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Workflow, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Shield, 
  Zap, 
  Box, 
  Globe, 
  Terminal, 
  Activity, 
  RefreshCw,
  AlertTriangle,
  RotateCcw,
  Play
} from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { useNotifications } from '../NotificationContext';

interface PipelineStep {
  id: number;
  name: string;
  description: string;
  icon: any;
  status: 'pending' | 'running' | 'success' | 'failed';
  duration?: string;
}

const initialSteps: PipelineStep[] = [
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
  const { addNotification } = useNotifications();
  const [steps, setSteps] = useState<PipelineStep[]>(initialSteps);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isRollingBack, setIsRollingBack] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState<'idle' | 'running' | 'failed' | 'success' | 'rollback'>('idle');

  const runPipeline = async () => {
    setIsDeploying(true);
    setPipelineStatus('running');
    addNotification('Deployment Started', 'Neural CI/CD pipeline v4.0.2 has been initiated.', 'info');
    
    // Reset steps to pending starting from step 7
    setSteps(prev => prev.map(s => s.id >= 7 ? { ...s, status: 'pending' } : s));

    const runStep = async (stepId: number, duration: number, shouldFail: boolean = false) => {
      setSteps(prev => prev.map(s => s.id === stepId ? { ...s, status: 'running' } : s));
      await new Promise(resolve => setTimeout(resolve, duration));
      
      if (shouldFail) {
        setSteps(prev => prev.map(s => s.id === stepId ? { ...s, status: 'failed' } : s));
        return false;
      }
      
      setSteps(prev => prev.map(s => s.id === stepId ? { ...s, status: 'success', duration: `${(duration/1000).toFixed(1)}s` } : s));
      return true;
    };

    // Step 7: Full Deployment
    const step7Success = await runStep(7, 2000);
    if (!step7Success) return;

    // Step 8: Health Verification (Simulate Failure)
    const step8Success = await runStep(8, 3000, true);
    
    if (!step8Success) {
      setPipelineStatus('failed');
      addNotification('Deployment Failed', 'Critical regression detected in Health Verification step.', 'error');
      // Trigger automatic rollback after a short delay
      setTimeout(() => triggerRollback(), 2000);
    } else {
      setPipelineStatus('success');
      setIsDeploying(false);
      addNotification('Deployment Successful', 'All systems verified. v4.0.2 is now live.', 'success');
    }
  };

  const triggerRollback = async () => {
    setIsRollingBack(true);
    setPipelineStatus('rollback');
    addNotification('Auto-Rollback Initiated', 'System is reverting to the last stable version (v4.0.1).', 'warning');
    
    // Simulate rollback process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset steps to last stable state (all success except maybe the one that failed is now reverted)
    setSteps(prev => prev.map(s => ({ ...s, status: 'success' })));
    
    setIsRollingBack(false);
    setIsDeploying(false);
    setPipelineStatus('idle');
    addNotification('Rollback Complete', 'System stability restored. Reverted to v4.0.1.', 'success');
  };

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
          <AnimatePresence mode="wait">
            {pipelineStatus === 'failed' ? (
              <motion.div
                key="failed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Badge variant="danger" className="px-4 py-2 flex items-center gap-2">
                  <AlertTriangle size={14} /> Deployment Failed
                </Badge>
              </motion.div>
            ) : pipelineStatus === 'rollback' ? (
              <motion.div
                key="rollback"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Badge variant="warning" className="px-4 py-2 flex items-center gap-2">
                  <RotateCcw size={14} className="animate-spin" /> Auto-Rollback Active
                </Badge>
              </motion.div>
            ) : (
              <motion.div
                key="optimal"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Badge variant="success" className="px-4 py-2">System Optimal</Badge>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="h-10 w-px bg-glass-border hidden md:block" />
          
          <button 
            onClick={runPipeline}
            disabled={isDeploying}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
              isDeploying 
                ? 'bg-glass text-slate-500 border border-glass-border cursor-not-allowed' 
                : 'bg-neon-blue text-deep-space hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] active:scale-95'
            }`}
          >
            {isDeploying ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" />
                Trigger Smart Deployment
              </>
            )}
          </button>
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
              <span className="text-[10px] font-mono text-slate-500">{steps.length} STEPS CONFIGURED</span>
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
                      ? 'bg-neon-purple/10 border-neon-purple/30 animate-pulse shadow-[0_0_15px_rgba(188,19,254,0.1)]'
                      : step.status === 'failed'
                      ? 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                      : 'bg-glass border-glass-border'
                  }`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${
                      step.status === 'success' 
                        ? 'bg-neon-blue/20 text-neon-blue' 
                        : step.status === 'failed'
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-deep-space text-slate-600'
                    }`}>
                      <step.icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-xs font-black uppercase tracking-widest ${
                          step.status === 'success' ? 'text-white' : 
                          step.status === 'failed' ? 'text-rose-400' :
                          'text-slate-500'
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
                      ) : step.status === 'failed' ? (
                        <AlertTriangle size={18} className="text-rose-400" />
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
              Smart Rollback Engine
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-glass rounded-2xl border border-glass-border">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Failure Detection</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Neural Health Check</span>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
              <div className="p-4 bg-glass rounded-2xl border border-glass-border">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Rollback Strategy</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Instant Revert</span>
                  <Badge variant="success">Configured</Badge>
                </div>
              </div>
              <div className="p-4 bg-glass rounded-2xl border border-glass-border">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Stability Threshold</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">99.9% Uptime</span>
                  <Badge variant="success">Locked</Badge>
                </div>
              </div>
            </div>
            
            {isRollingBack && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl"
              >
                <div className="flex items-center gap-3 text-rose-400 mb-2">
                  <RotateCcw size={16} className="animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Rolling back to v4.0.1</span>
                </div>
                <p className="text-[9px] text-slate-500 font-bold uppercase leading-relaxed">
                  Deployment failure detected in Health Verification. Reverting traffic to the last stable production cluster.
                </p>
              </motion.div>
            )}
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
