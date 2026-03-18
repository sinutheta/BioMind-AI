import joblib
import numpy as np
from typing import Dict

# ── Load models at startup ────────────────────────────────
symptom_model = None
heart_model = None
sugar_model = None
scaler_heart = None
scaler_diab = None

def load_models():
    global symptom_model, heart_model, sugar_model, scaler_heart, scaler_diab
    try:
        symptom_model = joblib.load("app/ml/models/normal_model.pkl")
        print("✓ Symptom model loaded")
    except Exception as e:
        print(f"✗ Symptom model error: {e}")
    try:
        heart_model = joblib.load("app/ml/models/heart_model.pkl")
        scaler_heart = joblib.load("app/ml/models/scaler_heart.pkl")
        print("✓ Heart model loaded")
    except Exception as e:
        print(f"✗ Heart model error: {e}")
    try:
        sugar_model = joblib.load("app/ml/models/sugar_model.pkl")
        scaler_diab = joblib.load("app/ml/models/scaler_diab.pkl")
        print("✓ Diabetes model loaded")
    except Exception as e:
        print(f"✗ Diabetes model error: {e}")

# ── 132 symptom feature names (exact order from training) ──
SYMPTOM_FEATURES = [
    "itching","skin_rash","nodal_skin_eruptions","continuous_sneezing",
    "shivering","chills","joint_pain","stomach_pain","acidity",
    "ulcers_on_tongue","muscle_wasting","vomiting","burning_micturition",
    "spotting_ urination","fatigue","weight_gain","anxiety",
    "cold_hands_and_feets","mood_swings","weight_loss","restlessness",
    "lethargy","patches_in_throat","irregular_sugar_level","cough",
    "high_fever","sunken_eyes","breathlessness","sweating","dehydration",
    "indigestion","headache","yellowish_skin","dark_urine","nausea",
    "loss_of_appetite","pain_behind_the_eyes","back_pain","constipation",
    "abdominal_pain","diarrhoea","mild_fever","yellow_urine",
    "yellowing_of_eyes","acute_liver_failure","fluid_overload",
    "swelling_of_stomach","swelled_lymph_nodes","malaise",
    "blurred_and_distorted_vision","phlegm","throat_irritation",
    "redness_of_eyes","sinus_pressure","runny_nose","congestion",
    "chest_pain","weakness_in_limbs","fast_heart_rate",
    "pain_during_bowel_movements","pain_in_anal_region","bloody_stool",
    "irritation_in_anus","neck_pain","dizziness","cramps","bruising",
    "obesity","swollen_legs","swollen_blood_vessels","puffy_face_and_eyes",
    "enlarged_thyroid","brittle_nails","swollen_extremeties",
    "excessive_hunger","extra_marital_contacts","drying_and_tingling_lips",
    "slurred_speech","knee_pain","hip_joint_pain","muscle_weakness",
    "stiff_neck","swelling_joints","movement_stiffness","spinning_movements",
    "loss_of_balance","unsteadiness","weakness_of_one_body_side",
    "loss_of_smell","bladder_discomfort","foul_smell_of urine",
    "continuous_feel_of_urine","passage_of_gases","internal_itching",
    "toxic_look_(typhos)","depression","irritability","muscle_pain",
    "altered_sensorium","red_spots_over_body","belly_pain",
    "abnormal_menstruation","dischromic _patches","watering_from_eyes",
    "increased_appetite","polyuria","family_history","mucoid_sputum",
    "rusty_sputum","lack_of_concentration","visual_disturbances",
    "receiving_blood_transfusion","receiving_unsterile_injections","coma",
    "stomach_bleeding","distention_of_abdomen","history_of_alcohol_consumption",
    "fluid_overload.1","blood_in_sputum","prominent_veins_on_calf",
    "palpitations","painful_walking","pus_filled_pimples","blackheads",
    "scurring","skin_peeling","silver_like_dusting","small_dents_in_nails",
    "inflammatory_nails","blister","red_sore_around_nose","yellow_crust_ooze"
]

