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
  <Card className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-lg flex items-center gap-2 text-white">
        <BrainCircuit size={20} className="text-violet-400" />
        AI Deployment Guardrail
      </h3>
      <div className="flex items-center gap-2">
        {userRole === 'viewer' && (
          <Badge variant="default" className="bg-slate-800 text-slate-500 border-slate-700 flex items-center gap-1">
            <Lock size={10} /> Read Only
          </Badge>
        )}
        {prediction && (
          <Badge variant={prediction.risk === 'Low' ? 'success' : prediction.risk === 'Medium' ? 'warning' : 'danger'}>
            {prediction.risk} Risk
          </Badge>
        )}
      </div>
    </div>

    {!prediction && !isAnalyzing ? (
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
          <ShieldCheck size={24} />
        </div>
        <p className="text-xs text-slate-500 mb-4">No analysis data available. Trigger a deployment to run AI risk assessment.</p>
      </div>
    ) : isAnalyzing ? (
      <div className="space-y-4 py-4">
        <div className="flex items-center gap-3 text-violet-400 animate-pulse">
          <RefreshCw size={16} className="animate-spin" />
          <span className="text-xs font-bold uppercase tracking-wider">AI is analyzing commit patterns...</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-full bg-violet-500"
          />
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Confidence Score</span>
            <span className="text-2xl font-bold text-white">{prediction?.confidence}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${prediction?.confidence}%` }}
              className={`h-full ${prediction?.confidence! > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
            />
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
              <Info size={12} /> AI Recommendation
            </p>
            <p className="text-xs text-slate-300 leading-relaxed italic">"{prediction?.recommendation}"</p>
          </div>
        </div>
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Impact Analysis</span>
          <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-800/30 p-3 rounded-lg border border-slate-800/50">
            {prediction?.risk === 'Low' ? (
              <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{prediction?.impact}</span>
          </div>
        </div>
      </div>
    )}
  </Card>
);
