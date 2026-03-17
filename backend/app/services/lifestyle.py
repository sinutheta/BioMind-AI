from app.models.schemas import LifestyleInput, LifestyleBreakdown

def compute_lifestyle_modifier(lifestyle: LifestyleInput) -> LifestyleBreakdown:
    modifier = 1.0
    factors = {}
    protective = {}

    sleep = lifestyle.sleep_hours
    if sleep < 4:
        factors["sleep_under_4hrs"] = 0.50
        modifier += 0.50
    elif sleep < 6:
        factors["sleep_4_to_6hrs"] = 0.25
        modifier += 0.25
    elif sleep >= 8:
        protective["sleep_8plus_hrs"] = 0.10
        modifier -= 0.10

    stress = lifestyle.stress_level
    if stress >= 8:
        factors["high_stress"] = 0.30
        modifier += 0.30
    elif stress >= 6:
        factors["moderate_stress"] = 0.10
        modifier += 0.10
    elif stress <= 3:
        protective["low_stress"] = 0.10
        modifier -= 0.10

    exercise = lifestyle.exercise_days_per_week
    if exercise == 0:
        factors["sedentary"] = 0.20
        modifier += 0.20
    elif exercise <= 1:
        factors["low_activity"] = 0.10
        modifier += 0.10
    elif exercise >= 5:
        protective["active_lifestyle"] = 0.15
        modifier -= 0.15

    if lifestyle.is_smoker:
        factors["smoking"] = 0.40
        modifier += 0.40

    alcohol = lifestyle.alcohol_units_per_week
    if alcohol > 21:
        factors["heavy_alcohol"] = 0.25
        modifier += 0.25
    elif alcohol > 14:
        factors["moderate_alcohol"] = 0.10
        modifier += 0.10

    diet_map = {"poor": 0.20, "average": 0.0, "good": 0.10, "excellent": 0.20}
    diet_delta = diet_map[lifestyle.diet_quality]
    if lifestyle.diet_quality in ["poor"]:
        factors["poor_diet"] = diet_delta
        modifier += diet_delta
    elif lifestyle.diet_quality in ["good", "excellent"]:
        protective["good_diet"] = diet_delta
        modifier -= diet_delta

    if lifestyle.water_intake_liters < 1.5:
        factors["low_hydration"] = 0.10
        modifier += 0.10
    elif lifestyle.water_intake_liters >= 2.5:
        protective["good_hydration"] = 0.05
        modifier -= 0.05

    modifier = round(max(0.5, min(2.5, modifier)), 2)

    return LifestyleBreakdown(
        modifier=modifier,
        factors=factors,
        protective=protective
    )

def apply_modifier(base_scores: dict, modifier: float) -> dict:
    return {
        disease: round(min(100.0, max(0.0, score * modifier)), 1)
        for disease, score in base_scores.items()
    }