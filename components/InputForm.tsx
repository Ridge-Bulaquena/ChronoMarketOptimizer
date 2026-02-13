
import React, { useState } from 'react';
import { CampaignInput } from '../types';

interface Props {
  onSubmit: (input: CampaignInput) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<CampaignInput>({
    campaignName: '',
    niche: '',
    targetAudience: '',
    budgetRange: 'Medium ($1k-$10k)',
    primaryChannel: 'Instagram',
    goals: '',
    historicalContext: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Campaign Name</label>
          <input 
            required
            name="campaignName"
            value={formData.campaignName}
            onChange={handleChange}
            placeholder="e.g. Summer Solstice Launch"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Industry Niche</label>
          <input 
            required
            name="niche"
            value={formData.niche}
            onChange={handleChange}
            placeholder="e.g. Sustainable Fashion"
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-1">Target Audience Profile</label>
        <textarea 
          required
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleChange}
          rows={2}
          placeholder="Describe your ideal customer (demographics, interests, behavior)..."
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Budget Allocation</label>
          <select 
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none"
          >
            {/* Fixed: Escaped '<' character to prevent JSX from parsing it as a tag start */}
            <option>Bootstrap (&lt;$1k)</option>
            <option>Medium ($1k-$10k)</option>
            <option>Enterprise ($10k+)</option>
            <option>Aggressive Scale ($100k+)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Primary Distribution Channel</label>
          <select 
            name="primaryChannel"
            value={formData.primaryChannel}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none"
          >
            <option>Instagram</option>
            <option>TikTok</option>
            <option>X / Twitter</option>
            <option>LinkedIn</option>
            <option>Email Marketing</option>
            <option>YouTube</option>
            <option>Multi-Channel Blitz</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-1">Primary Campaign Goals</label>
        <input 
          required
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          placeholder="e.g. 500 new trials, $50k in revenue, Brand awareness"
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400 ml-1">Historical Context (Optional)</label>
        <textarea 
          name="historicalContext"
          value={formData.historicalContext}
          onChange={handleChange}
          rows={3}
          placeholder="Any past performance data or seasonal trends we should know?"
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
        />
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Predicting Timing...</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Generate Optimization Forecast</span>
          </>
        )}
      </button>
    </form>
  );
};
