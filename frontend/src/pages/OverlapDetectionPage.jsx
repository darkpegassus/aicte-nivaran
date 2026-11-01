import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/common/StatCard';
import Modal from '../components/common/Modal';
import {
  Layers,
  AlertTriangle,
  Link2,
  CheckCircle,
  ExternalLink,
  GitMerge,
  Eye,
  Info,
  Building,
  ShieldAlert
} from 'lucide-react';
import { getSimilarityColor } from '../utils/helpers';

const OverlapDetectionPage = () => {
  const { overlaps, resolveOverlap, linkCases, complaints } = useData();
  const [selectedOverlap, setSelectedOverlap] = useState(null);
  const [activeTab, setActiveTab] = useState('ALL');
  const [actionSuccessMsg, setActionSuccessMsg] = useState('');
  const navigate = useNavigate();

  // Metrics
  const totalOverlaps = overlaps.length;
  const highPriorityCount = overlaps.filter(o => o.similarityScore >= 90).length;
  const awaitingCount = overlaps.filter(o => o.status.includes('Awaiting') || o.status.includes('Recommended')).length;
  const resolvedCount = overlaps.filter(o => o.status === 'Resolved / Linked' || o.status === 'Dismissed').length;

  const filteredOverlaps = overlaps.filter((item) => {
    if (activeTab === 'HIGH_SIMILARITY') return item.similarityScore >= 90;
    if (activeTab === 'AWAITING') return item.status.includes('Awaiting') || item.status.includes('Recommended');
    if (activeTab === 'RESOLVED') return item.status.includes('Resolved') || item.status.includes('Dismissed');
    return true;
  });

  const handleAction = (type) => {
    if (!selectedOverlap) return;
    if (type === 'LINK') {
      linkCases(selectedOverlap.case1Id, selectedOverlap.case2Id);
      resolveOverlap(selectedOverlap.id, 'Linked for Joint Coordination');
      setActionSuccessMsg(`Cases ${selectedOverlap.case1Id} & ${selectedOverlap.case2Id} linked for Joint AICTE Hearing.`);
    } else if (type === 'DISMISS') {
      resolveOverlap(selectedOverlap.id, 'Dismissed (Not Related)');
      setActionSuccessMsg(`Overlap marked as independent; no joint coordination required.`);
    }
    setTimeout(() => {
      setSelectedOverlap(null);
      setActionSuccessMsg('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Intelligent Cross-Bureau Overlap Detection"
        breadcrumbs={[{ label: 'Overlap Matrix' }]}
        actions={
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-aicte-accentViolet">
              <Layers className="h-3.5 w-3.5" />
              Continuous Cross-Bureau NLP Matcher Active
            </span>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Potential Overlaps"
          value={totalOverlaps}
          subtitle="Identified across all Bureaus"
          icon={Layers}
          color="violet"
        />
        <StatCard
          title="High Severity Matches"
          value={highPriorityCount}
          subtitle="Similarity score above 85%"
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="Awaiting Coordination"
          value={awaitingCount}
          subtitle="Pending officer review"
          icon={ShieldAlert}
          color="yellow"
        />
        <StatCard
          title="Resolved / Coordinated"
          value={resolvedCount}
          subtitle="Joint proceedings established"
          icon={CheckCircle}
          color="green"
        />
      </div>

      {/* Innovation Clarification Banner */}
      <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-4 text-xs text-aicte-textPrimary">
        <div className="flex items-start gap-2.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-aicte-royal" />
          <div>
            <p className="font-bold text-aicte-navy">
              AICTE Core Coordination Logic (SIH Innovation Pillar)
            </p>
            <p className="mt-0.5 text-slate-600 leading-relaxed">
              Different stakeholders frequently file grievances with different offices simultaneously (e.g. dismissed faculty petitioning the <strong>Regulation Bureau</strong> while students lodge schedule disruption grievances with the <strong>Public Grievance Redressal Cell</strong>). OneView cross-matches entity identifiers and semantic root causes to prevent duplicated investigations and contradictory orders.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-aicte-border">
        {['ALL', 'HIGH_SIMILARITY', 'AWAITING', 'RESOLVED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 px-4 py-2.5 text-xs font-semibold transition-all ${
              activeTab === tab
                ? 'border-aicte-royal text-aicte-royal'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Overlap Cards List */}
      <div className="space-y-4">
        {filteredOverlaps.length === 0 ? (
          <div className="rounded-lg border border-aicte-border bg-white p-8 text-center text-xs text-slate-500">
            No overlap records matching filter criteria.
          </div>
        ) : (
          filteredOverlaps.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-aicte-border bg-white p-5 shadow-card hover:border-aicte-royal/40 transition-all"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-aicte-royal">{item.id}</span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${getSimilarityColor(item.similarityScore)}`}>
                      {item.similarityScore}% Similarity Match
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                      {item.detectionType}
                    </span>
                    <span className="text-[11px] text-slate-400">Detected: {item.detectionDate}</span>
                  </div>

                  <h3 className="text-sm font-bold text-aicte-navy flex items-center gap-1.5">
                    <Building className="h-4 w-4 text-slate-500" />
                    {item.institutionName}
                    <span className="text-xs font-normal text-slate-500">({item.institutionId})</span>
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
                    <strong className="text-aicte-navy">NLP Root Cause Summary: </strong>
                    {item.summary}
                  </p>
                </div>

                {/* Side Action */}
                <div className="flex shrink-0 items-center gap-2 lg:flex-col lg:items-end">
                  <button
                    onClick={() => setSelectedOverlap(item)}
                    className="flex items-center gap-1.5 rounded-lg bg-aicte-royal px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Compare & Coordinate
                  </button>
                  <button
                    onClick={() => navigate(`/institutions/${item.institutionId}`)}
                    className="flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-aicte-royal hover:underline"
                  >
                    Institution 360° Profile <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* Side-by-Side Dual Case Snapshot */}
              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-100 pt-3 md:grid-cols-2">
                <div className="rounded border border-blue-100 bg-blue-50/40 p-3">
                  <div className="flex items-center justify-between text-xs font-bold text-aicte-navy">
                    <span>Case #1: {item.case1Id}</span>
                    <span className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-200">
                      {item.case1Bureau}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-700">
                    <p><span className="text-slate-500 font-medium">Category:</span> {item.case1Category}</p>
                    <p><span className="text-slate-500 font-medium">Assigned Officer:</span> {item.case1Officer}</p>
                  </div>
                </div>

                <div className="rounded border border-indigo-100 bg-indigo-50/40 p-3">
                  <div className="flex items-center justify-between text-xs font-bold text-aicte-navy">
                    <span>Case #2: {item.case2Id}</span>
                    <span className="rounded bg-white px-2 py-0.5 text-[10px] font-semibold text-indigo-700 border border-indigo-200">
                      {item.case2Bureau}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-700">
                    <p><span className="text-slate-500 font-medium">Category:</span> {item.case2Category}</p>
                    <p><span className="text-slate-500 font-medium">Assigned Officer:</span> {item.case2Officer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comparison & Action Modal */}
      {selectedOverlap && (
        <Modal
          isOpen={!!selectedOverlap}
          onClose={() => setSelectedOverlap(null)}
          title={`Overlap Resolution Matrix — ${selectedOverlap.id}`}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-5">
            {actionSuccessMsg ? (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-center">
                <CheckCircle className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
                <p className="text-xs font-bold text-emerald-900">{actionSuccessMsg}</p>
                <p className="text-[11px] text-emerald-700 mt-1">Cross-bureau audit log updated.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-aicte-border pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-aicte-navy">{selectedOverlap.institutionName}</h4>
                    <p className="text-xs text-slate-500">AICTE Permanent ID: {selectedOverlap.institutionId}</p>
                  </div>
                  <div className={`rounded-full border px-3 py-1 text-xs font-bold ${getSimilarityColor(selectedOverlap.similarityScore)}`}>
                    {selectedOverlap.similarityScore}% Semantic & Physical Match
                  </div>
                </div>

                {/* Comparative side-by-side view */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-aicte-royal">{selectedOverlap.case1Id}</span>
                      <span className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {selectedOverlap.case1Bureau}
                      </span>
                    </div>
                    <div className="text-xs space-y-1">
                      <p><strong>Category:</strong> {selectedOverlap.case1Category}</p>
                      <p><strong>Investigating Officer:</strong> {selectedOverlap.case1Officer}</p>
                      <p><strong>Current Status:</strong> {selectedOverlap.case1Status}</p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-aicte-royal">{selectedOverlap.case2Id}</span>
                      <span className="text-[10px] font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {selectedOverlap.case2Bureau}
                      </span>
                    </div>
                    <div className="text-xs space-y-1">
                      <p><strong>Category:</strong> {selectedOverlap.case2Category}</p>
                      <p><strong>Investigating Officer:</strong> {selectedOverlap.case2Officer}</p>
                      <p><strong>Current Status:</strong> {selectedOverlap.case2Status}</p>
                    </div>
                  </div>
                </div>

                {/* AI System Recommendation Box */}
                <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-4">
                  <h5 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <GitMerge className="h-4 w-4 text-amber-600" />
                    Recommended Administrative Coordination Action
                  </h5>
                  <p className="mt-1 text-xs text-amber-900 leading-relaxed">
                    {selectedOverlap.recommendation}
                  </p>
                  <p className="mt-2 text-[11px] text-amber-800 italic">
                    Note: AICTE OneView does not unilaterally merge or close grievances. Actions require joint concurrence from designated Bureau heads.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-aicte-border">
                  <button
                    onClick={() => handleAction('DISMISS')}
                    className="rounded-lg border border-aicte-border px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Mark as Separate / Not Related
                  </button>
                  <button
                    onClick={() => handleAction('LINK')}
                    className="flex items-center gap-1.5 rounded-lg bg-aicte-royal px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700"
                  >
                    <Link2 className="h-4 w-4" />
                    Link Cases for Joint Bureau Hearing
                  </button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default OverlapDetectionPage;