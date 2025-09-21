"""Common API routes."""
from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.common import commoncrud
from typing import List
from app.schemas.masterlist_schema import RoleSchema
router = APIRouter()





@router.get("/get-category")
def get_category(db:Session=Depends(get_db)):
    return commoncrud.get_all_categories(db)

@router.get("/get-difficulty-level")
def get_difficulty_level(db:Session=Depends(get_db)):
    return commoncrud.get_all_difficulty_levels(db)

@router.get("/get-question-type")
def get_question_type(db:Session=Depends(get_db)):
    return commoncrud.get_all_question_types(db)

@router.get("/get-roles",response_model=List[RoleSchema],response_model_by_alias=False)
def get_roles(db:Session=Depends(get_db)):
    return commoncrud.get_all_roles(db)

@router.get("/get-users")
def get_users(db:Session=Depends(get_db)):
    return commoncrud.get_all_users(db) 

