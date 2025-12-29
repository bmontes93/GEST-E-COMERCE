from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.api.api import api_router
from sqlmodel import Session, select
from app.core.db import create_db_and_tables, engine
from app.models import User, Pack, Reservation # Necessary for SQLModel to discover tables
from app.api.endpoints.seed import seed_data

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    
    # Auto-seed logic for production robustness
    with Session(engine) as session:
        user = session.exec(select(User)).first()
        if not user:
            print("🌱 Database is empty. Seeding initial data...")
            seed_data(session)
            print("✅ Database seeded successfully!")
            
    yield

app = FastAPI(title=settings.PROJECT_NAME, openapi_url=f"{settings.API_V1_STR}/openapi.json", lifespan=lifespan)

# --- CORS Configuration ---
# --- CORS Configuration ---
# Allow all origins effectively with credentials support
# In production, you would list specific domains: ["https://gest-frontend.onrender.com"]
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*", # Allows all origins while supporting credentials
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Include Routers ---
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "ReAprovecha API is running 🚀 (Modularized)"}
