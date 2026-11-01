import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  AlertTriangle,
  Layers,
  Clock,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const InstitutionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { institutions, complaints, overlaps } = useData();

  const institution = institutions.find((inst) => inst.id === id) || institutions[0];
  const instComplaints = complaints.filter((c) => c.institutionId === institution.id);
  const instOverlaps = overlaps.filter((o) => o.institutionId === institution.id);

  const activeCasesCount = instComplaints.filter(c => c.status !== 'Disposed' && c.status !== 'Resolved').length;
  const disposedCasesCount = instComplaints.filter(c => c.status === 'Disposed' || c.status === 'Resolved').length;

  // Bureau breakdown for this institution
  const bureauBreakdown = [
    { bureau: 'RB', count: instComplaints.filter(c => c.bureau === 'RB').length },
    { bureau: 'PGRC', count: instComplaints.filter(c => c.bureau === 'PGRC').length },
    { bureau: 'AB', count: instComplaints.filter(c => c.bureau === 'AB').length },
    { bureau: 'VIG', count: instComplaints.filter(c => c.bureau === 'VIG').length },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institution 360° Comprehensive Profile"
        breadcrumbs={[
          { label: 'Institutions', path: '/institutions' },
          { label: institution.name }
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/complaints')}
              className="flex items-center gap-1.5 rounded-lg border border-aicte-border bg-white px-3 py-2 text-xs font-semibold text-aicte-textPrimary shadow-sm hover:bg-slate-50"
            >
              <FileText className="h-4 w-4" />
              File New Grievance
            </button>
            {instOverlaps.length > 0 && (
              <button
                onClick={() => navigate('/overlaps')}
                className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-amber-700"
              >
                <Layers className="h-4 w-4" />
                View Active Overlaps ({instOverlaps.length})
              </button>
            )}
          </div>
        }
      />

      {/* Primary Institution Overview Card */}
      <div className="rounded-xl border border-aicte-border bg-white p-6 shadow-card">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-aicte-royal border border-blue-100">
              <Building2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-aicte-navy">{institution.name}</h1>
                <span className="rounded bg-blue-100 px-2 py-0.5 font-mono text-xs font-bold text-aicte-royal">
                  {institution.id}
                </span>
                <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                  {institution.status}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-500">{institution.type}</p>
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {institution.address}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  Principal: {institution.principal || 'Dr. Authorized Head'}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {institution.contactEmail || 'office@institute.ac.in'}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  {institution.phone || '+91 20 2748 9901'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg bg-slate-50 p-3 border border-slate-200 text-xs text-slate-700">
            <ShieldCheck className="h-5 w-5 text-aicte-royal" />
            <div>
              <div className="font-semibold text-aicte-navy">{institution.region}</div>
              <div className="text-[11px] text-slate-500">Jurisdiction Council</div>
            </div>
          </div>
        </div>
      </div>

      {/* Specific Institution Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Lifetime Complaints"
          value={instComplaints.length}
          subtitle="All Bureaus combined"
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="Active Open Cases"
          value={activeCasesCount}
          subtitle="Currently under investigation"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Disposed Cases"
          value={disposedCasesCount}
          subtitle="Hearing completed & closed"
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Cross-Bureau Overlaps"
          value={instOverlaps.length}
          subtitle="Concurrent investigations"
          icon={Layers}
          color={instOverlaps.length > 0 ? 'red' : 'blue'}
        />
      </div>

      {/* Overlap Flag Banner if Active */}
      {instOverlaps.length > 0 && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600 shrink-0" />
            <div className="flex-1">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Cross-Bureau Collision Flagged For This Institution
              </h4>
              <p className="mt-1 text-xs text-amber-900 leading-relaxed">
                This entity has simultaneous complaints logged across multiple AICTE departments (e.g. Regulation Bureau and Public Grievance Redressal Cell). Ensure coordinating officers share inquiry findings prior to final determination.
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => navigate('/overlaps')}
                  className="rounded bg-amber-700 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-800"
                >
                  Open Overlap Matrix
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Bureau-Wise Distribution & Complaint Chronology */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Bureau Distribution Chart */}
        <div className="rounded-lg border border-aicte-border bg-white p-5 shadow-card">
          <h3 className="text-xs font-bold uppercase tracking-wider text-aicte-navy mb-4">
            Complaints by Bureau
          </h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bureauBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="bureau" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip wrapperClassName="text-xs rounded shadow" />
                <Bar dataKey="count" fill="#174EA6" radius={[4, 4, 0, 0]} name="Cases" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
            Total active bureaus processing files: <strong>{bureauBreakdown.filter(b => b.count > 0).length}</strong>
          </div>
        </div>

        {/* Complete Complaint History Table */}
        <div className="rounded-lg border border-aicte-border bg-white p-5 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-aicte-navy">
              Comprehensive Complaint Dossier ({instComplaints.length})
            </h3>
            <span className="text-[11px] text-slate-500">Cross-bureau aggregated log</span>
          </div>

          <div className="divide-y divide-slate-100 overflow-hidden">
            {instComplaints.length === 0 ? (
              <p className="py-6 text-center text-xs text-slate-500">
                No complaint records on file for this institution.
              </p>
            ) : (
              instComplaints.map((c) => (
                <div key={c.id} className="py-3 hover:bg-slate-50/60 transition-colors">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-aicte-royal">{c.id}</span>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                          {c.bureau}
                        </span>
                        <StatusBadge status={c.status} />
                      </div>
                      <p className="mt-1 text-xs font-semibold text-aicte-navy">{c.subject}</p>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{c.description}</p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3 text-right">
                      <div>
                        <div className="text-[11px] font-medium text-slate-700">{c.assignedOfficer}</div>
                        <div className="text-[10px] text-slate-400">Received: {c.dateReceived}</div>
                      </div>
                      <button
                        onClick={() => navigate(`/case-tracking?id=${c.id}`)}
                        className="rounded border border-aicte-border bg-white px-2 py-1 text-xs font-semibold text-aicte-royal hover:bg-aicte-lightBlue"
                      >
                        Timeline
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionDetailPage;