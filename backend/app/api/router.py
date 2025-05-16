from fastapi import APIRouter
from app.api.endpoints import upload, meetings

router = APIRouter()
router.include_router(upload.router, prefix="/upload", tags=["Upload"])
router.include_router(meetings.router, prefix="/meetings", tags=["Meetings"])
