import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import PageHeader from '../components/layout/PageHeader';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import { FormInput, FormSelect } from '../components/common/FormInput';
import {
  Building2,
  Search,
  Filter,
  Plus,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { REGIONS, INSTITUTION_TYPES } from '../utils/constants';
import { exportToCSV } from '../utils/exportUtils';

const InstitutionsPage = () => {
  const { institutions, addInstitution } = useData();
  const navigate = useNavigate();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [overlapFilterOnly, setOverlapFilterOnly] = useState(false);

  // New Institution Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: `AICTE-1-${Math.floor(1000000 + Math.random() * 9000000)}`,
    name: '',
    state: '',
    region: REGIONS[0],
    type: INSTITUTION_TYPES[1],
    address: '',
    principal: '',
    contactEmail: '',
    phone: '',
    status: 'Active',
    totalComplaints: 0,
    activeComplaints: 0,
    disposedComplaints: 0,
    hasOverlap: false
  });

  // Filter logic
  const filteredInstitutions = institutions.filter((inst) => {
    const matchesSearch =
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = !selectedRegion || inst.region === selectedRegion;
    const matchesType = !selectedType || inst.type === selectedType;
    const matchesOverlap = !overlapFilterOnly || inst.hasOverlap;
    return matchesSearch && matchesRegion && matchesType && matchesOverlap;
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateInstitution = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.state) {
      alert('Please fill out all mandatory fields.');
      return;
    }
    addInstitution(formData);
    setIsModalOpen(false);
    setFormData({
      id: `AICTE-1-${Math.floor(1000000 + Math.random() * 9000000)}`,
      name: '',
      state: '',
      region: REGIONS[0],
      type: INSTITUTION_TYPES[1],
      address: '',
      principal: '',
      contactEmail: '',
      phone: '',
      status: 'Active',
      totalComplaints: 0,
      activeComplaints: 0,
      disposedComplaints: 0,
      hasOverlap: false
    });
  };

  const columns = [
    {
      header: 'AICTE Permanent ID',
      key: 'id',
      sortable: true,
      render: (r) => (
        <span className="font-mono text-xs font-bold text-aicte-royal">{r.id}</span>
      )
    },
    {
      header: 'Institution Name',
      key: 'name',
      sortable: true,
      render: (r) => (
        <div className="max-w-xs">
          <div className="font-semibold text-aicte-navy">{r.name}</div>
          <div className="text-[11px] text-slate-500">{r.type}</div>
        </div>
      )
    },
    { header: 'State', key: 'state', sortable: true },
    { header: 'Region', key: 'region', sortable: true },
    {
      header: 'Total Grievances',
      key: 'totalComplaints',
      sortable: true,
      render: (r) => (
        <span className="font-semibold text-slate-700">{r.totalComplaints}</span>
      )
    },
    {
      header: 'Active Cases',
      key: 'activeComplaints',
      sortable: true,
      render: (r) => (
        <span
          className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
            r.activeComplaints > 0
              ? 'bg-amber-100 text-amber-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {r.activeComplaints} Active
        </span>
      )
    },
    {
      header: 'Overlap Alert',
      key: 'hasOverlap',
      render: (r) =>
        r.hasOverlap ? (
          <span className="inline-flex items-center gap-1 rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-aicte-accentViolet">
            <Layers className="h-3 w-3" /> Overlap Detected
          </span>
        ) : (
          <span className="text-[11px] text-slate-400">None</span>
        )
    },
    {
      header: 'Action',
      render: (r) => (
        <button
          onClick={() => navigate(`/institutions/${r.id}`)}
          className="flex items-center gap-1 rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-aicte-royal hover:bg-aicte-lightBlue transition-colors"
        >
          360° Profile
          <ArrowUpRight className="h-3 w-3" />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institution Registry & Master Directory"
        breadcrumbs={[{ label: 'Institution Registry' }]}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCSV(institutions, 'aicte_institutions_registry.csv')}
              className="flex items-center gap-1.5 rounded-lg border border-aicte-border bg-white px-3 py-2 text-xs font-semibold text-aicte-textPrimary shadow-sm hover:bg-slate-50"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export Registry
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-aicte-royal px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Register Institution
            </button>
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="rounded-lg border border-aicte-border bg-white p-4 shadow-card">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Institution Name, AICTE Permanent ID, or State..."
              className="w-full rounded-md border border-aicte-border bg-slate-50/50 py-2 pl-9 pr-3 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:bg-white focus:outline-none focus:ring-1 focus:ring-aicte-royal"
            />
          </div>

          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal"
            >
              <option value="">All Regions</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none focus:ring-1 focus:ring-aicte-royal"
            >
              <option value="">All Institution Types</option>
              {INSTITUTION_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Badges Row */}
        <div className="mt-3 flex flex-wrap items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input
              type="checkbox"
              checked={overlapFilterOnly}
              onChange={(e) => setOverlapFilterOnly(e.target.checked)}
              className="rounded border-slate-300 text-aicte-royal focus:ring-aicte-royal"
            />
            <span>Show Only Institutions with Cross-Bureau Overlaps</span>
          </label>
          <span className="text-slate-500">
            Showing {filteredInstitutions.length} of {institutions.length} technical institutes
          </span>
        </div>
      </div>

      {/* Main Institution Table */}
      <DataTable
        columns={columns}
        data={filteredInstitutions}
        onRowClick={(row) => navigate(`/institutions/${row.id}`)}
      />

      {/* Register New Institution Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Institution to Master Registry"
      >
        <form onSubmit={handleCreateInstitution} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              label="Permanent AICTE ID"
              name="id"
              value={formData.id}
              onChange={handleFormChange}
              required
            />
            <FormInput
              label="Institution Official Name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="e.g. National Institute of Tech"
              required
            />
            <FormSelect
              label="Institutional Region"
              name="region"
              value={formData.region}
              onChange={handleFormChange}
              options={REGIONS}
              required
            />
            <FormInput
              label="State / UT"
              name="state"
              value={formData.state}
              onChange={handleFormChange}
              placeholder="e.g. Maharashtra"
              required
            />
            <FormSelect
              label="Institution Category Type"
              name="type"
              value={formData.type}
              onChange={handleFormChange}
              options={INSTITUTION_TYPES}
              required
            />
            <FormInput
              label="Head of Institution (Principal / Director)"
              name="principal"
              value={formData.principal}
              onChange={handleFormChange}
              placeholder="Dr. Full Name"
            />
            <FormInput
              label="Official Contact Email"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleFormChange}
              placeholder="principal@college.edu.in"
            />
            <FormInput
              label="Official Telephone"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              placeholder="+91 XXXXXXXXXX"
            />
          </div>

          <FormInput
            label="Campus Address & Postal PIN"
            name="address"
            value={formData.address}
            onChange={handleFormChange}
            placeholder="Plot No, Road, District, PIN"
          />

          <div className="flex justify-end gap-2 pt-3 border-t border-aicte-border">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-aicte-border px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-aicte-royal px-4 py-2 text-xs font-semibold text-white shadow hover:bg-blue-700"
            >
              Save Institution Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default InstitutionsPage;