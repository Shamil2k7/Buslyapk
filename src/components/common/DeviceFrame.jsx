import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Shield, Sparkles, RefreshCw, Radio, Bus } from 'lucide-react';
import { useMobileAuth } from '../../context/MobileAuthContext';

export default function DeviceFrame({ children }) {
  const [isSimulatorMode, setIsSimulatorMode] = useState(true);
  const [currentTime, setCurrentTime] = useState('09:41');
  const { user, switchRole } = useMobileAuth();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100/80 text-gray-900 flex flex-col items-center justify-start p-2 sm:p-6 select-none font-sans">
      {/* Top Controller Bar */}
      <header className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 mb-4 py-2.5 px-4 bg-white border border-gray-200/80 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-busly-primary text-slate-900 flex items-center justify-center font-black text-base shadow-sm">
            <Bus className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-gray-900 tracking-tight">BUSLY Mobile</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                Live Companion
              </span>
            </div>
            <p className="text-[11px] text-gray-500">Teacher • Parent • Driver Portals</p>
          </div>
        </div>

        {/* Quick Role Switcher Buttons */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200">
          <span className="text-[10px] text-gray-500 px-2 font-bold uppercase tracking-wider hidden sm:inline">
            Role:
          </span>
          <button
            onClick={() => switchRole('PARENT')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              user?.role === 'PARENT'
                ? 'bg-white text-gray-900 shadow-sm font-extrabold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Parent
          </button>
          <button
            onClick={() => switchRole('TEACHER')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              user?.role === 'TEACHER'
                ? 'bg-white text-gray-900 shadow-sm font-extrabold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Teacher
          </button>
          <button
            onClick={() => switchRole('DRIVER')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              user?.role === 'DRIVER'
                ? 'bg-white text-gray-900 shadow-sm font-extrabold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Driver
          </button>
        </div>

        {/* Simulator vs Full View Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSimulatorMode(!isSimulatorMode)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm transition"
            title="Toggle between phone mockup and responsive fullscreen"
          >
            {isSimulatorMode ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden md:inline">Full Screen</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden md:inline">Phone Frame</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      {isSimulatorMode ? (
        /* iPhone 16 Pro Style Realistic Device Frame */
        <div className="relative w-full max-w-[412px] h-[860px] bg-slate-900 rounded-[52px] p-3.5 shadow-2xl border-[6px] border-slate-700/80 ring-1 ring-slate-600/40 flex flex-col overflow-hidden">
          {/* Hardware Buttons */}
          <div className="absolute -left-[9px] top-28 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
          <div className="absolute -left-[9px] top-44 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
          <div className="absolute -right-[9px] top-36 w-[3px] h-16 bg-slate-600 rounded-r-sm" />

          {/* Dynamic Island / Hardware Notch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-2.5 border border-slate-800">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <div className="w-2 h-2 rounded-full bg-slate-900" />
          </div>

          {/* iOS Status Bar (Clean light styling matching phone) */}
          <div className="relative w-full h-8 flex items-center justify-between px-6 z-40 text-xs font-bold text-gray-800 bg-[#F8FAFC] shrink-0 border-b border-gray-200/50">
            <span>{currentTime}</span>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-700">
              <span className="font-mono text-[10px] font-bold">5G</span>
              <span>📶</span>
              <span>🔋 98%</span>
            </div>
          </div>

          {/* Screen Content Wrapper (Light Theme matching website) */}
          <div className="relative flex-1 bg-[#F8FAFC] rounded-[40px] overflow-hidden flex flex-col text-gray-900 border border-gray-200/60">
            {children}
          </div>

          {/* Home Indicator Bar */}
          <div className="w-full flex justify-center py-1.5 shrink-0 z-50 bg-[#F8FAFC]">
            <div className="w-32 h-1 bg-gray-400 rounded-full" />
          </div>
        </div>
      ) : (
        /* Fullscreen Responsive Mobile View */
        <div className="w-full max-w-md min-h-[820px] bg-[#F8FAFC] text-gray-900 rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
          {children}
        </div>
      )}
    </div>
  );
}
