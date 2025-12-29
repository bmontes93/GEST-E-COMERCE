from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import Session, select
from datetime import datetime
from app.models import Reservation, Pack, User
from app.core.db import get_session
from pydantic import BaseModel

router = APIRouter()

class ReservationCreate(BaseModel):
    pack_id: int
    user_id: int
    pickup_time: str

@router.post("/", response_model=Reservation)
def create_reservation(reservation_in: ReservationCreate, session: Session = Depends(get_session)):
    # 1. Check Pack existence and stock
    pack = session.get(Pack, reservation_in.pack_id)
    if not pack:
        raise HTTPException(status_code=404, detail="Pack not found")
    
    if pack.itemsLeft < 1:
        raise HTTPException(status_code=400, detail="No items left in this pack")

    # 2. Check User existence
    user = session.get(User, reservation_in.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 3. Create Reservation
    reservation = Reservation(
        user_id=reservation_in.user_id,
        pack_id=reservation_in.pack_id,
        pickup_time=reservation_in.pickup_time,
        status="active",
        created_at=datetime.now().isoformat()
    )
    
    # 4. Decrement Stock
    pack.itemsLeft -= 1
    
    session.add(reservation)
    session.add(pack) # Update pack in session
    session.commit()
    session.refresh(reservation)
    
    return reservation

@router.get("/user/{user_id}", response_model=List[Reservation])
def get_user_reservations(user_id: int, session: Session = Depends(get_session)):
    reservations = session.exec(select(Reservation).where(Reservation.user_id == user_id)).all()
    return reservations
