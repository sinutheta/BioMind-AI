from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./biomind.db"
    REDIS_URL: str = "redis://localhost:6379"
    SECRET_KEY: str = "biomind-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    SYMPTOM_MODEL_PATH: str = "app/ml/models/symptom_model.pkl"
    CHRONIC_MODEL_PATH: str = "app/ml/models/chronic_model.pkl"

    class Config:
        env_file = ".env"

settings = Settings()