import asyncio
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User, Prediction
from app.models.schemas import PredictRequest, PredictResponse, ScoreDetail
from app.services.red_flag import check_red_flags
from app.services.lifestyle import compute_lifestyle_modifier, apply_modifier
from app.services.ml_service import predict_symptoms, predict_chronic
from app.services.llm_service import get_llm_explanation

router = APIRouter()

def score_to_severity(score: float) -> str:
    if score >= 80: return "critical"
    if score >= 60: return "high"
    if score >= 30: return "moderate"
    return "low"

@router.post("", response_model=PredictResponse)
async def predict(
    body: PredictRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    red_flags = check_red_flags(body.symptoms, body.clinical)

    symptom_scores, chronic_scores = await asyncio.gather(
        asyncio.to_thread(predict_symptoms, body.symptoms),
        asyncio.to_thread(predict_chronic, body.clinical)
    )

    lifestyle = compute_lifestyle_modifier(body.lifestyle)
    all_base = {**symptom_scores, **chronic_scores}
    modified_scores = apply_modifier(all_base, lifestyle.modifier)

    final_scores = {}
    for disease, score in modified_scores.items():
        category = "symptom" if disease in symptom_scores else "chronic"
        final_scores[disease] = ScoreDetail(
            score=score,
            severity=score_to_severity(score),
            category=category
        )

    final_scores_dict = {k: v.dict() for k, v in final_scores.items()}
    explanation, recommendations, see_doctor_if = await get_llm_explanation(
        body, final_scores_dict, lifestyle, red_flags
    )

    prediction = Prediction(
        user_id=current_user.id,
        symptom_input=body.symptoms.dict(),
        clinical_input=body.clinical.dict(),
        lifestyle_input=body.lifestyle.dict(),
        symptom_scores=symptom_scores,
        chronic_scores=chronic_scores,
        lifestyle_modifier=lifestyle.modifier,
        final_scores=final_scores_dict,
        severity_map={k: v.severity for k, v in final_scores.items()},
        explanation=explanation,
        recommendations=recommendations,
        red_flags=red_flags,
        see_doctor_if=see_doctor_if,
    )
    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return PredictResponse(
        prediction_id=prediction.id,
        scores=final_scores,
        lifestyle=lifestyle,
        red_flags=red_flags,
        explanation=explanation,
        recommendations=recommendations,
        see_doctor_if=see_doctor_if,
    )