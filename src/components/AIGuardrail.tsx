import React from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, ShieldCheck, RefreshCw, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PredictionResult } from '../types';
import { Card, Badge } from './UI';

interface AIGuardrailProps {
  prediction: PredictionResult | null;
  isAnalyzing: boolean;
}

export const AIGuardrail: React.FC<AIGuardrailProps> = ({ prediction, isAnalyzing }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-lg flex items-center gap-2 text-white">
        <BrainCircuit size={20} className="text-violet-400" />
        AI Deployment Guardrail
      </h3>
      {prediction && (
        <Badge variant={prediction.riskLevel === 'low' ? 'success' : prediction.riskLevel === 'medium' ? 'warning' : 'danger'}>
          {prediction.riskLevel} Risk
        </Badge>
      )}
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
            <span className="text-[10px] font-bold text-slate-500 uppercase">Success Probability</span>
            <span className="text-2xl font-bold text-white">{prediction?.successProbability}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${prediction?.successProbability}%` }}
              className={`h-full ${prediction?.successProbability! > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
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
          <span className="text-[10px] font-bold text-slate-500 uppercase">Risk Factors</span>
          {prediction?.factors.map((factor, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/30 p-2 rounded-lg border border-slate-800/50">
              {prediction.riskLevel === 'low' ? (
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle size={14} className="text-amber-500 shrink-0" />
              )}
              <span>{factor}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </Card>
);
