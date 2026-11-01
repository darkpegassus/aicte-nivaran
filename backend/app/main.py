import os
from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from app.database import Base, engine
from app.routers.api import router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AICTE NIVARAN API",
    version="1.0.0",
    description="Integrated Institution Complaint Monitoring & Coordination Platform API (GoI / AICTE)."
)

# Allow both Vite default port (5173) and project port (3000)
default_origins = "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173"
origins = [x.strip() for x in os.getenv("FRONTEND_ORIGINS", default_origins).split(",") if x.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "portal": "AICTE NIVARAN",
        "system": "National Integrated Grievance Coordination Engine",
        "status": "operational",
        "docs": "/docs"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}