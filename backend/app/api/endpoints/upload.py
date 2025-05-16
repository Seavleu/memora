from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.speech_to_text import transcribe_audio
from app.services.db import database
from app.models.meeting import meetings

router = APIRouter()

@router.post("/audio")
async def upload_audio(file: UploadFile = File(...)):
    try:
        print("🟢 Received file:", file.filename)
        transcript = await transcribe_audio(file)

        query = meetings.insert().values(
            title=file.filename,
            filename=file.filename,
            transcript=transcript
        )
        await database.execute(query)

        return {"transcript": transcript, "message": "Saved to DB"}

    except Exception as e:
        print("🔴 Upload Error:", str(e))
        raise HTTPException(status_code=500, detail=f"Internal Error: {str(e)}")
