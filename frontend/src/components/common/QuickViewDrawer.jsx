import React from 'react';
import { X, ExternalLink, Building, Clock, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import StatusBadge, { PriorityBadge } from './StatusBadge';
import { useNavigate } from 'react-router-dom';

const QuickViewDrawer = ({ isOpen, onClose, data, type = 'complaint' }) => {
  const navigate = useNavigate();
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm transition-opacity">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-drawer border-l border-aicte-border flex flex-col justify-between">
          {/* Header */}
          <div className="border-b border-aicte-border px-6 py-4 flex items-center justify-between bg-slate-50/75">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-aicte-royal font-sans">
                {type === 'complaint' ? 'Quick Complaint Dossier' : 'Institution Snapshot'}
              </span>
              <h3 className="text-sm font-bold text-aicte-navy font-biolinum">
                {data.id}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-white hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {type === 'complaint' ? (
              <>
                <div className="flex items-center gap-2">
                  <StatusBadge status={data.status} />
                  <PriorityBadge priority={data.priority} />
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-700">
                    {data.bureau} Bureau
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-aicte-navy">{data.subject}</h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {data.description}
                  </p>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Institution:</span>
                    <span className="font-semibold text-aicte-navy text-right">{data.institutionName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Regulatory Category:</span>
                    <span className="font-semibold text-slate-700 text-right">{data.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Investigating Officer:</span>
                    <span className="font-semibold text-aicte-royal">{data.assignedOfficer}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Received Date:</span>
                    <span className="text-slate-700">{data.dateReceived}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Resolution SLA:</span>
                    <span className="font-semibold text-rose-600">{data.slaDate || '30-Day Window'}</span>
                  </div>
                </div>

                {data.overlappingCaseId && (
                  <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      Duplicate Case Collision Detected
                    </div>
                    Cross-bureau correlation detected with case <strong>{data.overlappingCaseId}</strong>.
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-aicte-navy font-biolinum">{data.name}</h4>
                  <p className="text-xs text-slate-500">{data.type}</p>
                  <p className="text-xs text-slate-600">{data.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-lg bg-blue-50/60 p-3 border border-blue-100">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Complaints</span>
                    <span className="text-lg font-bold text-aicte-royal">{data.totalComplaints}</span>
                  </div>
                  <div className="rounded-lg bg-amber-50/60 p-3 border border-amber-100">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Active Cases</span>
                    <span className="text-lg font-bold text-amber-700">{data.activeComplaints}</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Jurisdiction Region:</span>
                    <span className="font-semibold text-slate-700">{data.region}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Principal / Director:</span>
                    <span className="font-semibold text-slate-700">{data.principal || 'Authorized Head'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Contact:</span>
                    <span className="text-slate-700">{data.contactEmail || 'office@college.edu.in'}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-aicte-border p-4 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5"
            >
              Close Preview
            </button>
            <button
              onClick={() => {
                onClose();
                if (type === 'complaint') {
                  navigate(`/case-tracking?id=${data.id}`);
                } else {
                  navigate(`/institutions/${data.id}`);
                }
              }}
              className="flex items-center gap-1.5 rounded-lg bg-aicte-royal px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700"
            >
              Open Full Dossier
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewDrawer;