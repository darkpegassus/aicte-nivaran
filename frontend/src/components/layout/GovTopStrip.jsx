import React from 'react';
import { Globe, Eye } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

const GovTopStrip = ({ showSkipToMain = false }) => {
  const { decreaseFont, resetFont, increaseFont, contrast, toggleContrast, lang, toggleLanguage } = useAccessibility();

  return (
    <div className="bg-[#0b1e38] text-white text-[11px] font-sans border-b border-white/10 px-4 py-1 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wide uppercase text-slate-200">
            Government of India | भारत सरकार
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline text-slate-300">
            Ministry of Education &bull; AICTE Statutory Portal
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px]">
          {/* Only shown when user is logged in */}
          {showSkipToMain && (
            <>
              <a href="#main-content" className="hover:underline text-slate-300">
                Skip to main content
              </a>
              <span className="text-slate-600">|</span>
            </>
          )}

          {/* Font Resizing Controls */}
          <div className="flex items-center gap-1.5 font-bold">
            <button
              onClick={decreaseFont}
              className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-amber-400"
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              onClick={resetFont}
              className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-amber-400"
              title="Reset Default Font"
            >
              A
            </button>
            <button
              onClick={increaseFont}
              className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-amber-400"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
          <span className="text-slate-600">|</span>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleContrast}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded font-semibold ${
              contrast === 'high-contrast' ? 'bg-amber-400 text-black' : 'hover:text-amber-300'
            }`}
            title="Toggle High Contrast Display"
          >
            <Eye className="h-3 w-3" />
            {contrast === 'high-contrast' ? 'Standard Contrast' : 'High Contrast'}
          </button>
          <span className="text-slate-600">|</span>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 font-semibold text-amber-300 hover:text-amber-200"
          >
            <Globe className="h-3 w-3" />
            {lang === 'EN' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GovTopStrip;