# database connection setup
import os
from databases import Database

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:123@localhost:5432/memora")

database = Database(DATABASE_URL)