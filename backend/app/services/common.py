""" Service layer for common operations."""
from fastapi import FastAPI
from app.models.models import Category, DifficultyLevel, QuestionType, User, Role
from sqlalchemy.orm import Session



class CommonCRUD:
    """menthods to fetch all categories"""
    def get_all_categories(self,db:Session):
        # Logic to fetch all categories
        return db.query(Category).all()
    
    """menthods to fetch all difficulty levels"""
    def get_all_difficulty_levels(self,db:Session):
        # Logic to fetch all difficulty levels
        return db.query(DifficultyLevel).all()
    
    """menthods to fetch all question types"""
    def get_all_question_types(self,db:Session):
        # Logic to fetch all question types
        return db.query(QuestionType).all()
    
    def get_all_roles(self,db:Session):
        return db.query(Role).all()
    
    def get_all_users(self,db:Session):
        return db.query(User).all()
    
commoncrud=CommonCRUD()