FORM_TO_FEATURE = {
    "itching":                     "itching",
    "skin_rash":                   "skin_rash",
    "nodal_skin_eruptions":        "nodal_skin_eruptions",
    "continuous_sneezing":         "continuous_sneezing",
    "shivering":                   "shivering",
    "chills":                      "chills",
    "joint_pain":                  "joint_pain",
    "stomach_pain":                "stomach_pain",
    "acidity":                     "acidity",
    "ulcers_on_tongue":            "ulcers_on_tongue",
    "muscle_wasting":              "muscle_wasting",
    "vomiting":                    "vomiting",
    "burning_micturition":         "burning_micturition",
    "spotting_urination":          "spotting_ urination",
    "fatigue":                     "fatigue",
    "weight_gain":                 "weight_gain",
    "anxiety":                     "anxiety",
    "cold_hands_and_feet":         "cold_hands_and_feets",
    "mood_swings":                 "mood_swings",
    "weight_loss":                 "weight_loss",
    "restlessness":                "restlessness",
    "lethargy":                    "lethargy",
    "patches_in_throat":           "patches_in_throat",
    "irregular_sugar_level":       "irregular_sugar_level",
    "cough":                       "cough",
    "fever":                       "high_fever",
    "sunken_eyes":                 "sunken_eyes",
    "shortness_of_breath":         "breathlessness",
    "sweating":                    "sweating",
    "dehydration":                 "dehydration",
    "indigestion":                 "indigestion",
    "headache":                    "headache",
    "yellowish_skin":              "yellowish_skin",
    "dark_urine":                  "dark_urine",
    "nausea":                      "nausea",
    "loss_of_appetite":            "loss_of_appetite",
    "pain_behind_eyes":            "pain_behind_the_eyes",
    "back_pain":                   "back_pain",
    "constipation":                "constipation",
    "abdominal_pain":              "abdominal_pain",
    "diarrhea":                    "diarrhoea",
    "mild_fever":                  "mild_fever",
    "yellow_urine":                "yellow_urine",
    "yellowing_of_eyes":           "yellowing_of_eyes",
    "acute_liver_failure":         "acute_liver_failure",
    "fluid_overload":              "fluid_overload",
    "swelling_of_stomach":         "swelling_of_stomach",
    "swelled_lymph_nodes":         "swelled_lymph_nodes",
    "malaise":                     "malaise",
    "blurred_vision":              "blurred_and_distorted_vision",
    "phlegm":                      "phlegm",
    "sore_throat":                 "throat_irritation",
    "redness_of_eyes":             "redness_of_eyes",
    "sinus_pressure":              "sinus_pressure",
    "runny_nose":                  "runny_nose",
    "congestion":                  "congestion",
    "chest_pain":                  "chest_pain",
    "weakness_in_limbs":           "weakness_in_limbs",
    "fast_heart_rate":             "fast_heart_rate",
    "pain_during_bowel_movements": "pain_during_bowel_movements",
    "pain_in_anal_region":         "pain_in_anal_region",
    "bloody_stool":                "bloody_stool",
    "irritation_in_anus":          "irritation_in_anus",
    "neck_pain":                   "neck_pain",
    "dizziness":                   "dizziness",
    "cramps":                      "cramps",
    "bruising":                    "bruising",
    "obesity":                     "obesity",
    "swollen_legs":                "swollen_legs",
    "swollen_blood_vessels":       "swollen_blood_vessels",
    "puffy_face_and_eyes":         "puffy_face_and_eyes",
    "enlarged_thyroid":            "enlarged_thyroid",
    "brittle_nails":               "brittle_nails",
    "swollen_extremities":         "swollen_extremeties",
    "excessive_hunger":            "excessive_hunger",
    "drying_and_tingling_lips":    "drying_and_tingling_lips",
    "slurred_speech":              "slurred_speech",
    "knee_pain":                   "knee_pain",
    "hip_joint_pain":              "hip_joint_pain",
    "muscle_weakness":             "muscle_weakness",
    "stiff_neck":                  "stiff_neck",
    "swelling_joints":             "swelling_joints",
    "movement_stiffness":          "movement_stiffness",
    "spinning_movements":          "spinning_movements",
    "loss_of_balance":             "loss_of_balance",
    "unsteadiness":                "unsteadiness",
    "weakness_of_one_body_side":   "weakness_of_one_body_side",
    "loss_of_smell":               "loss_of_smell",
    "bladder_discomfort":          "bladder_discomfort",
    "foul_smell_of_urine":         "foul_smell_of urine",
    "continuous_feel_of_urine":    "continuous_feel_of_urine",
    "passage_of_gases":            "passage_of_gases",
    "internal_itching":            "internal_itching",
    "depression":                  "depression",
    "irritability":                "irritability",
    "muscle_pain":                 "muscle_pain",
    "altered_sensorium":           "altered_sensorium",
    "red_spots_over_body":         "red_spots_over_body",
    "belly_pain":                  "belly_pain",
    "abnormal_menstruation":       "abnormal_menstruation",
    "dischromic_patches":          "dischromic _patches",
    "watering_from_eyes":          "watering_from_eyes",
    "increased_appetite":          "increased_appetite",
    "polyuria":                    "polyuria",
    "family_history":              "family_history",
    "mucoid_sputum":               "mucoid_sputum",
    "rusty_sputum":                "rusty_sputum",
    "lack_of_concentration":       "lack_of_concentration",
    "visual_disturbances":         "visual_disturbances",
    "blood_in_sputum":             "blood_in_sputum",
    "prominent_veins_on_calf":     "prominent_veins_on_calf",
    "palpitations":                "palpitations",
    "painful_walking":             "painful_walking",
    "pus_filled_pimples":          "pus_filled_pimples",
    "blackheads":                  "blackheads",
    "skin_peeling":                "skin_peeling",
    "silver_like_dusting":         "silver_like_dusting",
    "small_dents_in_nails":        "small_dents_in_nails",
    "inflammatory_nails":          "inflammatory_nails",
    "blister":                     "blister",
    "red_sore_around_nose":        "red_sore_around_nose",
    "yellow_crust_ooze":           "yellow_crust_ooze",
    "body_ache":                   "muscle_pain",
    "frequent_urination":          "polyuria",
    "excessive_thirst":            "excessive_hunger",
}

