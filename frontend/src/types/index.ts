export interface SymptomInput {
  itching: boolean
  skin_rash: boolean
  nodal_skin_eruptions: boolean
  continuous_sneezing: boolean
  shivering: boolean
  chills: boolean
  joint_pain: boolean
  stomach_pain: boolean
  acidity: boolean
  ulcers_on_tongue: boolean
  muscle_wasting: boolean
  vomiting: boolean
  burning_micturition: boolean
  spotting_urination: boolean
  fatigue: boolean
  weight_gain: boolean
  anxiety: boolean
  cold_hands_and_feet: boolean
  mood_swings: boolean
  weight_loss: boolean
  restlessness: boolean
  lethargy: boolean
  patches_in_throat: boolean
  irregular_sugar_level: boolean
  cough: boolean
  fever: boolean
  sunken_eyes: boolean
  shortness_of_breath: boolean
  sweating: boolean
  dehydration: boolean
  indigestion: boolean
  headache: boolean
  yellowish_skin: boolean
  dark_urine: boolean
  nausea: boolean
  loss_of_appetite: boolean
  pain_behind_eyes: boolean
  back_pain: boolean
  constipation: boolean
  abdominal_pain: boolean
  diarrhea: boolean
  mild_fever: boolean
  yellow_urine: boolean
  yellowing_of_eyes: boolean
  acute_liver_failure: boolean
  fluid_overload: boolean
  swelling_of_stomach: boolean
  swelled_lymph_nodes: boolean
  malaise: boolean
  blurred_vision: boolean
  phlegm: boolean
  sore_throat: boolean
  redness_of_eyes: boolean
  sinus_pressure: boolean
  runny_nose: boolean
  congestion: boolean
  chest_pain: boolean
  weakness_in_limbs: boolean
  fast_heart_rate: boolean
  pain_during_bowel_movements: boolean
  pain_in_anal_region: boolean
  bloody_stool: boolean
  irritation_in_anus: boolean
  neck_pain: boolean
  dizziness: boolean
  cramps: boolean
  bruising: boolean
  obesity: boolean
  swollen_legs: boolean
  swollen_blood_vessels: boolean
  puffy_face_and_eyes: boolean
  enlarged_thyroid: boolean
  brittle_nails: boolean
  swollen_extremities: boolean
  excessive_hunger: boolean
  drying_and_tingling_lips: boolean
  slurred_speech: boolean
  knee_pain: boolean
  hip_joint_pain: boolean
  muscle_weakness: boolean
  stiff_neck: boolean
  swelling_joints: boolean
  movement_stiffness: boolean
  spinning_movements: boolean
  loss_of_balance: boolean
  unsteadiness: boolean
  weakness_of_one_body_side: boolean
  loss_of_smell: boolean
  bladder_discomfort: boolean
  foul_smell_of_urine: boolean
  continuous_feel_of_urine: boolean
  passage_of_gases: boolean
  internal_itching: boolean
  depression: boolean
  irritability: boolean
  muscle_pain: boolean
  altered_sensorium: boolean
  red_spots_over_body: boolean
  belly_pain: boolean
  abnormal_menstruation: boolean
  dischromic_patches: boolean
  watering_from_eyes: boolean
  increased_appetite: boolean
  polyuria: boolean
  family_history: boolean
  mucoid_sputum: boolean
  rusty_sputum: boolean
  lack_of_concentration: boolean
  visual_disturbances: boolean
  blood_in_sputum: boolean
  prominent_veins_on_calf: boolean
  palpitations: boolean
  painful_walking: boolean
  pus_filled_pimples: boolean
  blackheads: boolean
  skin_peeling: boolean
  silver_like_dusting: boolean
  small_dents_in_nails: boolean
  inflammatory_nails: boolean
  blister: boolean
  red_sore_around_nose: boolean
  yellow_crust_ooze: boolean
  body_ache: boolean
  frequent_urination: boolean
  excessive_thirst: boolean
  skin_rash2: boolean
  severity: number
  duration_days: number
}

export interface ClinicalInput {
  age: number; gender: 'male' | 'female' | 'other'
  systolic_bp: number; diastolic_bp: number
  fasting_glucose: number; total_cholesterol: number
  height_cm: number; weight_kg: number
  family_diabetes: boolean; family_heart_disease: boolean; family_hypertension: boolean
}

export interface LifestyleInput {
  sleep_hours: number; stress_level: number
  exercise_days_per_week: number; is_smoker: boolean
  alcohol_units_per_week: number
  diet_quality: 'poor' | 'average' | 'good' | 'excellent'
  water_intake_liters: number
}

export interface PredictRequest {
  symptoms: SymptomInput
  clinical:  ClinicalInput
  lifestyle: LifestyleInput
}

export interface ScoreDetail {
  score: number
  severity: 'low' | 'moderate' | 'high' | 'critical'
  category: 'symptom' | 'chronic'
}

export interface PredictResponse {
  prediction_id: number
  scores: Record<string, ScoreDetail>
  lifestyle: {
    modifier: number
    factors:    Record<string, number>
    protective: Record<string, number>
  }
  red_flags:       string[]
  explanation:     string
  recommendations: string[]
  see_doctor_if:   string[]
}

export interface HistoryItem {
  prediction_id:     number
  created_at:        string
  top_risk:          string
  top_score:         number
  top_severity:      string
  lifestyle_modifier: number
}