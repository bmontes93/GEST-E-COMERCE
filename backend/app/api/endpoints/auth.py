from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from app.core.db import get_session
from app.models import User

from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

class LoginRequest(BaseModel):
    email: str
    password: str

class LoginResponse(BaseModel):
    id: int
    email: str
    name: str
    role: str
    businessName: str | None = None
    message: str = "Login successful"

@router.post("/login", response_model=LoginResponse)
def login(request: LoginRequest, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == request.email)).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Usuario no encontrado")
        
    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=401, detail="Contraseña incorrecta")
        
    return LoginResponse(
        id=user.id,
        email=user.email,
        name=user.name,
        role=user.role,
        businessName=user.businessName
    )

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    role: str = "client" # client or provider
    businessName: str | None = None

@router.post("/register", response_model=LoginResponse)
def register(request: RegisterRequest, session: Session = Depends(get_session)):
    # 1. Check if email exists
    existing_user = session.exec(select(User).where(User.email == request.email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    # 2. Create User
    new_user = User(
        email=request.email,
        password=get_password_hash(request.password),
        name=request.name,
        role=request.role,
        businessName=request.businessName if request.role == 'provider' else None
    )
    
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    
    return LoginResponse(
        id=new_user.id,
        email=new_user.email,
        name=new_user.name,
        role=new_user.role,
        businessName=new_user.businessName,
        message="Registration successful"
    )
