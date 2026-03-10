import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Clock, 
  Zap, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  Download,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Card } from './Card';
import { Badge } from './Badge';

const throughputData = [
  { time: '00:00', requests: 4200 },
  { time: '04:00', requests: 3100 },
  { time: '08:00', requests: 7800 },
  { time: '12:00', requests: 9200 },
  { time: '16:00', requests: 8500 },
  { time: '20:00', requests: 6400 },
  { time: '23:59', requests: 5100 },
];

const responseTimeData = [
  { time: '00:00', p95: 120, p99: 180 },
  { time: '04:00', p95: 110, p99: 165 },
  { time: '08:00', p95: 145, p99: 210 },
  { time: '12:00', p95: 160, p99: 240 },
  { time: '16:00', p95: 155, p99: 230 },
  { time: '20:00', p95: 130, p99: 195 },
  { time: '23:59', p95: 125, p99: 185 },
];

const deploymentData = [
  { name: 'Mon', count: 12 },
  { name: 'Tue', count: 18 },
  { name: 'Wed', count: 15 },
  { name: 'Thu', count: 22 },
  { name: 'Fri', count: 19 },
  { name: 'Sat', count: 8 },
  { name: 'Sun', count: 5 },
];

const errorDistribution = [
  { name: '4xx Errors', value: 65, color: '#F27D26' },
  { name: '5xx Errors', value: 25, color: '#F43F5E' },
  { name: 'Timeouts', value: 10, color: '#A855F7' },
];

export const AnalyticsView: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic mb-2">Performance Analytics</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Real-time system telemetry and historical insights</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-glass border border-glass-border rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">
            <Calendar size={14} /> Last 24 Hours
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-glass border border-glass-border rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neon-blue text-deep-space rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* High-level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg Throughput', value: '8.4k', unit: 'req/s', change: '+12.5%', trend: 'up', icon: Activity, color: 'text-neon-blue' },
          { label: 'P95 Latency', value: '142', unit: 'ms', change: '-4.2%', trend: 'down', icon: Clock, color: 'text-neon-purple' },
          { label: 'Error Rate', value: '0.04', unit: '%', change: '+0.01%', trend: 'up', icon: Zap, color: 'text-rose-400' },
          { label: 'Uptime', value: '99.99', unit: '%', change: 'Stable', trend: 'neutral', icon: TrendingUp, color: 'text-neon-green' },
        ].map((metric, i) => (
          <div key={i}>
            <Card className="p-6 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-glass border border-glass-border ${metric.color}`}>
                  <metric.icon size={20} />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase ${
                  metric.trend === 'up' ? 'text-neon-green' : 
                  metric.trend === 'down' ? 'text-rose-400' : 'text-slate-500'
                }`}>
                  {metric.trend === 'up' ? <ArrowUpRight size={12} /> : 
                   metric.trend === 'down' ? <ArrowDownRight size={12} /> : null}
                  {metric.change}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{metric.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{metric.value}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">{metric.unit}</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-glass-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Throughput Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Activity size={18} className="text-neon-blue" />
              Request Throughput
            </h3>
            <Badge variant="success">Real-time</Badge>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughputData}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F2FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00F2FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748B" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#050505', 
                    border: '1px solid #1E293B',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontFamily: 'monospace'
                  }}
                  itemStyle={{ color: '#00F2FF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="#00F2FF" 
                  fillOpacity={1} 
                  fill="url(#colorRequests)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Latency Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <Clock size={18} className="text-neon-purple" />
              Response Latency (ms)
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-purple" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">P95</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">P99</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748B" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#050505', 
                    border: '1px solid #1E293B',
                    borderRadius: '12px',
                    fontSize: '10px'
                  }}
                />
                <Area 
                  type="stepAfter" 
                  dataKey="p95" 
                  stroke="#BC13FE" 
                  fill="transparent" 
                  strokeWidth={2}
                />
                <Area 
                  type="stepAfter" 
                  dataKey="p99" 
                  stroke="#F43F5E" 
                  fill="transparent" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Deployment Frequency */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={18} className="text-neon-green" />
              Deployment Frequency
            </h3>
            <span className="text-[10px] font-mono text-slate-500">AVG 14.2 / DAY</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deploymentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#1E293B', opacity: 0.4 }}
                  contentStyle={{ 
                    backgroundColor: '#050505', 
                    border: '1px solid #1E293B',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {deploymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#00FF00' : '#1E293B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Error Distribution */}
        <Card className="p-6">
          <h3 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-widest mb-8 flex items-center gap-2">
            <BarChart3 size={18} className="text-rose-400" />
            Error Distribution
          </h3>
          <div className="h-[200px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={errorDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {errorDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-black text-white">100%</span>
              <span className="text-[8px] font-bold text-slate-500 uppercase">Total Errors</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {errorDistribution.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.name}</span>
                </div>
                <span className="text-[10px] font-mono text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
