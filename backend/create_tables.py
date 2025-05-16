# create_tables.py

from sqlalchemy import create_engine
from app.models.meeting import metadata

engine = create_engine("postgresql://postgres:123@localhost:5432/memora")
metadata.create_all(engine)

print("✅ Meetings table created successfully")
