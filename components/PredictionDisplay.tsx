
import React from 'react';
import { PredictionResult } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: PredictionResult;
  onReset: () => void;
}

export const PredictionDisplay: React.FC<Props> = ({ data, onReset }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Stats */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-white">Predicted Engagement Horizon</h2>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 font-mono">Confidence:</span>
                <span className="text-xs font-bold text-indigo-400">{(data.confidenceScore * 100).toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.forecastData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                  <XAxis dataKey="time" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="engagementScore" 
                    stroke="#6366f1" 
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Strategic Rationale</h3>
            <p className="text-gray-200 leading-relaxed text-lg italic">
              "{data.rationale}"
            </p>
          </div>
        </div>

        {/* Action Panel */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-500/10">
            <h3 className="text-indigo-100 text-sm font-medium mb-1">Optimal Launch Window</h3>
            <p className="text-3xl font-bold mb-1">{data.optimalLaunchDate}</p>
            <p className="text-xl font-medium text-indigo-100">{data.optimalLaunchTime}</p>
            
            <div className="mt-6 pt-6 border-t border-indigo-500 flex items-center justify-between">
              <span className="text-sm text-indigo-100 font-medium">Predicted Sentiment</span>
              <span className="bg-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{data.sentimentAnalysis}</span>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Tactical Recommendations</h3>
            <ul className="space-y-4">
              {data.recommendations.map((rec, i) => (
                <li key={i} className="flex flex-col space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{rec.title}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      rec.impact === 'High' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {rec.impact} Impact
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{rec.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={onReset}
            className="w-full py-4 rounded-xl border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-all font-medium text-sm"
          >
            Optimize New Campaign
          </button>
        </div>
      </div>
    </div>
  );
};
