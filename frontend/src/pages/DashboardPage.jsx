import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PageHeader from '../components/layout/PageHeader';
import StatCard from '../components/common/StatCard';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import QuickViewDrawer from '../components/common/QuickViewDrawer';
import IndiaStateMap from '../components/dashboard/IndiaStateMap';
import {
  AlertCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  TrendingUp,
  FileDown,
  BellRing,
  Eye,
  ShieldAlert
} from 'lucide-react';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { exportToCSV } from '../utils/exportUtils';

const DashboardPage = () => {
  const { complaints, overlaps, institutions } = useData();
  const navigate = useNavigate();

  // Slide-over drawer preview state
  const [selectedDrawerItem, setSelectedDrawerItem] = useState(null);

  // Computed KPIs
  const totalComplaints = complaints.length;
  const pendingCases = complaints.filter((c) => c.status === 'Pending').length;
  const underProcess = complaints.filter(
    (c) => c.status === 'Under Process' || c.status === 'Action Initiated'
  ).length;
  const disposedCases = complaints.filter(
    (c) => c.status === 'Disposed' || c.status === 'Resolved'
  ).length;
  const overdueCases = complaints.filter((c) => c.status === 'Overdue').length;

  // Monthly inflow vs disposal chart data
  const monthlyTrendData = [
    { month: 'Sep 24', received: 42, disposed: 38 },
    { month: 'Oct 24', received: 50, disposed: 44 },
    { month: 'Nov 24', received: 62, disposed: 48 },
    { month: 'Dec 24', received: 58, disposed: 52 },
    { month: 'Jan 25', received: 74, disposed: 49 },
    { month: 'Feb 25', received: 35, disposed: 28 },
  ];

  // Table columns for Recent Inward Submissions
  const recentColumns = [
    {
      header: 'Complaint ID',
      key: 'id',
      sortable: true,
      render: (r) => (
        <span className="font-mono text-xs font-bold text-aicte-royal">{r.id}</span>
      ),
    },
    {
      header: 'Technical Institution',
      key: 'institutionName',
      sortable: true,
      render: (r) => (
        <div>
          <span className="font-semibold text-aicte-navy">{r.institutionName}</span>
          <span className="block font-mono text-[10px] text-slate-400">{r.institutionId}</span>
        </div>
      ),
    },
    {
      header: 'Bureau',
      key: 'bureau',
      sortable: true,
      render: (r) => (
        <span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">
          {r.bureau}
        </span>
      ),
    },
    {
      header: 'Category / Subject',
      key: 'subject',
      render: (r) => (
        <div className="max-w-xs">
          <div className="truncate font-medium text-aicte-navy">{r.subject}</div>
          <div className="text-[10px] text-slate-500">{r.category}</div>
        </div>
      ),
    },
    {
      header: 'Received Date',
      key: 'dateReceived',
      sortable: true,
      render: (r) => <span className="text-slate-600">{r.dateReceived}</span>,
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      header: 'Actions',
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDrawerItem(r);
            }}
            className="flex items-center gap-1 rounded bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-aicte-royal hover:bg-blue-100 transition-colors"
          >
            <Eye className="h-3 w-3" /> Quick View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/case-tracking?id=${r.id}`);
            }}
            className="text-[11px] font-semibold text-slate-500 hover:text-aicte-royal hover:underline"
          >
            Timeline
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Redressal & Complaint Monitoring"
        breadcrumbs={[{ label: 'NIVARAN Dashboard' }]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => exportToCSV(complaints, 'aicte_complaints_summary.csv')}
              className="flex items-center gap-1.5 rounded-lg border border-aicte-border bg-white px-3 py-2 text-xs font-semibold text-aicte-textPrimary shadow-sm hover:bg-slate-50 font-sans"
            >
              <FileDown className="h-4 w-4" />
              Export Summary CSV
            </button>
            <button
              onClick={() => navigate('/overlaps')}
              className="flex items-center gap-1.5 rounded-lg bg-aicte-royal px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 font-sans"
            >
              <Layers className="h-4 w-4 text-amber-300" />
              Overlap Matrix ({overlaps.length})
            </button>
          </div>
        }
      />

      {/* 1. PRIORITY ACTION HUB (Immediate Decisions Required) */}
      <div className="rounded-2xl border-2 border-blue-200/80 bg-gradient-to-r from-blue-50/90 via-white to-amber-50/60 p-5 shadow-card font-sans">
        <div className="flex items-center justify-between border-b border-blue-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-aicte-royal text-white shadow">
              <BellRing className="h-4 w-4" />
            </span>
            <h3 className="text-sm font-bold text-aicte-navy font-biolinum">
              Priority Action Items Awaiting Officer Decision
            </h3>
          </div>
          <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-bold text-aicte-royal">
            3 Matters Require Concurrence
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Action Card 1: Overlap */}
          <div className="rounded-xl border border-amber-200 bg-white p-3.5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 uppercase">
                High Priority Cross-Bureau Overlap
              </span>
              <p className="mt-2 text-xs font-bold text-aicte-navy">
                Apex Institute of Technology
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Simultaneous cases in Regulation Bureau & PGRC Cell (92% Match).
              </p>
            </div>
            <button
              onClick={() => navigate('/overlaps')}
              className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
            >
              Link for Joint Hearing <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Action Card 2: SLA Overdue */}
          <div className="rounded-xl border border-rose-200 bg-white p-3.5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="rounded bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-800 uppercase">
                Statutory 30-Day SLA Exceeded
              </span>
              <p className="mt-2 text-xs font-bold text-aicte-navy">
                Venkateshwara College (CMP-2025-0305)
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Excess capitation fee petition overdue by 8 days.
              </p>
            </div>
            <button
              onClick={() => navigate('/case-tracking?id=CMP-2025-0305')}
              className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 transition-colors"
            >
              Issue Urgent Directive <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {/* Action Card 3: Institution 360 Verification */}
          <div className="rounded-xl border border-blue-200 bg-white p-3.5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-aicte-royal uppercase">
                Institution 360° Inspection
              </span>
              <p className="mt-2 text-xs font-bold text-aicte-navy">
                Global College of Engineering
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                CAD laboratory conversion reported against approval norms.
              </p>
            </div>
            <button
              onClick={() => navigate('/institutions/AICTE-1-7612044')}
              className="mt-3 flex items-center justify-center gap-1 rounded-lg bg-aicte-royal px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              View 360° Profile <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. STATUTORY KPI SUMMARY CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 font-sans">
        <StatCard
          title="Total Grievances"
          value={totalComplaints}
          subtitle="All Bureaus combined"
          icon={AlertCircle}
          color="blue"
        />
        <StatCard
          title="Pending Triage"
          value={pendingCases}
          subtitle="Initial review required"
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Under Inquiry"
          value={underProcess}
          subtitle="Active bureau proceedings"
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Disposed / Closed"
          value={disposedCases}
          subtitle="Final orders issued"
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Overdue SLA"
          value={overdueCases}
          subtitle="Exceeded 30-day window"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* 3. NATIONAL INFLOW VS. DISPOSAL TRENDS */}
      <div className="rounded-xl border border-aicte-border bg-white p-5 shadow-card font-sans">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-aicte-navy font-biolinum">
              National Grievance Inflow vs. Disposal Trend (Monthly)
            </h3>
            <p className="text-[11px] text-slate-500">
              Audit data across Northern, Western, Southern, and Regional Offices
            </p>
          </div>
          <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-aicte-royal">
            Current Academic Session
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip wrapperClassName="text-xs rounded shadow-card" />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Line
                type="monotone"
                dataKey="received"
                stroke="#174EA6"
                strokeWidth={2.5}
                name="Grievances Received"
              />
              <Line
                type="monotone"
                dataKey="disposed"
                stroke="#16A34A"
                strokeWidth={2.5}
                name="Grievances Disposed"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. e-JAGRITI STYLE STATE-WISE GIS COMPLAINT MAP */}
      <IndiaStateMap />

      {/* 5. RECENT INWARD SUBMISSIONS TABLE */}
      <div className="space-y-3 font-sans">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-aicte-navy font-biolinum">
              Recent Central Inward Submissions
            </h3>
            <p className="text-[11px] text-slate-500">
              Click any row to open the quick-view inspection drawer
            </p>
          </div>
          <button
            onClick={() => navigate('/complaints')}
            className="flex items-center gap-1 text-xs font-semibold text-aicte-royal hover:underline"
          >
            View Complete Dossier <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <DataTable
          columns={recentColumns}
          data={complaints.slice(0, 6)}
          itemsPerPage={6}
          onRowClick={(row) => setSelectedDrawerItem(row)}
        />
      </div>

      {/* 6. SLIDE-OVER QUICK VIEW DRAWER */}
      <QuickViewDrawer
        isOpen={!!selectedDrawerItem}
        onClose={() => setSelectedDrawerItem(null)}
        data={selectedDrawerItem}
        type="complaint"
      />
    </div>
  );
};

export default DashboardPage;