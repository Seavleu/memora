# backend/app/models/meeting.py

from sqlalchemy import Table, Column, Integer, String, DateTime, MetaData
from datetime import datetime

metadata = MetaData()

meetings = Table(
    "meetings",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("title", String),
    Column("filename", String),
    Column("transcript", String),
    Column("created_at", DateTime, default=datetime.utcnow),   
)
