from fastapi import APIRouter
from app.services.db import database
from app.models.meeting import meetings

router = APIRouter()

@router.get("/")
async def get_all_meetings():
    query = meetings.select().order_by(meetings.c.created_at.desc())
    results = await database.fetch_all(query)
    return results
