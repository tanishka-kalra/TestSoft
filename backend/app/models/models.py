"""Models for categories, difficulty levels, question types, users, roles, and single choice questions."""
from sqlalchemy import Column, Integer, String, DateTime,ForeignKey
from app.core.database import Base
from datetime import datetime, timezone



""" Common models for categories, difficulty levels, and question types."""
class Category(Base):
    __tablename__ = "category"
    c_id = Column(Integer, primary_key=True, index=True)
    c_name = Column(String, unique=True, index=True)  

""" Model for difficulty levels.""" 
class DifficultyLevel(Base):
    __tablename__ = "difficulty"
    d_id = Column(Integer, primary_key=True, index=True)
    d_name = Column(String, unique=True, index=True)
    
""" Model for question types."""
class QuestionType(Base):
    __tablename__ = "question_type"
    q_id = Column(Integer, primary_key=True, index=True)
    q_type = Column(String, unique=True, index=True)
    
class User(Base):
    __tablename__ = "users"
    u_id = Column(Integer, primary_key=True, index=True)
    u_name = Column(String, unique=True, index=True)
    u_email = Column(String, unique=True, index=True)
    u_mob_num = Column(String)
    u_hashed_password = Column(String)
    u_role_id = Column(Integer)
    u_is_active = Column(Integer, default=1)  
    
class Role(Base):
    __tablename__ = "role"
    r_id = Column(Integer, primary_key=True, index=True)
    r_name = Column(String, unique=True, index=True)

class SingleChoiceQuestion(Base):
    __tablename__ = "question"
    q_id = Column(Integer, primary_key=True, index=True)
    q_text = Column(String)
    q_option_1=Column(String)
    q_option_2=Column(String)
    q_option_3=Column(String)
    q_option_4=Column(String)
    q_correct_ans=Column(String)
    q_category = Column(Integer,ForeignKey("category.c_id"))
    q_difficulty= Column(Integer,ForeignKey("difficulty.d_id"))
    q_tags=Column(String)
    q_explanation=Column(String)
    q_created_by=Column(Integer,ForeignKey("users.u_id"))
    q_created_at=Column(DateTime,default=datetime.now(timezone.utc))
    q_type = Column(Integer,ForeignKey("question_type.q_id"))
    q_updated_at=Column(DateTime,default=datetime.now(timezone.utc))
    q_updated_by=Column(Integer)
    q_image_path=Column(String)
    
    