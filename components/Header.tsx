
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">ChronoMarket <span className="text-indigo-400">Optimizer</span></h1>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Predictive Launch Intel</p>
          </div>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Historical Data</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a>
        </nav>
      </div>
    </header>
  );
};
