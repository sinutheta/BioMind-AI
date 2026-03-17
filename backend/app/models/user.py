from sqlalchemy import Column, Integer, String, DateTime, Float, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    id              = Column(Integer, primary_key=True, index=True)
    email           = Column(String, unique=True, index=True, nullable=False)
    name            = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at      = Column(DateTime(timezone=True), server_default=func.now())
    predictions     = relationship("Prediction", back_populates="user")

class Prediction(Base):
    __tablename__ = "predictions"
    id                 = Column(Integer, primary_key=True, index=True)
    user_id            = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at         = Column(DateTime(timezone=True), server_default=func.now())
    symptom_input      = Column(JSON)
    clinical_input     = Column(JSON)
    lifestyle_input    = Column(JSON)
    symptom_scores     = Column(JSON)
    chronic_scores     = Column(JSON)
    lifestyle_modifier = Column(Float)
    final_scores       = Column(JSON)
    severity_map       = Column(JSON)
    explanation        = Column(String)
    recommendations    = Column(JSON)
    red_flags          = Column(JSON)
    see_doctor_if      = Column(JSON)
    user               = relationship("User", back_populates="predictions")