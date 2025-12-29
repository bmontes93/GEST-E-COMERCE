from fastapi import APIRouter
from app.api.endpoints import packs, auth, seed, reservations

api_router = APIRouter()
api_router.include_router(packs.router, prefix="/packs", tags=["Packs"])
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(reservations.router, prefix="/reservations", tags=["Reservations"])
api_router.include_router(seed.router, prefix="/system", tags=["System"])
