from sqlmodel import SQLModel, create_engine, Session

import os

# Database URL from environment or default to SQLite
database_url = os.getenv("DATABASE_URL")

# Fix for Render's postgres:// protocol which SQLAlchemy might not like (needs postgresql://)
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

engine_url = database_url or "sqlite:///database.db"

connect_args = {"check_same_thread": False} if "sqlite" in engine_url else {}
engine = create_engine(engine_url, echo=True, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
