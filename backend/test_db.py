# test_db.py (run this in your backend directory)

import asyncio
from app.services.db import database

async def test_connection():
    await database.connect()
    print("DB Connected successfully!")
    await database.disconnect()

asyncio.run(test_connection())
