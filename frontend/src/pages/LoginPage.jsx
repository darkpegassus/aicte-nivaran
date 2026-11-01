import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GovTopStrip from '../components/layout/GovTopStrip';
import NoticeTicker from '../components/layout/NoticeTicker';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  AlertCircle, 
  ArrowRight, 
  Video, 
  Calendar, 
  FileText, 
  Layers, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { USER_ROLES } from '../utils/constants';

// Emblems
import moeEmblem from '../assets/moe-emblem.png';
import aicteLogo from '../assets/aicte-logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('officer.aicte@nic.in');
  const [password, setPassword] = useState('Admin@123');
  const [role, setRole] = useState('SUPER_ADMIN');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide valid official credentials');
      return;
    }
    const roleObj = USER_ROLES.find(r => r.id === role);
    login({
      name: 'Dr. Anand Sharma',
      email: email,
      role: role,
      roleTitle: roleObj ? roleObj.label.split('(')[0].trim() : 'AICTE Officer',
      bureau: 'Regulation Bureau'
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F4F7FC]">
      {/* 1. GIGW Top Strip */}
      <GovTopStrip showSkipToMain={false} />

      {/* 2. Official Ministry & AICTE Dual Emblem Header */}
      <header className="bg-white border-b border-aicte-border px-6 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Ministry Emblem */}
          <div className="flex items-center gap-3">
            <img 
              src={moeEmblem} 
              alt="Ministry of Education Government of India" 
              className="h-14 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }} 
            />
            <div className="hidden sm:block border-l border-slate-300 pl-3">
              <h1 className="text-xs font-bold text-aicte-navy tracking-tight font-biolinum uppercase">
                Ministry of Education
              </h1>
              <p className="text-[10px] text-slate-500 font-sans">Government of India</p>
            </div>
          </div>

          {/* Right: AICTE Cogwheel Logo & Portal Identity */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <h2 className="text-sm font-extrabold text-aicte-navy font-biolinum uppercase">
                AICTE NIVARAN
              </h2>
              <p className="text-[10px] font-semibold text-aicte-royal">
                Integrated Redress & Coordination Platform
              </p>
            </div>
            <img 
              src={aicteLogo} 
              alt="AICTE Official Crest" 
              className="h-14 w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }} 
            />
          </div>
        </div>
      </header>

      {/* 3. Statutory Ticker Bar */}
      <NoticeTicker />

      {/* 4. Hero Section with e-Jagriti Style Jan Sunwai & Login Box */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Jan Sunwai Virtual Court Broadcast (like e-Jagriti Banner) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-900 to-[#102A56] text-white p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-aicte-navy font-bold px-3 py-1 text-xs">
                  <Video className="h-3.5 w-3.5" /> Virtual Hearing Broadcast
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-biolinum tracking-tight text-white leading-tight">
                  JAN SUNWAI &bull; AICTE NIVARAN
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 font-sans leading-relaxed max-w-xl">
                  Unified dispute resolution & grievance hearing mechanism. Cases flagged for cross-bureau overlap receive joint hearings with Regulation and PGRC officers.
                </p>

                {/* Meeting Credentials Pill */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold">
                    <Calendar className="h-4 w-4" /> Every Friday: 3:00 PM to 5:00 PM (IST)
                  </div>
                  <div className="text-[11px] text-slate-200 font-mono">
                    Portal: https://bharatvc.nic.in/join/aicte-nivaran
                  </div>
                  <div className="text-[11px] text-slate-300">
                    Chaired by: Advisor (Bureaus) & Member Secretary
                  </div>
                </div>
              </div>
            </div>

            {/* Stepped Workflow: Process Made Simple */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-center shadow-card">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-aicte-royal font-bold text-xs mb-2">1</div>
                <div className="text-xs font-bold text-aicte-navy">Central Inward</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Digitized grievance filing</div>
              </div>
              <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-3.5 text-center shadow-card">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold text-xs mb-2">2</div>
                <div className="text-xs font-bold text-aicte-navy">AI Overlap Scan</div>
                <div className="text-[10px] text-purple-700 font-semibold mt-0.5">Detects duplicate probes</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-center shadow-card">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs mb-2">3</div>
                <div className="text-xs font-bold text-aicte-navy">Joint Disposal</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Enforceable order passed</div>
              </div>
            </div>
          </div>

          {/* Right Column: Official Officer Login */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-aicte-border bg-white p-6 sm:p-8 shadow-card">
              <div className="text-center pb-4 border-b border-slate-100">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 mb-2">
                  <ShieldCheck className="h-6 w-6 text-aicte-royal" />
                </div>
                <h3 className="text-lg font-bold text-aicte-navy font-biolinum">
                  AICTE Officer Login
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Single Sign-On for Bureau Officers & Regional Heads
                </p>
              </div>

              {error && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-rose-600 border border-rose-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-5 space-y-4 font-sans">
                <div>
                  <label className="block text-xs font-semibold text-aicte-navy mb-1">
                    Official Email / Employee ID
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-aicte-border bg-slate-50/50 py-2 pl-9 pr-3 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:bg-white focus:outline-none focus:ring-1 focus:ring-aicte-royal"
                      placeholder="officer@aicte-india.org"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-aicte-navy mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-aicte-border bg-slate-50/50 py-2 pl-9 pr-3 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:bg-white focus:outline-none focus:ring-1 focus:ring-aicte-royal"
                      placeholder="••••••••••••"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-aicte-navy mb-1">
                    Bureau Jurisdiction Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full rounded-lg border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none"
                  >
                    {USER_ROLES.map((r) => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-aicte-royal py-2.5 text-xs font-semibold text-white shadow hover:bg-blue-700 transition-colors"
                >
                  Sign In to NIVARAN
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Demo Sandbox Alert */}
              <div className="mt-4 rounded-lg bg-blue-50/70 border border-blue-100 p-2.5 text-[11px] text-slate-600">
                <span className="font-bold text-aicte-royal">SIH Evaluation Sandbox:</span> Credentials pre-loaded for rapid walkthrough.
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* 5. e-Jagriti Style Official Mega Footer */}
      <footer className="bg-[#0b1e38] text-white border-t border-white/10 pt-8 pb-4 text-xs font-sans">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="text-left">
                <h4 className="text-sm font-bold font-biolinum tracking-wider">NATIONAL INFORMATICS CENTRE</h4>
                <p className="text-[10px] text-slate-400">Designed, Developed & Hosted by NIC &bull; Ministry of Electronics & IT</p>
              </div>
            </div>

            {/* Official Visitor Counter Badge (Found on all NIC Flagship Sites) */}
            <div className="flex items-center gap-4 text-center">
              <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5">
                <span className="text-[10px] text-slate-400 block uppercase">Visitors Today</span>
                <span className="text-sm font-bold text-amber-400 font-mono">14,820</span>
              </div>
              <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5">
                <span className="text-[10px] text-slate-400 block uppercase">Matters Disposed</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">1,42,890</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400">
            <a href="#terms" className="hover:text-white">Terms of Service</a>
            <span>&bull;</span>
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#hyperlink" className="hover:text-white">Hyperlinking Policy</a>
            <span>&bull;</span>
            <a href="#accessibility" className="hover:text-white">Accessibility Statement</a>
            <span>&bull;</span>
            <a href="#help" className="hover:text-white">Helpdesk & Grievance Protocol</a>
          </div>

          <div className="text-center text-[10px] text-slate-500 pt-2">
            &copy; {new Date().getFullYear()} All India Council for Technical Education (AICTE), New Delhi. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;