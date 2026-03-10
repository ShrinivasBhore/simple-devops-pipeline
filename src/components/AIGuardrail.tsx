import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, ShieldCheck, RefreshCw, Info, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';
import { Prediction, Role } from '../types';
import { Card } from './Card';
import { Badge } from './Badge';

interface AIGuardrailProps {
  prediction: Prediction | null;
  isAnalyzing: boolean;
  userRole: Role;
}

export const AIGuardrail: React.FC<AIGuardrailProps> = ({ prediction, isAnalyzing, userRole }) => (
  <Card className="p-6 border-neon-purple/20 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/5 blur-3xl pointer-events-none" />
    
    <div className="flex items-center justify-between mb-8">
      <h3 className="font-black text-lg flex items-center gap-2 text-white uppercase tracking-tighter italic">
        <BrainCircuit size={20} className="text-neon-purple" />
        Neural Guardrail
      </h3>
      <div className="flex items-center gap-3">
        {userRole === 'viewer' && (
          <Badge variant="default" className="bg-glass text-slate-500 border-glass-border flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest">
            <Lock size={10} /> Secure Read
          </Badge>
        )}
        {prediction && (
          <Badge 
            variant={prediction.risk === 'Low' ? 'success' : prediction.risk === 'Medium' ? 'warning' : 'danger'}
            className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
          >
            {prediction.risk} Threat Level
          </Badge>
        )}
      </div>
    </div>

    {!prediction && !isAnalyzing ? (
      <div className="text-center py-12 bg-glass rounded-2xl border border-glass-border border-dashed">
        <div className="w-14 h-14 bg-deep-space rounded-2xl border border-glass-border flex items-center justify-center mx-auto mb-4 text-slate-700 shadow-inner">
          <ShieldCheck size={28} />
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">System idle. Awaiting neural synchronization for risk assessment.</p>
      </div>
    ) : isAnalyzing ? (
      <div className="space-y-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-neon-purple animate-pulse">
            <RefreshCw size={18} className="animate-spin" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scanning Neural Patterns...</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Processing Delta...</span>
        </div>
        <div className="h-1 bg-deep-space rounded-full overflow-hidden border border-glass-border">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="h-full bg-gradient-to-r from-neon-purple to-neon-blue shadow-[0_0_15px_rgba(188,19,254,0.5)]"
          />
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Confidence Index</span>
            <span className="text-3xl font-black text-white tracking-tighter italic">{prediction?.confidence}%</span>
          </div>
          <div className="h-1 bg-deep-space rounded-full overflow-hidden border border-glass-border">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${prediction?.confidence}%` }}
              className={`h-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${prediction?.confidence! > 80 ? 'bg-neon-green' : 'bg-neon-purple'}`}
            />
          </div>
          <div className="p-4 bg-glass rounded-2xl border border-glass-border relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon-purple/30 rounded-l-2xl" />
            <p className="text-[9px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2 tracking-widest">
              <Info size={12} className="text-neon-purple" /> Neural Recommendation
            </p>
            <p className="text-xs text-slate-300 leading-relaxed italic font-medium">"{prediction?.recommendation}"</p>
          </div>
        </div>
        <div className="space-y-4">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">Impact Vector Analysis</span>
          <div className="flex items-start gap-4 text-xs text-slate-400 bg-glass p-4 rounded-2xl border border-glass-border">
            <div className={`p-2 rounded-xl shrink-0 ${prediction?.risk === 'Low' ? 'bg-neon-green/10 text-neon-green' : 'bg-neon-purple/10 text-neon-purple'}`}>
              {prediction?.risk === 'Low' ? (
                <CheckCircle2 size={16} />
              ) : (
                <AlertTriangle size={16} />
              )}
            </div>
            <span className="leading-relaxed font-medium mt-1">{prediction?.impact}</span>
          </div>
        </div>
      </div>
    )}
  </Card>
);
