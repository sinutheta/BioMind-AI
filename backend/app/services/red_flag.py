from typing import List

def check_red_flags(symptoms, clinical) -> List[str]:
    flags = []

    if symptoms.chest_pain and symptoms.shortness_of_breath:
        flags.append("CRITICAL: Chest pain with shortness of breath may indicate a cardiac event. Call emergency services immediately.")

    if symptoms.chest_pain and clinical.systolic_bp >= 180:
        flags.append("CRITICAL: Chest pain with very high blood pressure. Seek emergency care now.")

    if clinical.systolic_bp >= 180 and clinical.diastolic_bp >= 120:
        flags.append("HIGH ALERT: Blood pressure is in hypertensive crisis range. Seek immediate medical attention.")

    if clinical.fasting_glucose >= 400:
        flags.append("CRITICAL: Fasting glucose above 400 mg/dL. Emergency care needed.")

    if clinical.fasting_glucose <= 54 and symptoms.dizziness:
        flags.append("CRITICAL: Very low blood sugar with dizziness. Eat fast-acting sugar and seek medical attention.")

    if symptoms.shortness_of_breath and symptoms.severity >= 8:
        flags.append("HIGH ALERT: Severe shortness of breath. Seek immediate medical evaluation.")

    return flags