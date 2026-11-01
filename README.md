# AICTE NIVARAN
> **National Integrated Voice for Action, Redress & Accountability**  
> *An Integrated Institution Complaint Monitoring, 360° Audit & Cross-Bureau Overlap Coordination Platform*

---

[![Smart India Hackathon](https://img.shields.io/badge/Smart%20India%20Hackathon-2024%2F2026-102A56?style=for-the-badge)](https://sih.gov.in/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-F2B544.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌐 Live Deployments & Credentials

| Resource | URL |
| :--- | :--- |
| **Public Web Application** | [https://aicte-nivaran-phi.vercel.app](https://aicte-nivaran-phi.vercel.app) |
| **Interactive API Documentation** | [https://aicte-nivaran-api.onrender.com/docs](https://aicte-nivaran-api.onrender.com/docs) |
| **Evaluator Email** | `officer.aicte@nic.in` |
| **Evaluator Password** | `Admin@123` |
| **Operational Role** | `Super Admin (Member Secretary / Advisor)` |

---

## 📌 Problem Statement & Context

The **All India Council for Technical Education (AICTE)** processes complaints and regulatory matters across multiple statutory departments:
* **Regulation Bureau (RB)**: Faculty service rules, pay scale violations, unapproved courses.
* **Public Grievance Redressal Cell (PGRC)**: Student harassment, certificate retention, curriculum disruption.
* **Approval Bureau (AB)**: Land/infrastructure norms, Extension of Approval (EoA) compliance.
* **Vigilance Cell (VIG)**: Financial diversion, administrative misconduct.
* **Regional Offices**: Field validations across 7 zones.

### The Silo Trap
When an institutional crisis occurs, stakeholders file separate petitions with different bureaus at the same time:
* *Faculty file salary non-payment petitions with the **Regulation Bureau**.*
* *Students file class suspension grievances with the **Public Grievance Redressal Cell**.*

Because departments traditionally operate without real-time cross-referencing, the result is:
1. **Duplicated Administrative Effort**: Separate officers conduct parallel inquiries on the same college.
2. **Conflicting Statutory Orders**: One bureau may issue a show-cause notice while another processes approval.
3. **Regulatory Evasion**: Non-compliant administrations exploit departmental delays.

---


## 💡 The Solution: AICTE NIVARAN
┌──────────────────────────────────────────────────────────────────────────┐
│ AICTE NIVARAN │
├─────────────────────┬────────────────────────────┬───────────────────────┤
│ 1. INSTITUTION │ 2. INTELLIGENT OVERLAP │ 3. COORDINATED │
│ 360° PROFILE │ DETECTION ENGINE │ DISPOSAL │
├─────────────────────┼────────────────────────────┼───────────────────────┤
│ Single master file │ Semantic NLP scans across │ One-click linking for │
│ aggregating lifetime│ bureaus to flag duplicate │ joint Jan Sunwai │
│ cases by AICTE ID. │ inquiries in real time. │ virtual hearings. │
└─────────────────────┴────────────────────────────┴───────────────────────┘
code
Code
1. **Centralized Institution 360° Profile**: Every accredited college has a single permanent ledger aggregating all lifetime complaints, approval histories, and show-cause notices by **Permanent AICTE ID**.
2. **Intelligent Cross-Bureau Overlap Engine**: A semantic matching engine (RapidFuzz NLP) that scans complaints across bureaus in real time. When related root causes are detected, it alerts officers with a **`POTENTIAL OVERLAPPING CASES — COORDINATION REQUIRED`** banner and a similarity score.
3. **Statutory 30-Day SLA Enforcement**: Tracks complaint ageing across brackets (`0-7`, `8-15`, `16-30`, and `>30 days Overdue`), escalating delayed cases to senior council management.

---

## 🏛️ Key Capabilities & Features

### 1. Centralized Institution Profile
* **Permanent AICTE ID Mapping**: Aggregates institutional metadata (region, state, category, principal/director contacts) under an immutable master identifier.
* **Consolidated Case Dossier**: Cross-departmental timeline tracking all active, under-process, and historic disposed matters.

### 2. Cross-Bureau Overlap Detection *(Core Innovation)*
* **Semantic Root-Cause Matching**: Evaluates token similarity across descriptions to identify correlated events even when phrasing differs (e.g., student strikes correlating with faculty non-payment).
* **Automated Coordination Matrix**: Displays real-time similarity metrics, detection category, and procedural recommendations.
* **Human-in-the-Loop Safeguard**: Generates non-binding recommendations; case linking requires explicit officer concurrence before joint hearings are scheduled.

### 3. Chronological Case Lifecycle & Audit Trail
* **Immutable Timeline Nodes**: Timestamped entries for intake, bureau allocation, officer assignment, show-cause dispatch, depositions, and final disposal orders.
* **Inter-Bureau Transfer Workflow**: Re-assigns jurisdictional ownership with logged administrative justifications.

### 4. Real-Time Telemetry & GIS Integration
* **Interactive Survey of India GIS Layer**: Dynamically synchronized state-by-state complaint density map.
* **Executive Action Hub**: Surface-level alert board prioritizing imminent SLA breaches and unreviewed cross-bureau collisions.
* **Multi-Dimensional Analytical Reports**: Workload distribution, disposal efficiency ratings, and case ageing analysis exportable to CSV.

### 5. GIGW 3.0 Compliance & Accessibility
* **Bilingual Support**: Dynamic toggle between English and Hindi interfaces.
* **Accessibility Controls**: Triple-scale font adjustment (`A-`, `A`, `A+`) and high-contrast display mode for visually impaired officers.
* **Slide-Over Quick-View Drawers**: Inspect dossiers without losing navigational context or table filter parameters.

---

## 🛠️ Architecture & Technology Stack
aicte-nivaran/
├── frontend/ # React 18 SPA (Vite, Tailwind CSS, Recharts, Leaflet)
└── backend/ # Python FastAPI Gateway, SQLAlchemy & SQLite/PostgreSQL
code
Code
### Technology Breakdown

| Layer | Technology | Function |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18+ (Vite) | Single-page reactive application shell |
| **Styling & Theme** | Tailwind CSS | Institutional design system (`#102A56` / `#174EA6`) |
| **Typography** | Linux Biolinum & Google Sans | Sovereign governmental headings & legible data views |
| **Data Visualization** | Leaflet & Recharts | Interactive GIS state mapping & administrative analytics |
| **State & Navigation** | React Context & React Router v6 | Global state synchronization and protected role routing |
| **API Backend** | Python FastAPI (0.115) | Asynchronous RESTful service layer (`/api/v1`) |
| **Data Validation** | Pydantic v2 | Contract schemas for request/response serialization |
| **ORM & Database** | SQLAlchemy 2.0 (SQLite / Postgres) | Relational store indexed on institution and bureau keys |
| **Overlap Detection** | RapidFuzz (C++ engine) | In-memory token-set root-cause matching |
| **Hosting & Cloud** | Vercel Edge & Render Containers | Distributed front-end CDN and containerized API engine |

---

## 🔄 End-to-End Operational Workflow
[ Citizen / Stakeholder Petition ]
│
▼
┌────────────────────────────────────────────────────────┐
│ 1. Central Digital Inward (Portal Intake) │
│ • Assigned unique identifier (e.g., CMP-2025-XXXX) │
│ • Mapped to Permanent AICTE Institution ID │
│ • Routed to target bureau (RB, PGRC, AB, VIG, RO) │
└───────────────────────┬────────────────────────────────┘
│
▼
┌────────────────────────────────────────────────────────┐
│ 2. Automated Overlap & Collision Scan │
│ • Background task evaluates text semantics │
│ • Cross-references active inquiries for same entity │
│ • Flags similarity index (Threshold >= 75%) │
└───────────────────────┬────────────────────────────────┘
│
▼
┌────────────────────────────────────────────────────────┐
│ 3. Officer Review & Coordination │
│ • High-priority notification posted to Action Hub │
│ • Side-by-side comparison of dual case files │
│ • One-click action: "Link for Joint Bureau Hearing" │
└───────────────────────┬────────────────────────────────┘
│
▼
┌────────────────────────────────────────────────────────┐
│ 4. Unified Disposal & Compliance (30-Day SLA) │
│ • Joint virtual hearing scheduled via BharatVC │
│ • Single enforceable directive issued to management │
│ • Chronological audit trail permanently committed │
└────────────────────────────────────────────────────────┘
code
Code
---

## 🚀 Local Installation & Execution

### Prerequisites
* **Node.js** (v18 or higher)
* **Python** (v3.11 or v3.12)
* **Git**

### 1. Clone Repository

git clone https://github.com/darkpegassus/aicte-nivaran.git
cd aicte-nivaran
2. Backend Initialization
code
Bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Populate synthetic database (50 colleges, 125 complaints, baseline overlaps)
python seed_data.py

# Launch FastAPI development server
uvicorn app.main:app --reload --port 8000
API Root: http://127.0.0.1:8000
Interactive OpenAPI Specs: http://127.0.0.1:8000/docs
3. Frontend Initialization (In a Separate Terminal)
code
Bash
cd frontend

# Install dependencies
npm install

# Start Vite local server
npm run dev
Application Shell: http://localhost:3000
🧪 Demonstration Test Scenario (Evaluator Walkthrough)
To verify the core Cross-Bureau Overlap Detection mechanism:
Access Portal: Navigate to http://localhost:3000 and sign in with officer.aicte@nic.in / Admin@123.
Review Baseline State: Note that Apex Institute of Technology (AICTE-1-4328911) has an active case under the Regulation Bureau (RB) for mass faculty dismissals (CMP-2025-0101).
Register Correlated Matter:
Navigate to Grievance Central (/complaints) 
→
→
 Click + Register New Complaint.
Select Apex Institute of Technology.
Bureau: Public Grievance Redressal Cell (PGRC).
Category: Student Grievance & Harassment.
Subject: Final-year class disruption due to faculty removal.
Description: CSE students report complete stoppage of classes following abrupt dismissal of core department professors.
Submit the complaint.
Inspect Overlap Engine:
Open Overlap Detection Engine (/overlaps).
The system immediately displays an 85%+ Similarity Collision Alert.
Click Compare & Coordinate to inspect the side-by-side evidence matrix.
Click Link Cases for Joint Bureau Hearing to synchronize procedural oversight.
Inspect Dynamic Sync:
Return to the Dashboard; Maharashtra's tally on the interactive India GIS Map increments in real time.
🔒 Security, Compliance & Data Disclaimer
Synthetic Data Usage: All institutional titles, names, registration codes, and case texts contained in this repository are synthetically generated demonstration data.
Zero Production Access: The software is not connected to live government networks or confidential AICTE production databases.
Advisory Operations: The algorithmic engine only produces advisory flags and never autonomously determines, dismisses, or merges statutory legal disputes.
👥 Hackathon Context & Acknowledgments
Initiative: Smart India Hackathon (SIH) 2024 / 2026
Nodal Organization: All India Council for Technical Education (AICTE), Ministry of Education, Government of India
Design Standards: Guidelines for Indian Government Websites (GIGW 3.0) & Department of Consumer Affairs e-Jagriti Framework
📄 License
This project is open-source and licensed under the MIT License.
