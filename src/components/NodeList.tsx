import React from 'react';
import { Server, Activity, Shield, AlertTriangle } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

interface Node {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  cpu: number;
  memory: number;
  uptime: string;
  region: string;
}

const nodes: Node[] = [
  { id: 'n1', name: 'prod-api-01', status: 'healthy', cpu: 12, memory: 45, uptime: '14d 2h', region: 'us-east-1' },
  { id: 'n2', name: 'prod-api-02', status: 'healthy', cpu: 8, memory: 42, uptime: '14d 2h', region: 'us-east-1' },
  { id: 'n3', name: 'prod-db-master', status: 'healthy', cpu: 24, memory: 78, uptime: '45d 6h', region: 'us-east-1' },
  { id: 'n4', name: 'prod-redis-01', status: 'warning', cpu: 65, memory: 88, uptime: '3d 12h', region: 'us-west-2' },
  { id: 'n5', name: 'prod-worker-01', status: 'healthy', cpu: 45, memory: 30, uptime: '1d 4h', region: 'eu-central-1' },
];

export const NodeList: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Active Infrastructure Nodes</h3>
        <Badge className="bg-slate-800 text-slate-400 border-slate-700">
          {nodes.length} Nodes Active
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {nodes.map((node) => (
          <div key={node.id}>
            <Card className="p-4 bg-slate-900/40 border-slate-800/50 hover:border-violet-500/30 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    node.status === 'healthy' ? 'bg-emerald-500/10 text-emerald-400' : 
                    node.status === 'warning' ? 'bg-amber-500/10 text-amber-400' : 
                    'bg-rose-500/10 text-rose-400'
                  }`}>
                    <Server size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-violet-400 transition-colors">{node.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-slate-500 font-mono">{node.id}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{node.region}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase mb-1">CPU</p>
                    <p className="text-xs font-mono font-bold text-white">{node.cpu}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase mb-1">RAM</p>
                    <p className="text-xs font-mono font-bold text-white">{node.memory}%</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-[10px] text-slate-500 uppercase mb-1">Uptime</p>
                    <p className="text-xs font-mono font-bold text-slate-300">{node.uptime}</p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      node.status === 'healthy' ? 'bg-emerald-500' : 
                      node.status === 'warning' ? 'bg-amber-500' : 
                      'bg-rose-500'
                    } animate-pulse`} />
                    <span className="text-[10px] font-bold uppercase text-slate-400">{node.status}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
