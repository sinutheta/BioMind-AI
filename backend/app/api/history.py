from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User, Prediction
from app.models.schemas import HistoryItem

router = APIRouter()

@router.get("", response_model=List[HistoryItem])
def get_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    predictions = (
        db.query(Prediction)
        .filter(Prediction.user_id == current_user.id)
        .order_by(Prediction.created_at.desc())
        .limit(20)
        .all()
    )
    result = []
    for p in predictions:
        if not p.final_scores:
            continue
        top = max(p.final_scores.items(), key=lambda x: x[1]["score"])
        result.append(HistoryItem(
            prediction_id=p.id,
            created_at=p.created_at,
            top_risk=top[0].replace("_", " ").title(),
            top_score=top[1]["score"],
            top_severity=p.severity_map.get(top[0], "low"),
            lifestyle_modifier=p.lifestyle_modifier or 1.0,
        ))
    return result

@router.get("/{prediction_id}")
def get_prediction_detail(
    prediction_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    prediction = db.query(Prediction).filter(
        Prediction.id == prediction_id,
        Prediction.user_id == current_user.id
    ).first()
    if not prediction:
        raise HTTPException(status_code=404, detail="Prediction not found")
    return {
        "prediction_id": prediction.id,
        "created_at": prediction.created_at,
        "scores": prediction.final_scores,
        "lifestyle_modifier": prediction.lifestyle_modifier,
        "explanation": prediction.explanation,
        "recommendations": prediction.recommendations,
        "red_flags": prediction.red_flags,
        "see_doctor_if": prediction.see_doctor_if,
    }