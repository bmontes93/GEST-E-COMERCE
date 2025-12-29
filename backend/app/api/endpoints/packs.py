from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import Session, select
from app.models import Pack
from app.core.db import get_session

router = APIRouter()

@router.get("/", response_model=List[Pack])
def get_packs(session: Session = Depends(get_session)):
    """
    Retrieve all available surprise packs from the database.
    """
    try:
        packs = session.exec(select(Pack)).all()
        return packs
    except Exception as e:
        # Fallback if DB is empty or issues? For now, standard error
        print(f"Error fetching packs: {e}")
        return []

@router.post("/", response_model=Pack)
def create_pack(pack: Pack, session: Session = Depends(get_session)):
    """
    Create a new surprise pack (Provider Only).
    """
    session.add(pack)
    session.commit()
    session.refresh(pack)
    return pack
