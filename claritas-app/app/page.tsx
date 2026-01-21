"use client";
import React from 'react';
import LandingView from '../components/LandingView';

interface PageProps {
  onStart: () => void;
}

export default function HomePage({ onStart }: PageProps) {
  return (
    <div className="min-h-screen selection:bg-indigo-500/30">
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer" >
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 animate-pulse"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center border border-white/20">
                <span className="text-white font-black text-xl">C</span>
              </div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Claritas <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Learning</span></span>
          </div>
          <div className="flex items-center gap-6">
            <button
              className="px-5 py-2.5 rounded-full bg-white text-slate-950 text-sm font-bold hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
            >
              Launch Pathfinder
            </button>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-32">
        <LandingView onStart={onStart} />
      </div>
    </div>
  );
}
