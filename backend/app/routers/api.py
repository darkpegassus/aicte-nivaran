from datetime import date, datetime
from fastapi import APIRouter, Depends, HTTPException # type: ignore
from sqlalchemy.orm import Session, joinedload # type: ignore
from app.database import get_db
from app.models import Institution, Complaint, Bureau, Officer, CaseHistory, CaseLink, Notification
from app.schemas import InstitutionCreate, ComplaintCreate, StatusUpdate, TimelineEventCreate, OverlapAction, LoginRequest
from app.serializers import institution_json, complaint_json, overlap_json
from app.services.overlap_engine import detect_overlaps

router = APIRouter()

@router.post("/auth/login")
def login(data: LoginRequest):
    if not data.email or not data.password:
        raise HTTPException(400, "Email and password are required")
    return {
        "user": {
            "name": "Dr. Anand Sharma",
            "email": data.email,
            "role": data.role,
            "roleTitle": data.role.replace("_", " ").title(),
            "bureau": "Regulation Bureau"
        },
        "token": "aicte-demo-jwt-bearer-token"
    }

@router.get("/institutions")
def list_institutions(db: Session = Depends(get_db)):
    rows = db.query(Institution).options(joinedload(Institution.complaints)).all()
    result = [institution_json(x, db) for x in rows]
    overlap_ids = {
        x.institution_id for x in db.query(Complaint).join(
            CaseLink, (Complaint.id == CaseLink.case_a_id) | (Complaint.id == CaseLink.case_b_id)
        ).all()
    }
    for row in result:
        row["hasOverlap"] = row["id"] in overlap_ids
    return result

