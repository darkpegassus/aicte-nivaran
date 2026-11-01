from rapidfuzz import fuzz
from sqlalchemy.orm import Session
from app.models import Complaint, CaseLink

CLOSED = {"Disposed", "Resolved", "Closed"}

def detect_overlaps(db: Session, threshold: int = 45):
    cases = db.query(Complaint).order_by(Complaint.date_received.desc()).all()
    known = {tuple(sorted((x.case_a_id, x.case_b_id))) for x in db.query(CaseLink).all()}
    created = []
    for i, a in enumerate(cases):
        for b in cases[i+1:]:
            if a.institution_id != b.institution_id or a.bureau_id == b.bureau_id:
                continue
            if a.status in CLOSED and b.status in CLOSED:
                continue
            category_score = fuzz.token_set_ratio(a.category or "", b.category or "")
            description_score = fuzz.token_set_ratio(
                f"{a.subject} {a.description}", f"{b.subject} {b.description}"
            )
            score = round(0.35 * category_score + 0.65 * description_score)
            pair = tuple(sorted((a.id, b.id)))
            if pair in known:
                continue
            # Same institution + distinct active Bureaus is an operational coordination flag.
            if score >= threshold or (a.status not in CLOSED and b.status not in CLOSED):
                kind = "Potential duplicate" if score >= 85 else (
                    "Related complaint" if score >= 60 else "Cross-Bureau institutional activity"
                )
                created.append(CaseLink(
                    case_a_id=a.id, case_b_id=b.id, relationship_type=kind,
                    review_status="Awaiting Officer Review", similarity_score=score,
                    summary=f"Same institution; cases are handled by {a.bureau_id} and {b.bureau_id}. Text/category similarity: {score}%."
                ))
                known.add(pair)
    db.add_all(created)
    db.commit()
    return created
