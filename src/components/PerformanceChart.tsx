import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  cpu: number;
  memory: number;
}

interface PerformanceChartProps {
  data: DataPoint[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#39ff14" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#39ff14" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="time" 
            hide 
          />
          <YAxis 
            hide 
            domain={[0, 100]} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(5, 7, 10, 0.9)', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              fontSize: '10px',
              backdropFilter: 'blur(10px)'
            }}
            itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
          />
          <Area 
            type="monotone" 
            dataKey="cpu" 
            stroke="#00f2ff" 
            fillOpacity={1} 
            fill="url(#colorCpu)" 
            strokeWidth={2}
            isAnimationActive={false}
          />
          <Area 
            type="monotone" 
            dataKey="memory" 
            stroke="#39ff14" 
            fillOpacity={1} 
            fill="url(#colorMem)" 
            strokeWidth={2}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
