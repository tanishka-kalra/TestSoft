"""SQLAlchemy model for the Category table."""
from sqlalchemy import Column, Integer, String
from app.core.db import Base

class Category(Base):
    """SQLAlchemy model for the Category table."""
    __tablename__ = "category"
    c_id = Column(Integer, primary_key=True, index=True)
    c_name = Column(String, unique=True, index=True, nullable=False)
