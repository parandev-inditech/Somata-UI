# from functools import lru_cache
# from pydantic_settings import BaseSettings, SettingsConfigDict

# class Settings(BaseSettings):
#    env: str
#    api_base_url: str

#    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


# @lru_cache()
# def get_settings():
#    return Settings()

# settings = get_settings()
import os
from dotenv import load_dotenv

load_dotenv()

ENV=os.getenv("ENV", "DEV")
API_BASE_URL=os.getenv("API_BASE_URL", "https://vapp-dev-som-01.msc01.nonprod.dot.ga.gov/api/v1")
