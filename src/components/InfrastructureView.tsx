import React from 'react';
import { Server, Activity, Shield, AlertTriangle, Globe, Database, HardDrive, Cpu, Network } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from './Card';
import { Badge } from './Badge';
import { MonitoringWidget } from './MonitoringWidget';
import { PerformanceChart } from './PerformanceChart';
import { NodeList } from './NodeList';

import { View, Role } from '../types';

interface InfrastructureViewProps {
  cpuUsage: number;
  memUsage: number;
  netUsage: number;
  diskUsage: number;
  performanceData: {time: string, cpu: number, memory: number}[];
  userRole: Role;
}

export const InfrastructureView: React.FC<InfrastructureViewProps> = ({ 
  cpuUsage, 
  memUsage, 
  netUsage, 
  diskUsage, 
  performanceData,
  userRole
}) => {
  const isReadOnly = userRole === 'viewer';
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Infrastructure Monitoring</h1>
          <p className="text-slate-500 mt-1">Real-time health and resource utilization across all nodes.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            <Activity size={12} className="mr-1" />
            All Systems Operational
          </Badge>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors border border-slate-700">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <MonitoringWidget label="Cluster CPU" value={cpuUsage} icon="cpu" color="text-violet-500" />
        <MonitoringWidget label="Cluster RAM" value={memUsage} icon="memory" color="text-emerald-500" />
        <MonitoringWidget label="Network Load" value={netUsage} icon="network" color="text-sky-500" />
        <MonitoringWidget label="Disk I/O" value={diskUsage} icon="disk" color="text-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6 bg-[#0d1117] border-slate-800 shadow-2xl shadow-black/50 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                  <Activity size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Performance Trends</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Aggregated Cluster Metrics</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">CPU</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Memory</span>
                </div>
              </div>
            </div>
            <PerformanceChart data={performanceData} />
          </Card>

          <NodeList />
        </div>

        <div className="space-y-8">
          <Card className="p-6 bg-[#0d1117] border-slate-800">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Global Infrastructure</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-sky-400" />
                  <span className="text-sm font-medium text-slate-300">US East (N. Virginia)</span>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-sky-400" />
                  <span className="text-sm font-medium text-slate-300">US West (Oregon)</span>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Active</Badge>
              </div>
              <div className="flex items-center justify-between opacity-50">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-500">EU Central (Frankfurt)</span>
                </div>
                <Badge className="bg-slate-800 text-slate-500 border-slate-700">Offline</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-[#0d1117] border-slate-800">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Resource Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Frontend (React)</span>
                <span className="text-xs font-mono text-white">12%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-violet-500 w-[12%]" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Backend (Express)</span>
                <span className="text-xs font-mono text-white">45%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[45%]" />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Database (MongoDB)</span>
                <span className="text-xs font-mono text-white">32%</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 w-[32%]" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-violet-600/10 border-violet-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-violet-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Security Guard</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              AI-powered security monitoring is active. No unauthorized access attempts detected in the last 24 hours.
            </p>
            <button 
              disabled={isReadOnly}
              className={`w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${
                isReadOnly 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                  : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg'
              }`}
            >
              View Security Logs
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
};
