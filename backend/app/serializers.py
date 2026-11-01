from app.models import Complaint, CaseLink

def bureau_name(db, code):
    from app.models import Bureau
    row = db.get(Bureau, code)
    return f"{row.name} ({code})" if row else code

def institution_json(x, db):
    cases = x.complaints
    active = [c for c in cases if c.status not in ("Disposed", "Resolved", "Closed")]
    return {
        "id": x.id,
        "name": x.name,
        "state": x.state,
        "region": x.region,
        "type": x.type,
        "address": x.address,
        "principal": x.principal,
        "contactEmail": x.contact_email,
        "phone": x.phone,
        "status": x.status,
        "totalComplaints": len(cases),
        "activeComplaints": len(active),
        "disposedComplaints": len(cases) - len(active),
        "hasOverlap": False
    }

def complaint_json(c, db):
    # Dynamically find paired overlap case ID
    linked_id = c.overlapping_case_id
    if not linked_id:
        link = db.query(CaseLink).filter(
            ((CaseLink.case_a_id == c.id) | (CaseLink.case_b_id == c.id)) &
            (CaseLink.review_status != "Dismissed (Not Related)")
        ).first()
        if link:
            linked_id = link.case_b_id if link.case_a_id == c.id else link.case_a_id

    return {
        "id": c.id,
        "institutionId": c.institution_id,
        "institutionName": c.institution.name if c.institution else "",
        "bureau": c.bureau_id,
        "bureauName": bureau_name(db, c.bureau_id),
        "category": c.category,
        "subject": c.subject,
        "description": c.description,
        "dateReceived": c.date_received.isoformat() if c.date_received else "",
        "lastActionDate": c.last_action_date.isoformat() if c.last_action_date else "",
        "assignedOfficer": c.assigned_officer.name if c.assigned_officer else "Unassigned",
        "priority": c.priority,
        "status": c.status,
        "slaDate": c.sla_date.isoformat() if c.sla_date else "",
        "overlappingCaseId": linked_id
    }

def overlap_json(link, db):
    a = db.get(Complaint, link.case_a_id)
    b = db.get(Complaint, link.case_b_id)
    
    # Custom recommendation based on Bureaus involved
    rec = link.recommendation
    if a and b:
        if {a.bureau_id, b.bureau_id} == {"RB", "PGRC"}:
            rec = "Form joint inquiry team under Regulation Bureau & PGRC. Consolidate institutional show-cause hearing to prevent conflicting determinations."
        elif {a.bureau_id, b.bureau_id} == {"AB", "PGRC"}:
            rec = "Direct Regional Officer to conduct unified physical site validation addressing both infrastructure compliance and student lab access."
        elif {a.bureau_id, b.bureau_id} == {"RB", "VIG"}:
            rec = "Summon Management to Headquarters for joint deposition before Member Secretary, with audit records subpoenaed."

    return {
        "id": f"OVL-2025-{link.id:03d}",
        "institutionId": a.institution_id if a else "",
        "institutionName": a.institution.name if a and a.institution else "",
        "case1Id": link.case_a_id,
        "case1Bureau": bureau_name(db, a.bureau_id) if a else "",
        "case1Category": a.category if a else "",
        "case1Officer": a.assigned_officer.name if a and a.assigned_officer else "Inquiry Officer",
        "case1Status": a.status if a else "Pending",
        "case2Id": link.case_b_id,
        "case2Bureau": bureau_name(db, b.bureau_id) if b else "",
        "case2Category": b.category if b else "",
        "case2Officer": b.assigned_officer.name if b and b.assigned_officer else "Inquiry Officer",
        "case2Status": b.status if b else "Pending",
        "similarityScore": round(link.similarity_score),
        "detectionType": link.relationship_type,
        "detectionDate": link.created_at.strftime("%Y-%m-%d"),
        "status": link.review_status,
        "summary": link.summary,
        "recommendation": rec
    }