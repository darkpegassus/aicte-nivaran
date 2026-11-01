// ==========================================
// AICTE NIVARAN SYNTHETIC MASTER DATASET
// 50 Institutions, 120+ Complaints, Realistic Cross-Bureau Overlaps
// ==========================================

export const mockOfficers = [
  { id: 'OFF01', name: 'Dr. Anand Sharma', bureau: 'RB', designation: 'Joint Director (Regulation)' },
  { id: 'OFF02', name: 'Smt. Preeti Verma', bureau: 'PGRC', designation: 'Director (Grievance)' },
  { id: 'OFF03', name: 'Shri R. K. Mukherjee', bureau: 'AB', designation: 'Deputy Director (Approvals)' },
  { id: 'OFF04', name: 'Col. K. V. Rao', bureau: 'VIG', designation: 'Chief Vigilance Officer' },
  { id: 'OFF05', name: 'Dr. Sunita Deshmukh', bureau: 'RO_NW', designation: 'Regional Officer (NWRO)' },
  { id: 'OFF06', name: 'Shri Manoj P. Pillai', bureau: 'PGRC', designation: 'Assistant Director' },
  { id: 'OFF07', name: 'Dr. Shalini Aggarwal', bureau: 'RB', designation: 'Legal Consultant' },
  { id: 'OFF08', name: 'Er. Alok Ranjan', bureau: 'AB', designation: 'Technical Officer' },
  { id: 'OFF09', name: 'Dr. T. Ramanathan', bureau: 'RO_SW', designation: 'Regional Officer (SWRO)' },
  { id: 'OFF10', name: 'Shri Deepak Chhabra', bureau: 'VIG', designation: 'Inquiry Inspector' }
];

// Helper to generate 50 realistic institutions
const baseInstitutionsData = [
  { id: 'AICTE-1-4328911', name: 'Apex Institute of Technology & Management', state: 'Maharashtra', region: 'Western Region', type: 'Private Self-Financed Institute', city: 'Pune' },
  { id: 'AICTE-1-7612044', name: 'Global College of Engineering & Research', state: 'Karnataka', region: 'South-Western Region', type: 'Private Self-Financed Institute', city: 'Bengaluru' },
  { id: 'AICTE-1-1092837', name: 'National Polytechnic and Skill Institute', state: 'Uttar Pradesh', region: 'Northern Region', type: 'Autonomous Polytechnic', city: 'Kanpur' },
  { id: 'AICTE-1-9823412', name: 'Sardar Patel Institute of Advanced Studies', state: 'Gujarat', region: 'Central Region', type: 'Deemed-to-be-University', city: 'Anand' },
  { id: 'AICTE-1-3349012', name: 'Himalayan Institute of Technology', state: 'Uttarakhand', region: 'North-Western Region', type: 'Private Self-Financed Institute', city: 'Dehradun' },
  { id: 'AICTE-1-5542109', name: 'Tagore Memorial College of Engineering', state: 'West Bengal', region: 'Eastern Region', type: 'Government Engineering College', city: 'Kolkata' },
  { id: 'AICTE-1-6677881', name: 'Venkateshwara College of Technology & Science', state: 'Tamil Nadu', region: 'Southern Region', type: 'Private Self-Financed Institute', city: 'Chengalpattu' },
  { id: 'AICTE-1-8899002', name: 'Delhi Institute of Technical Studies', state: 'Delhi', region: 'North-Western Region', type: 'University Constituent College', city: 'Dwarka' },
  { id: 'AICTE-1-1122334', name: 'Kalinga Institute of Technology & Science', state: 'Odisha', region: 'Eastern Region', type: 'Deemed-to-be-University', city: 'Bhubaneswar' },
  { id: 'AICTE-1-2233445', name: 'Punjab Technical College of Engineering', state: 'Punjab', region: 'North-Western Region', type: 'Government Engineering College', city: 'Patiala' },
  { id: 'AICTE-1-3344556', name: 'Andhra Loyola Institute of Engineering', state: 'Andhra Pradesh', region: 'Southern Region', type: 'Private Self-Financed Institute', city: 'Vijayawada' },
  { id: 'AICTE-1-4455667', name: 'Malabar Institute of Technology', state: 'Kerala', region: 'South-Western Region', type: 'Private Self-Financed Institute', city: 'Kannur' },
  { id: 'AICTE-1-5566778', name: 'Jaipur National Engineering Academy', state: 'Rajasthan', region: 'North-Western Region', type: 'Private Self-Financed Institute', city: 'Jaipur' },
  { id: 'AICTE-1-6677889', name: 'Bhopal Institute of Technology & Science', state: 'Madhya Pradesh', region: 'Central Region', type: 'Private Self-Financed Institute', city: 'Bhopal' },
  { id: 'AICTE-1-7788990', name: 'Hyderabad Institute of Advanced Tech', state: 'Telangana', region: 'Southern Region', type: 'Deemed-to-be-University', city: 'Hyderabad' },
  { id: 'AICTE-1-8899112', name: 'Patna Polytechnic Institute', state: 'Bihar', region: 'Eastern Region', type: 'Autonomous Polytechnic', city: 'Patna' },
  { id: 'AICTE-1-9900223', name: 'Ranchi Engineering & Applied Sciences College', state: 'Jharkhand', region: 'Eastern Region', type: 'Government Engineering College', city: 'Ranchi' },
  { id: 'AICTE-1-1011223', name: 'Assam Royal Technical Institute', state: 'Assam', region: 'Eastern Region', type: 'Private Self-Financed Institute', city: 'Guwahati' },
  { id: 'AICTE-1-1213141', name: 'Haryana College of Technology & Mgmt', state: 'Haryana', region: 'North-Western Region', type: 'Private Self-Financed Institute', city: 'Kaithal' },
  { id: 'AICTE-1-1415161', name: 'Chhattisgarh Institute of Technology', state: 'Chhattisgarh', region: 'Central Region', type: 'Government Engineering College', city: 'Raipur' },
  { id: 'AICTE-1-1718192', name: 'Goa Technical Academy', state: 'Goa', region: 'Western Region', type: 'Government Engineering College', city: 'Panaji' },
  { id: 'AICTE-1-2021223', name: 'Shimla Institute of Engineering', state: 'Himachal Pradesh', region: 'North-Western Region', type: 'Autonomous Polytechnic', city: 'Shimla' },
  { id: 'AICTE-1-2324254', name: 'Kashmir Valley Institute of Technology', state: 'Jammu and Kashmir', region: 'North-Western Region', type: 'Private Self-Financed Institute', city: 'Srinagar' },
  { id: 'AICTE-1-2627285', name: 'Nagpur Institute of Engineering & Research', state: 'Maharashtra', region: 'Western Region', type: 'Private Self-Financed Institute', city: 'Nagpur' },
  { id: 'AICTE-1-2930316', name: 'Mysuru College of Engineering', state: 'Karnataka', region: 'South-Western Region', type: 'Government Engineering College', city: 'Mysuru' },
  { id: 'AICTE-1-3233347', name: 'Coimbatore Institute of Engineering', state: 'Tamil Nadu', region: 'Southern Region', type: 'Autonomous Polytechnic', city: 'Coimbatore' },
  { id: 'AICTE-1-3536378', name: 'Lucknow Institute of Technology', state: 'Uttar Pradesh', region: 'Northern Region', type: 'Private Self-Financed Institute', city: 'Lucknow' },
  { id: 'AICTE-1-3839409', name: 'Vadodara Institute of Technical Studies', state: 'Gujarat', region: 'Central Region', type: 'University Constituent College', city: 'Vadodara' },
  { id: 'AICTE-1-4142431', name: 'Durgapur Polytechnic Institute', state: 'West Bengal', region: 'Eastern Region', type: 'Autonomous Polytechnic', city: 'Durgapur' },
  { id: 'AICTE-1-4445462', name: 'Cuttack Technical Institute', state: 'Odisha', region: 'Eastern Region', type: 'Government Engineering College', city: 'Cuttack' },
  { id: 'AICTE-1-4748493', name: 'Ludhiana College of Engineering', state: 'Punjab', region: 'North-Western Region', type: 'Private Self-Financed Institute', city: 'Ludhiana' },
  { id: 'AICTE-1-5051524', name: 'Visakhapatnam Institute of Technology', state: 'Andhra Pradesh', region: 'Southern Region', type: 'Private Self-Financed Institute', city: 'Visakhapatnam' },
  { id: 'AICTE-1-5354555', name: 'Kochi College of Advanced Studies', state: 'Kerala', region: 'South-Western Region', type: 'University Constituent College', city: 'Kochi' },
  { id: 'AICTE-1-5657586', name: 'Jodhpur Institute of Technical Sciences', state: 'Rajasthan', region: 'North-Western Region', type: 'Private Self-Financed Institute', city: 'Jodhpur' },
  { id: 'AICTE-1-5960617', name: 'Indore Institute of Technology & Science', state: 'Madhya Pradesh', region: 'Central Region', type: 'Private Self-Financed Institute', city: 'Indore' },
  { id: 'AICTE-1-6263648', name: 'Warangal Polytechnic & Skill College', state: 'Telangana', region: 'Southern Region', type: 'Autonomous Polytechnic', city: 'Warangal' },
  { id: 'AICTE-1-6566679', name: 'Gaya Technical Institute', state: 'Bihar', region: 'Eastern Region', type: 'Government Engineering College', city: 'Gaya' },
  { id: 'AICTE-1-6869701', name: 'Jamshedpur Institute of Technology', state: 'Jharkhand', region: 'Eastern Region', type: 'Private Self-Financed Institute', city: 'Jamshedpur' },
  { id: 'AICTE-1-7172732', name: 'Silchar Engineering College', state: 'Assam', region: 'Eastern Region', type: 'Government Engineering College', city: 'Silchar' },
  { id: 'AICTE-1-7475763', name: 'Ambala College of Engineering', state: 'Haryana', region: 'North-Western Region', type: 'Private Self-Financed Institute', city: 'Ambala' },
  { id: 'AICTE-1-7778794', name: 'Bhilai Institute of Advanced Technology', state: 'Chhattisgarh', region: 'Central Region', type: 'Private Self-Financed Institute', city: 'Bhilai' },
  { id: 'AICTE-1-8081825', name: 'Dharwad College of Technology', state: 'Karnataka', region: 'South-Western Region', type: 'Government Engineering College', city: 'Dharwad' },
  { id: 'AICTE-1-8384856', name: 'Madurai Institute of Engineering', state: 'Tamil Nadu', region: 'Southern Region', type: 'Private Self-Financed Institute', city: 'Madurai' },
  { id: 'AICTE-1-8687887', name: 'Varanasi Technical Academy', state: 'Uttar Pradesh', region: 'Northern Region', type: 'University Constituent College', city: 'Varanasi' },
  { id: 'AICTE-1-8990918', name: 'Surat Institute of Technology', state: 'Gujarat', region: 'Central Region', type: 'Private Self-Financed Institute', city: 'Surat' },
  { id: 'AICTE-1-9293949', name: 'Siliguri Polytechnic Institute', state: 'West Bengal', region: 'Eastern Region', type: 'Autonomous Polytechnic', city: 'Siliguri' },
  { id: 'AICTE-1-9596970', name: 'Rourkela Engineering College', state: 'Odisha', region: 'Eastern Region', type: 'Government Engineering College', city: 'Rourkela' },
  { id: 'AICTE-1-9899001', name: 'Jalandhar Institute of Engineering & Tech', state: 'Punjab', region: 'North-Western Region', type: 'Private Self-Financed Institute', city: 'Jalandhar' },
  { id: 'AICTE-1-1002003', name: 'Tirupati Institute of Technology', state: 'Andhra Pradesh', region: 'Southern Region', type: 'Deemed-to-be-University', city: 'Tirupati' },
  { id: 'AICTE-1-2003004', name: 'Thiruvananthapuram Engineering Academy', state: 'Kerala', region: 'South-Western Region', type: 'Government Engineering College', city: 'Thiruvananthapuram' }
];

export const mockInstitutions = baseInstitutionsData.map((item, idx) => ({
  id: item.id,
  name: item.name,
  state: item.state,
  region: item.region,
  type: item.type,
  address: `${idx + 10}, Knowledge Park Zone, ${item.city}, ${item.state}`,
  principal: `Dr. ${['K. S. Sharma', 'R. N. Murthy', 'P. K. Verma', 'A. K. Roy', 'V. N. Iyer', 'S. M. Joshi'][idx % 6]}`,
  contactEmail: `contact@${item.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12)}.edu.in`,
  phone: `+91 ${9820000000 + idx * 1111}`,
  status: idx % 12 === 0 ? 'Notice Issued' : idx % 15 === 0 ? 'Under Inquiry' : 'Active',
  totalComplaints: 0,
  activeComplaints: 0,
  disposedComplaints: 0,
  hasOverlap: [0, 1, 6, 8, 12, 14, 23, 31].includes(idx)
}));

// Categories & subjects for generating 120+ complaints
const categoriesPool = [
  'Faculty & Staff Service Matters',
  'Student Grievance & Harassment',
  'Capitation Fee & Excess Fees',
  'Infrastructure & Norm Violation',
  'Unapproved Courses / Intake Violation',
  'Withholding of Certificates / Degrees',
  'Admission Irregularity',
  'Governance & Financial Misconduct'
];

const bureausPool = ['RB', 'PGRC', 'AB', 'VIG', 'RO_NW', 'RO_SW'];
const statusesPool = ['Pending', 'Under Process', 'Action Initiated', 'Disposed', 'Resolved', 'Overdue'];
const prioritiesPool = ['Low', 'Medium', 'High', 'Critical'];

// Generate 125 complaints
export const mockComplaints = [];

// Seed specific anchor overlap complaints first
mockComplaints.push(
  {
    id: 'CMP-2025-0101',
    institutionId: 'AICTE-1-4328911',
    institutionName: 'Apex Institute of Technology & Management',
    bureau: 'RB',
    category: 'Faculty & Staff Service Matters',
    subject: 'Illegal termination of 6 associate professors without mandatory inquiry',
    description: 'Management abruptly served termination notices to senior faculty members without adhering to AICTE 2019 service regulations and 6th CPC salary compliance.',
    dateReceived: '2025-01-14',
    lastActionDate: '2025-02-02',
    assignedOfficer: 'Dr. Anand Sharma',
    priority: 'High',
    status: 'Action Initiated',
    slaDate: '2025-02-28',
    overlappingCaseId: 'CMP-2025-0104'
  },
  {
    id: 'CMP-2025-0104',
    institutionId: 'AICTE-1-4328911',
    institutionName: 'Apex Institute of Technology & Management',
    bureau: 'PGRC',
    category: 'Student Grievance & Harassment',
    subject: 'Curriculum paralysis due to mass dismissal of Computer Science teachers',
    description: 'Students of 6th semester CSE complain that classes have been suspended for 3 weeks after abrupt removal of core subject faculty members. Exam dates approaching.',
    dateReceived: '2025-01-22',
    lastActionDate: '2025-01-30',
    assignedOfficer: 'Smt. Preeti Verma',
    priority: 'Critical',
    status: 'Under Process',
    slaDate: '2025-02-20',
    overlappingCaseId: 'CMP-2025-0101'
  },
  {
    id: 'CMP-2025-0210',
    institutionId: 'AICTE-1-7612044',
    institutionName: 'Global College of Engineering & Research',
    bureau: 'AB',
    category: 'Infrastructure & Norm Violation',
    subject: 'Unauthorized conversion of approved laboratory space into administrative cabins',
    description: 'Surprise inspection verification inquiry: The 1,200 sq. meter mechanical workshop building approved under AICTE EOA has been converted into private commercial training center.',
    dateReceived: '2025-01-08',
    lastActionDate: '2025-01-28',
    assignedOfficer: 'Shri R. K. Mukherjee',
    priority: 'High',
    status: 'Under Process',
    slaDate: '2025-02-15',
    overlappingCaseId: 'CMP-2025-0215'
  },
  {
    id: 'CMP-2025-0215',
    institutionId: 'AICTE-1-7612044',
    institutionName: 'Global College of Engineering & Research',
    bureau: 'PGRC',
    category: 'Infrastructure & Norm Violation',
    subject: 'Non-availability of CAD/CAM practical laboratories promised in prospectus',
    description: 'Third-year students report lack of laboratory sessions and software licenses for mandatory CAD design credits as designated workshop was repurposed.',
    dateReceived: '2025-01-19',
    lastActionDate: '2025-02-01',
    assignedOfficer: 'Shri Manoj P. Pillai',
    priority: 'Medium',
    status: 'Pending',
    slaDate: '2025-02-25',
    overlappingCaseId: 'CMP-2025-0210'
  },
  {
    id: 'CMP-2025-0305',
    institutionId: 'AICTE-1-6677881',
    institutionName: 'Venkateshwara College of Technology & Science',
    bureau: 'RB',
    category: 'Capitation Fee & Excess Fees',
    subject: 'Demand for caution deposit and mandatory building fund during semester registration',
    description: 'Parents association petition alleging an unauthorized surcharge of ₹45,000 per student over State Fee Regulatory Committee cap under the guise of placement services.',
    dateReceived: '2025-01-02',
    lastActionDate: '2025-01-25',
    assignedOfficer: 'Dr. Shalini Aggarwal',
    priority: 'Critical',
    status: 'Overdue',
    slaDate: '2025-01-30',
    overlappingCaseId: 'CMP-2025-0312'
  },
  {
    id: 'CMP-2025-0312',
    institutionId: 'AICTE-1-6677881',
    institutionName: 'Venkateshwara College of Technology & Science',
    bureau: 'VIG',
    category: 'Governance & Financial Misconduct',
    subject: 'Alleged diversion of institutional student fee funds into private trust account',
    description: 'Whistleblower petition from former accountant detailing diversion of excess fee collections into sister real estate entity.',
    dateReceived: '2025-01-15',
    lastActionDate: '2025-02-03',
    assignedOfficer: 'Col. K. V. Rao',
    priority: 'High',
    status: 'Action Initiated',
    slaDate: '2025-03-05',
    overlappingCaseId: 'CMP-2025-0305'
  }
);

