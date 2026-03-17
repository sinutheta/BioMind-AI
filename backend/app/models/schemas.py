from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from datetime import datetime

# ── AUTH ──────────────────────────────────────────────────

class RegisterRequest(BaseModel):
    email: str
    name: str = Field(min_length=2, max_length=80)
    password: str = Field(min_length=6)

class LoginRequest(BaseModel):
    email: str
    password: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: int
    name: str

# ── HEALTH INPUT ──────────────────────────────────────────

class SymptomInput(BaseModel):
    itching: bool = False
    skin_rash: bool = False
    nodal_skin_eruptions: bool = False
    continuous_sneezing: bool = False
    shivering: bool = False
    chills: bool = False
    joint_pain: bool = False
    stomach_pain: bool = False
    acidity: bool = False
    ulcers_on_tongue: bool = False
    muscle_wasting: bool = False
    vomiting: bool = False
    burning_micturition: bool = False
    spotting_urination: bool = False
    fatigue: bool = False
    weight_gain: bool = False
    anxiety: bool = False
    cold_hands_and_feet: bool = False
    mood_swings: bool = False
    weight_loss: bool = False
    restlessness: bool = False
    lethargy: bool = False
    patches_in_throat: bool = False
    irregular_sugar_level: bool = False
    cough: bool = False
    fever: bool = False
    sunken_eyes: bool = False
    shortness_of_breath: bool = False
    sweating: bool = False
    dehydration: bool = False
    indigestion: bool = False
    headache: bool = False
    yellowish_skin: bool = False
    dark_urine: bool = False
    nausea: bool = False
    loss_of_appetite: bool = False
    pain_behind_eyes: bool = False
    back_pain: bool = False
    constipation: bool = False
    abdominal_pain: bool = False
    diarrhea: bool = False
    mild_fever: bool = False
    yellow_urine: bool = False
    yellowing_of_eyes: bool = False
    acute_liver_failure: bool = False
    fluid_overload: bool = False
    swelling_of_stomach: bool = False
    swelled_lymph_nodes: bool = False
    malaise: bool = False
    blurred_vision: bool = False
    phlegm: bool = False
    sore_throat: bool = False
    redness_of_eyes: bool = False
    sinus_pressure: bool = False
    runny_nose: bool = False
    congestion: bool = False
    chest_pain: bool = False
    weakness_in_limbs: bool = False
    fast_heart_rate: bool = False
    pain_during_bowel_movements: bool = False
    pain_in_anal_region: bool = False
    bloody_stool: bool = False
    irritation_in_anus: bool = False
    neck_pain: bool = False
    dizziness: bool = False
    cramps: bool = False
    bruising: bool = False
    obesity: bool = False
    swollen_legs: bool = False
    swollen_blood_vessels: bool = False
    puffy_face_and_eyes: bool = False
    enlarged_thyroid: bool = False
    brittle_nails: bool = False
    swollen_extremities: bool = False
    excessive_hunger: bool = False
    drying_and_tingling_lips: bool = False
    slurred_speech: bool = False
    knee_pain: bool = False
    hip_joint_pain: bool = False
    muscle_weakness: bool = False
    stiff_neck: bool = False
    swelling_joints: bool = False
    movement_stiffness: bool = False
    spinning_movements: bool = False
    loss_of_balance: bool = False
    unsteadiness: bool = False
    weakness_of_one_body_side: bool = False
    loss_of_smell: bool = False
    bladder_discomfort: bool = False
    foul_smell_of_urine: bool = False
    continuous_feel_of_urine: bool = False
    passage_of_gases: bool = False
    internal_itching: bool = False
    depression: bool = False
    irritability: bool = False
    muscle_pain: bool = False
    altered_sensorium: bool = False
    red_spots_over_body: bool = False
    belly_pain: bool = False
    abnormal_menstruation: bool = False
    dischromic_patches: bool = False
    watering_from_eyes: bool = False
    increased_appetite: bool = False
    polyuria: bool = False
    family_history: bool = False
    mucoid_sputum: bool = False
    rusty_sputum: bool = False
    lack_of_concentration: bool = False
    visual_disturbances: bool = False
    blood_in_sputum: bool = False
    prominent_veins_on_calf: bool = False
    palpitations: bool = False
    painful_walking: bool = False
    pus_filled_pimples: bool = False
    blackheads: bool = False
    skin_peeling: bool = False
    silver_like_dusting: bool = False
    small_dents_in_nails: bool = False
    inflammatory_nails: bool = False
    blister: bool = False
    red_sore_around_nose: bool = False
    yellow_crust_ooze: bool = False
    body_ache: bool = False
    frequent_urination: bool = False
    excessive_thirst: bool = False
    severity: int = Field(default=1, ge=1, le=10)
    duration_days: int = Field(default=1, ge=1, le=365)

class ClinicalInput(BaseModel):
    age: int = Field(ge=1, le=120)
    gender: str = Field(pattern="^(male|female|other)$")
    systolic_bp: int = Field(default=120, ge=70, le=250)
    diastolic_bp: int = Field(default=80, ge=40, le=150)
    fasting_glucose: float = Field(default=90.0, ge=40.0, le=600.0)
    total_cholesterol: float = Field(default=180.0, ge=50.0, le=600.0)
    height_cm: float = Field(ge=50.0, le=250.0)
    weight_kg: float = Field(ge=10.0, le=300.0)
    family_diabetes: bool = False
    family_heart_disease: bool = False
    family_hypertension: bool = False

    @property
    def bmi(self) -> float:
        return round(self.weight_kg / ((self.height_cm / 100) ** 2), 1)

class LifestyleInput(BaseModel):
    sleep_hours: float = Field(default=7.0, ge=0.0, le=24.0)
    stress_level: int = Field(default=5, ge=1, le=10)
    exercise_days_per_week: int = Field(default=3, ge=0, le=7)
    is_smoker: bool = False
    alcohol_units_per_week: int = Field(default=0, ge=0, le=70)
    diet_quality: str = Field(default="average", pattern="^(poor|average|good|excellent)$")
    water_intake_liters: float = Field(default=2.0, ge=0.0, le=10.0)

class PredictRequest(BaseModel):
    symptoms: SymptomInput
    clinical: ClinicalInput
    lifestyle: LifestyleInput

# ── PREDICTION RESPONSE ───────────────────────────────────

class ScoreDetail(BaseModel):
    score: float
    severity: str
    category: str

class LifestyleBreakdown(BaseModel):
    modifier: float
    factors: Dict[str, float]
    protective: Dict[str, float]

class PredictResponse(BaseModel):
    prediction_id: int
    scores: Dict[str, ScoreDetail]
    lifestyle: LifestyleBreakdown
    red_flags: List[str]
    explanation: str
    recommendations: List[str]
    see_doctor_if: List[str]

# ── HISTORY ───────────────────────────────────────────────

class HistoryItem(BaseModel):
    prediction_id: int
    created_at: datetime
    top_risk: str
    top_score: float
    top_severity: str
    lifestyle_modifier: float

    class Config:
        from_attributes = True