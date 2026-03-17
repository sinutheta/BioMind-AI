from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, predict, history
from app.core.database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BioMind AI",
    description="Unified health risk detection API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth.router,    prefix="/api/auth",    tags=["Auth"])
app.include_router(predict.router, prefix="/api/predict", tags=["Predict"])
app.include_router(history.router, prefix="/api/history", tags=["History"])

@app.get("/health")
def health():
    return {"status": "ok", "service": "BioMind AI"}

from app.services.ml_service import load_models

@app.on_event("startup")
async def startup_event():
    load_models()