<div align="center">

# 🧬 BioMind AI

### *Your body is speaking. We translate it.*

**AI-Powered Unified Health Risk Detection · Real-Time · Explainable · Personalised**

---

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-RF-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-2.0-FF6600?style=for-the-badge)
![Claude AI](https://img.shields.io/badge/Claude_AI-Powered-8A2BE2?style=for-the-badge)

</div>

---

## 🚨 The Problem

> **Heart disease kills someone every 33 seconds. Type 2 diabetes affects 1 in 10 adults globally. Most people only find out when it's too late.**

Traditional health screening is:
- **Fragmented** — you see a GP for one thing, a specialist for another
- **Reactive** — you act after symptoms become serious
- **Opaque** — you get a diagnosis with no explanation you can actually understand
- **Inaccessible** — expensive, slow, geography-dependent

**BioMind AI changes all of that. In under 5 minutes.**

---

## 💡 The Solution

BioMind AI is a **unified, multi-model health risk detection platform** that fuses three independent AI engines into one seamless assessment. You describe your symptoms, enter clinical vitals, and share your lifestyle — and BioMind returns:

- 🎯 **Risk scores** across 41 diseases, ranked by probability
- ❤️ **Heart disease probability** from your clinical data
- 🩸 **Diabetes risk** from your metabolic profile
- 🧬 **A personalised lifestyle multiplier** — because how you live matters as much as what you feel
- 🗣️ **Plain-English AI explanation** — no medical degree needed

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔬 **3-Model Fusion Engine** | Symptom classifier + Heart risk + Diabetes risk, combined into one risk profile |
| 🧠 **LLM Explainability** | Claude AI (with GPT-4o fallback) explains your results in clear, human language |
| 🚩 **Red Flag Detection** | Automatically surfaces critical warning signs that need immediate attention |
| 🎚️ **Lifestyle Multiplier** | Sleep, stress, exercise, smoking, alcohol, diet — all baked into your final score |
| 🔐 **Secure Auth** | JWT-based authentication with hashed credentials |
| 📊 **History Dashboard** | Track your assessments over time — see your health trend, not just a snapshot |
| ⚡ **Instant Results** | Full risk profile in seconds, not days |
| 📱 **Responsive UI** | Beautiful, accessible design across all screen sizes |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                             │
│                   React + TypeScript + Vite                     │
│         ┌──────────┐  ┌───────────┐  ┌────────────────┐        │
│         │ Symptom  │  │ Clinical  │  │   Lifestyle    │        │
│         │   Form   │  │   Form    │  │     Form       │        │
│         │ 132 sx   │  │ vitals    │  │ 7 risk factors │        │
│         └────┬─────┘  └─────┬─────┘  └───────┬────────┘        │
└─────────────────────────────┼────────────────────────────────── ┘
                              │  JWT + REST API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FastAPI Backend                             │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  /predict  │  │  /history    │  │     /auth            │   │
│  └─────┬──────┘  └──────────────┘  └──────────────────────┘   │
│        │                                                        │
│        ▼                                                        │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   ML Service Layer                       │   │
│  │  ┌──────────────┐ ┌─────────────┐ ┌─────────────────┐  │   │
│  │  │ Model 1      │ │ Model 2a    │ │ Model 2b        │  │   │
│  │  │ Random Forest│ │  XGBoost   │ │  XGBoost        │  │   │
│  │  │ 132 symptoms │ │ Heart Risk  │ │ Diabetes Risk   │  │   │
│  │  │ → 41 diseases│ │ + scaler   │ │ + scaler        │  │   │
│  │  └──────┬───────┘ └──────┬──────┘ └────────┬────────┘  │   │
│  │         └────────────────┼─────────────────┘           │   │
│  │                          ▼                              │   │
│  │              ┌───────────────────────┐                 │   │
│  │              │  Lifestyle Multiplier  │                 │   │
│  │              │   0.5x ── ── ── 2.5x  │                 │   │
│  │              └───────────┬───────────┘                 │   │
│  │                          ▼                              │   │
│  │         ┌────────────────────────────────┐             │   │
│  │         │  Claude AI / GPT-4o Explainer  │             │   │
│  │         │  + Red Flag Detector           │             │   │
│  │         └────────────────────────────────┘             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                       SQLite (SQLAlchemy)                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🤖 The 3 AI Models — Under the Hood

### Model 1 · Symptom Classifier
> *Random Forest · DDXPlus-style dataset · 132 binary features → 41 diseases*

The backbone of BioMind. Trained on a rich multi-label symptom dataset, this Random Forest processes 132 checkbox symptoms — from `high_fever` and `breathlessness` to `polyuria` and `blurred_and_distorted_vision` — and maps them to **41 possible diagnoses** including Heart Attack, Tuberculosis, Dengue, Malaria, Diabetes, and more.

### Model 2a · Heart Risk Engine
> *XGBoost · Clinical vitals · StandardScaler preprocessing*

A gradient-boosted model trained on cardiovascular data. Takes clinical inputs (blood pressure, cholesterol, chest pain type, resting ECG, etc.), scales them through `scaler_heart.pkl`, and outputs a heart disease probability score.

### Model 2b · Diabetes Risk Engine
> *XGBoost · Metabolic panel · StandardScaler preprocessing*

A companion XGBoost model trained on metabolic/glycaemic data. Uses `scaler_diab.pkl` and outputs a diabetes probability, which is then cross-validated against symptom model predictions (polyuria, excessive hunger, etc.) for higher confidence.

### Model 3 · Lifestyle Multiplier
> *Custom weighted scoring · 7 behavioural factors · 0.5× – 2.5× modifier*

This is what makes BioMind different. Your lifestyle isn't ignored — it's **quantified**. Sleep hours, stress level, exercise frequency, smoking status, alcohol consumption, diet quality, and water intake all feed into a modifier that scales every disease score up or down. Live well → your risks reduce. Consistently.

---

## 🗣️ AI Explainability Layer

After all models run, **Claude AI** (with GPT-4o fallback) receives your full risk profile and generates a personalised, plain-English explanation:

- *Why* your top risks scored the way they did
- What specific symptoms or clinical values are most significant
- What lifestyle changes could have the highest impact
- **Red flags** — symptoms or combinations that warrant urgent medical attention

No jargon. No confusion. Just clarity.

---

## 🖥️ Tech Stack

```
Frontend                          Backend
────────────────────────────      ──────────────────────────────────
⚛️  React 18 + TypeScript         🐍  FastAPI (Python 3.11)
⚡  Vite                          🗄️  SQLite via SQLAlchemy
🎨  Tailwind CSS + shadcn/ui       🔐  JWT Auth (python-jose)
📊  Recharts (visualisations)      🤖  scikit-learn + XGBoost
📋  React Hook Form + Zod          🧠  Claude API / GPT-4o
🔌  Axios                          🚀  Uvicorn
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Git

### 1 · Clone the repo
```bash
git clone https://github.com/sinutheta/BioMind-AI.git
cd BioMind-AI
```

### 2 · Start the Backend
```bash
cd backend

# Activate virtual environment (Windows)
.\venv\Scripts\Activate.ps1

# Or on Mac/Linux
source venv/bin/activate

# Run the server
python -m uvicorn app.main:app --reload --port 8000
```
> Backend live at **http://localhost:8000**
> API docs at **http://localhost:8000/docs**

### 3 · Start the Frontend
```bash
# In a new terminal
cd frontend
npm install
npm run dev
```
> App live at **http://localhost:5173**

---

## 📡 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register new user |
| `POST` | `/api/auth/login` | ❌ | Login, receive JWT |
| `POST` | `/api/predict` | ✅ JWT | Run full health assessment |
| `GET` | `/api/history` | ✅ JWT | Get all past assessments |
| `GET` | `/api/history/{id}` | ✅ JWT | Get a specific assessment |
| `GET` | `/health` | ❌ | Server health check |

### Sample Predict Response
```json
{
  "top_diseases": [
    { "name": "Diabetes", "probability": 0.82, "rank": 1 },
    { "name": "Hypertension", "probability": 0.61, "rank": 2 }
  ],
  "heart_risk": 0.34,
  "diabetes_risk": 0.79,
  "lifestyle_multiplier": 1.4,
  "red_flags": ["polyuria + excessive_hunger — classic diabetes triad"],
  "explanation": "Based on your symptoms and clinical data, your risk profile suggests..."
}
```

---

## 📁 Project Structure

```
BioMind-AI/
├── 📂 frontend/
│   └── src/
│       ├── pages/              # LoginPage, RegisterPage, AssessmentPage, ResultsPage
│       ├── components/
│       │   ├── forms/          # SymptomForm (132 sx), ClinicalForm, LifestyleForm
│       │   └── ui/             # Button, Input, Card, Badge (shadcn/ui)
│       ├── hooks/useAuth.tsx   # JWT context + auth state
│       ├── lib/api.ts          # Axios client
│       └── types/index.ts      # All TypeScript interfaces
│
└── 📂 backend/
    └── app/
        ├── main.py             # FastAPI app + CORS
        ├── core/               # config, database, security
        ├── models/             # User + Prediction tables, Pydantic schemas
        ├── api/                # auth, predict, history routes
        ├── services/           # red_flag, lifestyle, ml_service, llm_service
        └── ml/models/          # *.pkl model files + scalers
```

---

## 🩺 Supported Diseases (41)

<details>
<summary>View all 41 conditions →</summary>

| # | Disease | # | Disease |
|---|---------|---|---------|
| 1 | Paroxymal Positional Vertigo | 22 | Hepatitis C |
| 2 | AIDS | 23 | Hepatitis D |
| 3 | Acne | 24 | Hepatitis E |
| 4 | Alcoholic Hepatitis | 25 | Hypertension |
| 5 | Allergy | 26 | Hyperthyroidism |
| 6 | Arthritis | 27 | Hypoglycemia |
| 7 | Bronchial Asthma | 28 | Hypothyroidism |
| 8 | Cervical Spondylosis | 29 | Impetigo |
| 9 | Chicken Pox | 30 | Jaundice |
| 10 | Chronic Cholestasis | 31 | Malaria |
| 11 | Common Cold | 32 | Migraine |
| 12 | Dengue | 33 | Osteoarthritis |
| 13 | Diabetes | 34 | Paralysis (Brain Haemorrhage) |
| 14 | Dimorphic Haemorrhoids | 35 | Peptic Ulcer Disease |
| 15 | Drug Reaction | 36 | Pneumonia |
| 16 | Fungal Infection | 37 | Psoriasis |
| 17 | GERD | 38 | Tuberculosis |
| 18 | Gastroenteritis | 39 | Typhoid |
| 19 | Heart Attack | 40 | Urinary Tract Infection |
| 20 | Hepatitis A | 41 | Varicose Veins |
| 21 | Hepatitis B | | |

</details>

---

## 🔭 What's Next — Roadmap

- [ ] 🩻 **Medical imaging integration** — upload X-rays / MRIs for visual analysis
- [ ] 📈 **Longitudinal tracking** — visualise risk trends over weeks and months
- [ ] 🏥 **Doctor referral engine** — connect high-risk users with nearby specialists
- [ ] 🌐 **Multilingual support** — explanations in 10+ languages
- [ ] 📲 **Mobile app** — React Native port for iOS + Android
- [ ] 🔗 **Wearable sync** — Apple Health, Google Fit, Fitbit integration
- [ ] 🧪 **Lab report parser** — upload blood test PDFs, auto-extract values

---

## 👥 Team

| Role | Contribution |
|------|-------------|
| **Dev A + B** | Full-stack — React frontend, FastAPI backend, auth, API design, system integration |
| **Dev C** | Data science — ML model training, Jupyter notebooks, dataset curation, XGBoost tuning |

---

## ⚠️ Disclaimer

> BioMind AI is a **hackathon prototype** built for educational and demonstration purposes. It is **not a substitute for professional medical advice, diagnosis, or treatment**. Always consult a qualified healthcare professional for any health concerns. Never disregard medical advice because of something BioMind AI told you.

---

<div align="center">

**Built with ❤️ and a lot of ☕ at the hackathon**

*If BioMind AI made you think about your health differently — it's already working.*

⭐ Star this repo if you believe everyone deserves to understand their own health risk.

</div>