def predict_symptoms(symptoms) -> Dict[str, float]:
    import pandas as pd
    
    # Build a dict with all 132 features set to 0
    feature_dict = {feature: 0 for feature in SYMPTOM_FEATURES}
    
    # Set matched symptoms to 1
    for form_field, feature_name in FORM_TO_FEATURE.items():
        value = getattr(symptoms, form_field, False)
        if value and feature_name in feature_dict:
            feature_dict[feature_name] = 1

    # Create DataFrame with correct column names
    features = pd.DataFrame([feature_dict])

    if symptom_model is not None:
        try:
            if hasattr(symptom_model, 'predict_proba'):
                proba = symptom_model.predict_proba(features)[0]
                classes = symptom_model.classes_
                scores = {
                    str(cls): round(float(p) * 100, 1)
                    for cls, p in zip(classes, proba)
                }
                # Return top 5 only
                return dict(sorted(scores.items(), key=lambda x: -x[1])[:5])
            else:
                prediction = symptom_model.predict(features)[0]
                return {str(prediction): 85.0}
        except Exception as e:
            print(f"Symptom prediction error: {e}")

    return _mock_symptom_scores(symptoms)

def predict_chronic(clinical) -> Dict[str, float]:
    scores = {}
    bmi = clinical.weight_kg / ((clinical.height_cm / 100) ** 2)

    # ── Heart disease model ───────────────────────────────
    if heart_model is not None:
        try:
            import pandas as pd
            gender_num = 1 if clinical.gender == "male" else 0
            # Use exact feature names the scaler was trained on
            heart_df = pd.DataFrame([{
                'age':      clinical.age,
                'sex':      gender_num,
                'trestbps': clinical.systolic_bp,
                'chol':     clinical.total_cholesterol,
                'fbs':      1 if clinical.fasting_glucose > 120 else 0,
                'thalach':  220 - clinical.age,  # estimated max heart rate
                'exang':    0,
                'oldpeak':  0.0,
                'ca':       0,
                'cp_1':     0,
                'cp_2':     0,
                'cp_3':     0,
                'restecg_1': 0,
                'restecg_2': 0,
                'slope_1':  1,
                'slope_2':  0,
                'thal_1':   0,
                'thal_2':   0,
                'thal_3':   0,
            }])
            heart_scaled = scaler_heart.transform(heart_df)
            if hasattr(heart_model, 'predict_proba'):
                proba = heart_model.predict_proba(heart_scaled)[0]
                scores["heart_disease"] = round(float(proba[1]) * 100, 1)
            else:
                pred = heart_model.predict(heart_scaled)[0]
                scores["heart_disease"] = 75.0 if pred == 1 else 20.0
        except Exception as e:
            print(f"Heart model error: {e}")

    # ── Diabetes model ────────────────────────────────────
    if sugar_model is not None:
        try:
            import pandas as pd
            diab_df = pd.DataFrame([{
                'Pregnancies':              0,
                'Glucose':                  clinical.fasting_glucose,
                'BloodPressure':            clinical.diastolic_bp,
                'SkinThickness':            20,
                'Insulin':                  80,
                'BMI':                      round(bmi, 1),
                'DiabetesPedigreeFunction': 0.5 if clinical.family_diabetes else 0.1,
                'Age':                      clinical.age,
            }])
            diab_scaled = scaler_diab.transform(diab_df)
            if hasattr(sugar_model, 'predict_proba'):
                proba = sugar_model.predict_proba(diab_scaled)[0]
                scores["diabetes"] = round(float(proba[1]) * 100, 1)
            else:
                pred = sugar_model.predict(diab_scaled)[0]
                scores["diabetes"] = 75.0 if pred == 1 else 20.0
        except Exception as e:
            print(f"Diabetes model error: {e}")

    # Fill missing with mock
    mock = _mock_chronic_scores(clinical)
    for key in ["heart_disease", "diabetes", "hypertension"]:
        if key not in scores:
            scores[key] = mock[key]

    return scores

def _mock_symptom_scores(symptoms) -> Dict[str, float]:
    scores = {}
    symptom_count = sum([
        symptoms.fever, symptoms.cough, symptoms.sore_throat,
        symptoms.runny_nose, symptoms.body_ache, symptoms.chills
    ])
    if symptom_count >= 3:
        scores["Common Cold"] = min(95.0, 50 + symptom_count * 8 + symptoms.severity * 2)
        scores["Influenza"]   = min(85.0, 40 + symptom_count * 5)
    if symptoms.headache:
        scores["Migraine"] = min(80.0, 30 + symptoms.severity * 5)
    if symptoms.nausea or symptoms.diarrhea or symptoms.vomiting:
        scores["Gastroenteritis"] = min(88.0, 40 + symptoms.severity * 6)
    if symptoms.frequent_urination:
        scores["Urinary tract infection"] = 72.0
    if not scores:
        scores["Common Cold"] = 35.0
        scores["Allergy"]     = 28.0
    return scores

def _mock_chronic_scores(clinical) -> Dict[str, float]:
    scores = {}
    bmi = clinical.weight_kg / ((clinical.height_cm / 100) ** 2)

    diabetes_score = 0
    if clinical.fasting_glucose > 125: diabetes_score += 40
    elif clinical.fasting_glucose > 100: diabetes_score += 20
    if bmi > 30: diabetes_score += 20
    elif bmi > 25: diabetes_score += 10
    if clinical.family_diabetes: diabetes_score += 20
    if clinical.age > 45: diabetes_score += 10
    scores["diabetes"] = min(95.0, float(diabetes_score))

    heart_score = 0
    if clinical.total_cholesterol > 240: heart_score += 25
    elif clinical.total_cholesterol > 200: heart_score += 10
    if clinical.systolic_bp > 140: heart_score += 25
    elif clinical.systolic_bp > 130: heart_score += 10
    if clinical.age > 55: heart_score += 15
    if clinical.family_heart_disease: heart_score += 20
    scores["heart_disease"] = min(90.0, float(heart_score))

    bp_score = 0
    if clinical.systolic_bp > 140 or clinical.diastolic_bp > 90: bp_score += 50
    elif clinical.systolic_bp > 130 or clinical.diastolic_bp > 80: bp_score += 30
    if clinical.family_hypertension: bp_score += 20
    if bmi > 30: bp_score += 15
    scores["hypertension"] = min(90.0, float(bp_score))

    return scores