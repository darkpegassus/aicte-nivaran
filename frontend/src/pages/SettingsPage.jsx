import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { useAuth } from '../context/AuthContext';
import { Shield, Sliders, Bell, Database, Check } from 'lucide-react';

const SettingsPage = () => {
  const { user } = useAuth();
  const [slaDays, setSlaDays] = useState(30);
  const [overlapThreshold, setOverlapThreshold] = useState(75);
  const [enableEmailAlerts, setEnableEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Council System Configuration & SLA Rules"
        breadcrumbs={[{ label: 'System Settings' }]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Officer Profile Card */}
        <div className="rounded-xl border border-aicte-border bg-white p-6 shadow-card">
          <h3 className="text-xs font-bold uppercase tracking-wider text-aicte-navy mb-4">
            Authorized Officer Profile
          </h3>
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-aicte-royal text-base font-bold text-white">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div>
              <div className="text-sm font-bold text-aicte-navy">{user?.name}</div>
              <div className="text-xs text-slate-500">{user?.roleTitle}</div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400 block text-[10px]">Official Email</span>
              <span className="font-semibold">{user?.email}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Assigned Bureau</span>
              <span className="font-semibold">{user?.bureau}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Role Security Level</span>
              <span className="font-semibold text-aicte-royal">{user?.role}</span>
            </div>
          </div>
        </div>

        {/* System Settings Form */}
        <div className="rounded-xl border border-aicte-border bg-white p-6 shadow-card lg:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-aicte-navy mb-4">
            Operational Rules & Overlap Engine Parameters
          </h3>

          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-aicte-navy">
                Mandatory Case Disposal SLA Threshold (Days)
              </label>
              <input
                type="number"
                min="7"
                max="90"
                value={slaDays}
                onChange={(e) => setSlaDays(e.target.value)}
                className="w-full max-w-xs rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none"
              />
              <p className="text-[11px] text-slate-400">
                AICTE standard statutory grievance disposal window is 30 days. Cases exceeding this mark are flagged as &quot;Overdue&quot;.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-aicte-navy">
                NLP Cross-Bureau Semantic Overlap Sensitivity Score (%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={overlapThreshold}
                  onChange={(e) => setOverlapThreshold(e.target.value)}
                  className="w-full max-w-xs accent-aicte-royal"
                />
                <span className="font-bold text-xs text-aicte-royal">{overlapThreshold}%</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Minimum confidence score required to generate automated coordination alerts between Bureaus.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={enableEmailAlerts}
                  onChange={(e) => setEnableEmailAlerts(e.target.checked)}
                  className="rounded border-slate-300 text-aicte-royal focus:ring-aicte-royal"
                />
                <span>Enable Real-time Cross-Bureau Coordination Email Dispatches</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-aicte-border">
              <button
                type="submit"
                className="rounded-lg bg-aicte-royal px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700 flex items-center gap-1.5"
              >
                {saved && <Check className="h-4 w-4" />}
                {saved ? 'Configurations Updated' : 'Save System Parameters'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;