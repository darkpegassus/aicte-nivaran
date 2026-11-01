import React, { useState } from 'react';
import { Megaphone, Pause, Play, ChevronRight } from 'lucide-react';

const notices = [
  "Strict Compliance Directive: Withholding of original degree certificates by institutions attracts penal action under Section 10(n) of AICTE Act.",
  "Cross-Bureau Coordination Active: Parallel complaints across PGRC and Regulation Bureau will be scheduled for unified online hearings.",
  "Extension of Approval (EoA) 2025-26: All grievance compliance reports must be submitted before inspection team validation."
];

const NoticeTicker = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <div className="bg-amber-500/10 border-y border-amber-500/20 px-4 py-1.5 text-xs font-sans">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded bg-aicte-navy px-2.5 py-0.5 text-[10px] font-bold text-white uppercase shrink-0">
          <Megaphone className="h-3 w-3 text-amber-400 animate-pulse" />
          <span>Statutory Notice</span>
        </div>

        <div className="flex-1 overflow-hidden">
          <p className="truncate text-aicte-navy font-medium text-xs">
            {notices[currentIdx]}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-slate-600">
          <button 
            onClick={() => setIsPaused(!isPaused)} 
            className="p-1 hover:text-aicte-navy"
            title={isPaused ? "Resume" : "Pause"}
          >
            {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
          </button>
          <button 
            onClick={() => setCurrentIdx((currentIdx + 1) % notices.length)}
            className="text-[11px] font-bold text-aicte-royal hover:underline flex items-center"
          >
            Next <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeTicker;