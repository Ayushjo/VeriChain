import React, { useMemo } from 'react';
import type { PerformanceMetric } from '../types';

interface PerformanceProps {
  metrics: PerformanceMetric[];
}

const StatCard: React.FC<{ title: string; value: string; subtext: string }> = ({ title, value, subtext }) => (
  <div className="bg-[#F8F5E6] hover:bg-white border-2 border-black p-5 transition-colors">
    <h3 className="text-gray-600 text-sm uppercase tracking-widest font-serif">{title}</h3>
    <p className="text-4xl font-black mt-3 text-black" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</p>
    <p className="text-xs text-gray-500 mt-2 font-[Courier_Prime]">{subtext}</p>
  </div>
);

export const Performance: React.FC<PerformanceProps> = ({ metrics }) => {
  
  const stats = useMemo(() => {
    const calculateAvg = (type: string) => {
      const filtered = metrics.filter(m => m.operation === type);
      if (filtered.length === 0) return 0;
      const total = filtered.reduce((acc, curr) => acc + curr.durationMs, 0);
      return Math.round(total / filtered.length);
    };

    return {
      aiAvg: calculateAvg('AI Analysis'),
      fetchAvg: calculateAvg('News Fetch'),
      hashAvg: calculateAvg('Ledger Write (Hashing)'),
      totalOps: metrics.length,
      avgRounds: (() => {
        const aiMetrics = metrics.filter(m => m.operation === 'AI Analysis' && m.details?.includes('Rounds:'));
        if (aiMetrics.length === 0) return 0;
        const totalRounds = aiMetrics.reduce((acc, curr) => {
          const match = curr.details?.match(/Rounds: (\d+)/);
          return acc + (match ? parseInt(match[1]) : 0);
        }, 0);
        return (totalRounds / aiMetrics.length).toFixed(1);
      })()
    };
  }, [metrics]);

  return (
    <div className="max-w-5xl mx-auto animate-fade-in bg-white border-2 border-black p-6 md:p-10 shadow-md">
      <h2 className="text-3xl font-black text-black mb-4 border-b-4 border-black pb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
        System Performance Metrics
      </h2>
      <p className="text-gray-700 mb-8 font-body max-w-2xl leading-relaxed">
        Real-time monitoring of AI latency, blockchain hashing difficulty, and API throughput.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        <StatCard 
          title="AI Latency" 
          value={`${stats.aiAvg}ms`} 
          subtext="Gemini Avg Response"
        />
        <StatCard 
          title="Hashing" 
          value={`${stats.hashAvg}ms`} 
          subtext="SHA-256 Calculation"
        />
        <StatCard 
          title="API Latency" 
          value={`${stats.fetchAvg}ms`} 
          subtext="News Aggregation"
        />
        <StatCard 
          title="Game Rounds" 
          value={`${stats.avgRounds}`} 
          subtext="Avg Deliberation Cycles"
        />
        <StatCard 
          title="Operations" 
          value={`${stats.totalOps}`} 
          subtext="Total Tracked Actions"
        />
      </div>

      <div className="border-4 border-black overflow-hidden bg-white">
        <div className="px-6 py-4 border-b-4 border-black bg-[#F8F5E6]">
          <h3 className="font-bold text-black font-serif uppercase tracking-widest text-sm">Operation Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body">
            <thead className="bg-black text-white font-serif uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Operation Type</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-200">
              {metrics.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 font-serif italic text-sm">No operations recorded yet.</td>
                </tr>
              ) : (
                [...metrics].reverse().map((metric, idx) => (
                  <tr key={idx} className={`transition-colors hover:bg-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F8F5E6]'}`}>
                    <td className="px-6 py-4 whitespace-nowrap font-[Courier_Prime] text-xs text-gray-700">
                      {new Date(metric.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-black text-sm">
                      {metric.operation}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-black font-[Courier_Prime] ${
                        metric.durationMs > 2000 ? 'text-red-700' : 
                        metric.durationMs > 500 ? 'text-yellow-700' : 
                        'text-green-700'
                      }`}>
                        {metric.durationMs} ms
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-serif text-gray-600 truncate max-w-xs">
                      {metric.details || '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
