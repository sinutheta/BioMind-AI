from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token
from app.models.user import User
from app.models.schemas import RegisterRequest, LoginRequest, AuthResponse

router = APIRouter()

@router.post("/register")
def register(body: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == body.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=body.email, name=body.name, hashed_password=hash_password(body.password))
    db.add(user)
    db.commit()
    db.refresh(user)
    token = create_access_token({"sub": str(user.id)})
    return JSONResponse(
        content={"access_token": token, "token_type": "bearer", "user_id": user.id, "name": user.name},
        headers={"Access-Control-Allow-Origin": "*"}
    )

@router.post("/login")
def login(body: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token({"sub": str(user.id)})
    return JSONResponse(
        content={"access_token": token, "token_type": "bearer", "user_id": user.id, "name": user.name},
        headers={"Access-Control-Allow-Origin": "*"}
    )