import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PageHeader from '../components/layout/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge, { PriorityBadge } from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import { FormInput, FormSelect } from '../components/common/FormInput';
import {
  AlertCircle,
  Plus,
  Search,
  Filter,
  FileDown,
  Layers,
  ArrowRight,
  UploadCloud,
  CheckCircle2
} from 'lucide-react';
import { BUREAUS, CATEGORIES, SEVERITIES, STATUSES } from '../utils/constants';
import { exportToCSV } from '../utils/exportUtils';

const ComplaintsPage = () => {
  const { complaints, institutions, addComplaint } = useData();
  const location = useLocation();
  const navigate = useNavigate();

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBureau, setSelectedBureau] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Handle URL query parameters if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) setSearchQuery(searchParam);
  }, [location.search]);

  // Register New Complaint Modal State
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [regForm, setRegForm] = useState({
    institutionId: '',
    institutionName: '',
    bureau: 'PGRC',
    category: CATEGORIES[0],
    subject: '',
    description: '',
    assignedOfficer: 'Dr. Anand Sharma',
    priority: 'High',
    slaDays: 30
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Handle institution selection change
  const handleInstitutionSelect = (e) => {
    const instId = e.target.value;
    const selected = institutions.find(i => i.id === instId);
    setRegForm(prev => ({
      ...prev,
      institutionId: instId,
      institutionName: selected ? selected.name : ''
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regForm.institutionId || !regForm.subject || !regForm.description) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    const newId = `CMP-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toISOString().split('T')[0];
    const sla = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newComplaint = {
      id: newId,
      institutionId: regForm.institutionId,
      institutionName: regForm.institutionName,
      bureau: regForm.bureau,
      category: regForm.category,
      subject: regForm.subject,
      description: regForm.description,
      dateReceived: today,
      lastActionDate: today,
      assignedOfficer: regForm.assignedOfficer,
      priority: regForm.priority,
      status: 'Pending',
      slaDate: sla,
      overlappingCaseId: null
    };

    // Await addition
    await addComplaint(newComplaint);

    // Reset filters so the new complaint is guaranteed to be visible!
    setSearchQuery('');
    setSelectedBureau('');
    setSelectedCategory('');
    setSelectedStatus('');

    setSuccessMessage(`Complaint ${newId} registered and routed to ${regForm.bureau}.`);
    
    setTimeout(() => {
      setSuccessMessage('');
      setIsRegisterOpen(false);
      setRegForm({
        institutionId: '',
        institutionName: '',
        bureau: 'PGRC',
        category: CATEGORIES[0],
        subject: '',
        description: '',
        assignedOfficer: 'Dr. Anand Sharma',
        priority: 'High',
        slaDays: 30
      });
    }, 1200);
  };

  // Filter application
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBureau = !selectedBureau || c.bureau === selectedBureau;
    const matchesCategory = !selectedCategory || c.category === selectedCategory;
    const matchesStatus = !selectedStatus || c.status === selectedStatus;
    return matchesSearch && matchesBureau && matchesCategory && matchesStatus;
  });

  const columns = [
    {
      header: 'Complaint ID',
      key: 'id',
      sortable: true,
      render: (r) => (
        <span className="font-mono text-xs font-bold text-aicte-royal">{r.id}</span>
      )
    },
    {
      header: 'Institution',
      key: 'institutionName',
      sortable: true,
      render: (r) => (
        <div>
          <div className="font-semibold text-aicte-navy">{r.institutionName}</div>
          <div className="font-mono text-[10px] text-slate-400">{r.institutionId}</div>
        </div>
      )
    },
    {
      header: 'Bureau',
      key: 'bureau',
      sortable: true,
      render: (r) => (
        <span className="rounded bg-slate-100 px-2 py-0.5 font-bold text-slate-700">
          {r.bureau}
        </span>
      )
    },
    {
      header: 'Subject & Category',
      key: 'subject',
      render: (r) => (
        <div className="max-w-xs">
          <div className="font-medium text-aicte-navy truncate">{r.subject}</div>
          <div className="text-[10px] text-slate-500">{r.category}</div>
        </div>
      )
    },
    { header: 'Priority', key: 'priority', render: (r) => <PriorityBadge priority={r.priority} /> },
    { header: 'Assigned Officer', key: 'assignedOfficer' },
    { header: 'Received', key: 'dateReceived', sortable: true },
    { header: 'Status', key: 'status', render: (r) => <StatusBadge status={r.status} /> },
    {
      header: 'Actions',
      render: (r) => (
        <button
          onClick={() => navigate(`/case-tracking?id=${r.id}`)}
          className="text-xs font-semibold text-aicte-royal hover:underline"
        >
          Timeline Track
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Complaints & Grievances Dossier"
        breadcrumbs={[{ label: 'Complaints Directory' }]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCSV(complaints, 'aicte_grievances_full.csv')}
              className="flex items-center gap-1.5 rounded-lg border border-aicte-border bg-white px-3 py-2 text-xs font-semibold text-aicte-textPrimary shadow-sm hover:bg-slate-50"
            >
              <FileDown className="h-4 w-4" />
              Export Records
            </button>
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-aicte-royal px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Register New Complaint
            </button>
          </div>
        }
      />

      {/* Filter and Query Controls */}
      <div className="rounded-lg border border-aicte-border bg-white p-4 shadow-card">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ID, Institution, keywords..."
              className="w-full rounded-md border border-aicte-border bg-slate-50/50 py-2 pl-9 pr-3 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:bg-white focus:outline-none focus:ring-1 focus:ring-aicte-royal"
            />
          </div>

          <div>
            <select
              value={selectedBureau}
              onChange={(e) => setSelectedBureau(e.target.value)}
              className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal"
            >
              <option value="">All Bureaus / Cells</option>
              {BUREAUS.map((b) => (
                <option key={b.id} value={b.shortCode}>{b.name} ({b.shortCode})</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal"
            >
              <option value="">All Processing Statuses</option>
              {Object.values(STATUSES).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
          <span>Active filter matches: <strong>{filteredComplaints.length}</strong> cases</span>
          {(searchQuery || selectedBureau || selectedCategory || selectedStatus) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedBureau('');
                setSelectedCategory('');
                setSelectedStatus('');
              }}
              className="text-aicte-royal hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <DataTable
        columns={columns}
        data={filteredComplaints}
        onRowClick={(row) => navigate(`/case-tracking?id=${row.id}`)}
      />

      {/* Complaint Registration Modal */}
      <Modal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        title="AICTE Central Inward: Register New Grievance / Regulatory Matter"
        maxWidth="max-w-3xl"
      >
        {successMessage ? (
          <div className="p-6 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600 mb-2" />
            <h4 className="text-sm font-bold text-emerald-950">{successMessage}</h4>
            <p className="text-xs text-emerald-700 mt-1">Cross-bureau overlap analysis initiated automatically.</p>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-aicte-navy">
                  Select Technical Institution <span className="text-rose-500">*</span>
                </label>
                <select
                  value={regForm.institutionId}
                  onChange={handleInstitutionSelect}
                  required
                  className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal"
                >
                  <option value="">Choose registered institution...</option>
                  {institutions.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name} ({inst.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-aicte-navy">
                  Target AICTE Bureau / Cell <span className="text-rose-500">*</span>
                </label>
                <select
                  value={regForm.bureau}
                  onChange={(e) => setRegForm({ ...regForm, bureau: e.target.value })}
                  required
                  className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal"
                >
                  {BUREAUS.map((b) => (
                    <option key={b.id} value={b.shortCode}>{b.name} ({b.shortCode})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-aicte-navy">
                  Regulatory Complaint Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={regForm.category}
                  onChange={(e) => setRegForm({ ...regForm, category: e.target.value })}
                  required
                  className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-aicte-navy">
                  Severity / Urgency Priority
                </label>
                <select
                  value={regForm.priority}
                  onChange={(e) => setRegForm({ ...regForm, priority: e.target.value })}
                  className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal"
                >
                  {Object.values(SEVERITIES).map((sev) => (
                    <option key={sev} value={sev}>{sev}</option>
                  ))}
                </select>
              </div>
            </div>

            <FormInput
              label="Subject / Summary Heading"
              name="subject"
              value={regForm.subject}
              onChange={(e) => setRegForm({ ...regForm, subject: e.target.value })}
              placeholder="e.g. Non-payment of UGC/AICTE pay scale arrears to mechanical faculty"
              required
            />

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-aicte-navy">
                Comprehensive Description of Matter <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={regForm.description}
                onChange={(e) => setRegForm({ ...regForm, description: e.target.value })}
                placeholder="Include facts, dates, academic session, specific regulatory sections violated..."
                required
                className="w-full rounded-md border border-aicte-border bg-white p-3 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal"
              />
            </div>

            {/* Document Upload Mock */}
            <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center">
              <UploadCloud className="mx-auto h-6 w-6 text-slate-400 mb-1" />
              <p className="text-xs font-semibold text-aicte-navy">Attach Supporting Affidavits / Invoices / Orders</p>
              <p className="text-[10px] text-slate-400">PDF, JPG, PNG up to 15MB (Digitally encrypted repository)</p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-aicte-border">
              <button
                type="button"
                onClick={() => setIsRegisterOpen(false)}
                className="rounded-lg border border-aicte-border px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-aicte-royal px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700"
              >
                Submit & Route Case
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default ComplaintsPage;