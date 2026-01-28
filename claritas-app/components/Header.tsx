import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/20 bg-white/30 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={onLogoClick}
        >
          <div className="relative w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Sparkles className="text-white" size={24} />
          </div>

          <span className="text-2xl font-black tracking-tighter text-slate-800">
            Claritas{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-indigo-600">
              Learning
            </span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-indigo-600 transition-colors">Courses</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Resources</a>
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