@router.post("/institutions", status_code=201)
def create_institution(data: InstitutionCreate, db: Session = Depends(get_db)):
    if db.get(Institution, data.id):
        raise HTTPException(409, "Institution ID already exists")
    obj = Institution(
        id=data.id, name=data.name, state=data.state, region=data.region,
        type=data.type, address=data.address, principal=data.principal,
        contact_email=data.contactEmail, phone=data.phone, status=data.status
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return institution_json(obj, db)

@router.get("/institutions/{institution_id}")
def get_institution(institution_id: str, db: Session = Depends(get_db)):
    obj = db.query(Institution).options(
        joinedload(Institution.complaints).joinedload(Complaint.assigned_officer)
    ).filter_by(id=institution_id).first()
    if not obj:
        raise HTTPException(404, "Institution not found")
    result = institution_json(obj, db)
    result["complaints"] = [complaint_json(c, db) for c in obj.complaints]
    return result

@router.get("/complaints")
def list_complaints(db: Session = Depends(get_db)):
    rows = db.query(Complaint).options(
        joinedload(Complaint.institution), joinedload(Complaint.assigned_officer)
    ).order_by(Complaint.date_received.desc()).all()
    return [complaint_json(x, db) for x in rows]

@router.post("/complaints", status_code=201)
def create_complaint(data: ComplaintCreate, db: Session = Depends(get_db)):
    if not db.get(Institution, data.institutionId):
        raise HTTPException(404, "Institution not found")
    if not db.get(Bureau, data.bureau):
        raise HTTPException(400, f"Unknown Bureau code: {data.bureau}")

    officer = db.query(Officer).filter(Officer.name == data.assignedOfficer).first() if data.assignedOfficer else None
    case_id = data.id or f"CMP-2025-{datetime.now().strftime('%m%d%H%M%S')}"
    if db.get(Complaint, case_id):
        raise HTTPException(409, "Complaint ID already exists")

    today = date.today()
    obj = Complaint(
        id=case_id, institution_id=data.institutionId, bureau_id=data.bureau,
        category=data.category, subject=data.subject, description=data.description,
        date_received=data.dateReceived or today, last_action_date=data.lastActionDate or today,
        assigned_officer_id=officer.id if officer else None, priority=data.priority,
        status=data.status, sla_date=data.slaDate or (today.replace(day=min(today.day + 30, 28)))
    )
    db.add(obj)
    db.flush()

    db.add(CaseHistory(
        complaint_id=case_id, title="Complaint registered", action="Complaint Registered",
        officer="Central Registry", bureau=data.bureau, remarks="Matter formally inwarded into AICTE NIVARAN."
    ))
    db.commit()

    # Automatically scan for cross-bureau overlap
    try:
        new_overlaps = detect_overlaps(db)
        if new_overlaps:
            db.add(Notification(
                title="Cross-Bureau Overlap Flagged",
                message=f"New overlap detected involving {obj.institution.name}.",
                type="alert",
                link="/overlaps"
            ))
            db.commit()
    except Exception as e:
        print(f"Overlap scan error: {e}")

    obj = db.query(Complaint).options(
        joinedload(Complaint.institution), joinedload(Complaint.assigned_officer)
    ).get(case_id)
    return complaint_json(obj, db)

@router.get("/complaints/{case_id}")
def get_complaint(case_id: str, db: Session = Depends(get_db)):
    obj = db.query(Complaint).options(
        joinedload(Complaint.institution), joinedload(Complaint.assigned_officer)
    ).filter_by(id=case_id).first()
    if not obj:
        raise HTTPException(404, "Complaint not found")
    return complaint_json(obj, db)

@router.patch("/complaints/{case_id}/status")
def update_status(case_id: str, data: StatusUpdate, db: Session = Depends(get_db)):
    obj = db.get(Complaint, case_id)
    if not obj:
        raise HTTPException(404, "Complaint not found")
    obj.status = data.status
    obj.last_action_date = date.today()
    db.add(CaseHistory(
        complaint_id=case_id, title=f"Status updated: {data.status}", action="Status Update",
        officer=obj.assigned_officer.name if obj.assigned_officer else "Authorized Officer",
        bureau=obj.bureau_id, remarks="Status updated through AICTE NIVARAN portal."
    ))
    db.commit()
    return {"success": True, "id": case_id, "status": obj.status}

@router.get("/complaints/{case_id}/timeline")
def get_timeline(case_id: str, db: Session = Depends(get_db)):
    if not db.get(Complaint, case_id):
        raise HTTPException(404, "Complaint not found")
    events = db.query(CaseHistory).filter_by(complaint_id=case_id).order_by(CaseHistory.created_at).all()
    return [{
        "id": f"EVT-{e.id}", "date": e.created_at.strftime("%d %b %Y, %I:%M %p"),
        "title": e.title, "officer": e.officer, "bureau": e.bureau,
        "action": e.action, "remarks": e.remarks
    } for e in events]

@router.post("/complaints/{case_id}/timeline", status_code=201)
def add_timeline(case_id: str, data: TimelineEventCreate, db: Session = Depends(get_db)):
    obj = db.get(Complaint, case_id)
    if not obj:
        raise HTTPException(404, "Complaint not found")
    event = CaseHistory(
        complaint_id=case_id, title=data.title, action=data.action or "Action Recorded",
        officer=data.officer, bureau=data.bureau or obj.bureau_id, remarks=data.remarks
    )
    db.add(event)
    obj.last_action_date = date.today()
    db.commit()
    return {"success": True, "id": f"EVT-{event.id}"}

@router.get("/overlaps")
def list_overlaps(db: Session = Depends(get_db)):
    links = db.query(CaseLink).order_by(CaseLink.created_at.desc()).all()
    return [overlap_json(x, db) for x in links]

@router.post("/overlaps/detect")
def scan_overlaps(db: Session = Depends(get_db)):
    created = detect_overlaps(db)
    return {"created": len(created), "message": f"Scan complete. {len(created)} overlap candidate(s) awaiting review."}

@router.post("/overlaps/{overlap_id}/action")
def update_overlap(overlap_id: str, data: OverlapAction, db: Session = Depends(get_db)):
    try:
        number = int(overlap_id.split("-")[-1])
    except ValueError:
        raise HTTPException(400, "Invalid overlap ID format")

    link = db.get(CaseLink, number)
    if not link:
        raise HTTPException(404, "Overlap record not found")

    link.review_status = data.action
    if data.note:
        link.summary = (link.summary + " | Note: " + data.note).strip()

    # If linked for joint hearing, cross-reference both complaint records
    if "Link" in data.action or "Coordination" in data.action:
        ca = db.get(Complaint, link.case_a_id)
        cb = db.get(Complaint, link.case_b_id)
        if ca and cb:
            ca.overlapping_case_id = cb.id
            cb.overlapping_case_id = ca.id
            ca.status = "Action Initiated"
            cb.status = "Action Initiated"

    db.commit()
    return {"success": True, "id": overlap_id, "status": link.review_status}

@router.get("/dashboard/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    cases = db.query(Complaint).all()
    closed = {"Disposed", "Resolved", "Closed"}
    return {
        "totalComplaints": len(cases),
        "pendingCases": sum(c.status == "Pending" for c in cases),
        "underProcess": sum(c.status in {"Under Process", "Action Initiated", "Transferred"} for c in cases),
        "disposedCases": sum(c.status in closed for c in cases),
        "overdueCases": sum(c.status == "Overdue" or (c.sla_date and c.sla_date < date.today() and c.status not in closed) for c in cases),
        "potentialOverlaps": db.query(CaseLink).count()
    }

@router.get("/dashboard/state-stats")
def dashboard_state_stats(db: Session = Depends(get_db)):
    """Connected GIS telemetry for the frontend India Map."""
    cases = db.query(Complaint).options(joinedload(Complaint.institution)).all()
    state_map = {}
    for c in cases:
        if not c.institution:
            continue
        st = c.institution.state
        if st not in state_map:
            state_map[st] = {"filed": 0, "disposed": 0, "pending": 0}
        state_map[st]["filed"] += 1
        if c.status in {"Disposed", "Resolved", "Closed"}:
            state_map[st]["disposed"] += 1
        else:
            state_map[st]["pending"] += 1
    return state_map

@router.get("/dashboard/trends")
def dashboard_trends(db: Session = Depends(get_db)):
    groups = {}
    for c in db.query(Complaint).all():
        key = c.date_received.strftime("%b %y")
        groups.setdefault(key, {"month": key, "received": 0, "disposed": 0})
        groups[key]["received"] += 1
        if c.status in {"Disposed", "Resolved", "Closed"}:
            groups[key]["disposed"] += 1
    return list(groups.values())

@router.get("/analytics")
def analytics(db: Session = Depends(get_db)):
    cases = db.query(Complaint).all()
    bureau, status, category, region = {}, {}, {}, {}
    for c in cases:
        bureau[c.bureau_id] = bureau.get(c.bureau_id, 0) + 1
        status[c.status] = status.get(c.status, 0) + 1
        category[c.category] = category.get(c.category, 0) + 1
        r = c.institution.region if c.institution else "Unknown"
        region[r] = region.get(r, 0) + 1
    return {
        "bureauWise": [{"bureau": k, "count": v} for k, v in bureau.items()],
        "statusWise": [{"status": k, "count": v} for k, v in status.items()],
        "categoryWise": [{"category": k, "count": v} for k, v in category.items()],
        "regionWise": [{"region": k, "count": v} for k, v in region.items()]}

@router.get("/bureaus")
def list_bureaus(db: Session = Depends(get_db)):
    return [{"id": b.id, "name": b.name, "description": b.description} for b in db.query(Bureau).all()]

@router.get("/officers")
def list_officers(db: Session = Depends(get_db)):
    return [{"id": o.id, "name": o.name, "bureau": o.bureau_id, "designation": o.designation} for o in db.query(Officer).all()]

@router.get("/notifications")
def list_notifications(db: Session = Depends(get_db)):
    return [{
        "id": n.id, "title": n.title, "message": n.message, "timestamp": n.created_at.isoformat(),
        "type": n.type, "read": n.read, "link": n.link
    } for n in db.query(Notification).order_by(Notification.created_at.desc()).all()]