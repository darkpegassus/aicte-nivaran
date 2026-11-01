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

## 💡 The Solution: AICTE NIVARAN##
┌──────────────────────────────────────────────────────────────────────────┐
│ AICTE NIVARAN                                                            │
├─────────────────────┬────────────────────────────┬───────────────────────┤
│ 1. INSTITUTION      │ 2. INTELLIGENT OVERLAP     │ 3. COORDINATED        │
│ 360° PROFILE        │ DETECTION ENGINE           │ DISPOSAL              │
├─────────────────────┼────────────────────────────┼───────────────────────┤
│ Single master file  │ Semantic NLP scans across  │ One-click linking for │
│ aggregating lifetime│ bureaus to flag duplicate  │ joint Jan Sunwai      │
│ cases by AICTE ID.  │ inquiries in real time.    │ virtual hearings.     │
└─────────────────────┴────────────────────────────┴───────────────────────┘

1. **Centralized Institution 360° Profile**: Every accredited college has a single permanent ledger aggregating all lifetime complaints, approval histories, and show-cause notices by **Permanent AICTE ID**.
2. **Intelligent Cross-Bureau Overlap Engine**: A semantic matching engine (RapidFuzz NLP) that scans complaints across bureaus in real time. When related root causes are detected, it alerts officers with a **`POTENTIAL OVERLAPPING CASES — COORDINATION REQUIRED`** banner and a similarity score.
3. **Statutory 30-Day SLA Enforcement**: Tracks complaint ageing across brackets (`0-7`, `8-15`, `16-30`, and `>30 days Overdue`), escalating delayed cases to senior council management.

---

## 🏛️ Key Features & GIGW Compliance

* **GIGW 3.0 Accessibility Toolbar**: Top government ribbon with dynamic font sizing (`A-`, `A`, `A+`), high-contrast black-and-yellow display mode, and a bilingual toggle (Hindi & English).
* **Interactive GIS India Map**: Dynamic Survey of India vector map reflecting real-time state complaint counts directly from the database.
* **Priority Action Hub**: Prominent dashboard callout highlighting urgent items requiring officer review today.
* **Chronological Case Tracking**: Immutable vertical lifecycle timeline tracking every procedural step, officer note, bureau transfer, and final order.
* **Quick-View Drawer**: Slide-over panel to inspect complaint dossiers without losing table filters or navigating away.
* **Reports Suite**: Interactive analytical charts (Recharts) with one-click CSV export and printable audit reports.

---

## 🛠️ Architecture & Tech Stack
aicte-nivaran/
├── frontend/               # React 18 SPA (Vite, Tailwind CSS, Recharts, Lucide)
└── backend/                # Python FastAPI Gateway, SQLAlchemy & SQLite/PostgreSQL

Frontend
Core Framework: React 18+ with Vite
Styling: Tailwind CSS (Navy #102A56 & Royal Blue #174EA6)
Typography: Linux Biolinum (Statutory Titles) & Google Sans (Modern UI)
Data Visualization: Leaflet/SVG Cartographic Map, Recharts Analytics
State & Routing: React Context API, React Router DOM v6
Backend
API Framework: FastAPI 0.115 (Asynchronous Python 3.11 / 3.12)
Validation: Pydantic v2
Database & ORM: SQLAlchemy 2.0 with SQLite (Dev) / PostgreSQL (Prod)
Semantic Engine: RapidFuzz token-set root-cause similarity scoring
Server: Uvicorn ASGI
🚀 Local Development Setup
Prerequisites
Node.js (v18+)
Python (v3.11 or v3.12)
Git
1. Clone the Repository
code
Bash
git clone https://github.com/darkpegassus/aicte-nivaran.git
cd aicte-nivaran
2. Backend Setup
code
Bash
cd backend

# Create and activate virtual environment
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed the master dataset (50 institutions, 125 complaints, initial overlaps)
python seed_data.py

# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
Backend API Base: http://127.0.0.1:8000
Interactive Swagger UI: http://127.0.0.1:8000/docs
3. Frontend Setup (In a New Terminal)
code
Bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
Frontend Web Application: http://localhost:3000
🧪 Demonstration Test Scenario
To test the platform's core innovation — Cross-Bureau Overlap Detection:
Log in at http://localhost:3000 using officer.aicte@nic.in / Admin@123.
Notice that Apex Institute of Technology already has an active inquiry under the Regulation Bureau (RB) for mass faculty terminations (CMP-2025-0101).
Go to Grievance Central (/complaints) 
→
→
 Click + Register New Complaint.
Select Apex Institute of Technology, set Bureau to PGRC, Category to Student Grievance, and enter:
Subject: Class suspension due to missing faculty members.
Description: Final year students report curriculum paralysis following the abrupt dismissal of core professors.
Click Submit & Route Case.
The Result:
Navigate to Overlap Detection Engine (/overlaps).
NIVARAN's semantic engine flags a 92% Similarity Collision between the RB and PGRC cases.
Click Compare & Coordinate 
→
→
 Click Link Cases for Joint Bureau Hearing to schedule a unified proceeding.
Return to the Dashboard — the India Map count for Maharashtra updates dynamically.
🔒 Security & Data Privacy Notice
All institutional and personal records included in this repository are synthetic demonstration records created solely for prototype evaluation.
No confidential or production AICTE grievance records have been used.
The system is designed with human-in-the-loop safeguards: NIVARAN generates recommendations for authorized officer review and never unilaterally closes statutory complaints.
👥 Hackathon Context
Event: Smart India Hackathon (SIH) 2024 / 2026
Organization: All India Council for Technical Education (AICTE), Ministry of Education, Government of India
Design Standards: Guidelines for Indian Government Websites (GIGW 3.0) & Department of Consumer Affairs e-Jagriti Framework
📄 License
This project is open-source and licensed under the MIT License.
