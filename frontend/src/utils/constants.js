export const BUREAUS = [
  { id: 'RB', name: 'Regulation Bureau', shortCode: 'RB' },
  { id: 'PGRC', name: 'Public Grievance Redressal Cell', shortCode: 'PGRC' },
  { id: 'AB', name: 'Approval Bureau', shortCode: 'AB' },
  { id: 'VIG', name: 'Vigilance Cell', shortCode: 'VIG' },
  { id: 'RO_NW', name: 'North-Western Regional Office', shortCode: 'RO-NW' },
  { id: 'RO_SW', name: 'South-Western Regional Office', shortCode: 'RO-SW' }
];

export const STATUSES = {
  PENDING: 'Pending',
  UNDER_PROCESS: 'Under Process',
  ACTION_INITIATED: 'Action Initiated',
  RESOLVED: 'Resolved',
  DISPOSED: 'Disposed',
  OVERDUE: 'Overdue'
};

export const SEVERITIES = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical'
};

export const CATEGORIES = [
  'Faculty & Staff Service Matters',
  'Student Grievance & Harassment',
  'Capitation Fee & Excess Fees',
  'Infrastructure & Norm Violation',
  'Unapproved Courses / Intake Violation',
  'Withholding of Certificates / Degrees',
  'Admission Irregularity',
  'Governance & Financial Misconduct'
];

export const REGIONS = [
  'Northern Region',
  'North-Western Region',
  'Eastern Region',
  'Western Region',
  'Southern Region',
  'South-Western Region',
  'Central Region'
];

export const INSTITUTION_TYPES = [
  'Government Engineering College',
  'Private Self-Financed Institute',
  'University Constituent College',
  'Deemed-to-be-University',
  'Autonomous Polytechnic'
];

export const USER_ROLES = [
  { id: 'SUPER_ADMIN', label: 'Super Admin (Member Secretary / Advisor)' },
  { id: 'SENIOR_MGMT', label: 'Senior Management (AICTE HQ)' },
  { id: 'BUREAU_ADMIN', label: 'Bureau Administrator' },
  { id: 'BUREAU_OFFICER', label: 'Bureau Processing Officer' },
  { id: 'REGIONAL_OFFICER', label: 'Regional Officer' }
];