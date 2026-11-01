from datetime import datetime, date
from sqlalchemy import String, Integer, Date, DateTime, Text, ForeignKey, Boolean, Float # type: ignore
from sqlalchemy.orm import Mapped, mapped_column, relationship  # type: ignore[import-not-found]
from .database import Base

class Institution(Base):
    __tablename__ = "institutions"
    id: Mapped[str] = mapped_column(String(80), primary_key=True)
    name: Mapped[str] = mapped_column(String(255), index=True)
    state: Mapped[str] = mapped_column(String(100), default="")
    region: Mapped[str] = mapped_column(String(100), default="")
    type: Mapped[str] = mapped_column(String(120), default="")
    address: Mapped[str] = mapped_column(Text, default="")
    principal: Mapped[str] = mapped_column(String(160), default="")
    contact_email: Mapped[str] = mapped_column(String(180), default="")
    phone: Mapped[str] = mapped_column(String(50), default="")
    status: Mapped[str] = mapped_column(String(50), default="Active")
    complaints = relationship("Complaint", back_populates="institution", cascade="all, delete-orphan")

class Bureau(Base):
    __tablename__ = "bureaus"
    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    name: Mapped[str] = mapped_column(String(160), unique=True)
    description: Mapped[str] = mapped_column(Text, default="")

class Officer(Base):
    __tablename__ = "officers"
    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    name: Mapped[str] = mapped_column(String(160))
    bureau_id: Mapped[str] = mapped_column(ForeignKey("bureaus.id"))
    designation: Mapped[str] = mapped_column(String(160), default="")
    email: Mapped[str] = mapped_column(String(180), default="")
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    complaints = relationship("Complaint", back_populates="assigned_officer")

class Complaint(Base):
    __tablename__ = "complaints"
    id: Mapped[str] = mapped_column(String(60), primary_key=True)
    institution_id: Mapped[str] = mapped_column(ForeignKey("institutions.id"), index=True)
    bureau_id: Mapped[str] = mapped_column(ForeignKey("bureaus.id"), index=True)
    category: Mapped[str] = mapped_column(String(180), index=True)
    subject: Mapped[str] = mapped_column(String(300))
    description: Mapped[str] = mapped_column(Text, default="")
    date_received: Mapped[date] = mapped_column(Date, default=date.today)
    last_action_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    assigned_officer_id: Mapped[str | None] = mapped_column(ForeignKey("officers.id"), nullable=True)
    priority: Mapped[str] = mapped_column(String(30), default="Medium")
    status: Mapped[str] = mapped_column(String(50), default="Pending", index=True)
    sla_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    overlapping_case_id: Mapped[str | None] = mapped_column(String(60), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    
    institution = relationship("Institution", back_populates="complaints")
    assigned_officer = relationship("Officer", back_populates="complaints")
    history = relationship("CaseHistory", back_populates="complaint", cascade="all, delete-orphan")

class CaseHistory(Base):
    __tablename__ = "case_history"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    complaint_id: Mapped[str] = mapped_column(ForeignKey("complaints.id"), index=True)
    title: Mapped[str] = mapped_column(String(200))
    action: Mapped[str] = mapped_column(String(120))
    officer: Mapped[str] = mapped_column(String(160), default="System")
    bureau: Mapped[str] = mapped_column(String(160), default="")
    remarks: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    complaint = relationship("Complaint", back_populates="history")

class CaseLink(Base):
    __tablename__ = "case_links"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    case_a_id: Mapped[str] = mapped_column(ForeignKey("complaints.id"))
    case_b_id: Mapped[str] = mapped_column(ForeignKey("complaints.id"))
    relationship_type: Mapped[str] = mapped_column(String(80), default="Potential overlap")
    review_status: Mapped[str] = mapped_column(String(80), default="Awaiting Officer Review")
    similarity_score: Mapped[float] = mapped_column(Float, default=0.0)
    summary: Mapped[str] = mapped_column(Text, default="")
    recommendation: Mapped[str] = mapped_column(Text, default="Form joint inquiry team and coordinate show-cause hearings.")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

class Notification(Base):
    __tablename__ = "notifications"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(200))
    message: Mapped[str] = mapped_column(Text)
    type: Mapped[str] = mapped_column(String(40), default="info")
    read: Mapped[bool] = mapped_column(Boolean, default=False)
    link: Mapped[str] = mapped_column(String(200), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)