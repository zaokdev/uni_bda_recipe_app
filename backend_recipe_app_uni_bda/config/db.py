import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.models import Base
from dotenv import load_dotenv

# Cargar variables
load_dotenv()

engine = create_engine(os.getenv("DB_URI"), echo=True)
SessionLocal = sessionmaker(bind=engine)


def init_db(app):

    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")
    Base.metadata.create_all(bind=engine)
