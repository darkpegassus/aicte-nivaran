import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import { BUREAUS } from '../utils/constants';
import { Briefcase, Users, CheckCircle, Clock, AlertTriangle, Shield } from 'lucide-react';

const BureauManagementPage = () => {
  const bureauStats = [
    {
      id: 'RB',
      name: 'Regulation Bureau',
      head: 'Advisor / Joint Director (Regulation)',
      total: 54,
      pending: 18,
      disposed: 32,
      overdue: 4,
      officers: 6,
      responsibilities: 'UGC/AICTE pay scales, faculty service regulations, capitation fees & unapproved course sanctions.'
    },
    {
      id: 'PGRC',
      name: 'Public Grievance Redressal Cell',
      head: 'Director (PGRC)',
      total: 62,
      pending: 22,
      disposed: 38,
      overdue: 2,
      officers: 5,
      responsibilities: 'Student grievances, harassment petitions, original certificate retention, and hostel/campus welfare.'
    },
    {
      id: 'AB',
      name: 'Approval Bureau',
      head: 'Deputy Director (Approvals)',
      total: 38,
      pending: 14,
      disposed: 22,
      overdue: 2,
      officers: 4,
      responsibilities: 'Extension of Approval (EoA), land/infrastructure compliance, intake quota, and faculty cadre ratios.'
    },
    {
      id: 'VIG',
      name: 'Vigilance Cell',
      head: 'Chief Vigilance Officer',
      total: 14,
      pending: 5,
      disposed: 8,
      overdue: 1,
      officers: 3,
      responsibilities: 'Financial embezzlement, ghost faculty rackets, administrative misconduct and trust fund diversions.'
    },
    {
      id: 'RO_NW',
      name: 'North-Western Regional Office',
      head: 'Regional Officer (NWRO)',
      total: 21,
      pending: 6,
      disposed: 14,
      overdue: 1,
      officers: 3,
      responsibilities: 'Jurisdiction over Punjab, Haryana, Himachal Pradesh, Jammu & Kashmir, and Delhi.'
    },
    {
      id: 'RO_SW',
      name: 'South-Western Regional Office',
      head: 'Regional Officer (SWRO)',
      total: 26,
      pending: 8,
      disposed: 17,
      overdue: 1,
      officers: 4,
      responsibilities: 'Jurisdiction over Karnataka and Kerala technical institutes.'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="AICTE Bureau & Departmental Jurisdictions"
        breadcrumbs={[{ label: 'Bureau Management' }]}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bureauStats.map((b) => (
          <div
            key={b.id}
            className="flex flex-col justify-between rounded-xl border border-aicte-border bg-white p-5 shadow-card hover:border-aicte-royal/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-bold text-aicte-royal border border-blue-100">
                  {b.id}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Users className="h-3.5 w-3.5" /> {b.officers} Officers
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-aicte-navy">{b.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{b.head}</p>

              <p className="mt-2 text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded">
                {b.responsibilities}
              </p>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <div className="grid grid-cols-3 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Pending</span>
                  <span className="font-bold text-amber-600">{b.pending}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Disposed</span>
                  <span className="font-bold text-emerald-600">{b.disposed}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Overdue</span>
                  <span className="font-bold text-rose-600">{b.overdue}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BureauManagementPage;