
import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { PredictionDisplay } from './components/PredictionDisplay';
import { analyzeCampaignTiming } from './services/geminiService';
import { AppStatus, CampaignInput, PredictionResult } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (input: CampaignInput) => {
    setStatus(AppStatus.ANALYZING);
    setError(null);
    try {
      const result = await analyzeCampaignTiming(input);
      setPrediction(result);
      setStatus(AppStatus.RESULT);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during analysis.');
      setStatus(AppStatus.ERROR);
    }
  };

  const reset = () => {
    setStatus(AppStatus.IDLE);
    setPrediction(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {status === AppStatus.IDLE && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Timing is everything. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Optimize yours with Predictive AI.</span>
              </h2>
              <p className="text-lg text-gray-400 font-medium">
                ChronoMarket uses a high-performance predictive engine to analyze market trends, audience behavior, and niche velocity to find your perfect launch window.
              </p>
            </div>
            
            <InputForm onSubmit={handleAnalyze} isLoading={false} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              {[
                { title: 'Audience Peak Analysis', desc: 'Identifies when your specific demographic is most primed for conversion.', icon: '🎯' },
                { title: 'Channel Velocity', desc: 'Calculates algorithm momentum across platforms like TikTok, LinkedIn, and Instagram.', icon: '⚡' },
                { title: 'Sentiment Forecasting', desc: 'Predicts the emotional state of your market to ensure your messaging lands.', icon: '🧠' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl hover:border-gray-700 transition-colors">
                  <div className="text-2xl mb-3">{feature.icon}</div>
                  <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === AppStatus.ANALYZING && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Synthesizing Market Data</h3>
              <p className="text-gray-400 max-w-sm">
                Our predictive engine is currently simulating 10,000+ launch scenarios based on your target audience and niche velocity...
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-1/2 animate-pulse"></div>
              </div>
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-2/3 animate-pulse delay-75"></div>
              </div>
            </div>
          </div>
        )}

        {status === AppStatus.RESULT && prediction && (
          <PredictionDisplay data={prediction} onReset={reset} />
        )}

        {status === AppStatus.ERROR && (
          <div className="max-w-md mx-auto bg-red-900/10 border border-red-500/20 p-8 rounded-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Prediction Failed</h3>
            <p className="text-red-200/70">{error}</p>
            <button 
              onClick={reset}
              className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </main>

      <footer className="border-t border-gray-800 py-8 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500 font-medium">
            &copy; {new Date().getFullYear()} Marlon Bulaquena. Powered by advanced predictive technology. Tactical insights are based on robust modeling.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
