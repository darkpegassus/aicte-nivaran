import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Layers, Building, ShieldCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tourSteps = [
  {
    step: 1,
    title: "1. The AICTE Problem: Bureau Silos",
    desc: "A college may have a student strike reported to PGRC and simultaneous faculty non-payment reported to Regulation Bureau. Different officers investigate independently without knowing of the other's probe.",
    actionLabel: "View Overlap Matrix",
    targetRoute: "/overlaps"
  },
  {
    step: 2,
    title: "2. NIVARAN's Intelligent Matcher",
    desc: "NIVARAN scans entity IDs and NLP root-causes across bureaus. For Apex Institute, it flagged a 92% correlation: student protests were triggered by the same abrupt faculty firings.",
    actionLabel: "Inspect Apex Institute Overlap",
    targetRoute: "/overlaps"
  },
  {
    step: 3,
    title: "3. Single Unified Institution 360°",
    desc: "Officers no longer use separate portals. Opening the college profile displays all regulatory notices, approvals, and grievances together.",
    actionLabel: "Open Institution 360° Dossier",
    targetRoute: "/institutions/AICTE-1-4328911"
  },
  {
    step: 4,
    title: "4. Joint Administrative Action",
    desc: "NIVARAN allows officers to link cases for a single coordinated hearing—cutting duplicate paperwork and contradictory rulings.",
    actionLabel: "Back to Executive Dashboard",
    targetRoute: "/dashboard"
  }
];

const GuidedTourModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const current = tourSteps[currentStep];

  const handleNext = () => {
    navigate(current.targetRoute);
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
      setCurrentStep(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm font-sans">
      <div className="relative w-full max-w-lg rounded-2xl border-2 border-aicte-royal/40 bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-aicte-royal">
          <Sparkles className="h-4 w-4 text-amber-500" />
          Guided Evaluator Walkthrough ({current.step} / {tourSteps.length})
        </div>

        <h3 className="mt-2 text-lg font-bold text-aicte-navy font-biolinum">
          {current.title}
        </h3>

        <p className="mt-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          {current.desc}
        </p>

        {/* Progress Bar */}
        <div className="mt-4 flex gap-1.5">
          {tourSteps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${
                i <= currentStep ? 'bg-aicte-royal' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-medium text-slate-500 hover:text-slate-800"
          >
            Exit Tour
          </button>
          <button
            onClick={handleNext}
            className="flex items-center gap-2 rounded-lg bg-aicte-royal px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-700 transition-all"
          >
            {current.actionLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidedTourModal;