import json
import httpx
from app.core.config import settings

def build_prompt(request, final_scores, lifestyle, red_flags) -> str:
    top_risks = sorted(final_scores.items(), key=lambda x: -x[1]["score"])[:3]
    top_risks_text = "\n".join(
        f"  - {name}: {data['score']:.0f}/100 ({data['severity']})"
        for name, data in top_risks
    )
    lifestyle_factors_text = "\n".join(
        f"  - {k.replace('_', ' ')}: +{v:.2f}"
        for k, v in lifestyle.factors.items()
    ) or "  - None"
    protective_text = "\n".join(
        f"  - {k.replace('_', ' ')}: -{v:.2f}"
        for k, v in lifestyle.protective.items()
    ) or "  - None"

    return f"""You are BioMind AI, a compassionate health assistant. Explain health risk scores in plain friendly language.

PATIENT: Age {request.clinical.age}, {request.clinical.gender}, BMI {request.clinical.bmi:.1f}
Sleep: {request.lifestyle.sleep_hours}hrs, Stress: {request.lifestyle.stress_level}/10, Exercise: {request.lifestyle.exercise_days_per_week} days/week, Smoker: {'Yes' if request.lifestyle.is_smoker else 'No'}

TOP RISKS:
{top_risks_text}

LIFESTYLE MODIFIER: {lifestyle.modifier}x
Risk factors: {lifestyle_factors_text}
Protective factors: {protective_text}

Write a warm 3-4 sentence summary, then give exactly 3 specific recommendations and 2-3 doctor warning signs.
Respond ONLY in this exact JSON format:
{{
  "explanation": "...",
  "recommendations": ["...", "...", "..."],
  "see_doctor_if": ["...", "...", "..."]
}}"""

async def get_llm_explanation(request, final_scores, lifestyle, red_flags):
    prompt = build_prompt(request, final_scores, lifestyle, red_flags)

    if settings.ANTHROPIC_API_KEY:
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    "https://api.anthropic.com/v1/messages",
                    headers={
                        "x-api-key": settings.ANTHROPIC_API_KEY,
                        "anthropic-version": "2023-06-01",
                        "content-type": "application/json"
                    },
                    json={
                        "model": "claude-sonnet-4-6",
                        "max_tokens": 700,
                        "messages": [{"role": "user", "content": prompt}]
                    }
                )
                data = response.json()
                text = data["content"][0]["text"]
                text = text.replace("```json", "").replace("```", "").strip()
                parsed = json.loads(text)
                return parsed["explanation"], parsed["recommendations"], parsed["see_doctor_if"]
        except Exception as e:
            print(f"Claude API error: {e}")

    if settings.OPENAI_API_KEY:
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={"Authorization": f"Bearer {settings.OPENAI_API_KEY}"},
                    json={
                        "model": "gpt-4o",
                        "temperature": 0.3,
                        "max_tokens": 700,
                        "messages": [
                            {"role": "system", "content": "Respond with valid JSON only."},
                            {"role": "user", "content": prompt}
                        ]
                    }
                )
                data = response.json()
                text = data["choices"][0]["message"]["content"]
                text = text.replace("```json", "").replace("```", "").strip()
                parsed = json.loads(text)
                return parsed["explanation"], parsed["recommendations"], parsed["see_doctor_if"]
        except Exception as e:
            print(f"OpenAI API error: {e}")

    return _fallback_explanation(request, final_scores, lifestyle)

def _fallback_explanation(request, final_scores, lifestyle):
    top = max(final_scores.items(), key=lambda x: x[1]["score"])
    top_name = top[0].replace("_", " ").title()
    top_score = top[1]["score"]
    explanation = (
        f"Based on your health data, your highest risk area is {top_name} "
        f"with a score of {top_score:.0f}/100. "
        f"Your lifestyle is currently {'increasing' if lifestyle.modifier > 1 else 'decreasing'} "
        f"your overall risk by a factor of {lifestyle.modifier}x."
    )
    recs = [
        f"Aim for 7-8 hours of sleep — you're currently getting {request.lifestyle.sleep_hours} hours.",
        "Get at least 30 minutes of moderate exercise 5 days per week.",
        "Schedule a check-up with your doctor to discuss your risk profile."
    ]
    see_doctor = [
        "Symptoms worsen significantly over 48 hours",
        "You experience chest pain or severe shortness of breath",
        "Your blood pressure consistently reads above 140/90"
    ]
    return explanation, recs, see_doctor