import os
import whisper
import tempfile
 
os.environ["PATH"] += os.pathsep + "D:\\ffmpeg-7.1.1-essentials_build\\bin"

model = whisper.load_model("base")

async def transcribe_audio(file):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp:
            tmp.write(await file.read())
            tmp.flush()
            result = model.transcribe(tmp.name)
            return result["text"]
    except Exception as e:
        print("🔴 Whisper Transcription Error:", str(e))
        raise
