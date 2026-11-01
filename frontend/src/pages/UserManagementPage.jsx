import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import { FormInput, FormSelect } from '../components/common/FormInput';
import { Users, Plus, ShieldCheck, Mail, Building } from 'lucide-react';
import { USER_ROLES, BUREAUS } from '../utils/constants';

const UserManagementPage = () => {
  const [users, setUsers] = useState([
    {
      id: 'USR-001',
      name: 'Dr. Anand Sharma',
      empId: 'AICTE-REG-441',
      email: 'anand.sharma@aicte-india.org',
      bureau: 'Regulation Bureau (RB)',
      designation: 'Joint Director',
      role: 'SUPER_ADMIN',
      status: 'Active'
    },
    {
      id: 'USR-002',
      name: 'Smt. Preeti Verma',
      empId: 'AICTE-PGR-209',
      email: 'preeti.verma@aicte-india.org',
      bureau: 'Public Grievance Redressal Cell (PGRC)',
      designation: 'Director',
      role: 'BUREAU_ADMIN',
      status: 'Active'
    },
    {
      id: 'USR-003',
      name: 'Shri R. K. Mukherjee',
      empId: 'AICTE-APP-812',
      email: 'rk.mukherjee@aicte-india.org',
      bureau: 'Approval Bureau (AB)',
      designation: 'Deputy Director',
      role: 'BUREAU_ADMIN',
      status: 'Active'
    },
    {
      id: 'USR-004',
      name: 'Col. K. V. Rao',
      empId: 'AICTE-VIG-103',
      email: 'kv.rao@aicte-india.org',
      bureau: 'Vigilance Cell (VIG)',
      designation: 'Chief Vigilance Officer',
      role: 'SENIOR_MGMT',
      status: 'Active'
    },
    {
      id: 'USR-005',
      name: 'Dr. Sunita Deshmukh',
      empId: 'AICTE-RO-554',
      email: 'ro.northwest@aicte-india.org',
      bureau: 'North-Western Regional Office',
      designation: 'Regional Officer',
      role: 'REGIONAL_OFFICER',
      status: 'Active'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    empId: '',
    email: '',
    bureau: BUREAUS[0].name,
    designation: '',
    role: USER_ROLES[3].id
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    const newUser = {
      id: `USR-${Date.now()}`,
      ...formData,
      status: 'Active'
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      empId: '',
      email: '',
      bureau: BUREAUS[0].name,
      designation: '',
      role: USER_ROLES[3].id
    });
  };

  const columns = [
    {
      header: 'Officer Name & ID',
      key: 'name',
      render: (r) => (
        <div>
          <div className="font-semibold text-aicte-navy">{r.name}</div>
          <div className="font-mono text-[10px] text-slate-400">{r.empId}</div>
        </div>
      )
    },
    { header: 'Official Email', key: 'email' },
    { header: 'Assigned Bureau / Office', key: 'bureau' },
    { header: 'Designation', key: 'designation' },
    {
      header: 'Role Tier',
      key: 'role',
      render: (r) => (
        <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-aicte-royal border border-blue-200">
          {r.role}
        </span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (r) => (
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
          {r.status}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Officer & User Management Directory"
        breadcrumbs={[{ label: 'User Directory' }]}
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-aicte-royal px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Provision New Officer
          </button>
        }
      />

      <DataTable columns={columns} data={users} />

      {/* Provision User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Provision AICTE Officer Access"
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormInput
              label="Full Name of Officer"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Dr. / Shri Full Name"
              required
            />
            <FormInput
              label="Employee ID"
              name="empId"
              value={formData.empId}
              onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
              placeholder="AICTE-XXX-000"
              required
            />
            <FormInput
              label="Official NIC / AICTE Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="officer@aicte-india.org"
              required
            />
            <FormInput
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              placeholder="Joint Director / Assistant Director"
              required
            />
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-aicte-navy">Jurisdiction Bureau</label>
              <select
                value={formData.bureau}
                onChange={(e) => setFormData({ ...formData, bureau: e.target.value })}
                className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none"
              >
                {BUREAUS.map((b) => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-aicte-navy">Permission Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-md border border-aicte-border bg-white px-3 py-2 text-xs font-medium text-aicte-textPrimary focus:border-aicte-royal focus:outline-none"
              >
                {USER_ROLES.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>

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
              Grant Access Credentials
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserManagementPage;