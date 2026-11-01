from datetime import date, timedelta
from app.database import Base, engine, SessionLocal
from app.models import Institution, Bureau, Officer, Complaint, CaseHistory, Notification, CaseLink
from app.services.overlap_engine import detect_overlaps

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# Wipe existing demo data for clean idempotent seeding
db.query(CaseHistory).delete()
db.query(CaseLink).delete()
db.query(Complaint).delete()
db.query(Officer).delete()
db.query(Bureau).delete()
db.query(Institution).delete()
db.query(Notification).delete()
db.commit()

print("Seeding AICTE NIVARAN synthetic master dataset...")

# 1. Bureaus
bureau_rows = [
    ("RB", "Regulation Bureau"),
    ("PGRC", "Public Grievance Redressal Cell"),
    ("AB", "Approval Bureau"),
    ("VIG", "Vigilance Cell"),
    ("RO_NW", "North-Western Regional Office"),
    ("RO_SW", "South-Western Regional Office")
]
for code, name in bureau_rows:
    db.add(Bureau(id=code, name=name))

# 2. Officers
officers = [
    ("OFF01", "Dr. Anand Sharma", "RB", "Joint Director (Regulation)"),
    ("OFF02", "Smt. Preeti Verma", "PGRC", "Director (Grievance)"),
    ("OFF03", "Shri R. K. Mukherjee", "AB", "Deputy Director (Approvals)"),
    ("OFF04", "Col. K. V. Rao", "VIG", "Chief Vigilance Officer"),
    ("OFF05", "Dr. Sunita Deshmukh", "RO_NW", "Regional Officer (NWRO)"),
    ("OFF06", "Shri Manoj P. Pillai", "PGRC", "Assistant Director"),
    ("OFF07", "Dr. Shalini Aggarwal", "RB", "Legal Consultant"),
    ("OFF08", "Er. Alok Ranjan", "AB", "Technical Officer"),
    ("OFF09", "Dr. T. Ramanathan", "RO_SW", "Regional Officer (SWRO)"),
    ("OFF10", "Shri Deepak Chhabra", "VIG", "Inquiry Inspector")
]
for oid, name, bureau, designation in officers:
    db.add(Officer(id=oid, name=name, bureau_id=bureau, designation=designation, email=f"{name.lower().replace(' ', '.')}@aicte-india.org"))
db.flush()

# 3. 50 Unique Institutions
inst_data = [
    ('AICTE-1-4328911', 'Apex Institute of Technology & Management', 'Maharashtra', 'Western Region', 'Private Self-Financed Institute', 'Pune'),
    ('AICTE-1-7612044', 'Global College of Engineering & Research', 'Karnataka', 'South-Western Region', 'Private Self-Financed Institute', 'Bengaluru'),
    ('AICTE-1-1092837', 'National Polytechnic and Skill Institute', 'Uttar Pradesh', 'Northern Region', 'Autonomous Polytechnic', 'Kanpur'),
    ('AICTE-1-9823412', 'Sardar Patel Institute of Advanced Studies', 'Gujarat', 'Central Region', 'Deemed-to-be-University', 'Anand'),
    ('AICTE-1-3349012', 'Himalayan Institute of Technology', 'Uttarakhand', 'North-Western Region', 'Private Self-Financed Institute', 'Dehradun'),
    ('AICTE-1-5542109', 'Tagore Memorial College of Engineering', 'West Bengal', 'Eastern Region', 'Government Engineering College', 'Kolkata'),
    ('AICTE-1-6677881', 'Venkateshwara College of Technology & Science', 'Tamil Nadu', 'Southern Region', 'Private Self-Financed Institute', 'Chengalpattu'),
    ('AICTE-1-8899002', 'Delhi Institute of Technical Studies', 'Delhi', 'North-Western Region', 'University Constituent College', 'Dwarka'),
    ('AICTE-1-1122334', 'Kalinga Institute of Technology & Science', 'Odisha', 'Eastern Region', 'Deemed-to-be-University', 'Bhubaneswar'),
    ('AICTE-1-2233445', 'Punjab Technical College of Engineering', 'Punjab', 'North-Western Region', 'Government Engineering College', 'Patiala'),
    ('AICTE-1-3344556', 'Andhra Loyola Institute of Engineering', 'Andhra Pradesh', 'Southern Region', 'Private Self-Financed Institute', 'Vijayawada'),
    ('AICTE-1-4455667', 'Malabar Institute of Technology', 'Kerala', 'South-Western Region', 'Private Self-Financed Institute', 'Kannur'),
    ('AICTE-1-5566778', 'Jaipur National Engineering Academy', 'Rajasthan', 'North-Western Region', 'Private Self-Financed Institute', 'Jaipur'),
    ('AICTE-1-6677889', 'Bhopal Institute of Technology & Science', 'Madhya Pradesh', 'Central Region', 'Private Self-Financed Institute', 'Bhopal'),
    ('AICTE-1-7788990', 'Hyderabad Institute of Advanced Tech', 'Telangana', 'Southern Region', 'Deemed-to-be-University', 'Hyderabad'),
    ('AICTE-1-8899112', 'Patna Polytechnic Institute', 'Bihar', 'Eastern Region', 'Autonomous Polytechnic', 'Patna'),
    ('AICTE-1-9900223', 'Ranchi Engineering & Applied Sciences College', 'Jharkhand', 'Eastern Region', 'Government Engineering College', 'Ranchi'),
    ('AICTE-1-1011223', 'Assam Royal Technical Institute', 'Assam', 'Eastern Region', 'Private Self-Financed Institute', 'Guwahati'),
    ('AICTE-1-1213141', 'Haryana College of Technology & Mgmt', 'Haryana', 'North-Western Region', 'Private Self-Financed Institute', 'Kaithal'),
    ('AICTE-1-1415161', 'Chhattisgarh Institute of Technology', 'Chhattisgarh', 'Central Region', 'Government Engineering College', 'Raipur'),
    ('AICTE-1-1718192', 'Goa Technical Academy', 'Goa', 'Western Region', 'Government Engineering College', 'Panaji'),
    ('AICTE-1-2021223', 'Shimla Institute of Engineering', 'Himachal Pradesh', 'North-Western Region', 'Autonomous Polytechnic', 'Shimla'),
    ('AICTE-1-2324254', 'Kashmir Valley Institute of Technology', 'Jammu and Kashmir', 'North-Western Region', 'Private Self-Financed Institute', 'Srinagar'),
    ('AICTE-1-2627285', 'Nagpur Institute of Engineering & Research', 'Maharashtra', 'Western Region', 'Private Self-Financed Institute', 'Nagpur'),
    ('AICTE-1-2930316', 'Mysuru College of Engineering', 'Karnataka', 'South-Western Region', 'Government Engineering College', 'Mysuru'),
    ('AICTE-1-3233347', 'Coimbatore Institute of Engineering', 'Tamil Nadu', 'Southern Region', 'Autonomous Polytechnic', 'Coimbatore'),
    ('AICTE-1-3536378', 'Lucknow Institute of Technology', 'Uttar Pradesh', 'Northern Region', 'Private Self-Financed Institute', 'Lucknow'),
    ('AICTE-1-3839409', 'Vadodara Institute of Technical Studies', 'Gujarat', 'Central Region', 'University Constituent College', 'Vadodara'),
    ('AICTE-1-4142431', 'Durgapur Polytechnic Institute', 'West Bengal', 'Eastern Region', 'Autonomous Polytechnic', 'Durgapur'),
    ('AICTE-1-4445462', 'Cuttack Technical Institute', 'Odisha', 'Eastern Region', 'Government Engineering College', 'Cuttack'),
    ('AICTE-1-4748493', 'Ludhiana College of Engineering', 'Punjab', 'North-Western Region', 'Private Self-Financed Institute', 'Ludhiana'),
    ('AICTE-1-5051524', 'Visakhapatnam Institute of Technology', 'Andhra Pradesh', 'Southern Region', 'Private Self-Financed Institute', 'Visakhapatnam'),
    ('AICTE-1-5354555', 'Kochi College of Advanced Studies', 'Kerala', 'South-Western Region', 'University Constituent College', 'Kochi'),
    ('AICTE-1-5657586', 'Jodhpur Institute of Technical Sciences', 'Rajasthan', 'North-Western Region', 'Private Self-Financed Institute', 'Jodhpur'),
    ('AICTE-1-5960617', 'Indore Institute of Technology & Science', 'Madhya Pradesh', 'Central Region', 'Private Self-Financed Institute', 'Indore'),
    ('AICTE-1-6263648', 'Warangal Polytechnic & Skill College', 'Telangana', 'Southern Region', 'Autonomous Polytechnic', 'Warangal'),
    ('AICTE-1-6566679', 'Gaya Technical Institute', 'Bihar', 'Eastern Region', 'Government Engineering College', 'Gaya'),
    ('AICTE-1-6869701', 'Jamshedpur Institute of Technology', 'Jharkhand', 'Eastern Region', 'Private Self-Financed Institute', 'Jamshedpur'),
    ('AICTE-1-7172732', 'Silchar Engineering College', 'Assam', 'Eastern Region', 'Government Engineering College', 'Silchar'),
    ('AICTE-1-7475763', 'Ambala College of Engineering', 'Haryana', 'North-Western Region', 'Private Self-Financed Institute', 'Ambala'),
    ('AICTE-1-7778794', 'Bhilai Institute of Advanced Technology', 'Chhattisgarh', 'Central Region', 'Private Self-Financed Institute', 'Bhilai'),
    ('AICTE-1-8081825', 'Dharwad College of Technology', 'Karnataka', 'South-Western Region', 'Government Engineering College', 'Dharwad'),
    ('AICTE-1-8384856', 'Madurai Institute of Engineering', 'Tamil Nadu', 'Southern Region', 'Private Self-Financed Institute', 'Madurai'),
    ('AICTE-1-8687887', 'Varanasi Technical Academy', 'Uttar Pradesh', 'Northern Region', 'University Constituent College', 'Varanasi'),
    ('AICTE-1-8990918', 'Surat Institute of Technology', 'Gujarat', 'Central Region', 'Private Self-Financed Institute', 'Surat'),
    ('AICTE-1-9293949', 'Siliguri Polytechnic Institute', 'West Bengal', 'Eastern Region', 'Autonomous Polytechnic', 'Siliguri'),
    ('AICTE-1-9596970', 'Rourkela Engineering College', 'Odisha', 'Eastern Region', 'Government Engineering College', 'Rourkela'),
    ('AICTE-1-9899001', 'Jalandhar Institute of Engineering & Tech', 'Punjab', 'North-Western Region', 'Private Self-Financed Institute', 'Jalandhar'),
    ('AICTE-1-1002003', 'Tirupati Institute of Technology', 'Andhra Pradesh', 'Southern Region', 'Deemed-to-be-University', 'Tirupati'),
    ('AICTE-1-2003004', 'Thiruvananthapuram Engineering Academy', 'Kerala', 'South-Western Region', 'Government Engineering College', 'Thiruvananthapuram')
]

for i, (iid, name, state, region, typ, city) in enumerate(inst_data):
    db.add(Institution(
        id=iid, name=name, state=state, region=region, type=typ,
        address=f"{i+10}, Knowledge Park Zone, {city}, {state}",
        principal=f"Dr. Demonstration Principal {i+1}",
        contact_email=f"institution{i+1}@example.edu.in",
        phone=f"+91 90000{i+1:05d}",
        status="Active"
    ))
db.flush()

# 4. Standard Categories
categories = [
    "Faculty & Staff Service Matters", "Student Grievance & Harassment",
    "Capitation Fee & Excess Fees", "Infrastructure & Norm Violation",
    "Unapproved Courses / Intake Violation", "Withholding of Certificates / Degrees",
    "Admission Irregularity", "Governance & Financial Misconduct"
]

# 5. Strategic Anchor Overlaps (High Value Demo Scenarios)
anchor = [
    ("CMP-2025-0101", 0, "RB", 0, "Illegal termination of 6 associate professors without mandatory inquiry", "Management abruptly served termination notices to senior faculty members without adhering to AICTE service regulations.", "OFF01", "Action Initiated", "High", 14),
    ("CMP-2025-0104", 0, "PGRC", 1, "Curriculum paralysis due to mass dismissal of Computer Science teachers", "Students report suspended classes after abrupt removal of core subject faculty members. Exam approaching.", "OFF02", "Under Process", "Critical", 22),
    ("CMP-2025-0210", 1, "AB", 3, "Unauthorized conversion of approved laboratory space into administrative cabins", "Approved mechanical workshop space was converted into a commercial training centre.", "OFF03", "Under Process", "High", 8),
    ("CMP-2025-0215", 1, "PGRC", 3, "Non-availability of CAD/CAM practical laboratories promised in prospectus", "Students report lack of laboratory sessions because the approved workshop was repurposed.", "OFF06", "Pending", "Medium", 19),
    ("CMP-2025-0305", 6, "RB", 2, "Demand for caution deposit and mandatory building fund", "Parents allege unauthorized surcharge over the prescribed state fee cap.", "OFF07", "Overdue", "Critical", 45),
    ("CMP-2025-0312", 6, "VIG", 7, "Alleged diversion of institutional student fee funds into private trust account", "Whistleblower alleges diversion of excess fee collections into a related private real estate entity.", "OFF04", "Action Initiated", "High", 15)
]

for cid, idx, bureau, catidx, subject, desc, officer, status, priority, days in anchor:
    rec = date(2025, 1, 14) if "0101" in cid else (date(2025, 1, 22) if "0104" in cid else date(2025, 1, 8))
    db.add(Complaint(
        id=cid, institution_id=inst_data[idx][0], bureau_id=bureau,
        category=categories[catidx], subject=subject, description=desc,
        date_received=rec, last_action_date=rec + timedelta(days=10),
        assigned_officer_id=officer, priority=priority, status=status,
        sla_date=rec + timedelta(days=30)
    ))
db.flush()

# 6. Seed Remaining 120+ Complaints
officer_ids = [x[0] for x in officers]
bureaus_pool = ["RB", "PGRC", "AB", "VIG", "RO_NW", "RO_SW"]
statuses_pool = ["Pending", "Under Process", "Action Initiated", "Disposed", "Resolved", "Overdue"]

for i in range(7, 126):
    inst_index = (i * 7) % 50
    iid = inst_data[inst_index][0]
    bureau = bureaus_pool[i % len(bureaus_pool)]
    received = date(2025, 1 + (i % 5), 1 + (i % 25))
    status = statuses_pool[i % len(statuses_pool)]
    cat = categories[i % len(categories)]
    
    db.add(Complaint(
        id=f"CMP-2025-{1000+i}",
        institution_id=iid,
        bureau_id=bureau,
        category=cat,
        subject=f"{cat} - Formal representation by stakeholders #{i}",
        description=f"Synthetic complaint concerning institutional compliance and stakeholder grievance during academic session 2024-25. Reference {i}.",
        date_received=received,
        last_action_date=received + timedelta(days=3),
        assigned_officer_id=officer_ids[i % len(officer_ids)],
        priority=["Low", "Medium", "High", "Critical"][i % 4],
        status=status,
        sla_date=received + timedelta(days=30)
    ))
db.flush()

# 7. Initial Action Trails
for c in db.query(Complaint).all():
    db.add(CaseHistory(
        complaint_id=c.id, title="Complaint registered",
        action="Complaint Registered", officer="System Registry",
        bureau=c.bureau_id, remarks="Recorded in AICTE NIVARAN Central Inward."
    ))

# 8. Initial Notifications
db.add(Notification(
    title="NIVARAN Master Dataset Ready",
    message="50 institutions and 125 complaints loaded for evaluation.",
    type="info",
    link="/dashboard"
))
db.commit()

# 9. Run Overlap Detection Engine
created_links = detect_overlaps(db)

print(f"Seed complete:")
print(f" - Institutions: {db.query(Institution).count()}")
print(f" - Complaints:   {db.query(Complaint).count()}")
print(f" - Overlaps:     {len(created_links)}")

db.close()