// Programmatically generate remaining complaints up to 125
for (let i = 7; i <= 125; i++) {
  const inst = mockInstitutions[i % mockInstitutions.length];
  const cat = categoriesPool[i % categoriesPool.length];
  const bureau = bureausPool[i % bureausPool.length];
  const priority = prioritiesPool[i % prioritiesPool.length];
  const status = statusesPool[i % statusesPool.length];
  const month = (i % 5) + 1;
  const day = (i % 25) + 1;
  const dateStr = `2025-0${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

  mockComplaints.push({
    id: `CMP-2025-${1000 + i}`,
    institutionId: inst.id,
    institutionName: inst.name,
    bureau: bureau,
    category: cat,
    subject: `${cat} - Formal representation by ${i % 2 === 0 ? 'faculty body' : 'student union'} against administration`,
    description: `Formal complaint registered regarding non-compliance with AICTE statutory guidelines under ${cat} provisions during academic term 2024-25.`,
    dateReceived: dateStr,
    lastActionDate: dateStr,
    assignedOfficer: mockOfficers[i % mockOfficers.length].name,
    priority: priority,
    status: status,
    slaDate: `2025-03-${(day % 28) + 1}`,
    overlappingCaseId: null
  });
}

// Recalculate institution stats based on generated complaints
mockInstitutions.forEach((inst) => {
  const instCmps = mockComplaints.filter((c) => c.institutionId === inst.id);
  inst.totalComplaints = instCmps.length;
  inst.activeComplaints = instCmps.filter((c) => c.status !== 'Disposed' && c.status !== 'Resolved').length;
  inst.disposedComplaints = instCmps.filter((c) => c.status === 'Disposed' || c.status === 'Resolved').length;
});

// Real Overlap Scenarios
export const mockOverlaps = [
  {
    id: 'OVL-2025-001',
    institutionId: 'AICTE-1-4328911',
    institutionName: 'Apex Institute of Technology & Management',
    case1Id: 'CMP-2025-0101',
    case1Bureau: 'Regulation Bureau (RB)',
    case1Category: 'Faculty & Staff Service Matters',
    case1Officer: 'Dr. Anand Sharma',
    case1Status: 'Action Initiated',
    case2Id: 'CMP-2025-0104',
    case2Bureau: 'Public Grievance Redressal Cell (PGRC)',
    case2Category: 'Student Grievance & Harassment',
    case2Officer: 'Smt. Preeti Verma',
    case2Status: 'Under Process',
    similarityScore: 92,
    detectionType: 'Cross-Bureau Entity & Root-Cause Overlap',
    detectionDate: '2025-01-23',
    status: 'Awaiting Coordination',
    summary: 'PGRC student complaint against sudden curriculum disruption directly correlates with RB case regarding mass faculty terminations at Apex Institute.',
    recommendation: 'Form joint inquiry team under RB & PGRC. Consolidate institutional show-cause hearing to prevent conflicting determinations.'
  },
  {
    id: 'OVL-2025-002',
    institutionId: 'AICTE-1-7612044',
    institutionName: 'Global College of Engineering & Research',
    case1Id: 'CMP-2025-0210',
    case1Bureau: 'Approval Bureau (AB)',
    case1Category: 'Infrastructure & Norm Violation',
    case1Officer: 'Shri R. K. Mukherjee',
    case1Status: 'Under Process',
    case2Id: 'CMP-2025-0215',
    case2Bureau: 'Public Grievance Redressal Cell (PGRC)',
    case2Category: 'Infrastructure & Norm Violation',
    case2Officer: 'Shri Manoj P. Pillai',
    case2Status: 'Pending',
    similarityScore: 88,
    detectionType: 'Physical Asset & Academic Deficit Correlation',
    detectionDate: '2025-01-20',
    status: 'Coordination Recommended',
    summary: 'Student complaints regarding missing computer-aided design lab facilities correlate with unapproved architectural alterations cited in AB approval verification.',
    recommendation: 'Direct Regional Officer (South-Western) to conduct unified physical site validation addressing both infrastructure compliance and student lab access.'
  },
  {
    id: 'OVL-2025-003',
    institutionId: 'AICTE-1-6677881',
    institutionName: 'Venkateshwara College of Technology & Science',
    case1Id: 'CMP-2025-0305',
    case1Bureau: 'Regulation Bureau (RB)',
    case1Category: 'Capitation Fee & Excess Fees',
    case1Officer: 'Dr. Shalini Aggarwal',
    case1Status: 'Overdue',
    case2Id: 'CMP-2025-0312',
    case2Bureau: 'Vigilance Cell (VIG)',
    case2Category: 'Governance & Financial Misconduct',
    case2Officer: 'Col. K. V. Rao',
    case2Status: 'Action Initiated',
    similarityScore: 95,
    detectionType: 'Financial Irregularity & Fee Regulatory Breach',
    detectionDate: '2025-01-16',
    status: 'High Priority Coordination',
    summary: 'Excess fee complaints lodged with Regulation Bureau match private financial diversion allegations currently under Vigilance Cell preliminary probe.',
    recommendation: 'Summon Management to Headquarters for joint deposition before Member Secretary, with audit records subpoenaed.'
  }
];

export const mockTimelineEvents = [
  {
    caseId: 'CMP-2025-0101',
    events: [
      {
        id: 'EVT-1',
        date: '2025-01-14 10:30 AM',
        title: 'Formal Complaint Logged',
        officer: 'System Registry / Reception',
        bureau: 'Central Inward Cell',
        action: 'Complaint Registered',
        remarks: 'Received formal petition with signed affidavit from 6 faculty members.'
      },
      {
        id: 'EVT-2',
        date: '2025-01-15 02:15 PM',
        title: 'Assigned to Regulation Bureau',
        officer: 'Dr. Anand Sharma',
        bureau: 'Regulation Bureau',
        action: 'Bureau Allocation',
        remarks: 'Categorized under Faculty & Staff Service Regulations (2019 Notification).'
      },
      {
        id: 'EVT-3',
        date: '2025-01-24 11:00 AM',
        title: 'Intelligent Overlap Flagged',
        officer: 'AICTE NIVARAN Core Engine',
        bureau: 'System Coordinated',
        action: 'Overlap Detection (OVL-2025-001)',
        remarks: 'Identified parallel grievance CMP-2025-0104 active in PGRC regarding identical faculty dismissals.'
      },
      {
        id: 'EVT-4',
        date: '2025-02-02 04:45 PM',
        title: 'Show Cause Notice Issued',
        officer: 'Dr. Anand Sharma',
        bureau: 'Regulation Bureau',
        action: 'Action Initiated',
        remarks: 'Notice issued to Chairman & Principal with 15-day compliance window.'
      }
    ]
  }
];

export const mockNotifications = [
  {
    id: 'NOTIF-01',
    title: 'Cross-Bureau Overlap Flagged',
    message: 'High priority overlap detected between RB and PGRC for Apex Institute of Technology.',
    timestamp: '15 mins ago',
    type: 'alert',
    read: false,
    link: '/overlaps'
  },
  {
    id: 'NOTIF-02',
    title: 'SLA Escalation Warning',
    message: 'Case CMP-2025-0305 (Venkateshwara College) has exceeded 30-day response window.',
    timestamp: '2 hours ago',
    type: 'warning',
    read: false,
    link: '/case-tracking'
  },
  {
    id: 'NOTIF-03',
    title: 'New Complaint Registered',
    message: 'New infrastructure grievance logged under Western Regional Office.',
    timestamp: '1 day ago',
    type: 'info',
    read: true,
    link: '/complaints'
  }
];