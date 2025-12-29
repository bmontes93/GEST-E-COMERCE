from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.api.api import api_router
from app.core.db import create_db_and_tables
from app.models import User, Pack, Reservation # Necessary for SQLModel to discover tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
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
