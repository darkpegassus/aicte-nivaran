# AICTE OneView backend v2

This backend has been aligned to the uploaded React frontend's existing conventions:
- API prefix: `/api/v1`
- camelCase JSON fields such as `institutionId`, `dateReceived`, `assignedOfficer`
- bureau codes: `RB`, `PGRC`, `AB`, `VIG`, `RO_NW`, `RO_SW`
- complaint IDs from the frontend synthetic dataset
- overlap response fields `case1Id`, `case1Bureau`, `case2Id`, `similarityScore`, `status`
- timeline response fields `id`, `date`, `title`, `officer`, `bureau`, `action`, `remarks`

## Run on Windows

```powershell
cd backend
py -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python seed_data.py
uvicorn app.main:app --reload
```

Open `http://localhost:8000/docs`.

## Frontend API base URL

The frontend's current `src/services/api.js` already defaults to:
`http://localhost:8000/api/v1`

No URL change is required for local development.

## API endpoints
- POST `/api/v1/auth/login` (demo stub only)
- GET/POST `/api/v1/institutions`
- GET `/api/v1/institutions/{id}`
- GET/POST `/api/v1/complaints`
- GET `/api/v1/complaints/{id}`
- PATCH `/api/v1/complaints/{id}/status`
- GET/POST `/api/v1/complaints/{id}/timeline`
- GET `/api/v1/overlaps`
- POST `/api/v1/overlaps/detect`
- POST `/api/v1/overlaps/{id}/action`
- GET `/api/v1/dashboard/stats`
- GET `/api/v1/dashboard/trends`
- GET `/api/v1/analytics`
- GET `/api/v1/bureaus`
- GET `/api/v1/officers`
- GET `/api/v1/notifications`

## Important prototype limitations
All records are synthetic. Demo login is not real authentication. Overlap scores are heuristic matching signals, not probabilities or legal findings. Human review is required. Do not upload real or confidential complaint records.
