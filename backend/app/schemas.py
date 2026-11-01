from datetime import date
from pydantic import BaseModel, ConfigDict
from typing import Optional

class InstitutionCreate(BaseModel):
    id: str
    name: str
    state: str = ""
    region: str = ""
    type: str = ""
    address: str = ""
    principal: str = ""
    contactEmail: str = ""
    phone: str = ""
    status: str = "Active"

class ComplaintCreate(BaseModel):
    id: Optional[str] = None
    institutionId: str
    institutionName: Optional[str] = None
    bureau: str
    category: str
    subject: str
    description: str = ""
    dateReceived: Optional[date] = None
    lastActionDate: Optional[date] = None
    assignedOfficer: str = ""
    priority: str = "Medium"
    status: str = "Pending"
    slaDate: Optional[date] = None
    overlappingCaseId: Optional[str] = None

class StatusUpdate(BaseModel):
    status: str

class TimelineEventCreate(BaseModel):
    id: Optional[str] = None
    date: Optional[str] = None
    title: str
    officer: str = "System"
    bureau: str = ""
    action: str = ""
    remarks: str = ""

class OverlapAction(BaseModel):
    action: str
    note: str = ""

class LoginRequest(BaseModel):
    email: str
    password: str
    role: str = "SUPER_ADMIN"
