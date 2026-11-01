import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PageHeader from '../components/layout/PageHeader';
import StatusBadge, { PriorityBadge } from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import { FormInput, FormSelect } from '../components/common/FormInput';
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Send,
  Share2,
  FileText,
  CornerUpRight,
  ShieldAlert,
  Building,
  User,
  Calendar,
  Layers
} from 'lucide-react';
import { BUREAUS } from '../utils/constants';

const CaseTrackingPage = () => {
  const { complaints, timelineEvents, addTimelineEvent, updateComplaintStatus, overlaps } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  // Selected case state
  const [selectedCaseId, setSelectedCaseId] = useState('CMP-2025-0101');
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  // New action form state
  const [actionTitle, setActionTitle] = useState('');
  const [actionRemarks, setActionRemarks] = useState('');
  const [newStatus, setNewStatus] = useState('Under Process');

  // Transfer modal form state
  const [targetBureau, setTargetBureau] = useState('RB');
  const [transferRemarks, setTransferRemarks] = useState('');

  // Handle URL query id
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idParam = params.get('id');
    if (idParam && complaints.some(c => c.id === idParam)) {
      setSelectedCaseId(idParam);
    }
  }, [location.search, complaints]);

  const currentCase = complaints.find(c => c.id === selectedCaseId) || complaints[0];
  const caseHistory = timelineEvents[selectedCaseId] || [
    {
      id: 'EVT-INIT',
      date: currentCase?.dateReceived || '2025-01-15',
      title: 'Matter Inward & Bureau Assignment',
      officer: currentCase?.assignedOfficer || 'Registry Officer',
      bureau: currentCase?.bureau || 'AICTE HQ',
      action: 'Initial Intake',
      remarks: currentCase?.description || 'Case dossier initialized.'
    }
  ];

  const hasOverlap = overlaps.find(o => o.case1Id === selectedCaseId || o.case2Id === selectedCaseId);

  // Handle Adding Timeline Action
  const handleAddAction = (e) => {
    e.preventDefault();
    if (!actionTitle || !actionRemarks) return;

    const newEvent = {
      id: `EVT-${Date.now()}`,
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      title: actionTitle,
      officer: currentCase.assignedOfficer,
      bureau: currentCase.bureau,
      action: newStatus,
      remarks: actionRemarks
    };

    addTimelineEvent(selectedCaseId, newEvent);
    updateComplaintStatus(selectedCaseId, newStatus);
    setActionTitle('');
    setActionRemarks('');
    setActionModalOpen(false);
  };

  // Handle Case Transfer
  const handleTransfer = (e) => {
    e.preventDefault();
    const newEvent = {
      id: `EVT-${Date.now()}`,
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      title: `Matter Transferred to ${targetBureau}`,
      officer: currentCase.assignedOfficer,
      bureau: currentCase.bureau,
      action: 'Inter-Bureau Transfer',
      remarks: transferRemarks || `Re-assigned jurisdiction from ${currentCase.bureau} to ${targetBureau}.`
    };

    addTimelineEvent(selectedCaseId, newEvent);
    updateComplaintStatus(selectedCaseId, 'Transferred');
    setTransferModalOpen(false);
    setTransferRemarks('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Chronological Case Lifecycle & Tracking"
        breadcrumbs={[
          { label: 'Complaints', path: '/complaints' },
          { label: selectedCaseId }
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => setTransferModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-aicte-border bg-white px-3 py-2 text-xs font-semibold text-aicte-textPrimary shadow-sm hover:bg-slate-50"
            >
              <CornerUpRight className="h-4 w-4" />
              Transfer Bureau
            </button>
            <button
              onClick={() => setActionModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-aicte-royal px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
              Add Investigation Remark
            </button>
          </div>
        }
      />

      {/* Case Selector Dropdown & Header Card */}
      <div className="rounded-xl border border-aicte-border bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-aicte-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-aicte-royal">{currentCase.id}</span>
              <StatusBadge status={currentCase.status} />
              <PriorityBadge priority={currentCase.priority} />
            </div>
            <h2 className="text-base font-bold text-aicte-navy mt-1">{currentCase.subject}</h2>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold text-slate-500 whitespace-nowrap">Switch Case Dossier:</label>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="rounded-lg border border-aicte-border bg-slate-50 px-3 py-1.5 text-xs font-semibold text-aicte-navy focus:border-aicte-royal focus:outline-none"
            >
              {complaints.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} — {c.institutionName.slice(0, 24)}...
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Detailed Metadata Grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Building className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Institution</span>
              <span className="font-semibold text-aicte-navy">{currentCase.institutionName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <FileText className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Jurisdiction Bureau</span>
              <span className="font-semibold text-aicte-royal">{currentCase.bureau} Bureau</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <User className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Investigating Officer</span>
              <span className="font-semibold text-aicte-navy">{currentCase.assignedOfficer}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block">Filing Date / SLA Target</span>
              <span className="font-semibold text-aicte-navy">{currentCase.dateReceived} (SLA: {currentCase.slaDate})</span>
            </div>
          </div>
        </div>

        {/* Overlap Flag Banner if applicable */}
        {hasOverlap && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-purple-200 bg-purple-50 p-3 text-xs">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-aicte-accentViolet shrink-0" />
              <span className="font-semibold text-purple-900">
                Cross-Bureau Overlap Flagged: Parallel inquiry detected under {hasOverlap.case1Id === selectedCaseId ? hasOverlap.case2Bureau : hasOverlap.case1Bureau}.
              </span>
            </div>
            <button
              onClick={() => navigate('/overlaps')}
              className="text-xs font-bold text-aicte-accentViolet hover:underline"
            >
              Inspect Overlap Matrix
            </button>
          </div>
        )}
      </div>

      {/* Chronological Vertical Timeline Section */}
      <div className="rounded-xl border border-aicte-border bg-white p-6 shadow-card">
        <h3 className="text-xs font-bold uppercase tracking-wider text-aicte-navy mb-6">
          Official Action Trail & Procedural Timeline
        </h3>

        <div className="relative pl-6 before:absolute before:bottom-0 before:left-2.5 before:top-2 before:w-0.5 before:bg-slate-200">
          {caseHistory.map((evt, idx) => (
            <div key={evt.id || idx} className="relative mb-8 last:mb-0">
              {/* Dot */}
              <div className="absolute -left-6 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-aicte-royal shadow-sm ring-2 ring-blue-100" />

              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 shadow-sm">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-aicte-navy">{evt.title}</span>
                    <span className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200">
                      {evt.action}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">{evt.date}</span>
                </div>

                <p className="mt-2 text-xs text-slate-700 leading-relaxed">{evt.remarks}</p>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>Authorized Official: <strong>{evt.officer}</strong> ({evt.bureau})</span>
                  <span className="text-[10px] font-mono text-slate-400">Audit Stamp Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Add Case Action */}
      <Modal
        isOpen={actionModalOpen}
        onClose={() => setActionModalOpen(false)}
        title={`Add Procedural Action / Remark — ${selectedCaseId}`}
      >
        <form onSubmit={handleAddAction} className="space-y-4">
          <FormInput
            label="Procedural Step / Action Title"
            name="actionTitle"
            value={actionTitle}
            onChange={(e) => setActionTitle(e.target.value)}
            placeholder="e.g. Physical Inspection Report Filed by Regional Officer"
            required
          />

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-aicte-navy">
              Update Case Processing Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none"
            >
              <option value="Under Process">Under Process</option>
              <option value="Action Initiated">Action Initiated</option>
              <option value="Resolved">Resolved / Hearing Completed</option>
              <option value="Disposed">Disposed / Order Passed</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-aicte-navy">
              Official Inquiry Remarks & Determinations <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={actionRemarks}
              onChange={(e) => setActionRemarks(e.target.value)}
              placeholder="Record depositions, verification findings, show-cause dispatch details..."
              required
              className="w-full rounded-md border border-aicte-border bg-white p-3 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-aicte-border">
            <button
              type="button"
              onClick={() => setActionModalOpen(false)}
              className="rounded-lg border border-aicte-border px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-aicte-royal px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700"
            >
              Commit to Case History
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal: Transfer Case */}
      <Modal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        title={`Transfer Jurisdictional Oversight — ${selectedCaseId}`}
      >
        <form onSubmit={handleTransfer} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-aicte-navy">
              Transfer To Bureau / Cell
            </label>
            <select
              value={targetBureau}
              onChange={(e) => setTargetBureau(e.target.value)}
              className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none"
            >
              {BUREAUS.map((b) => (
                <option key={b.id} value={b.shortCode}>{b.name} ({b.shortCode})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-aicte-navy">
              Reason for Jurisdiction Transfer
            </label>
            <textarea
              rows={3}
              value={transferRemarks}
              onChange={(e) => setTransferRemarks(e.target.value)}
              placeholder="Explain reasons for re-allocating matter across departments..."
              required
              className="w-full rounded-md border border-aicte-border bg-white p-3 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-aicte-border">
            <button
              type="button"
              onClick={() => setTransferModalOpen(false)}
              className="rounded-lg border border-aicte-border px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-aicte-royal px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700"
            >
              Confirm Inter-Bureau Transfer
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CaseTrackingPage;